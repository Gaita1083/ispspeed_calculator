import { Wifi, ClipboardPenLine, Zap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { HeroSectionProps } from "@/types";

export function HeroSection({ onStart }: HeroSectionProps) {
    return(
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="max-w-2xl p-8 text-center">
                <div className="mb-6">
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                        <Wifi className="text-green-600" size={48}/>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Find Your Perfect Internet Speed
                    </h1>
                    <p className="text-lg text-gray-600">
                        We'll help you figure out exactly how fast your internet needs to be - no technical knowledge required!
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => onStart('quick')} 
                        className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all cursor-pointer text-left group"
                    >   <div className="flex items-center gap-2 mb-2">
                            <Zap className="text-green-600 group-hover:fill-green-600 transition-colors" size={20} />
                            <span className="font-medium text-blue-900 group-hover:text-blue-700">
                                Quick Estimate
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                            Get a recommendation in under 2 minutes
                        </p>
                        <div className="text-blue-600 text-sm font-medium">
                            Start Quick Mode <ArrowRight className="inline-block ml-1" size={16} />
                        </div>
                    </button>

                    <button
                        className="p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-100 transition-all cursor-pointer text-left group"
                        onClick={() => onStart('detailed')}
                    >   <div className="flex items-center gap-2 mb-2">
                        <ClipboardPenLine className="text-green-600 group-hover:fill-green-600 transition-colors" size={20} />
                        <span className="font-medium text-indigo-900 group-hover:text-indigo-700">
                            Detailed Assessment
                        </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                            More accurate results in about 5 minutes
                        </p>
                        <div className="text-green-600 text-sm font-medium">
                            Start Detailed Mode <ArrowRight className="inline-block ml-1" size={16} />
                        </div>
                    </button>
                </div>
                
                <p className="text-sm text-gray-500">
                    Both options are easy to follow - choose what works best for you!
                </p>
            </Card>
        </div>
    )
}