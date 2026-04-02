import type { SectionHeaderProps } from "@/types";

export function SectionHeader ({ icon: Icon, title, subtitle }: SectionHeaderProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <Icon className="text-green-600 mr-2"/>
                {title}
            </h2>
            <p className="text-gray-600">{subtitle}</p>
        </div>
    );
}