'use client';

import { useParams } from 'next/navigation';
import RoadmapCanvas from '@/components/canvas/RoadmapCanvas';

export default function RoadmapPage() {
    const params = useParams();
    const rawTopic = params.topic;

    if (!rawTopic) {
        return <div>Loading...</div>; // Could be a better error/loading state
    }

    const topicName = Array.isArray(rawTopic) ? rawTopic[0] : rawTopic;

    return (
        <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <RoadmapCanvas topic={topicName} />
        </main>
    );
}
