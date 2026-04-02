import { Users, Zap } from "lucide-react";
import { ColoredSlider } from "@/components/shared/ColoredSlider";
import type { QuickHouseholdProps } from "@/types";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function QuickHousehold({ data, onChange }: QuickHouseholdProps) {
    const totalPeople = data?.totalPeople ?? 3;
    const peakTimeUsers = data?.peakTimeUsers ?? 0;
    const standardTimeUsers = data?.standardTimeUsers ?? 0;
    const laptopsDesktops = data?.laptopsDesktops ?? 0;

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Users}
                title="Quick Setup"
                subtitle="Just a few quick questions to get you started"
            />

            <ColoredSlider
                min={1}
                max={25}
                value={totalPeople}
                onChange={(value) => onChange('totalPeople', value)}
                label="Total People in Household"
                hint="How many people live in your home?"
            />

            <div className="bg-brand-teal/10 border-2 border-brand-teal/30 rounded-lg p-4">
                <h3 className="font-semibold text-brand-teal flex items-center gap-2 mb-3">
                    <Zap className="text-brand-orange" size={20} />
                    Usage Patterns
                </h3>
            

            <div className="space-y-4">
                <ColoredSlider
                    min={0}
                    max={totalPeople}
                    value={peakTimeUsers}
                    onChange={(value) => onChange('peakTimeUsers', value)}
                    label="Peak time: How many use internet at once?"
                    hint="Evenings (6PM-11PM) when everyone is home and online"
                />

                <ColoredSlider
                    min={0}
                    max={totalPeople}
                    value={standardTimeUsers}
                    onChange={(value) => onChange('standardTimeUsers', value)}
                    label="Normal time: How many use internet at once?"
                    hint="During the day (9AM-5PM) when some may be working, away from home, or at school"
                />
            </div>
            </div>
            <ColoredSlider
                min={0}
                max={totalPeople}
                value={laptopsDesktops}
                onChange={(value) => onChange('laptopsDesktops', value)}
                label="How many laptops/desktops are used at the same time?"
            />
        </div>
    );
}
