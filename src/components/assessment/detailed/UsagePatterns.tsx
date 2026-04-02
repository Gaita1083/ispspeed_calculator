import { Clock, Lightbulb } from "lucide-react";
import { ColoredSlider } from "@/components/shared/ColoredSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { UsagePatternsProps } from "@/types";

export function UsagePatterns({ people, peakTimeUsers, standardTimeUsers, onChange }: UsagePatternsProps) {
    const totalPeople = people.kids + people.teens + people.adults;

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Clock}
                title="When does your household use the internet?"
                subtitle="This helps us calculate your needs accurately"
            />

            <div className="bg-brand-teal/10 border-2 border-brand-teal/30 rounded-lg p-6 space-y-6">
                <div>
                    <h3 className="font-semibold text-brand-teal mb-1">Peak Time (Evenings 6PM–10PM)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        When most people are home from work or school
                    </p>
                    <ColoredSlider
                        min={0}
                        max={totalPeople || 10}
                        value={peakTimeUsers}
                        onChange={(value) => onChange("peakTimeUsers", value)}
                        label="How many people use internet at the same time?"
                    />
                </div>

                <div className="border-t border-brand-teal/20 pt-6">
                    <h3 className="font-semibold text-brand-teal mb-1">Standard Time (Daytime)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        When some are at work or school
                    </p>
                    <ColoredSlider
                        min={0}
                        max={totalPeople || 10}
                        value={standardTimeUsers}
                        onChange={(value) => onChange("standardTimeUsers", value)}
                        label="How many people use internet at the same time?"
                    />
                </div>
            </div>

            <div className="flex items-start gap-3 bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-4">
                <Lightbulb className="text-brand-orange mt-0.5 shrink-0" size={18} />
                <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> We calculate based on peak time to make sure you always have
                    enough speed — even when everyone's online at once!
                </p>
            </div>
        </div>
    );
}
