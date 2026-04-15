import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ProcurementTableSection } from "@/widgets/Procurement/ui";
import { ProcurementFilesSection } from "@/widgets/Procurement/ui";


export default function Procurement() {
  return (
      <main>
        <BreadcrumbsWidget />
        <ProcurementTableSection/>
        <ProcurementFilesSection/>
      </main>
  );
}