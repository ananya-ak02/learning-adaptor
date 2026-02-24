export const generateMockRoadmap = (topic) => {
    const t = topic.toLowerCase();

    // Default nodes
    let nodes = [
        {
            id: '1',
            type: 'custom',
            position: { x: 250, y: 50 },
            data: { type: 'topic', title: `Introduction to ${topic}`, description: 'Core concepts and fundamentals.' },
        },
        {
            id: '2',
            type: 'custom',
            position: { x: 100, y: 200 },
            data: { type: 'lesson', title: 'Basic Principles', description: 'Understanding the why and how.' },
        },
        {
            id: '3',
            type: 'custom',
            position: { x: 400, y: 200 },
            data: { type: 'lesson', title: 'Setting up Environment', description: 'Tools needed to get started.' },
        },
        {
            id: '4',
            type: 'custom',
            position: { x: 250, y: 350 },
            data: { type: 'quiz', title: 'Fundamentals Check', description: 'Test your knowledge so far.' },
        },
        {
            id: '5',
            type: 'custom',
            position: { x: 250, y: 500 },
            data: { type: 'topic', title: 'Advanced Concepts', description: 'Moving beyond the basics.' },
        }
    ];

    let edges = [
        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
        { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
        { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
        { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
        { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: 'rgba(16, 185, 129, 0.5)' } },
    ];

    // Specific overrides for 'react'
    if (t.includes('react')) {
        nodes = [
            { id: '1', type: 'custom', position: { x: 300, y: 50 }, data: { type: 'topic', title: 'React Fundamentals', description: 'Components, Props, and State' } },
            { id: '2', type: 'custom', position: { x: 150, y: 200 }, data: { type: 'lesson', title: 'JSX & Elements', description: 'Writing markup inside JS.' } },
            { id: '3', type: 'custom', position: { x: 450, y: 200 }, data: { type: 'lesson', title: 'Component Lifecycle', description: 'Mounting, updating, unmounting.' } },
            { id: '4', type: 'custom', position: { x: 300, y: 350 }, data: { type: 'quiz', title: 'State Quiz', description: 'Test useState knowledge.' } },
            { id: '5', type: 'custom', position: { x: 300, y: 500 }, data: { type: 'topic', title: 'Hooks', description: 'useEffect, useMemo, useCallback' } },
        ];
        edges = [
            { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
            { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
            { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.2)' } },
            { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.2)' } },
            { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: 'rgba(16, 185, 129, 0.5)' } }
        ]
    }

    return { nodes, edges };
};
