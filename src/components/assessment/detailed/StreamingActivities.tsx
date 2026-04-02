import { Tv, Check } from "lucide-react";
import { ColoredSlider } from "@/components/shared/ColoredSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { STREAMING_QUALITIES, BANDWIDTH_REQUIREMENTS } from "@/utils/constants";
import type { StreamingActivitiesProps } from "@/types";

export function StreamingActivities({ simultaneousStreamers, streamingQuality, onChange }: StreamingActivitiesProps) {
    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Tv}
                title="Streaming & Entertainment"
                subtitle="Netflix, YouTube, Disney+, and more"
            />

            <ColoredSlider
                min={0}
                max={10}
                value={simultaneousStreamers}
                onChange={(value) => onChange("simultaneousStreamers", value)}
                label="How many people stream at the same time?"
                hint="Usually in the evening when everyone's home"
            />

            <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                    What quality do you usually watch?
                </label>
                <div className="grid gap-3">
                    {STREAMING_QUALITIES.map((quality) => {
                        const isSelected = streamingQuality === quality.id;
                        const mbps = BANDWIDTH_REQUIREMENTS.streaming[quality.id];
                        return (
                            <button
                                key={quality.id}
                                onClick={() => onChange("streamingQuality", quality.id)}
                                className={cn(
                                    "p-4 rounded-lg border-2 text-left transition-all",
                                    isSelected
                                        ? "border-brand-purple bg-brand-purple/5"
                                        : "border-border hover:border-brand-purple/40 bg-brand-bg"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className={cn(
                                            "font-semibold",
                                            isSelected ? "text-brand-purple" : "text-gray-900"
                                        )}>
                                            {quality.label}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{quality.description}</p>
                                        <p className="text-xs text-brand-orange font-medium mt-1">
                                            {mbps} Mbps per stream
                                        </p>
                                    </div>
                                    {isSelected && (
                                        <Check className="text-brand-purple shrink-0" size={22} />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
