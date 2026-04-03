import { Progress } from '@/components/ui/progress';
import type { ProgressBarProps } from '@/types';

export function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = (current / total) * 100;

    return (
        <Progress value={percentage} className="h-2.5 rounded-full" />
    );
}