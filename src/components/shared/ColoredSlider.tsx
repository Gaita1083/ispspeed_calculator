import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import type { ColoredSliderProps } from "@/types";

export function ColoredSlider({ className, min, max, value, onChange, label, hint }: ColoredSliderProps) {
    return (
        <div className={cn('space-y-3', className)}>
            {label && (
                <label className="block text-sm font-semibold text-foreground">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Slider
                        min={min}
                        max={max}
                        step={1}
                        value={[value]}
                        onValueChange={(values) => onChange(values[0])}
                    />
                </div>


                <div className="w-12 text-center">
                    <span className="text-2xl text-primary font-bold">
                        {value}
                    </span>
                </div>                
            </div>

            {hint && (
                    <p className="text-xs text-muted-foreground mt-2">
                        {hint}
                    </p>
                )}
        </div>
    );
}
