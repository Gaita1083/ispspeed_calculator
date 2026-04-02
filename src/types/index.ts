import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

// ─── Primitives ───────────────────────────────────────────────────────────────

export type StreamingQuality = '4k' | 'hd' | 'sd';

// ─── People ───────────────────────────────────────────────────────────────────

export interface PeopleData {
    kids: number;
    teens: number;
    adults: number;
}

// ─── Canonical form state (single source of truth for App.tsx) ────────────────

export interface AppFormData {
    // Detailed mode — age groups
    people: PeopleData;
    // Quick mode slider / derived sum for detailed mode
    totalPeople: number;
    // Usage patterns
    peakTimeUsers: number;
    standardTimeUsers: number;
    // Streaming
    simultaneousStreamers: number;
    streamingQuality: StreamingQuality;
    // Video calls (numeric: 0 = none, 1+ = concurrent calls)
    videoCalls: number;
    // Gaming
    gaming: boolean;
    gamers: number;
    gameDownloads: boolean;
    // Devices
    laptopsDesktops: number;
    cameras: number;
    smartSpeakers: number;
    smartTv: number;
    otherSmart: number;
    cloudBackup: boolean;
    // Quick mode only: smart home checkbox → maps to otherSmart in bridge
    smartHome?: boolean;
}

// ─── Calculation ──────────────────────────────────────────────────────────────

export interface CalculationData {
    people: number;
    simultaneousStreamers: number;
    streamingQuality: StreamingQuality;
    videoCalls: number;
    gaming: boolean;
    gamers: number;
    gameDownloads: boolean;
    smartDevice: number;
    cameras: number;
    cloudBackup: boolean;
}

export interface BandwidthBreakdown {
    streaming: number;
    videoCalls: number;
    gaming: number;
    browsing: number;
    smartHome: number;
    other: number; // Safety buffer
}

export interface ISPTier {
    speed: number;
    label: string;
    description: string;
}

export interface CalculationResult {
    recommendedDownload: number;
    recommendedUpload: number;
    breakdown: BandwidthBreakdown;
    tier: ISPTier;
}

// ─── Shared / legacy ─────────────────────────────────────────────────────────

/** @deprecated Use AppFormData instead */
export interface ShareData {
    simultaneousStreamers: number;
    streamingQuality: StreamingQuality;
    videoCalls: number;
    gaming: boolean;
    gamers: number;
    computers?: number;
    cameras?: number;
    smartSpeakers?: number;
    smartTv?: number;
    otherSmart?: number;
    cloudBackup?: boolean;
    peakTimeUsers?: number;
    standardTimeUsers?: number;
    people?: number;
}

export interface BreakdownItem {
    id: string;
    text: string;
    show: boolean;
}

// ─── Layout component props ───────────────────────────────────────────────────

export interface NavBarProps {
    onLogoClick?: () => void;
}

export interface ProgressBarProps {
    current: number;
    total: number;
}

export interface HeroSectionProps {
    onStart: (mode: 'quick' | 'detailed') => void;
}

export interface SectionHeaderProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

// ─── Shared component props ───────────────────────────────────────────────────

export interface ColoredSliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    hint?: string;
    className?: string;
}

// ─── Assessment page registry ────────────────────────────────────────────────

export interface AssessmentPageConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>;
    title: string;
}

// ─── Quick assessment props ───────────────────────────────────────────────────

export interface QuickActivitiesData {
    streaming?: boolean;
    videoCalls?: boolean;
    gaming?: boolean;
    cloudBackup?: boolean;
    smartHome?: boolean;
    streamingQuality?: StreamingQuality;
}

export interface QuickActivitiesProps {
    data?: QuickActivitiesData;
    onChange: (field: string, value: boolean | string) => void;
}

export interface QuickHouseholdProps {
    data?: {
        totalPeople?: number;
        peakTimeUsers?: number;
        standardTimeUsers?: number;
        laptopsDesktops?: number;
    };
    onChange: (field: string, value: number) => void;
}

// ─── Detailed assessment props ────────────────────────────────────────────────

export interface PeopleSelectorProps {
    people: PeopleData;
    onPeopleChange: (group: keyof PeopleData, value: number) => void;
}

export interface UsagePatternsProps {
    people: PeopleData;
    peakTimeUsers: number;
    standardTimeUsers: number;
    onChange: (field: string, value: number) => void;
}

export interface StreamingActivitiesProps {
    simultaneousStreamers: number;
    streamingQuality: StreamingQuality;
    onChange: (field: string, value: number | string) => void;
}

export interface VideoCallsWorkProps {
    videoCalls: number;
    onChange: (field: string, value: number) => void;
}

export interface GamingActivitiesProps {
    gaming: boolean;
    gamers: number;
    gameDownloads: boolean;
    onChange: (field: string, value: number | boolean) => void;
}

export interface SmartHomeDevicesProps {
    laptopsDesktops: number;
    cameras: number;
    smartSpeakers: number;
    smartTv: number;
    otherSmart: number;
    cloudBackup: boolean;
    onChange: (field: string, value: number | boolean) => void;
}

// ─── Results props ────────────────────────────────────────────────────────────

/** @deprecated Replaced by ResultsDashboardProps */
export interface ResultsDisplayProps {
    data: ShareData;
    results: CalculationResult;
}

export interface ResultsDashboardProps {
    data: AppFormData;
    results: CalculationResult;
    onReset: () => void;
}
