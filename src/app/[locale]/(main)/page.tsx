
import { HeroHomeSection } from "@/widgets/Hero";
import { DirectorHomeSection } from "@/widgets/Director";
import { NewsHomeSection } from "@/widgets/NewsHome";
import { ShopHomeSection } from "@/widgets/ShopHome";
import { AppealsCenterSection } from "@/widgets/AppealsCenter";
import { VideosPhotoHomeSection } from "@/widgets/VideosPhotoHome";
import { PersonalSection } from "@/widgets/Personal";
import { WorkSection } from "@/widgets/Work";

export default function Home() {
  return (
    <main>
      <HeroHomeSection/>
      <PersonalSection />
      <AppealsCenterSection/>
      <WorkSection />
      <NewsHomeSection/>
      <ShopHomeSection/>
      <VideosPhotoHomeSection/>
      <DirectorHomeSection />
    </main>
  );
}