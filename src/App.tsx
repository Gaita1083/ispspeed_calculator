import { useState } from "react";
import { NavBar } from "@/components/layout/NavBar";
import { HeroSection } from "@/components/layout/HeroSection"; 
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { Button } from "./components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { quickAssessmentPages, detailedAssessmentPages } from "@/config/assessmentPages";

type Step = 'hero' | 'assessment' | 'results';
type AssessmentMode = 'quick' | 'detailed';

function App() {
    const [currentStep, setCurrentStep] = useState<Step>('hero');
    const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>('detailed');
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState({
        totalPeople: 3,
        peakTimeUsers: 0,
        standardTimeUsers: 0,
        laptopsDesktops: 0,
    });

    const pages = assessmentMode === 'quick' ? quickAssessmentPages : detailedAssessmentPages;
    const totalSteps = pages.length;
    const CurrentPageComponent = pages[currentPage]?.component;
    
    const handleStart = (selectedMode: AssessmentMode) => {
        setAssessmentMode(selectedMode);
        setCurrentStep('assessment');
        setCurrentPage(0);
    };

    const handleReset = () => {
        setCurrentStep('hero');
        setCurrentPage(0);
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentStep('results');
        }
    };

    const handleBack = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDataChange = (field: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const canProceed = formData.totalPeople > 0;

    return (
      <div className="min-h-screen">
        <NavBar onLogoClick={handleReset} />
        {currentStep === 'hero' && <HeroSection onStart={handleStart} />}
        {currentStep === 'assessment' && CurrentPageComponent && (
            <div className="min-h-screen bg-linear-to-br from-brand-bg to-brand-purple/10 p-4 py-8">
            <div className="max-w-3xl mx-auto">

              <div className="mb-8">
                <ProgressBar current={currentPage + 1} total={totalSteps} />
                <div className="text-sm text-gray-600">
                  Step {currentPage + 1} of {totalSteps}: {pages[currentPage].title}
                </div>
              </div>
              
              <Card className="mb-6">
                <CurrentPageComponent data={formData} onChange={handleDataChange} />
              </Card>

              <div className="flex gap-4 justify-between">
                <Button onClick={handleBack} variant="secondary" disabled={currentPage === 0}>
                  <ChevronLeft size={20} />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!canProceed}>
                  {currentPage === pages.length - 1 ? 'See Results' : 'Next'}
                  {currentPage === pages.length - 1 ? (
                    <Check size={20} /> 
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help? We'll give you a good estimate even with approximate answers
                </p>
              </div>
            </div>
          </div>
      )}

      {currentStep === 'results' && (
        <div className="p-4">
            <h2>Results</h2>
            <p>Components comming next...</p>
        </div>
      )}
      </div>
    );
}

export default App;