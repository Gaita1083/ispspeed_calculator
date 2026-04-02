import { Home, Laptop, Camera, Volume2, Tv, Cpu, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { SmartHomeDevicesProps } from "@/types";

interface DeviceRow {
    id: keyof Omit<SmartHomeDevicesProps, "cloudBackup" | "onChange">;
    label: string;
    hint: string;
    icon: React.ElementType;
}

const DEVICE_ROWS: DeviceRow[] = [
    { id: "laptopsDesktops", label: "Laptops / Desktops", hint: "Used for browsing, work, or school",   icon: Laptop  },
    { id: "cameras",         label: "Security Cameras",   hint: "Indoor or outdoor cameras",             icon: Camera  },
    { id: "smartSpeakers",   label: "Smart Speakers",     hint: "Alexa, Google Home, HomePod",           icon: Volume2 },
    { id: "smartTv",         label: "Smart TVs",          hint: "Any TV connected to the internet",      icon: Tv      },
    { id: "otherSmart",      label: "Other Smart Devices",hint: "Doorbells, thermostats, smartwatches",  icon: Cpu     },
];

export function SmartHomeDevices({
    laptopsDesktops,
    cameras,
    smartSpeakers,
    smartTv,
    otherSmart,
    cloudBackup,
    onChange,
}: SmartHomeDevicesProps) {
    const values: Record<DeviceRow["id"], number> = {
        laptopsDesktops,
        cameras,
        smartSpeakers,
        smartTv,
        otherSmart,
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Home}
                title="Devices & Smart Home"
                subtitle="Connected devices that use your internet"
            />

            <div className="space-y-3">
                {DEVICE_ROWS.map((device) => {
                    const count = values[device.id];
                    const Icon = device.icon;
                    return (
                        <div
                            key={device.id}
                            className="flex items-center justify-between p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="text-brand-orange shrink-0" size={20} />
                                <div>
                                    <p className="font-medium text-gray-900">{device.label}</p>
                                    <p className="text-xs text-muted-foreground">{device.hint}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onChange(device.id, Math.max(0, count - 1))}
                                    disabled={count === 0}
                                    aria-label={`Decrease ${device.label}`}
                                >
                                    −
                                </Button>
                                <span className="text-xl font-bold text-brand-purple w-8 text-center">
                                    {count}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onChange(device.id, count + 1)}
                                    aria-label={`Increase ${device.label}`}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={cloudBackup}
                        onChange={(e) => onChange("cloudBackup", e.target.checked)}
                        className="w-5 h-5 accent-brand-purple"
                    />
                    <div className="flex items-center gap-2">
                        <Cloud className="text-brand-orange shrink-0" size={20} />
                        <div>
                            <span className="font-medium text-gray-900 block">
                                Do you back up photos/videos to the cloud?
                            </span>
                            <span className="text-sm text-muted-foreground">
                                iCloud, Google Photos, Dropbox, OneDrive, etc.
                            </span>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}
