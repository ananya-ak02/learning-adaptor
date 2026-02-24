'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Use dynamic import to disable SSR for the canvas
const RoadmapCanvas = dynamic(
    () => import('@/components/canvas/RoadmapCanvas'),
    { 
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-screen">Initializing Canvas...</div>
    }
);

export default function RoadmapPage() {
    const params = useParams();
    const rawTopic = params?.topic;

    if (!rawTopic) {
        return <div className="p-10">Loading topic data...</div>;
    }

    const topicName = Array.isArray(rawTopic) ? rawTopic[0] : rawTopic;

    return (
        <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
            <RoadmapCanvas topic={decodeURIComponent(topicName)} />
        </main>
    );
}
