import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { MediaGallery } from "@/widgets/Media/MediaGallery";

export default function Media() {
    return (
        <main>
            <BreadcrumbsWidget />
            <MediaGallery />
        </main>
    );
}