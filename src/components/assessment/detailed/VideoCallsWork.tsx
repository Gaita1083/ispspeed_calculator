import { Video, ArrowUp } from "lucide-react";
import { ColoredSlider } from "@/components/shared/ColoredSlider";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { VideoCallsWorkProps } from "@/types";

export function VideoCallsWork({ videoCalls, onChange }: VideoCallsWorkProps) {
    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Video}
                title="Video Calls & Remote Work"
                subtitle="Zoom, Teams, Google Meet, online classes"
            />

            <ColoredSlider
                min={0}
                max={6}
                value={videoCalls}
                onChange={(value) => onChange("videoCalls", value)}
                label="How many people have video calls at the same time?"
                hint="Include work meetings, online school, and video chats with family"
            />

            <div className="flex items-start gap-3 bg-brand-teal/10 border border-brand-teal/30 rounded-lg p-4">
                <ArrowUp className="text-brand-teal mt-0.5 shrink-0" size={18} />
                <p className="text-sm text-gray-700">
                    <strong>Upload speed matters here.</strong> Video calls need both fast download
                    and upload — we factor this in automatically when calculating your recommendation.
                </p>
            </div>
        </div>
    );
}
