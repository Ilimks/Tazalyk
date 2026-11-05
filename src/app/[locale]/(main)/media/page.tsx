import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { MediaPage } from "@/widgets/Media/MediaGallery";

export default function Media() {
    return (
        <main>
            <BreadcrumbsWidget />
            <MediaPage />
        </main>
    );
}