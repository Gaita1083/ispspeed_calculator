// Calculations for ISP speed tests
import { BANDWIDTH_REQUIREMENTS, ISP_TIERS, SPEED_BUFFER_MULTIPLIER } from './constants';
import type { CalculationData, CalculationResult } from '@/types';

export function calculateSpeed(data: CalculationData): CalculationResult {
  const { streaming, videoCall, gaming, gamingDownload, browsing, smartDevice, securityCamera, cloudBackup } = BANDWIDTH_REQUIREMENTS;
  
// Calculate download bandwidth
  const totalDownload = 
    streaming[data.streamingQuality] * data.simultaneousStreamers +
    videoCall * data.videoCalls +
    (data.gaming ? gaming * data.gamers + (data.gameDownloads ? gamingDownload : 0) : 0) +
    browsing * data.people +
    smartDevice * data.smartDevice;
  
// Calculate upload bandwidth
  const totalUpload = 
    videoCall * data.videoCalls +
    securityCamera * data.cameras +
    (data.cloudBackup ? cloudBackup : 0);
  
// Apply buffer and round up
  const recommendedDownload = Math.ceil(totalDownload * SPEED_BUFFER_MULTIPLIER);
  const recommendedUpload = Math.ceil(totalUpload * SPEED_BUFFER_MULTIPLIER);
  
  return {
    recommendedDownload,
    recommendedUpload,
    breakdown: {
        streaming: streaming[data.streamingQuality] * data.simultaneousStreamers,
        videoCalls: videoCall * data.videoCalls,
        gaming: data.gaming ? gaming * data.gamers : 0,
        browsing: browsing * data.people,
        smartHome: smartDevice * data.smartDevice,
        other: recommendedDownload - totalDownload
    },
    tier: ISP_TIERS.find(t => t.speed >= recommendedDownload) || ISP_TIERS[ISP_TIERS.length - 1]
  };
}

export function getSpeedMessage(speed: number): string {
  if (speed < 50) return 'Perfect for light use';
  if (speed < 100) return 'Great for most families';
  if (speed < 300) return 'Excellent for heavy users';
  return 'Top-tier, future-proof speed';
}

export function isTierSufficient(tierSpeed: number, recommendedSpeed: number): boolean {
  return tierSpeed >= recommendedSpeed;
}

export function getSpeedIndicator(
  actualSpeed: number, 
  recommendedSpeed: number
): 'green' | 'yellow' | 'red' {
  if (actualSpeed >= recommendedSpeed * 1.2) return 'green';  // 20% above needed
  if (actualSpeed >= recommendedSpeed) return 'yellow';        // Just enough
  return 'red';                                                // Below recommended
}