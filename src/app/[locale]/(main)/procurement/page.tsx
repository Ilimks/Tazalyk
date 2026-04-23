import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { Procurements } from "@/widgets/Procurement/ui";

export default function Procurement() {
  return (
      <main>
        <BreadcrumbsWidget />
        <Procurements/>
      </main>
  );
}