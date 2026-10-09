const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const observeReveals = () => {
  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
};

observeReveals();

const blogPostsList = document.querySelector('#blog-posts-list');

if (blogPostsList) {
  const fallbackPosts = [
    {
      title: 'Modernizing Shared Devices: Inside Microsoft’s New Passwordless Teams Resource Accounts',
      link: 'https://blog.pryrotech.com/2026/09/modernizing-shared-devices-inside.html',
      date: 'Sep 2026',
      summary: 'Exploring how passwordless shared-device authentication reduces risk, cuts operational overhead, and strengthens Teams Rooms reliability.'
    },
    {
      title: 'Building a Modern Conditional Access Strategy: The Identity Firewall Your Organization Actually Needs',
      link: 'https://blog.pryrotech.com/2026/09/building-modern-conditional-access.html',
      date: 'Sep 2026',
      summary: 'A practical look at turning Conditional Access into an identity-first security strategy rather than a checklist of settings.'
    },
    {
      title: 'Making Email Optional in Microsoft Entra External ID: Why This Matters for Modern CIAM',
      link: 'https://blog.pryrotech.com/2026/09/making-email-optional-in-microsoft.html',
      date: 'Sep 2026',
      summary: 'Why flexible external identity design matters for customer-facing access, vendor onboarding, and modern CIAM solutions.'
    }
  ];

  const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  const renderPosts = (posts) => {
    blogPostsList.innerHTML = posts
      .slice(0, 3)
      .map((post) => `
        <article class="timeline-item reveal">
          <span class="timeline-year">${post.date}</span>
          <div>
            <h3><a href="${post.link}" target="_blank" rel="noreferrer">${post.title}</a></h3>
            <p>${post.summary}</p>
          </div>
        </article>
      `)
      .join('');

    observeReveals();
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch('https://blog.pryrotech.com/feeds/posts/default?alt=rss', { cache: 'no-store' });
      if (!response.ok) throw new Error('Feed request failed');

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
      const parseError = xmlDoc.querySelector('parsererror');

      if (parseError) {
        throw new Error('Could not parse blog feed');
      }

      const items = Array.from(xmlDoc.querySelectorAll('item')).slice(0, 3);

      if (!items.length) {
        throw new Error('No blog items found');
      }

      const posts = items.map((item) => {
        const title = item.querySelector('title')?.textContent?.trim() || 'Blog post';
        const link = item.querySelector('link')?.textContent?.trim() || 'https://blog.pryrotech.com';
        const dateText = item.querySelector('pubDate')?.textContent?.trim() || '';
        const summary = stripHtml(item.querySelector('description')?.textContent || '');

        return {
          title,
          link,
          date: dateText ? new Date(dateText).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
          summary: summary.length > 160 ? `${summary.slice(0, 157)}...` : summary
        };
      });

      renderPosts(posts);
    } catch (error) {
      renderPosts(fallbackPosts);
    }
  };

  loadBlogPosts();
}
