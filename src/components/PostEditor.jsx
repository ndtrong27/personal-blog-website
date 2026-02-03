import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { motion, AnimatePresence } from 'framer-motion';

const PostEditor = ({ onClose }) => {
    const { createPost } = usePosts();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        category: 'Journal',
        imageUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createPost(formData);
            onClose();
        } catch (error) {
            alert('Error creating post: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(251, 247, 240, 0.95)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                overflowY: 'auto',
                padding: '2rem'
            }}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    background: '#fff',
                    padding: '3rem',
                    borderRadius: '2px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2>New Story</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        style={{
                            fontSize: '2rem',
                            fontFamily: 'var(--font-heading)',
                            border: 'none',
                            borderBottom: '1px solid #eee',
                            padding: '0.5rem 0',
                            outline: 'none'
                        }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Author"
                            required
                            value={formData.author}
                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                            style={{ padding: '0.8rem', border: '1px solid #eee' }}
                        />
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            style={{ padding: '0.8rem', border: '1px solid #eee' }}
                        >
                            <option value="Journal">Journal</option>
                            <option value="Design">Design</option>
                            <option value="Travel">Travel</option>
                            <option value="Tech">Tech</option>
                        </select>
                    </div>

                    <input
                        type="url"
                        placeholder="Image URL (Unsplash, etc.)"
                        value={formData.imageUrl}
                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        style={{ padding: '0.8rem', border: '1px solid #eee' }}
                    />

                    <textarea
                        placeholder="Tell your story..."
                        required
                        rows={12}
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        style={{
                            padding: '1rem',
                            border: '1px solid #eee',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            resize: 'vertical'
                        }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default PostEditor;
