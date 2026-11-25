
import { HeroHomeSection } from "@/widgets/Hero";
import { DirectorHomeSection } from "@/widgets/Director";
import { NewsHomeSection } from "@/widgets/NewsHome";
import { ShopHomeSection } from "@/widgets/ShopHome";
import { AppealsCenterSection } from "@/widgets/AppealsCenter";
import { VideosPhotoHomeSection } from "@/widgets/VideosPhotoHome";
import { PersonalSection } from "@/widgets/Personal";

export default function Home() {
  return (
    <main>
      <HeroHomeSection/>
      {/* сначала то, за чем приходят жители: действия, телефон, новости; о предприятии — ниже */}
      <PersonalSection />
      <AppealsCenterSection/>
      <NewsHomeSection/>
      {/* магазин контейнеров; без товаров раздел не показывается */}
      <ShopHomeSection/>
      <VideosPhotoHomeSection/>
      <DirectorHomeSection />
    </main>
  );
}