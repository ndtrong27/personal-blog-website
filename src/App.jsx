import { useState } from 'react';
import Navigation from './components/Navigation';
import PostFeed from './components/PostFeed';
import PostEditor from './components/PostEditor';
import Cursor from './components/Cursor';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <>
      <Cursor />

      <div className="container">
        <Navigation onNewPost={() => setIsEditorOpen(true)} />

        <main>
          <PostFeed />
        </main>

        <footer style={{ marginTop: '5rem', padding: '3rem 0', borderTop: '1px solid #eee', textAlign: 'center', opacity: 0.5 }}>
          <p>© 2024 Trong's Journal. Crafted with intention.</p>
        </footer>
      </div>

      <AnimatePresence>
        {isEditorOpen && (
          <PostEditor onClose={() => setIsEditorOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
