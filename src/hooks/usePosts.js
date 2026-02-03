import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (err) {
            console.error('Error loading posts:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async (postData) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([{
                    title: postData.title,
                    content: postData.content,
                    author: postData.author,
                    category: postData.category || 'general',
                    image_url: postData.imageUrl,
                    likes: []
                }])
                .select()
                .single();

            if (error) throw error;
            setPosts(prev => [data, ...prev]);
            return data;
        } catch (err) {
            console.error('Error creating post:', err);
            throw err;
        }
    };

    const deletePost = async (postId) => {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;
            setPosts(prev => prev.filter(post => post.id !== postId));
        } catch (err) {
            console.error('Error deleting post:', err);
            throw err;
        }
    };

    const toggleLike = async (postId, userId) => {
        // Optimistic UI update could be added here
        try {
            // 1. Get current post
            const { data: post, error: fetchError } = await supabase
                .from('posts')
                .select('likes')
                .eq('id', postId)
                .single();

            if (fetchError) throw fetchError;

            let likes = post.likes || [];
            const userIndex = likes.indexOf(userId);

            if (userIndex > -1) {
                likes.splice(userIndex, 1);
            } else {
                likes.push(userId);
            }

            // 2. Update post
            const { error: updateError } = await supabase
                .from('posts')
                .update({ likes: likes })
                .eq('id', postId);

            if (updateError) throw updateError;

            // 3. Update local state
            setPosts(prev => prev.map(p =>
                p.id === postId ? { ...p, likes } : p
            ));

        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return { posts, loading, error, createPost, deletePost, reloadPosts: loadPosts, toggleLike };
};
