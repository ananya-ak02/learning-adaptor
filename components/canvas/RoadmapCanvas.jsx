'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Panel,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

import CustomNode from './CustomNode';
import LessonModal from '../lesson/LessonModal';
import styles from './RoadmapCanvas.module.css';

const nodeTypes = {
    custom: CustomNode,
};

export default function RoadmapCanvas({ topic, onNodeClick }) {
    const router = useRouter();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal State
    const [selectedNode, setSelectedNode] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch roadmap data
        const fetchRoadmap = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/generate-roadmap?topic=${encodeURIComponent(topic)}`);
                const data = await response.json();

                // Add marker end to animated edges for better visibility
                const enhancedEdges = data.edges.map(e => ({
                    ...e,
                    markerEnd: e.animated ? {
                        type: MarkerType.ArrowClosed,
                        color: e.style?.stroke || 'rgba(99, 102, 241, 0.5)',
                    } : undefined
                }));

                setNodes(data.nodes);
                setEdges(enhancedEdges);
            } catch (error) {
                console.error('Failed to load roadmap:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (topic) {
            fetchRoadmap();
        }
    }, [topic, setNodes, setEdges]);

    const handleNodeClick = useCallback((event, node) => {
        setSelectedNode(node.data);
        setIsModalOpen(true);
        if (onNodeClick) {
            onNodeClick(node);
        }
    }, [onNodeClick]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedNode(null), 300); // Wait for exit animation
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <button
                        className={styles.backBtn}
                        onClick={() => router.push('/')}
                        aria-label="Back to home"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <motion.h1
                        className={styles.topicTitle}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Learning {decodeURIComponent(topic)}
                    </motion.h1>
                </div>
            </header>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className={styles.loadingOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.spinner} />
                        <span className={styles.loadingText}>Synthesizing Knowledge Base...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                className="rf-dark-mode"
                minZoom={0.2}
                maxZoom={1.5}
                proOptions={{ hideAttribution: true }}
            >
                <Background
                    className={styles['rf-background']}
                    color="rgba(255, 255, 255, 0.05)"
                    gap={20}
                    size={1}
                />
                <Panel position="bottom-right" className={styles.controls}>
                    {/* We use Panel instead of Controls to easily style them with Lucide icons but Controls could also be used */}
                    {/* Custom controls implemented via React Flow hooks are possible, keeping it simple here */}
                </Panel>
            </ReactFlow>

            <LessonModal
                isOpen={isModalOpen}
                onClose={closeModal}
                nodeData={selectedNode}
            />
        </div>
    );
}
