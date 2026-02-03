import { motion } from 'framer-motion';
import { Trash2, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const PostCard = ({ post, onDelete, onLike }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Format date nicely
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.article
            className="post-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                marginBottom: '4rem',
                position: 'relative'
            }}
        >
            <div className="post-header" style={{ marginBottom: '1.5rem' }}>
                <span className="category" style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--accent)'
                }}>
                    {post.category}
                </span>
                <h2 style={{
                    fontSize: '2.5rem',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem',
                    cursor: 'pointer'
                }}>
                    {post.title}
                </h2>
                <div className="meta" style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{formattedDate}</span>
                </div>
            </div>

            {post.image_url && (
                <div className="image-container" style={{
                    marginBottom: '2rem',
                    overflow: 'hidden',
                    borderRadius: '2px'
                }}>
                    <motion.img
                        src={post.image_url}
                        alt={post.title}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        animate={{ scale: isHovered ? 1.02 : 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            )}

            <p className="excerpt" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                {post.content.substring(0, 250)}...
            </p>

            <div className="actions" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <button
                    className="cursor-hover"
                    style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem'
                    }}
                >
                    Read More <span className="arrow">→</span>
                </button>

                <div style={{ flex: 1 }}></div>

                <button onClick={() => onLike(post)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={18} /> {post.likes ? post.likes.length : 0}
                </button>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <MessageCircle size={18} />
                </button>

                <button onClick={() => onDelete(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
                    <Trash2 size={18} />
                </button>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid #E5E5E5', marginTop: '4rem' }} />
        </motion.article>
    );
};

export default PostCard;
