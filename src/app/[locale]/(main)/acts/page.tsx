import { LocalActsList } from "@/widgets/Acts/LocalActsList";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";

export default function LocalActsPage() {
  return (
    <main>
      <BreadcrumbsWidget />
      <LocalActsList />
    </main>
  );
}
