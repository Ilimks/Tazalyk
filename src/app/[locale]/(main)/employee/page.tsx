import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { EmployeePage } from "@/widgets/Employee/ui/EmployeePage";


export default function Employee() {
    return (
        <main>
            <BreadcrumbsWidget />
            <EmployeePage />
        </main>
    );
}