import { Progress } from '@/components/ui/progress';
import type { ProgressBarProps } from '@/types';
export function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full mb-6">
            <Progress
                value={percentage}
                className="h-2 mb-2"
            />

            <div className="text-sm text-muted-foreground text-center">
                Step {current} of {total}
            </div>
        </div>
    );
}