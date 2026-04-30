import { AttendancePage } from "@/widgets/Attendance/ui";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";

export default function Attendance() {
    return (
        <main>
            <BreadcrumbsWidget />
            <AttendancePage />
        </main>
    );
}