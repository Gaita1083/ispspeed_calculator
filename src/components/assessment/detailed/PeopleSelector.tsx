import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { PeopleSelectorProps, PeopleData } from "@/types";

const AGE_GROUPS: { id: keyof PeopleData; label: string; hint: string }[] = [
    { id: "kids",   label: "Kids",   hint: "Ages 0–12"  },
    { id: "teens",  label: "Teens",  hint: "Ages 13–19" },
    { id: "adults", label: "Adults", hint: "Ages 20+"   },
];

export function PeopleSelector({ people, onPeopleChange }: PeopleSelectorProps) {
    const total = people.kids + people.teens + people.adults;

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Users}
                title="Who lives in your home?"
                subtitle="This helps us understand your household's internet needs"
            />

            <div className="space-y-3">
                {AGE_GROUPS.map((group) => {
                    const count = people[group.id];
                    return (
                        <div
                            key={group.id}
                            className="flex items-center justify-between p-4 bg-brand-purple/5 border border-brand-purple/15 rounded-lg"
                        >
                            <div>
                                <p className="font-semibold text-gray-900">{group.label}</p>
                                <p className="text-xs text-muted-foreground">{group.hint}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onPeopleChange(group.id, Math.max(0, count - 1))}
                                    disabled={count === 0}
                                    aria-label={`Decrease ${group.label}`}
                                >
                                    −
                                </Button>
                                <span className="text-xl font-bold text-brand-purple w-8 text-center">
                                    {count}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => onPeopleChange(group.id, count + 1)}
                                    aria-label={`Increase ${group.label}`}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {total > 0 && (
                <p className="text-sm text-center text-muted-foreground">
                    Total household:{" "}
                    <span className="font-semibold text-brand-purple">{total} {total === 1 ? "person" : "people"}</span>
                </p>
            )}
        </div>
    );
}
