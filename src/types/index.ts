import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type StreamingQuality = '4k' | 'hd' | 'sd';

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
    other: number;  // Buffer/safety margin
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

export interface ResultsDisplayProps {
    data: ShareData;
    results: CalculationResult;
}

export interface ColoredSliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    hint?: string;
    className?: string;
}

export interface BreakdownItem {
    id: string;
    text: string;
    show: boolean;
}

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

export interface QuickHouseholdProps {
    data?: {
        totalPeople?: number;
        peakTimeUsers?: number;
        standardTimeUsers?: number;
        laptopsDesktops?: number;
    };
    onChange: (field: string, value: number) => void;
}

export interface AssessmentPageConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>;
    title: string;
}

export interface QuickActivitiesData {
    streaming?: boolean;
    videoCalls?: boolean;
    gaming?:boolean;
    cloudBackup?: boolean;
    smartHome?:boolean;
    streamingQuality?: StreamingQuality;
}

export interface QuickActivitiesProps {
    data?: QuickActivitiesData;
    onChange: (field: string, value: boolean | string) => void;
}

export interface SectionHeaderProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}