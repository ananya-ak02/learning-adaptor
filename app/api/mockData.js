/**
 * Generates a full roadmap with lessonContent and quiz data baked into every node.
 * This replaces the need for a separate "fetch lesson" endpoint.
 */
export const generateMockRoadmap = (topic) => {
    const t = topic.toLowerCase();

    // ── Helper: create a node with full lesson + quiz payload ─────────
    const makeNode = (id, position, { type, title, description, lessonContent, quiz }) => ({
        id,
        type: 'custom',
        position,
        data: { type, title, description, lessonContent, quiz },
    });

    // ── Default roadmap (any topic) ──────────────────────────────────
    let nodes = [
        makeNode('1', { x: 250, y: 50 }, {
            type: 'topic',
            title: `Introduction to ${topic}`,
            description: `Core concepts and fundamentals of ${topic}.`,
            lessonContent: `${topic} is a broad field that encompasses many principles and practices. In this lesson you will learn what ${topic} is, why it matters, and the foundational vocabulary you need before diving deeper.\n\n• **Definition** – ${topic} refers to the systematic study and application of its core principles.\n• **History** – The discipline evolved over several decades, shaped by breakthroughs in theory and technology.\n• **Why learn it?** – Mastering ${topic} opens doors to careers in engineering, research, and product development.`,
            quiz: {
                question: `Which statement best describes the purpose of studying ${topic}?`,
                options: [
                    { id: 'a', text: 'It is only useful for academic research.' },
                    { id: 'b', text: `It provides foundational knowledge applicable to engineering, research, and product development.` },
                    { id: 'c', text: 'It is a passing trend with limited practical value.' },
                    { id: 'd', text: 'It can only be learned through formal university courses.' },
                ],
                correctAnswer: 'b',
            },
        }),
        makeNode('2', { x: 100, y: 200 }, {
            type: 'lesson',
            title: `Core Principles of ${topic}`,
            description: 'Understanding the "why" and "how" behind the fundamentals.',
            lessonContent: `Every discipline rests on a handful of core principles. For ${topic}, the key ideas are:\n\n1. **Abstraction** – Breaking complex problems into manageable parts.\n2. **Modularity** – Designing independent, reusable pieces.\n3. **Feedback Loops** – Using output to refine input iteratively.\n4. **Scalability** – Ensuring solutions grow gracefully with demand.\n\nUnderstanding these principles lets you reason about any sub-topic within ${topic} and make sound design decisions.`,
            quiz: {
                question: `Which principle involves breaking complex problems into manageable parts?`,
                options: [
                    { id: 'a', text: 'Scalability' },
                    { id: 'b', text: 'Modularity' },
                    { id: 'c', text: 'Abstraction' },
                    { id: 'd', text: 'Feedback Loops' },
                ],
                correctAnswer: 'c',
            },
        }),
        makeNode('3', { x: 400, y: 200 }, {
            type: 'lesson',
            title: `Setting Up Your ${topic} Environment`,
            description: 'Tools and software needed to get started.',
            lessonContent: `Before writing any code or running experiments, you need the right environment.\n\n• **Editor / IDE** – VS Code, IntelliJ, or a domain-specific tool.\n• **Runtime** – Install the latest stable version of the relevant runtime (Node.js, Python, etc.).\n• **Package Manager** – npm, pip, or cargo depending on your ecosystem.\n• **Version Control** – Git + GitHub for collaboration and history tracking.\n\nOnce set up, create a "hello world" project to verify everything works end-to-end.`,
            quiz: {
                question: 'What is the primary purpose of a package manager?',
                options: [
                    { id: 'a', text: 'To write source code automatically.' },
                    { id: 'b', text: 'To manage project dependencies and their versions.' },
                    { id: 'c', text: 'To deploy applications to production servers.' },
                    { id: 'd', text: 'To provide a graphical user interface for your project.' },
                ],
                correctAnswer: 'b',
            },
        }),
        makeNode('4', { x: 250, y: 350 }, {
            type: 'quiz',
            title: `${topic} Fundamentals Check`,
            description: 'Test your knowledge of the basics before moving on.',
            lessonContent: `This is a checkpoint quiz covering everything from the introduction through environment setup. Review the previous lessons if you need a refresher.`,
            quiz: {
                question: `In the context of ${topic}, what does "modularity" mean?`,
                options: [
                    { id: 'a', text: 'Writing all code in a single file for simplicity.' },
                    { id: 'b', text: 'Designing independent, reusable components.' },
                    { id: 'c', text: 'Using only third-party libraries.' },
                    { id: 'd', text: 'Avoiding abstraction to keep things concrete.' },
                ],
                correctAnswer: 'b',
            },
        }),
        makeNode('5', { x: 250, y: 500 }, {
            type: 'topic',
            title: `Advanced ${topic}`,
            description: 'Moving beyond the basics into real-world patterns.',
            lessonContent: `Now that you have a solid foundation, it's time to explore advanced patterns:\n\n• **Design Patterns** – Common solutions to recurring problems (Observer, Factory, Strategy).\n• **Performance Optimization** – Profiling, caching, and lazy evaluation.\n• **Testing** – Unit tests, integration tests, and end-to-end tests.\n• **Architecture** – Micro-services, event-driven design, and domain-driven design.\n\nMastering these topics transforms you from a beginner into a practitioner capable of building production-grade systems.`,
            quiz: {
                question: 'Which of the following is an example of a design pattern?',
                options: [
                    { id: 'a', text: 'Git branching' },
                    { id: 'b', text: 'Observer pattern' },
                    { id: 'c', text: 'Package installation' },
                    { id: 'd', text: 'Environment variables' },
                ],
                correctAnswer: 'b',
            },
        }),
    ];

    let edges = [
        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
        { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
        { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
        { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.1)' } },
        { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: 'rgba(16, 185, 129, 0.5)' } },
    ];

    // ── React-specific overrides ─────────────────────────────────────
    if (t.includes('react')) {
        nodes = [
            makeNode('1', { x: 300, y: 50 }, {
                type: 'topic',
                title: 'React Fundamentals',
                description: 'Components, Props, and State',
                lessonContent: `React is a JavaScript library for building user interfaces.\n\n• **Components** – The building blocks. Every piece of UI is a component.\n• **Props** – Read-only data passed from parent to child.\n• **State** – Mutable data managed within a component via \`useState\`.\n• **Virtual DOM** – React keeps a lightweight copy of the DOM and batches updates for performance.\n\nThink of a React app as a tree of components, each responsible for rendering a piece of the screen.`,
                quiz: {
                    question: 'What is the primary purpose of React state?',
                    options: [
                        { id: 'a', text: 'To style components.' },
                        { id: 'b', text: 'To manage mutable data within a component.' },
                        { id: 'c', text: 'To send HTTP requests.' },
                        { id: 'd', text: 'To define the HTML structure.' },
                    ],
                    correctAnswer: 'b',
                },
            }),
            makeNode('2', { x: 150, y: 200 }, {
                type: 'lesson',
                title: 'JSX & Elements',
                description: 'Writing markup inside JavaScript.',
                lessonContent: `JSX is a syntax extension that lets you write HTML-like code in JavaScript.\n\n\`\`\`jsx\nconst element = <h1>Hello, world!</h1>;\n\`\`\`\n\n• JSX compiles to \`React.createElement()\` calls.\n• You can embed any JavaScript expression inside curly braces \`{}\`.\n• JSX prevents injection attacks by escaping values by default.\n• Every JSX expression must have a single root element (use fragments \`<></>\` when needed).`,
                quiz: {
                    question: 'What does JSX compile to under the hood?',
                    options: [
                        { id: 'a', text: 'Raw HTML strings' },
                        { id: 'b', text: 'React.createElement() calls' },
                        { id: 'c', text: 'Web Components' },
                        { id: 'd', text: 'jQuery selectors' },
                    ],
                    correctAnswer: 'b',
                },
            }),
            makeNode('3', { x: 450, y: 200 }, {
                type: 'lesson',
                title: 'Component Lifecycle',
                description: 'Mounting, updating, and unmounting.',
                lessonContent: `Every React component goes through a lifecycle:\n\n1. **Mounting** – The component is created and inserted into the DOM.\n2. **Updating** – State or props change, triggering a re-render.\n3. **Unmounting** – The component is removed from the DOM.\n\nWith function components, the \`useEffect\` hook handles side-effects across all three phases:\n\n\`\`\`jsx\nuseEffect(() => {\n  // runs on mount & update\n  return () => { /* cleanup on unmount */ };\n}, [dependencies]);\n\`\`\``,
                quiz: {
                    question: 'Which hook handles side-effects in function components?',
                    options: [
                        { id: 'a', text: 'useState' },
                        { id: 'b', text: 'useContext' },
                        { id: 'c', text: 'useEffect' },
                        { id: 'd', text: 'useReducer' },
                    ],
                    correctAnswer: 'c',
                },
            }),
            makeNode('4', { x: 300, y: 350 }, {
                type: 'quiz',
                title: 'React State Quiz',
                description: 'Test your useState & props knowledge.',
                lessonContent: `Review the concepts of state, props, and component lifecycle before attempting this quiz.`,
                quiz: {
                    question: 'What happens when you call the setter returned by useState?',
                    options: [
                        { id: 'a', text: 'The component unmounts.' },
                        { id: 'b', text: 'The component re-renders with the new state value.' },
                        { id: 'c', text: 'The page reloads entirely.' },
                        { id: 'd', text: 'Nothing visible happens.' },
                    ],
                    correctAnswer: 'b',
                },
            }),
            makeNode('5', { x: 300, y: 500 }, {
                type: 'topic',
                title: 'React Hooks',
                description: 'useEffect, useMemo, useCallback and beyond.',
                lessonContent: `Hooks let you use React features without writing classes.\n\n• **useEffect** – Side effects (data fetching, subscriptions).\n• **useMemo** – Memoize expensive computations.\n• **useCallback** – Memoize functions to avoid unnecessary re-renders.\n• **useRef** – Access DOM elements and persist values without re-rendering.\n• **useContext** – Consume context without prop-drilling.\n\nCustom hooks let you extract and share stateful logic across components.`,
                quiz: {
                    question: 'Which hook would you use to memoize an expensive computation?',
                    options: [
                        { id: 'a', text: 'useEffect' },
                        { id: 'b', text: 'useCallback' },
                        { id: 'c', text: 'useMemo' },
                        { id: 'd', text: 'useRef' },
                    ],
                    correctAnswer: 'c',
                },
            }),
        ];
        edges = [
            { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
            { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'rgba(99, 102, 241, 0.5)' } },
            { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.2)' } },
            { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'rgba(255, 255, 255, 0.2)' } },
            { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: 'rgba(16, 185, 129, 0.5)' } },
        ];
    }

    return { nodes, edges };
};
