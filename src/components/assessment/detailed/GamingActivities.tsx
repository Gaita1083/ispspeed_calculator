import { Gamepad2, Download } from "lucide-react";
import { ColoredSlider } from "@/components/shared/ColoredSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { GamingActivitiesProps } from "@/types";

export function GamingActivities({ gaming, gamers, gameDownloads, onChange }: GamingActivitiesProps) {
    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Gamepad2}
                title="Gaming"
                subtitle="PlayStation, Xbox, PC, Nintendo Switch"
            />

            <div className="p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={gaming}
                        onChange={(e) => onChange("gaming", e.target.checked)}
                        className="w-5 h-5 accent-brand-purple"
                    />
                    <span className="font-medium text-gray-900">Does anyone play online games?</span>
                </label>
            </div>

            {gaming && (
                <div className="space-y-5">
                    <ColoredSlider
                        min={1}
                        max={6}
                        value={gamers}
                        onChange={(value) => onChange("gamers", value)}
                        label="How many people game at the same time?"
                    />

                    <div className="p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-lg">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gameDownloads}
                                onChange={(e) => onChange("gameDownloads", e.target.checked)}
                                className="w-5 h-5 accent-brand-purple"
                            />
                            <div>
                                <span className="font-medium text-gray-900 block">
                                    Do you download large games often?
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Modern games can be 50–100 GB each
                                </span>
                            </div>
                        </label>
                    </div>

                    {gameDownloads && (
                        <div className="flex items-start gap-3 bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-4">
                            <Download className="text-brand-orange mt-0.5 shrink-0" size={18} />
                            <p className="text-sm text-gray-700">
                                <strong>Large game downloads add +25 Mbps</strong> to your recommendation
                                to keep everything running smoothly while downloading.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
