import { NextResponse } from 'next/server';
import { generateMockRoadmap } from '../mockData';

/**
 * Fetches the first embeddable YouTube video ID for a given search query.
 * Returns null if no result is found or the API key is missing.
 */
async function getYouTubeId(query) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        console.warn('YOUTUBE_API_KEY is not set – skipping video lookup.');
        return null;
    }

    try {
        const params = new URLSearchParams({
            part: 'snippet',
            q: query,
            type: 'video',
            videoEmbeddable: 'true',
            maxResults: '1',
            key: apiKey,
        });

        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
            { next: { revalidate: 86400 } } // cache for 24 h to stay within quota
        );

        if (!res.ok) {
            console.error('YouTube API error:', res.status, await res.text());
            return null;
        }

        const json = await res.json();
        const firstItem = json.items?.[0];
        return firstItem?.id?.videoId ?? null;
    } catch (err) {
        console.error('YouTube fetch failed:', err);
        return null;
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');

    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const roadmapData = generateMockRoadmap(topic);

    // Enrich every node with a real YouTube videoId (in parallel)
    const enrichedNodes = await Promise.all(
        roadmapData.nodes.map(async (node) => {
            const videoId = await getYouTubeId(`${node.data.title} tutorial`);
            return {
                ...node,
                data: { ...node.data, videoId },
            };
        })
    );

    return NextResponse.json({ nodes: enrichedNodes, edges: roadmapData.edges });
}
