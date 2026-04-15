
import { HeroHomeSection } from "@/widgets/Hero";
import { DirectorHomeSection } from "@/widgets/Director";
import { NewsHomeSection } from "@/widgets/NewsHome";
import { AppealsCenterSection } from "@/widgets/AppealsCenter";
import { VideosPhotoHomeSection } from "@/widgets/VideosPhotoHome";

export const revalidate = 300;

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