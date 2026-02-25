'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, FileText, HelpCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import styles from './LessonModal.module.css';

export default function LessonModal({ isOpen, onClose, nodeData }) {
    const [activeTab, setActiveTab] = useState('learn');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

    // Reset state when a different node is opened
    useEffect(() => {
        if (isOpen) {
            setActiveTab('learn');
            setSelectedAnswer(null);
            setIsQuizSubmitted(false);
        }
    }, [isOpen, nodeData?.title]);

    if (!nodeData) return null;

    const { title, description, type, lessonContent, quiz, videoId } = nodeData;

    const handleQuizSubmit = () => {
        setIsQuizSubmitted(true);
    };

    // ── Learn Tab ────────────────────────────────────────────────────
    const renderLearnTab = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.tabContent}
        >
            {description && <p className={styles.intro}>{description}</p>}

            <div className={styles.videoWrapper}>
                {videoId ? (
                    <iframe
                        className={styles.videoIframe}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${title} video tutorial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className={styles.videoFallback}>
                        <span>🎬</span>
                        <p>Video coming soon</p>
                    </div>
                )}
            </div>

            {lessonContent && (
                <div className={styles.article}>
                    <h3>Key Takeaways</h3>
                    {lessonContent.split('\n').map((line, i) => (
                        <p key={i} style={line.trim() === '' ? { marginBottom: '0.5rem' } : undefined}>
                            {line}
                        </p>
                    ))}
                </div>
            )}

            {quiz && (
                <div className={styles.actions}>
                    <Button onClick={() => setActiveTab('quiz')} variant="primary">
                        Take Quiz
                    </Button>
                </div>
            )}
        </motion.div>
    );

    // ── Quiz Tab ─────────────────────────────────────────────────────
    const renderQuizTab = () => {
        if (!quiz) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.tabContent}
                >
                    <p className={styles.intro}>No quiz available for this topic yet.</p>
                </motion.div>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.tabContent}
            >
                <div className={styles.quizHeader}>
                    <h3>Knowledge Check</h3>
                    <p>{quiz.question}</p>
                </div>

                <div className={styles.optionsList}>
                    {quiz.options.map(opt => {
                        const isSelected = selectedAnswer === opt.id;
                        const isCorrect = opt.id === quiz.correctAnswer;
                        const showResult = isQuizSubmitted;

                        let stateClass = '';
                        if (showResult) {
                            if (isCorrect) stateClass = styles.correct;
                            else if (isSelected) stateClass = styles.incorrect;
                        } else if (isSelected) {
                            stateClass = styles.selected;
                        }

                        return (
                            <button
                                key={opt.id}
                                className={`${styles.optionBtn} ${stateClass}`}
                                onClick={() => !showResult && setSelectedAnswer(opt.id)}
                                disabled={showResult}
                            >
                                <div className={styles.optionContent}>
                                    <span className={styles.optionLabel}>{opt.id.toUpperCase()}</span>
                                    <span>{opt.text}</span>
                                </div>
                                {showResult && isCorrect && <CheckCircle size={20} className={styles.successIcon} />}
                                {showResult && isSelected && !isCorrect && <AlertCircle size={20} className={styles.errorIcon} />}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.actions}>
                    {!isQuizSubmitted ? (
                        <Button
                            onClick={handleQuizSubmit}
                            disabled={!selectedAnswer}
                            variant="gradient"
                        >
                            Submit Answer
                        </Button>
                    ) : (
                        <Button onClick={onClose} variant="primary">
                            Continue Journey
                        </Button>
                    )}
                </div>
            </motion.div>
        );
    };

    // ── Render ────────────────────────────────────────────────────────
    const hasQuiz = !!quiz;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>

            {(type === 'topic' || type === 'lesson') && hasQuiz ? (
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'learn' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('learn')}
                    >
                        <FileText size={16} /> Learn
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'quiz' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('quiz')}
                    >
                        <HelpCircle size={16} /> Practice
                    </button>
                </div>
            ) : null}

            <div className={styles.scrollArea}>
                <AnimatePresence mode="wait">
                    {type === 'quiz' || activeTab === 'quiz' ? (
                        <React.Fragment key="quiz">
                            {renderQuizTab()}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key="learn">
                            {renderLearnTab()}
                        </React.Fragment>
                    )}
                </AnimatePresence>
            </div>
        </Modal>
    );
}
