import { NewsPage } from "@/widgets/News/ui/NewsPage/NewsPage";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";

export default function News() {
  return (
      <main>
        <BreadcrumbsWidget />
        <NewsPage/>
      </main>
  );
}