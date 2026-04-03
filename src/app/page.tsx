import { HeroSection } from "@/widgets/Hero";
import { NewsHomeSection } from "@/features/home/ui/NewsHomeSection/NewsHomeSection";
import { VideosPhotoHomeSection } from "@/features/home/ui/VideosPhotoHomeSection/VideosPhotoHomeSection";
import { DirectorHomeWidget } from "@/widgets/Director";


export default function Home() {
  return (
      <main>
        <HeroSection/>
        <DirectorHomeWidget />
        <NewsHomeSection/>
        <VideosPhotoHomeSection/>
      </main>
  );
}
