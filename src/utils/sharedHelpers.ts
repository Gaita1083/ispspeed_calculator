import type { AppFormData, CalculationResult, BreakdownItem } from "@/types";

export function pluralize(count: number, word: string): string {
    return `${count} ${word}${count > 1 ? "s" : ""}`;
}

export function formatQuality(quality: string): string {
    return { "4k": "4K", hd: "HD", sd: "SD" }[quality] || "SD";
}

export function getResultsBreakdown(data: AppFormData): {
    mainItems: BreakdownItem[];
    usagePattern: BreakdownItem[];
    totalSmartDevices: number;
} {
    const quality = formatQuality(data.streamingQuality);
    const mainItems: BreakdownItem[] = [];

    // Streaming
    mainItems.push({
        id: "streaming",
        text: `${pluralize(data.simultaneousStreamers, "streaming device")} in ${quality}`,
        show: data.simultaneousStreamers > 0,
    });

    // Video Calls
    mainItems.push({
        id: "videoCalls",
        text: pluralize(data.videoCalls, "video call"),
        show: data.videoCalls > 0,
    });

    // Gaming
    mainItems.push({
        id: "gaming",
        text: `Online gaming with ${pluralize(data.gamers, "player")}`,
        show: data.gaming && data.gamers > 0,
    });

    // Laptops / Desktops — uses AppFormData.laptopsDesktops
    const laptopText =
        data.laptopsDesktops > 0
            ? `${data.laptopsDesktops} laptop${data.laptopsDesktops > 1 ? "s" : ""}/desktop${data.laptopsDesktops > 1 ? "s" : ""} for browsing and work`
            : "Multiple devices for browsing and work";

    mainItems.push({
        id: "laptops",
        text: laptopText,
        show: data.laptopsDesktops > 0 || data.totalPeople > 0,
    });

    // Smart Home Devices
    const totalSmartDevices =
        (data.cameras || 0) +
        (data.smartSpeakers || 0) +
        (data.smartTv || 0) +
        (data.otherSmart || 0);

    mainItems.push({
        id: "smartDevices",
        text: pluralize(totalSmartDevices, "smart home device"),
        show: totalSmartDevices > 0,
    });

    // Cloud Backup
    mainItems.push({
        id: "cloudBackup",
        text: "Backup photos and videos to the cloud",
        show: !!data.cloudBackup,
    });

    // Usage Pattern
    const usagePattern: BreakdownItem[] = [];

    usagePattern.push({
        id: "peakTime",
        text: `Peak times: ${pluralize(data.peakTimeUsers ?? 0, "user")} online`,
        show: (data.peakTimeUsers ?? 0) > 0,
    });

    usagePattern.push({
        id: "standardTime",
        text: `Normal times: ${pluralize(data.standardTimeUsers ?? 0, "user")} online`,
        show: (data.standardTimeUsers ?? 0) > 0,
    });

    return {
        mainItems: mainItems.filter((item) => item.show),
        usagePattern: usagePattern.filter((item) => item.show),
        totalSmartDevices,
    };
}

export function generateResultsText(
    data: AppFormData,
    results: CalculationResult,
): string {
    const { mainItems, usagePattern } = getResultsBreakdown(data);

    const itemsText = mainItems.map((item) => `• ${item.text}`);
    const usagePatternText = usagePattern.map((item) => `• ${item.text}`);

    return [
        `🌐 My Recommended Internet Speed: ${results.recommendedDownload} Mbps`,
        "",
        "📊 Based on my household needs:",
        ...itemsText,
        ...(usagePatternText.length
            ? ["", "⏰ Usage Pattern:", ...usagePatternText]
            : []),
        "",
        "💡 Calculated with ISP Speed Calculator",
    ].join("\n");
}
