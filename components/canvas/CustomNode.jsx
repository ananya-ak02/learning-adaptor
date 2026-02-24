import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { BookOpen, FileText, HelpCircle } from 'lucide-react';
import styles from './CustomNode.module.css';

const CustomNode = ({ data, selected }) => {
    const { type, title, description } = data;

    const getIcon = () => {
        switch (type) {
            case 'topic': return <BookOpen size={16} className={styles.icon} />;
            case 'lesson': return <FileText size={16} className={styles.icon} />;
            case 'quiz': return <HelpCircle size={16} className={styles.icon} />;
            default: return <BookOpen size={16} className={styles.icon} />;
        }
    };

    const classNames = [
        styles.nodeWrapper,
        styles[type] || styles.topic,
        selected ? styles.selected : ''
    ].join(' ');

    return (
        <div className={classNames}>
            {/* Top Handle for incoming connections */}
            <Handle
                type="target"
                position={Position.Top}
                className={styles.handle}
                isConnectable={false}
            />

            <div className={styles.header}>
                {getIcon()}
                <h3 className={styles.title}>{title}</h3>
            </div>

            {description && (
                <p className={styles.description}>{description}</p>
            )}

            {/* Bottom Handle for outgoing connections */}
            <Handle
                type="source"
                position={Position.Bottom}
                className={styles.handle}
                isConnectable={false}
            />
        </div>
    );
};

export default memo(CustomNode);
