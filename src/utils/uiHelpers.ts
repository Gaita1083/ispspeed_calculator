import {
    Tv,
    Video,
    Gamepad2,
    Globe,
    Home,
    Shield,
    RefreshCw,
    Cable,
    Wifi,
    Activity,
    TrendingUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { BandwidthBreakdown } from '@/types';

// ─── Breakdown category icons ─────────────────────────────────────────────────

/** Maps each BandwidthBreakdown key to a Lucide icon for the results dashboard */
export const BREAKDOWN_CATEGORY_ICONS: Record<keyof BandwidthBreakdown, LucideIcon> = {
    streaming:  Tv,
    videoCalls: Video,
    gaming:     Gamepad2,
    browsing:   Globe,
    smartHome:  Home,
    other:      Shield,   // Safety buffer
};

/** Human-readable labels for each breakdown category */
export const BREAKDOWN_CATEGORY_LABELS: Record<keyof BandwidthBreakdown, string> = {
    streaming:  'Streaming',
    videoCalls: 'Video Calls',
    gaming:     'Gaming',
    browsing:   'Browsing',
    smartHome:  'Smart Devices',
    other:      'Safety Buffer',
};

// ─── Helpful tips ─────────────────────────────────────────────────────────────

export interface HelpfulTip {
    icon: LucideIcon;
    title: string;
    body: string;
}

export const HELPFUL_TIPS: HelpfulTip[] = [
    {
        icon: RefreshCw,
        title: 'Restart your router monthly',
        body: 'A simple reboot clears the cache and can noticeably improve speeds.',
    },
    {
        icon: Cable,
        title: 'Use wired connections for gaming & calls',
        body: 'An ethernet cable gives you lower latency and more stable speeds than Wi-Fi.',
    },
    {
        icon: Wifi,
        title: 'Position your router centrally',
        body: 'Place it in an open, central spot — away from walls, microwaves, and other electronics.',
    },
    {
        icon: Activity,
        title: 'Test your speed during peak hours',
        body: 'Run a speed test in the evening (6–10 PM) to see real-world performance when it matters most.',
    },
    {
        icon: TrendingUp,
        title: 'Upgrade if you consistently hit 80%+ usage',
        body: 'If your speeds regularly max out, consider going one tier higher to stay ahead of demand.',
    },
];
