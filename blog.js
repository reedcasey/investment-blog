/* ==========================================
   Allegory of the Trade â Blog Engine
   Handles post loading, rendering, markdown
   parsing, and the full-post overlay.
   ========================================== */

const STORAGE_KEY = 'blank_blog_posts';
let allPosts = [];

// ==========================================
// LOAD POSTS
// ==========================================
async function loadPosts() {
  // 1. Try localStorage first (for local admin preview)
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.length > 0) {
      allPosts = stored.filter(p => p.status === 'published');
      renderBlogPosts();
      return;
    }
  } catch {}

  // 2. Otherwise load from posts.json (the published data)
  try {
    const res = await fetch('posts.json');
    if (res.ok) {
      const data = await res.json();
      allPosts = data.filter(p => p.status === 'published');
    }
  } catch {}

  renderBlogPosts();
}

function getBlogPosts() {
  return allPosts;
}

// ==========================================
// MARKDOWN â HTML
// ==========================================
function markdownToHtml(md) {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .split('\n\n').map(block => {
      block = block.trim();
      if (!block) return '';
      if (/^<[hblu]|^<li|^<hr/.test(block)) return block;
      return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');
  html = html.replace(/(<li>.*?<\/li>\n?)+/g, '<ul>$&</ul>');
  return html;
}

// ==========================================
// RENDER POST CARDS
// ==========================================
function renderBlogPosts() {
  const posts = getBlogPosts();
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = '<div class="no-posts-msg"><p>No posts yet â check back soon.</p></div>';
    return;
  }

  container.innerHTML = posts.map(p => {
    const date = new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `
      <article class="post-card" onclick="openPost('${p.id}')">
        <div class="post-meta">
          <span class="post-tag">${p.tag}</span>
          <span class="post-date">${date}</span>
        </div>
        <h2>${p.title}</h2>
        <p>${p.excerpt}</p>
        <span class="read-more">Read more</span>
      </article>`;
  }).join('');
}

// ==========================================
// FULL POST OVERLAY
// ==========================================
function openPost(id) {
  const posts = getBlogPosts();
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const date = new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById('full-post-content').innerHTML = `
    <span class="full-post-tag">${post.tag}</span>
    <h1 class="full-post-title">${post.title}</h1>
    <div class="full-post-date">${date}</div>
    <div class="full-post-body">${markdownToHtml(post.body)}</div>`;
  document.getElementById('full-post-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  window.scrollTo({ top: 0 });

  // Update URL hash for shareability (without triggering navigation)
  history.pushState(null, '', '#post/' + id);
}

function closePost() {
  document.getElementById('full-post-overlay').classList.remove('open');
  document.body.style.overflow = '';
  history.pushState(null, '', window.location.pathname);
}

// Handle browser back button when post is open
window.addEventListener('popstate', () => {
  const overlay = document.getElementById('full-post-overlay');
  if (overlay && overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Deep-link: if URL has #post/id on load, open that post
function checkDeepLink() {
  const hash = window.location.hash;
  if (hash.startsWith('#post/')) {
    const id = hash.replace('#post/', '');
    // Wait a tick for posts to load
    setTimeout(() => openPost(id), 100);
  }
}

// ==========================================
// ADMIN LINK (only show locally)
// ==========================================
function showAdminLinkIfLocal() {
  const adminLink = document.getElementById('admin-link');
  if (!adminLink) return;
  if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    adminLink.style.display = '';
  }
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  showAdminLinkIfLocal();
  loadPosts().then(() => checkDeepLink());
});
