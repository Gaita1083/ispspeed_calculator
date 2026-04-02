import type { LucideIcon } from "lucide-react";
import { RouterIcon, Popcorn, Gamepad2, Video, CloudBackup, SmartphoneNfc } from "lucide-react";
import type { QuickActivitiesProps } from "@/types";
import { ACTIVITIES_CONFIG, STREAMING_QUALITIES } from "@/utils/constants";
import { SectionHeader } from "@/components/shared/SectionHeader";

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
    streaming: Popcorn, 
    videoCalls: Video,
    gaming: Gamepad2,
    cloudBackup: CloudBackup,
    smartHome: SmartphoneNfc,
}

export function QuickActivities({ data, onChange}: QuickActivitiesProps) {
    return (
        <div className="space-y-6">
            <SectionHeader 
                icon={RouterIcon}
                title="What do you use the internet for?"
                subtitle="Select all that apply"
            />

            <div className="space-y-3">
                {ACTIVITIES_CONFIG.map(activity => {
                    const Icon = ACTIVITY_ICONS[activity.id];
                    return (
                        <div key={activity.id}>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={data?.[activity.id] as boolean ?? false}
                                        onChange={(e) => onChange(activity.id, e.target.checked)}
                                        className="w-5 h-5 accent-brand-orange"
                                    />
                                    <Icon size={22}  className="text-brand-orange"/>
                                    <span>{activity.label}</span>
                                </label>
                            </div>
                            {activity.quality && data?.[activity.id] && (
                                <div className="mt-2 ml-12 space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Streaming Quality:
                                </label>
                                <div className="flex gap-2">
                                    {STREAMING_QUALITIES.map(q => (
                                        <button
                                            key={q.id}
                                            onClick={() => onChange('streamingQuality', q.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${data?.streamingQuality === q.id ? 'bg-brand-purple text-white' : 'bg-brand-bg border-2 border-brand-purple/20 hover:border-brand-purple/50'}`}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}