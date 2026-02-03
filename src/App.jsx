import { useState } from 'react';
import Navigation from './components/Navigation';
import PostFeed from './components/PostFeed';
import PostEditor from './components/PostEditor';
import Cursor from './components/Cursor';
import PostReader from './components/PostReader';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <Cursor />

      <div className="container">
        <Navigation onNewPost={() => setIsEditorOpen(true)} />

        <main>
          <PostFeed onReadMore={setSelectedPost} />
        </main>

        <footer style={{ marginTop: '5rem', padding: '3rem 0', borderTop: '1px solid #eee', textAlign: 'center', opacity: 0.5 }}>
          <p>© 2024 Trong's Journal. Crafted with intention.</p>
        </footer>
      </div>

      <AnimatePresence>
        {isEditorOpen && (
          <PostEditor onClose={() => setIsEditorOpen(false)} />
        )}
        {selectedPost && (
          <PostReader post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
