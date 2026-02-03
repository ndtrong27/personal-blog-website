import { motion } from 'framer-motion';

const Navigation = ({ onNewPost }) => {
    return (
        <nav style={{
            padding: '2rem 0',
            marginBottom: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="brand"
            >
                <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '-0.5px'
                }}>
                    Trong's Journal
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="nav-links"
                style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
            >
                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>About</a>
                <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Topics</a>
                <button
                    onClick={onNewPost}
                    className="btn-primary"
                >
                    New Story
                </button>
            </motion.div>
        </nav>
    );
};

export default Navigation;
