
import { HeroHomeSection } from "@/widgets/Hero";
import { DirectorHomeSection } from "@/widgets/Director";
import { NewsHomeSection } from "@/widgets/NewsHome";
import { AppealsCenterSection } from "@/widgets/AppealsCenter";
import { VideosPhotoHomeSection } from "@/widgets/VideosPhotoHome";

export default function Home() {
  return (
    <main>
      <HeroHomeSection/>
      <DirectorHomeSection />
      <NewsHomeSection/>
      <AppealsCenterSection/>
      <VideosPhotoHomeSection/>
    </main>
  );
}