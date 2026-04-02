import { QuickHousehold } from "@/components/assessment/quick/QuickHousehold";
import { QuickActivities } from "@/components/assessment/quick/QuickActivities";
import type { AssessmentPageConfig } from "@/types";

export const quickAssessmentPages: AssessmentPageConfig[] = [
    {
        component: QuickHousehold,
        title: "Quick Setup",
    },
    {
        component: QuickActivities,
        title: "Your Activities",
    }
];

export const detailedAssessmentPages: AssessmentPageConfig[] = [
    // Add detailed assessment components here as you create them
];