import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ContactsPage } from "@/widgets/Contacts/ui";

export default function Contacts() {
  return (
      <main>
        <BreadcrumbsWidget />
        <ContactsPage/>
      </main>
  );
}