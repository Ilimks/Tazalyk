import React from 'react';
import { Video } from '../../../../../../entities/media/model/types';
import { VideoCard } from '@/widgets/VideosCard/ui/VideosCard';
import { EmptyState } from '@/shared/ui/EmptyState';
import styles from './VideosSection.module.scss';

interface VideosSectionProps {
    videos: Video[];
    onVideoClick: (video: Video) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos, onVideoClick }) => {
    if (videos.length === 0) {
        return (
            <EmptyState
                title="Видео пока нет"
                description="Следите за обновлениями, скоро появятся новые видео"
                icon={
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                    </svg>
                }
            />
        );
    }

    return (
        <div className={styles.videosGrid}>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video}/>
            ))}
        </div>
    );
};