import { NextResponse } from 'next/server';
import { generateMockRoadmap } from '../mockData';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');

    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const roadmapData = generateMockRoadmap(topic);

    return NextResponse.json(roadmapData);
}
