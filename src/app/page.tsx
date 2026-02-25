import { HeroSection } from "@/features/home/ui/HeroSection/HeroSection";
import { NewsHomeSection } from "@/features/home/ui/NewsHomeSection/NewsHomeSection";
import { VideosHomeSection } from "@/features/home/ui/VideosHomeSection/VideosHomeSection";


export default function Home() {
  return (
      <main>
        <HeroSection/>
        <NewsHomeSection/>
        <VideosHomeSection/>
      </main>
  );
}
