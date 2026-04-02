import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import type { ColoredSliderProps } from "@/types";

export function ColoredSlider({ className, min, max, value, onChange, label, hint }: ColoredSliderProps) {
    const percentage = (( value - min) / (max - min)) * 100;

    return (
        <div className={cn('space-y-3', className)}>
            {label && (
                <label className="block text-sm font-semibold text-foreground">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <Slider
                        min={min}
                        max={max}
                        step={1}
                        value={[value]}
                        onValueChange={(values) => onChange(values[0])}
                        className="relative"
                        style={{
                            ['--slider-fill' as string]: `${percentage}%`,
                        }}
                    />
                    <div className="absolute inset-0 h-2 rounded-full pointer-events-none top-1/2 -translate-y-1/2" 
                    style={{
                        background: `linear-gradient(to right, 
                        hsl(var(--primary)) 0%,
                        hsl(var(--primary)) ${percentage}%,
                        hsl(var(--muted)) ${percentage}%,
                        hsl(var(--muted)) 100%)`,
                    }} 
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
