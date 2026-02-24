'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Sparkles, Map } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './page.module.css';

const POPULAR_TOPICS = [
    'Machine Learning Basics',
    'React to Next.js',
    'System Design',
    'Personal Finance',
    'Ancient History'
];

export default function Home() {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsGenerating(true);
        // Simulate generation delay for visual effect
        setTimeout(() => {
            router.push(`/roadmap/${encodeURIComponent(topic.trim())}`);
        }, 1500);
    };

    const clearTopic = () => setTopic('');

    return (
        <main className={styles.container}>
            <div className={styles.bgGlow} />

            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.hero}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-primary)', fontWeight: '600' }}
                    >
                        <Sparkles size={20} />
                        <span>AI-Powered Learning</span>
                    </motion.div>
                    <h1 className={styles.title}>
                        Master Any Topic,<br />
                        <span className="text-gradient">Visually</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Enter a subject and watch as AI maps out your personalized, node-based learning journey.
                    </p>
                </div>

                <motion.div
                    className={styles.searchBox}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <form className={styles.searchForm} onSubmit={handleGenerate}>
                        <Input
                            icon={Search}
                            placeholder="What do you want to learn today?"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isGenerating}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            variant="gradient"
                            className={styles.generateBtn}
                            isLoading={isGenerating}
                            disabled={!topic.trim() || isGenerating}
                            icon={Map}
                        >
                            {isGenerating ? 'Mapping Journey...' : 'Generate Roadmap'}
                        </Button>
                    </form>

                    <div className={styles.popularTopics}>
                        {POPULAR_TOPICS.map((pt, i) => (
                            <motion.button
                                key={pt}
                                className={styles.topicTag}
                                onClick={() => setTopic(pt)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                                disabled={isGenerating}
                            >
                                {pt}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
