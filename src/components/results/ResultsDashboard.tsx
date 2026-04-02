import { useState } from "react";
import {
    Check, CheckCircle, XCircle, BarChart2, Zap,
    Lightbulb, Info, Download, Share2, RotateCcw,
    FileText, Mail, MessageCircle, Copy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ISP_TIERS } from "@/utils/constants";
import { BREAKDOWN_CATEGORY_ICONS, BREAKDOWN_CATEGORY_LABELS, HELPFUL_TIPS } from "@/utils/uiHelpers";
import { getSpeedMessage, isTierSufficient } from "@/utils/calculator";
import { getResultsBreakdown, generateResultsText } from "@/utils/sharedHelpers";
import type { ResultsDashboardProps, BandwidthBreakdown } from "@/types";

export function ResultsDashboard({ data, results, onReset }: ResultsDashboardProps) {
    const [copyLabel, setCopyLabel] = useState("Copy Text");

    const { mainItems, usagePattern } = getResultsBreakdown(data);
    const resultsText = generateResultsText(data, results);

    // ── Share / Save actions ─────────────────────────────────────────────────

    const handlePrint = () => window.print();

    const handleWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(resultsText)}`, "_blank");
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("My Internet Speed Recommendation");
        const body = encodeURIComponent(resultsText);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(resultsText);
        } catch {
            // Fallback for browsers without clipboard API
            const ta = document.createElement("textarea");
            ta.value = resultsText;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand("copy"); } catch { /* silent */ }
            document.body.removeChild(ta);
        }
        setCopyLabel("Copied!");
        setTimeout(() => setCopyLabel("Copy Text"), 2000);
    };

    // ── Breakdown rows (skip zero values) ────────────────────────────────────

    const breakdownEntries = (
        Object.entries(results.breakdown) as [keyof BandwidthBreakdown, number][]
    ).filter(([, v]) => v > 0);

    return (
        <div className="min-h-screen bg-linear-to-br from-brand-bg to-brand-purple/10 p-4 py-8 print:bg-white print:p-0">
            <div className="max-w-3xl mx-auto space-y-6" id="results-content">

                {/* ── 1. Success header ───────────────────────────────────── */}
                <div className="text-center mb-2">
                    <div className="inline-block p-3 bg-brand-teal/10 rounded-full mb-4">
                        <Check className="text-brand-teal" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Your Perfect Internet Speed
                    </h1>
                    <p className="text-muted-foreground">Based on your household's needs</p>
                </div>

                {/* ── 2. Main speed card ──────────────────────────────────── */}
                <Card className="bg-linear-to-br from-brand-purple to-brand-purple/80 text-white text-center border-0">
                    <CardContent className="pt-6 pb-6">
                        <div className="text-7xl font-bold mb-1 tracking-tight">
                            {results.recommendedDownload}
                        </div>
                        <div className="text-2xl opacity-80 mb-3">Mbps download</div>
                        {results.recommendedUpload > 0 && (
                            <div className="text-sm opacity-70 mb-3">
                                +{results.recommendedUpload} Mbps upload
                            </div>
                        )}
                        <div className="text-lg font-medium opacity-90">
                            {getSpeedMessage(results.recommendedDownload)}
                        </div>
                        <div className="text-sm opacity-60 mt-1">Recommended minimum speed</div>
                    </CardContent>
                </Card>

                {/* ── 3. Speed breakdown ──────────────────────────────────── */}
                <Card>
                    <CardContent className="pt-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <BarChart2 className="text-brand-purple" size={20} />
                            Here's why we recommend this
                        </h3>
                        <div className="space-y-3">
                            {breakdownEntries.map(([key, value]) => {
                                const Icon = BREAKDOWN_CATEGORY_ICONS[key];
                                const pct = Math.min(100, Math.round((value / results.recommendedDownload) * 100));
                                return (
                                    <div key={key}>
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Icon className="text-brand-orange" size={16} />
                                                {BREAKDOWN_CATEGORY_LABELS[key]}
                                            </div>
                                            <span className="text-sm font-bold text-brand-purple">
                                                {value} Mbps
                                            </span>
                                        </div>
                                        <Progress value={pct} className="h-1.5" />
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* ── 4. ISP Tier comparison ──────────────────────────────── */}
                <Card>
                    <CardContent className="pt-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Zap className="text-brand-orange" size={20} />
                            Compare Internet Plans
                        </h3>
                        <div className="grid gap-3">
                            {ISP_TIERS.map((tier) => {
                                const isRecommended = tier.speed === results.tier.speed;
                                const sufficient = isTierSufficient(tier.speed, results.recommendedDownload);
                                return (
                                    <div
                                        key={tier.speed}
                                        className={cn(
                                            "p-4 rounded-lg border-2 transition-all",
                                            isRecommended
                                                ? "border-brand-purple bg-brand-purple/5"
                                                : sufficient
                                                ? "border-brand-teal/30 bg-brand-teal/5"
                                                : "border-border bg-muted/30 opacity-50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-bold text-gray-900 flex items-center gap-2">
                                                    {tier.label}
                                                    {isRecommended && (
                                                        <span className="text-xs bg-brand-purple text-white px-2 py-0.5 rounded-full">
                                                            RECOMMENDED
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {tier.description}
                                                </div>
                                            </div>
                                            {sufficient ? (
                                                <CheckCircle className="text-brand-teal shrink-0" size={22} />
                                            ) : (
                                                <XCircle className="text-destructive shrink-0" size={22} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* ── 5. What this means for you ──────────────────────────── */}
                <Card className="border-brand-teal/30 bg-brand-teal/5">
                    <CardContent className="pt-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Info className="text-brand-teal" size={20} />
                            What this means for you
                        </h3>
                        <p className="text-gray-700 mb-3">
                            With <strong>{results.recommendedDownload} Mbps</strong>, your household can comfortably:
                        </p>
                        <ul className="space-y-2">
                            {mainItems.map((item) => (
                                <li key={item.id} className="flex items-start gap-2 text-gray-700">
                                    <CheckCircle className="text-brand-teal shrink-0 mt-0.5" size={16} />
                                    {item.text}
                                </li>
                            ))}
                            <li className="flex items-start gap-2 font-semibold text-brand-purple">
                                <CheckCircle className="text-brand-purple shrink-0 mt-0.5" size={16} />
                                All at the same time without slowdowns!
                            </li>
                        </ul>

                        {usagePattern.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-brand-teal/20">
                                <p className="font-semibold text-gray-900 mb-2">Usage Pattern:</p>
                                <ul className="space-y-1">
                                    {usagePattern.map((item) => (
                                        <li key={item.id} className="text-sm text-gray-700">
                                            • {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ── 6. Action buttons ────────────────────────────────────── */}
                <div className="flex gap-3 justify-center flex-wrap print:hidden">
                    {/* Save */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                <Download size={18} />
                                Save Results
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={handlePrint}>
                                <FileText size={16} className="text-brand-purple" />
                                Save as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handlePrint}>
                                <Download size={16} className="text-brand-teal" />
                                Print
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Share */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Share2 size={18} />
                                Share Results
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuItem onClick={handleWhatsApp}>
                                <MessageCircle size={16} className="text-green-600" />
                                WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleEmail}>
                                <Mail size={16} className="text-brand-purple" />
                                Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleCopy}>
                                <Copy size={16} className="text-brand-teal" />
                                {copyLabel}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Reset */}
                    <Button variant="outline" onClick={onReset}>
                        <RotateCcw size={18} />
                        Start Over
                    </Button>
                </div>

                {/* ── 7. Helpful tips ──────────────────────────────────────── */}
                <Card className="border-brand-orange/20 bg-brand-orange/5 print:hidden">
                    <CardContent className="pt-6">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Lightbulb className="text-brand-orange" size={18} />
                            Helpful Tips
                        </h4>
                        <ul className="space-y-3">
                            {HELPFUL_TIPS.map((tip) => {
                                const Icon = tip.icon;
                                return (
                                    <li key={tip.title} className="flex items-start gap-3">
                                        <Icon className="text-brand-orange shrink-0 mt-0.5" size={16} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{tip.title}</p>
                                            <p className="text-xs text-muted-foreground">{tip.body}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
