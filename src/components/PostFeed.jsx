import { usePosts } from '../hooks/usePosts';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { useState, useMemo } from 'react';

const PostFeed = ({ onReadMore }) => {
    const { posts, loading, error, deletePost, toggleLike } = usePosts();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Hardcoded user ID for demo purposes (since no auth)
    const CURRENT_USER_ID = 'demo_user';

    const categories = ['All', 'Journal', 'Design', 'Travel', 'Tech'];

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [posts, searchQuery, selectedCategory]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                    Loading stories...
                </p>
            </div>
        );
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>{error}
            <br /><button onClick={() => window.location.reload()}>Retry</button>
        </div>;
    }

    return (
        <section className="post-feed">
            <div className="discovery-controls" style={{ marginBottom: '2rem' }}>
                <SearchBar onSearch={setSearchQuery} />
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.6 }}>
                    <p>No stories found.</p>
                </div>
            ) : (
                <div className="feed-grid">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onDelete={deletePost}
                            onLike={() => toggleLike(post.id, CURRENT_USER_ID)}
                            onReadMore={onReadMore}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PostFeed;
