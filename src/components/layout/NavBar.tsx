import bandioUrl from '@/assets/bandio.svg';
import type { NavBarProps } from '@/types';


export function NavBar ({ onLogoClick }: NavBarProps) {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <button 
                    onClick={onLogoClick}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                    <img src={bandioUrl} alt="Bandio Logo" className="h-10 w-auto max-w-50 object-contain" />
                </button>
                <div className="text-sm text-gray-600">
                    <span className="hidden sm:inline">Driven by </span>
                    <span className="font-semibold text-green-700">AI Insights</span>
                </div>
            </div>
        </div>
    )
}               