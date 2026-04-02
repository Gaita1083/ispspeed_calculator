import type { ISPTier } from '@/types';
import type { QuickActivitiesData } from '@/types';

// Bandwidth Calculator Requirements
export const BANDWIDTH_REQUIREMENTS = {
    streaming: {
        sd: 3, // Standard Definition (480p)
        hd: 5, // High Definition ( 1080p )
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

// ISP Speed Tiers (in Mbps)
export const ISP_TIERS: ISPTier[] = [
{ 
    speed: 25, 
    label: '25 Mbps', 
    description: 'Basic browsing' 
  },
  { 
    speed: 50, 
    label: '50 Mbps', 
    description: 'Light streaming' 
  },
  { 
    speed: 100, 
    label: '100 Mbps', 
    description: 'Family use' 
  },
  { 
    speed: 200, 
    label: '200 Mbps', 
    description: 'Heavy streaming' 
  },
  { 
    speed: 500, 
    label: '500 Mbps', 
    description: 'Power users' 
  },
  { 
    speed: 1000, 
    label: '1 Gbps', 
    description: 'Future-proof' 
  }
];

/**  
    Calculation Settings 
    Safety buffer percentage added to calculated speed 1.3 = 30% buffer for reliability. 
**/
export const SPEED_BUFFER_MULTIPLIER = 1.3;

export const DEFAULT_FORM_VALUES = {
    people: { kids: 0, teens: 0, adults: 2 },
    totalPeople: 3,
    activeUsers: 2,
    peakTimeUsers: 0,
    standardTimeUsers: 0,
    laptopsDesktops: 0,
    simultaneousStreamers: 2,
    streamingQuality: 'hd' as const,
    videoCalls: 1,
    gaming: false,
    gamers: 1,
    gameDownloads: false,
    cameras: 0,
    smartSpeakers: 0,
    smartTv: 0,
    otherSmart: 0,
    cloudBackup: false
};

export const ACTIVITIES_CONFIG: {
  id: keyof QuickActivitiesData;
  label: string;
  quality: boolean
}[] =[
  {id: 'streaming', label: 'Stream movies/shows (Netflix, YouTube and more)', quality: true},
  {id: 'videoCalls', label: 'Video calls (Zoom, Teams)', quality: false},
  {id: 'gaming', label: 'Online gaming', quality: false},
  {id: 'cloudBackup', label: 'Upload photos/videos to cloud', quality: false},
  {id: 'smartHome', label: 'Smart home devices (cameras, speakers, watches and more)', quality: false},
];

export const STREAMING_QUALITIIES = [
  {id: 'sd', label: 'Standard (480p)' },
  {id: 'hd', label: 'High Definition (1080p)' },
  {id: '4k', label: 'Ultra HD (2160p)'},
];