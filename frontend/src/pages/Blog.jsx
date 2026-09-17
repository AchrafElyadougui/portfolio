import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../lib/motion';
import RevealText from '../components/RevealText';

const posts = [
  {
    id: 1,
    title: "Hello, World!",
    date: "April 6, 2025",
    isLatest: true,
    short: "The first post on my blog, saying hello to the world",
    full: "The first post on my blog, saying hello to the world. This post marks the beginning of my journey sharing thoughts, tutorials, and experiences in the tech world. Stay tuned for more!"
  },
  // Add more posts here
];

export default function Blog() {
  const [expandedPostId, setExpandedPostId] = useState(null);

  return (
    <div className="min-h-screen text-[var(--color-text)] px-6 py-10 font-mono">
      <RevealText
        as="h1"
        className="text-4xl font-bold mb-2"
        segments={[
          { text: 'Tech ' },
          { text: 'Blog.', className: 'text-blue-300' },
        ]}
      />
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="text-lg text-[var(--color-subtext)] mb-8 max-w-3xl"
      >
        A blog about technology, programming, and various intriguing topics. Here I share my experiences, projects and opinions.
      </motion.p>

      <h2 className="text-3xl font-bold mb-4">All Posts.</h2>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="show"
      >
        {posts.map(post => (
          <motion.div variants={fadeUp} key={post.id} className="bg-[var(--color-nav-hover)] p-6 rounded-xl max-w-3xl mb-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{post.title}</h3>
              {post.isLatest && (
                <span className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-1">
                  <span>🔥</span> Latest
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mb-4">{post.date}</p>
            <p className="text-base text-[var(--color-subtext)]">
              {expandedPostId === post.id ? post.full : post.short}
            </p>
            <button
              className="text-blue-400 mt-2 hover:underline"
              onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
            >
              {expandedPostId === post.id ? 'Show less' : 'Read more'}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
