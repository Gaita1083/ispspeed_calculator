import { useState } from "react";
import { NavBar } from "@/components/layout/NavBar";
import { HeroSection } from "@/components/layout/HeroSection";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { Button } from "@/components/ui/button";
import { ResultsDashboard } from "@/components/results/ResultsDashboard";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { quickAssessmentPages, detailedAssessmentPages } from "@/config/assessmentPages";
import { calculateSpeed } from "@/utils/calculator";
import { DEFAULT_FORM_VALUES } from "@/utils/constants";
import type { AppFormData, PeopleData, CalculationResult } from "@/types";

type Step = "hero" | "assessment" | "results";
type AssessmentMode = "quick" | "detailed";

function App() {
    const [currentStep, setCurrentStep] = useState<Step>("hero");
    const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>("detailed");
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState<AppFormData>(DEFAULT_FORM_VALUES);
    const [results, setResults] = useState<CalculationResult | null>(null);

    const pages = assessmentMode === "quick" ? quickAssessmentPages : detailedAssessmentPages;
    const totalSteps = pages.length;
    const CurrentPageComponent = pages[currentPage]?.component;

    // ── Navigation handlers ────────────────────────────────────────────────

    const handleStart = (selectedMode: AssessmentMode) => {
        setAssessmentMode(selectedMode);
        setCurrentStep("assessment");
        setCurrentPage(0);
    };

    const handleReset = () => {
        setCurrentStep("hero");
        setCurrentPage(0);
        setFormData(DEFAULT_FORM_VALUES);
        setResults(null);
    };

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            calculateResults();
        }
    };

    const handleBack = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    // ── Form data handlers ─────────────────────────────────────────────────

    /** Generic field update — used by most assessment pages */
    const handleDataChange = (field: string, value: number | boolean | string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    /** PeopleSelector-specific handler — keeps totalPeople in sync */
    const handlePeopleChange = (group: keyof PeopleData, value: number) => {
        setFormData((prev) => {
            const people = { ...prev.people, [group]: value };
            return {
                ...prev,
                people,
                totalPeople: people.kids + people.teens + people.adults,
            };
        });
    };

    // ── Speed calculation bridge ───────────────────────────────────────────

    const calculateResults = () => {
        const isQuick = assessmentMode === "quick";

        const calcData = isQuick
            ? {
                  people: formData.totalPeople,
                  simultaneousStreamers: formData.simultaneousStreamers,
                  streamingQuality: formData.streamingQuality,
                  videoCalls: formData.videoCalls,
                  gaming: formData.gaming,
                  gamers: formData.gamers,
                  gameDownloads: formData.gameDownloads,
                  smartDevice: formData.smartHome ? 3 : 0,
                  cameras: 0,
                  cloudBackup: formData.cloudBackup,
              }
            : {
                  people:
                      formData.people.kids +
                      formData.people.teens +
                      formData.people.adults,
                  simultaneousStreamers: formData.simultaneousStreamers,
                  streamingQuality: formData.streamingQuality,
                  videoCalls: formData.videoCalls,
                  gaming: formData.gaming,
                  gamers: formData.gamers,
                  gameDownloads: formData.gameDownloads,
                  smartDevice:
                      formData.smartSpeakers +
                      formData.smartTv +
                      formData.otherSmart,
                  cameras: formData.cameras,
                  cloudBackup: formData.cloudBackup,
              };

        setResults(calculateSpeed(calcData));
        setCurrentStep("results");
    };

    // ── Gate: prevent advancing with 0 people in detailed mode ────────────

    const canProceed =
        assessmentMode === "detailed" && currentPage === 0
            ? formData.people.kids + formData.people.teens + formData.people.adults > 0
            : true;

    // ── Render ─────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen">
            <NavBar onLogoClick={handleReset} />

            {/* Hero */}
            {currentStep === "hero" && <HeroSection onStart={handleStart} />}

            {/* Assessment */}
            {currentStep === "assessment" && CurrentPageComponent && (
                <div className="min-h-screen bg-linear-to-br from-brand-bg to-brand-purple/10 p-4 py-8">
                    <div className="max-w-3xl mx-auto">

                        <div className="mb-8">
                            <ProgressBar current={currentPage + 1} total={totalSteps} />
                            <div className="text-sm text-muted-foreground">
                                Step {currentPage + 1} of {totalSteps}: {pages[currentPage].title}
                            </div>
                        </div>

                        <Card className="mb-6">
                            {/* Pass both handlers — non-PeopleSelector pages safely ignore onPeopleChange */}
                            <CurrentPageComponent
                                data={formData}
                                onChange={handleDataChange}
                                onPeopleChange={handlePeopleChange}
                                // Spread individual fields for typed detailed components
                                people={formData.people}
                                peakTimeUsers={formData.peakTimeUsers}
                                standardTimeUsers={formData.standardTimeUsers}
                                simultaneousStreamers={formData.simultaneousStreamers}
                                streamingQuality={formData.streamingQuality}
                                videoCalls={formData.videoCalls}
                                gaming={formData.gaming}
                                gamers={formData.gamers}
                                gameDownloads={formData.gameDownloads}
                                laptopsDesktops={formData.laptopsDesktops}
                                cameras={formData.cameras}
                                smartSpeakers={formData.smartSpeakers}
                                smartTv={formData.smartTv}
                                otherSmart={formData.otherSmart}
                                cloudBackup={formData.cloudBackup}
                            />
                        </Card>

                        <div className="flex gap-4 justify-between">
                            <Button
                                onClick={handleBack}
                                variant="secondary"
                                disabled={currentPage === 0}
                            >
                                <ChevronLeft size={20} />
                                Back
                            </Button>
                            <Button onClick={handleNext} disabled={!canProceed}>
                                {currentPage === pages.length - 1 ? "See Results" : "Next"}
                                {currentPage === pages.length - 1 ? (
                                    <Check size={20} />
                                ) : (
                                    <ChevronRight size={20} />
                                )}
                            </Button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Need help? We'll give you a good estimate even with approximate answers
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {currentStep === "results" && results && (
                <ResultsDashboard
                    data={formData}
                    results={results}
                    onReset={handleReset}
                />
            )}
        </div>
    );
}

export default App;
