import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const PostReader = ({ post, onClose }) => {
    if (!post) return null;

    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(251, 247, 240, 0.98)', // High opacity cream background
                zIndex: 1000,
                overflowY: 'auto',
                padding: '2rem 0'
            }}
        >
            <div className="container" style={{ position: 'relative', marginTop: '4rem', paddingBottom: '4rem' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: -60,
                        right: 20,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '1rem'
                    }}
                >
                    <X size={32} color="var(--text-primary)" />
                </button>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="category" style={{
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        color: 'var(--accent)',
                        display: 'block',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {post.category}
                    </span>

                    <h1 style={{
                        fontSize: '3.5rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        maxWidth: '900px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        {post.title}
                    </h1>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '4rem',
                        fontFamily: 'var(--font-body)'
                    }}>
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                    </div>

                    {post.image_url && (
                        <div style={{ marginBottom: '4rem', borderRadius: '4px', overflow: 'hidden' }}>
                            <img src={post.image_url} alt={post.title} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    )}

                    <div style={{
                        maxWidth: '740px',
                        margin: '0 auto',
                        fontSize: '1.25rem',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-wrap' // Preserves paragraphs
                    }}>
                        {post.content}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PostReader;
