import { QuickHousehold } from "@/components/assessment/quick/QuickHousehold";
import { QuickActivities } from "@/components/assessment/quick/QuickActivities";
import { PeopleSelector } from "@/components/assessment/detailed/PeopleSelector";
import { UsagePatterns } from "@/components/assessment/detailed/UsagePatterns";
import { StreamingActivities } from "@/components/assessment/detailed/StreamingActivities";
import { VideoCallsWork } from "@/components/assessment/detailed/VideoCallsWork";
import { GamingActivities } from "@/components/assessment/detailed/GamingActivities";
import { SmartHomeDevices } from "@/components/assessment/detailed/SmartHomeDevices";
import type { AssessmentPageConfig } from "@/types";

export const quickAssessmentPages: AssessmentPageConfig[] = [
    { component: QuickHousehold,  title: "Quick Setup"     },
    { component: QuickActivities, title: "Your Activities" },
];

export const detailedAssessmentPages: AssessmentPageConfig[] = [
    { component: PeopleSelector,      title: "Your Household" },
    { component: UsagePatterns,       title: "Usage Patterns" },
    { component: StreamingActivities, title: "Streaming"      },
    { component: VideoCallsWork,      title: "Video Calls"    },
    { component: GamingActivities,    title: "Gaming"         },
    { component: SmartHomeDevices,    title: "Smart Home"     },
];
