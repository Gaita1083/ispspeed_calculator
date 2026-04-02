import type { ISPTier } from '@/types';
import type { QuickActivitiesData } from '@/types';

// ─── Bandwidth Requirements (Mbps) ───────────────────────────────────────────

export const BANDWIDTH_REQUIREMENTS = {
    streaming: {
        sd: 3,   // Standard Definition (480p)
        hd: 5,   // High Definition (1080p)
        '4k': 25, // Ultra High Definition (4K - 2160p)
    },
    videoCall: 3,
    gaming: 5,
    gamingDownload: 25,
    socialMedia: 1,
    browsing: 2,
    smartDevice: 1,
    cloudBackup: 5,
    securityCamera: 2,
} as const;

// ─── ISP Speed Tiers ──────────────────────────────────────────────────────────

export const ISP_TIERS: ISPTier[] = [
    { speed: 25,   label: '25 Mbps', description: 'Basic browsing'   },
    { speed: 50,   label: '50 Mbps', description: 'Light streaming'  },
    { speed: 100,  label: '100 Mbps', description: 'Family use'      },
    { speed: 200,  label: '200 Mbps', description: 'Heavy streaming' },
    { speed: 500,  label: '500 Mbps', description: 'Power users'     },
    { speed: 1000, label: '1 Gbps',   description: 'Future-proof'    },
];

// ─── Calculation Settings ─────────────────────────────────────────────────────

/** 30% safety buffer applied on top of calculated bandwidth */
export const SPEED_BUFFER_MULTIPLIER = 1.3;

// ─── Default Form Values ──────────────────────────────────────────────────────

export const DEFAULT_FORM_VALUES = {
    people: { kids: 0, teens: 0, adults: 2 },
    totalPeople: 3,
    peakTimeUsers: 0,
    standardTimeUsers: 0,
    simultaneousStreamers: 2,
    streamingQuality: 'hd' as const,
    videoCalls: 1,
    gaming: false,
    gamers: 1,
    gameDownloads: false,
    laptopsDesktops: 0,
    cameras: 0,
    smartSpeakers: 0,
    smartTv: 0,
    otherSmart: 0,
    cloudBackup: false,
    smartHome: false,
};

// ─── Quick Assessment ─────────────────────────────────────────────────────────

export const ACTIVITIES_CONFIG: {
    id: keyof QuickActivitiesData;
    label: string;
    quality: boolean;
}[] = [
    { id: 'streaming',   label: 'Stream movies/shows (Netflix, YouTube and more)',           quality: true  },
    { id: 'videoCalls',  label: 'Video calls (Zoom, Teams)',                                 quality: false },
    { id: 'gaming',      label: 'Online gaming',                                             quality: false },
    { id: 'cloudBackup', label: 'Upload photos/videos to cloud',                             quality: false },
    { id: 'smartHome',   label: 'Smart home devices (cameras, speakers, watches and more)',  quality: false },
];

/** Streaming quality options used in Quick and Detailed assessments */
export const STREAMING_QUALITIES: {
    id: 'sd' | 'hd' | '4k';
    label: string;
    description: string;
}[] = [
    { id: 'sd', label: 'Standard (480p)',      description: 'Good for one device, lower data usage'    },
    { id: 'hd', label: 'High Definition (1080p)', description: 'Sharp picture, great for most households' },
    { id: '4k', label: 'Ultra HD (2160p)',     description: 'Cinema quality, requires fast internet'   },
];

/** @deprecated Typo — use STREAMING_QUALITIES */
export const STREAMING_QUALITIIES = STREAMING_QUALITIES;
