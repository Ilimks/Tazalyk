import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { ContactsInfoSection } from "@/widgets/Contacts";
import { ContactsMapSection } from "@/widgets/Contacts";
import { ContactsBottomSection } from "@/widgets/Contacts";


export default function Contacts() {
  return (
      <main>
        <BreadcrumbsWidget />
        <ContactsInfoSection/>
        <ContactsMapSection/>
        <ContactsBottomSection/>
      </main>
  );
}