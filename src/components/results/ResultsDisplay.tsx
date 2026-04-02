import { Wifi, ChartNoAxesCombined, Clock, Lightbulb } from 'lucide-react';
import type { ResultsDisplayProps } from '@/types';
import { getResultsBreakdown } from '@/utils/sharedHelpers';

export function ResultsDisplay({ data, results }: ResultsDisplayProps) {
    const { mainItems, usagePattern } = getResultsBreakdown(data);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5" />
                <h3 className="font-semibold">
                My Recommended Internet Speed: {results.recommendedDownload} Mbps
                </h3>
            </div>

        <div>
            <div className="flex items-center gap-2 mb-2">
            <ChartNoAxesCombined className="w-5 h-5" />
            <span className="font-medium">Based on my household needs:</span>
        </div>
        <ul className="ml-7 space-y-1">
            {mainItems.map(item => (
            <li key={item.id}>✓ {item.text}</li>
            ))}
            <li className="font-semibold">✓ All at the same time without slowdowns!</li>
        </ul>
    </div>

        {usagePattern.length > 0 && (
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Usage Pattern:</span>
                </div>
                <ul className="ml-7 space-y-1">
                {usagePattern.map(item => (
                    <li key={item.id}>• {item.text}</li>
                    ))}
                </ul>
            </div>
    )}

            <div className="flex items-center gap-2 mt-4">
            <Lightbulb className="w-5 h-5" />
                <span className="text-sm text-muted-foreground">
                    Calculated with ISP Speed Calculator
                </span>
            </div>
        </div>
    );
}
