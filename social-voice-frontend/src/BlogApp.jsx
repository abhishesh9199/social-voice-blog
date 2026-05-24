import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Search, MessageCircle, Share2, Heart, Calendar, User, ArrowRight, TrendingUp, BookOpen, ChevronRight, Flame } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// ── Category colour pillars (Guardian-style) ──────────────────────
const PILLAR = {
  'Social Issues':        { bg: '#c70000', light: '#fff1f1', text: '#7f0000', label: 'Social Issues' },
  'Women Empowerment':    { bg: '#b05800', light: '#fff8f0', text: '#7a3c00', label: 'Women Empowerment' },
  'Child Protection':     { bg: '#005689', light: '#edf6ff', text: '#003660', label: 'Child Protection' },
  'Domestic Violence':    { bg: '#5f3382', light: '#f5f0fa', text: '#3b1f5a', label: 'Domestic Violence' },
  'Gender Equality':      { bg: '#2a7a3b', light: '#edf7f0', text: '#174d24', label: 'Gender Equality' },
};

const getPillar = (cat) => PILLAR[cat] || { bg: '#555', light: '#f5f5f5', text: '#222', label: cat };

// ── Cluster articles by category ──────────────────────────────────
function clusterBlogs(blogs) {
  const map = {};
  blogs.forEach(b => {
    const cat = b.category || 'Uncategorised';
    if (!map[cat]) map[cat] = [];
    map[cat].push(b);
  });
  return Object.entries(map).map(([category, articles]) => ({ category, articles }));
}

// ── Date formatter ────────────────────────────────────────────────
function fmtDate(raw) {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d)) return raw;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Gradient palette for article image blocks ─────────────────────
const GRADIENTS = [
  'linear-gradient(135deg,#c70000 0%,#ff6b6b 100%)',
  'linear-gradient(135deg,#b05800 0%,#f4a260 100%)',
  'linear-gradient(135deg,#005689 0%,#4fc3f7 100%)',
  'linear-gradient(135deg,#5f3382 0%,#ce93d8 100%)',
  'linear-gradient(135deg,#2a7a3b 0%,#81c784 100%)',
];

export default function BlogApp() {
  const [activeSection, setActiveSection]   = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBlog, setSelectedBlog]     = useState(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchOpen, setSearchOpen]         = useState(false);
  const [blogs, setBlogs]                   = useState([]);
  const [loading, setLoading]               = useState(true);
  const [likedPosts, setLikedPosts]         = useState({});
  const [comment, setComment]               = useState('');
  const [commenterName, setCommenterName]   = useState('');
  const [localComments, setLocalComments]   = useState({});
  const [activeCluster, setActiveCluster]   = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        if (!res.ok) throw new Error('fetch failed');
        setBlogs(await res.json());
      } catch {
        // silent fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const defaultBlogs = [
    {
      id: 1,
      title: "The Silent Burden: Understanding Dowry System in Modern India",
      excerpt: "Dowry remains one of the most persistent social evils in our society. Let's explore its origins, consequences, and pathways to change.",
      date: "May 18, 2024",
      author: "Ananya Sharma",
      category: "Social Issues",
      reads: 2847,
      image: "bg-gradient-to-r from-red-600 to-pink-500",
      gradient: GRADIENTS[0],
      content: `The dowry system, rooted in medieval practices, continues to plague modern Indian society. Despite being legally banned since 1961, it persists across various communities, cutting across educational and economic boundaries.

Historical Context:
The dowry system originated as a way to provide daughters with their share of family wealth before marriage. However, it evolved into a mechanism of exploitation where the groom's family demands excessive payments and goods.

Economic Impact:
Families spend an average of 5-10 years' savings for their daughter's marriage. This financial burden forces many into debt, stunting educational opportunities and economic mobility.

Social Consequences:
1. Increased dowry-related violence and crimes
2. Female infanticide and sex-selective abortions
3. Psychological trauma for bride and her family
4. Perpetuation of patriarchal hierarchies

The Path Forward:
Change requires collective action — legal reforms, community awareness, education, and economic empowerment of women. We must challenge the narrative that associates a woman's worth with material possessions.

Call to Action:
Support organisations fighting dowry-related abuse. Speak up against dowry demands in your communities. Education and awareness are the first steps toward change.`,
      comments: [
        { name: "Priya Sharma", text: "Powerful message. We need more voices speaking against this practice." },
        { name: "Amit Kumar",   text: "This issue affects my extended family too. Great perspective." }
      ]
    },
    {
      id: 2,
      title: "Women's Economic Empowerment: Breaking the Chains",
      excerpt: "Economic independence is the strongest weapon against exploitation. How can we empower women financially and socially?",
      date: "May 15, 2024",
      author: "Meera Pillai",
      category: "Women Empowerment",
      reads: 1952,
      image: "bg-gradient-to-r from-orange-600 to-amber-400",
      gradient: GRADIENTS[1],
      content: `Women's economic empowerment is not just about earning money — it's about dignity, autonomy, and freedom.

The Numbers:
Women constitute only 27% of the global workforce despite being 50% of the population. In India, this figure is even lower at 20%.

Barriers to Economic Participation:
- Lack of access to education and skill training
- Social restrictions and cultural norms
- Limited access to credit and entrepreneurship opportunities
- Wage gap and workplace discrimination

Solutions:
1. Invest in women's education at all levels
2. Create supportive policies for women entrepreneurs
3. Ensure equal pay for equal work
4. Build community-based support systems
5. Challenge societal stereotypes about women's roles

Success Stories:
Women-led microfinance initiatives have transformed communities. Self-help groups have created economic networks that support entire villages.

The intersection of women's economic empowerment with dowry is crucial — economically independent women are less likely to be exploited.`,
      comments: []
    },
    {
      id: 3,
      title: "Child Marriage: A Violation That Steals Futures",
      excerpt: "When children are married off before reaching adulthood, their dreams, education, and health suffer.",
      date: "May 10, 2024",
      author: "Rajan Verma",
      category: "Child Protection",
      reads: 3421,
      image: "bg-gradient-to-r from-blue-600 to-cyan-400",
      gradient: GRADIENTS[2],
      content: `Child marriage affects millions of children worldwide, predominantly girls. In India alone, 27% of women aged 20-24 were married before age 18.

Health Consequences:
- Early pregnancy leads to higher maternal mortality
- Mental health issues including depression and anxiety
- Limited access to healthcare during vulnerable years

Educational Impact:
- School dropout rates reach 90% for married children
- Loss of economic opportunities
- Perpetuation of poverty cycles

Legal Framework:
The Prohibition of Child Marriage Act (2006) sets 18 as the minimum age for marriage. However, implementation remains weak.

Why It Happens:
- Poverty and economic insecurity
- Dowry-related pressures
- Gender inequality and patriarchal norms
- Lack of education and awareness

Solutions:
1. Enforce legal frameworks strictly
2. Invest in girls' education
3. Economic support to vulnerable families
4. Community awareness programmes
5. Empower local governance to monitor and prevent`,
      comments: []
    },
    {
      id: 4,
      title: "Domestic Violence: Breaking the Cycle of Silence",
      excerpt: "Behind closed doors, many suffer in silence. Let's understand domestic violence and create safe spaces for survivors.",
      date: "May 5, 2024",
      author: "Sunita Rao",
      category: "Domestic Violence",
      reads: 2534,
      image: "bg-gradient-to-r from-purple-700 to-violet-400",
      gradient: GRADIENTS[3],
      content: `Domestic violence is a pervasive problem affecting millions globally. In India, 1 in 3 women experience physical or sexual violence.

Types of Abuse:
- Physical violence
- Psychological and emotional abuse
- Sexual abuse
- Economic control
- Social isolation

The Cycle:
Abuse typically follows a cycle: tension building, incident, reconciliation, calm. Understanding this helps survivors recognise patterns.

Impact on Families:
- Children exposed to violence develop behavioural and psychological issues
- Intergenerational trauma
- Disrupted family structures

Legal Protections:
The Domestic Violence Act (2005) provides comprehensive protection and remedies for women.

Breaking Free:
1. Recognise warning signs
2. Build support networks
3. Access legal assistance
4. Utilise shelter homes and counselling
5. Report to authorities

Resources are available, and recovery is possible.`,
      comments: []
    },
    {
      id: 5,
      title: "Gender Equality in Education: Building Future Leaders",
      excerpt: "Education is the foundation for equality. Examining how we can ensure equal educational opportunities for all genders.",
      date: "April 28, 2024",
      author: "Dr. Kavita Menon",
      category: "Gender Equality",
      reads: 1876,
      image: "bg-gradient-to-r from-green-600 to-teal-400",
      gradient: GRADIENTS[4],
      content: `Educational equality is fundamental to achieving gender equality. When girls are educated, communities thrive.

Current State:
- 258 million children remain out of school
- Girls constitute 60% of out-of-school children
- The gender gap widens in secondary and higher education

Barriers for Girls:
- Poverty forcing school dropout
- Safety concerns and long commutes
- Cultural preferences for boys' education
- Early marriage and pregnancy
- Lack of menstrual health facilities

Benefits of Education:
- Economic independence
- Better health outcomes
- Lower fertility rates
- Political participation
- Breaking cycles of poverty

Strategies for Change:
1. Make education accessible and affordable
2. Improve school safety and facilities
3. Train teachers in gender-sensitive pedagogy
4. Engage parents and communities
5. Provide scholarships and incentives
6. Create STEM opportunities for girls`,
      comments: []
    }
  ];

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;
  const clusters     = useMemo(() => clusterBlogs(displayBlogs), [displayBlogs]);

  const filteredBlogs = displayBlogs.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = displayBlogs[0];
  const secondary = displayBlogs.slice(1, 4);

  const nav = (section) => { setActiveSection(section); setSelectedBlog(null); setMobileMenuOpen(false); setActiveCluster(null); };

  const handleLike  = (id) => setLikedPosts(p => ({ ...p, [id]: !p[id] }));
  const handleShare = (title) => {
    if (navigator.share) navigator.share({ title, url: window.location.href });
    else navigator.clipboard.writeText(window.location.href);
  };
  const handleComment = (blogId) => {
    if (!comment.trim()) return;
    const c = { name: commenterName || 'Anonymous', text: comment };
    setLocalComments(p => ({ ...p, [blogId]: [...(p[blogId] || []), c] }));
    setComment(''); setCommenterName('');
  };

  const allComments = (blog) => [
    ...(blog.comments || []),
    ...(localComments[blog.id || blog._id] || [])
  ];

  // ── RENDER ───────────────────────────────────────────────────────
  return (
    <div className="fs-app">

      {/* ══ MASTHEAD ═══════════════════════════════════════════════ */}
      <header className="fs-masthead">
        <div className="fs-masthead-inner">
          {/* Top strip */}
          <div className="fs-top-strip">
            <span className="fs-edition">India Edition</span>
            <span className="fs-date">{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span>
          </div>

          {/* Brand row */}
          <div className="fs-brand-row">
            <button className="fs-hamburger md-hide" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>

            <div className="fs-brand" onClick={()=>nav('home')}>
              <span className="fs-brand-main">Fan</span>
              <span className="fs-brand-accent">Sitter</span>
            </div>

            <div className="fs-brand-actions">
              <button className="fs-icon-btn" onClick={()=>{ setSearchOpen(s=>!s); nav('blogs'); }}>
                <Search size={20}/>
              </button>
            </div>
          </div>

          {/* Pillar nav */}
          <nav className="fs-pillar-nav">
            {Object.entries(PILLAR).map(([cat, p]) => (
              <button
                key={cat}
                className="fs-pillar-btn"
                style={{ '--pillar-color': p.bg }}
                onClick={()=>{ setActiveCluster(cat); nav('blogs'); }}
              >
                {p.label}
              </button>
            ))}
            <button className="fs-pillar-btn fs-pillar-all" onClick={()=>nav('about')}>
              About
            </button>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="fs-mobile-menu">
              {['home','blogs','about'].map(s=>(
                <button key={s} onClick={()=>nav(s)} className="fs-mobile-link">{s.charAt(0).toUpperCase()+s.slice(1)}</button>
              ))}
              <div className="fs-mobile-pillars">
                {Object.entries(PILLAR).map(([cat,p])=>(
                  <button key={cat} className="fs-mobile-pillar" style={{background:p.bg}}
                    onClick={()=>{ setActiveCluster(cat); nav('blogs'); }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search bar */}
      {searchOpen && (
        <div className="fs-search-bar">
          <div className="fs-search-inner">
            <Search size={18} className="fs-search-icon"/>
            <input
              autoFocus
              type="text"
              placeholder="Search Fan Sitter…"
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              className="fs-search-input"
            />
            {searchQuery && <button className="fs-search-clear" onClick={()=>setSearchQuery('')}><X size={16}/></button>}
          </div>
        </div>
      )}

      {/* ══ MAIN ═══════════════════════════════════════════════════ */}
      <main className="fs-main">

        {/* ── HOME ─────────────────────────────────────────────── */}
        {activeSection === 'home' && !selectedBlog && (
          <div>

            {/* Breaking banner */}
            <div className="fs-breaking">
              <span className="fs-breaking-badge"><Flame size={12}/> Trending</span>
              <span className="fs-breaking-text">
                {displayBlogs.sort((a,b)=>(b.reads||0)-(a.reads||0))[0]?.title}
              </span>
            </div>

            {/* Hero grid */}
            <div className="fs-hero-grid">

              {/* Main feature */}
              {featured && (
                <article className="fs-hero-lead" onClick={()=>setSelectedBlog(featured)}>
                  <div className="fs-hero-img" style={{background: featured.gradient || GRADIENTS[0]}}>
                    <div className="fs-hero-img-overlay"/>
                    <div className="fs-hero-img-content">
                      <PillarTag cat={featured.category}/>
                      <h1 className="fs-hero-title">{featured.title}</h1>
                      <p className="fs-hero-excerpt">{featured.excerpt}</p>
                      <div className="fs-hero-meta">
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span>{fmtDate(featured.date)}</span>
                        <span>·</span>
                        <span>{(featured.reads||0).toLocaleString()} reads</span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Secondary stack */}
              <div className="fs-hero-stack">
                {secondary.map((blog, i) => (
                  <article key={blog.id||blog._id||i} className="fs-stack-card" onClick={()=>setSelectedBlog(blog)}>
                    <div className="fs-stack-img" style={{background: blog.gradient || GRADIENTS[i+1]}}/>
                    <div className="fs-stack-body">
                      <PillarTag cat={blog.category}/>
                      <h3 className="fs-stack-title">{blog.title}</h3>
                      <p className="fs-stack-meta">{blog.author} · {fmtDate(blog.date)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ── AI CLUSTERS ──────────────────────────────────── */}
            <div className="fs-clusters-section">
              <div className="fs-clusters-header">
                <TrendingUp size={18}/>
                <span>Topics · AI Clustered</span>
              </div>

              {clusters.map(({ category, articles }) => {
                const p = getPillar(category);
                return (
                  <section key={category} className="fs-cluster">
                    <div className="fs-cluster-head" style={{borderColor: p.bg}}>
                      <h2 className="fs-cluster-title" style={{color: p.bg}}>{category}</h2>
                      <button className="fs-cluster-more" style={{color: p.bg}}
                        onClick={()=>{ setActiveCluster(category); nav('blogs'); }}>
                        All {category} <ChevronRight size={14}/>
                      </button>
                    </div>

                    <div className="fs-cluster-grid">
                      {articles.slice(0,3).map((blog,i)=>(
                        <article key={blog.id||blog._id||i} className="fs-cluster-card"
                          onClick={()=>setSelectedBlog(blog)}>
                          {i === 0 && (
                            <div className="fs-cluster-card-img" style={{background: blog.gradient || p.bg}}>
                              <div className="fs-cluster-card-overlay"/>
                            </div>
                          )}
                          <div className={`fs-cluster-card-body ${i===0?'fs-cluster-card-body--lead':''}`}>
                            <span className="fs-cluster-num" style={{color: p.bg}}>0{i+1}</span>
                            <h3 className="fs-cluster-card-title">{blog.title}</h3>
                            {i===0 && <p className="fs-cluster-card-excerpt">{blog.excerpt}</p>}
                            <div className="fs-cluster-card-meta">
                              <span>{blog.author}</span>
                              <span>{(blog.reads||0).toLocaleString()} reads</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Stats ribbon */}
            <div className="fs-stats-ribbon">
              {[
                { icon: <BookOpen size={20}/>, label:'Articles', value: displayBlogs.length+'+' },
                { icon: <User size={20}/>,     label:'Readers',  value:'12K+' },
                { icon: <TrendingUp size={20}/>,label:'Impact',  value:'Growing' },
              ].map((s,i)=>(
                <div key={i} className="fs-stat">
                  {s.icon}
                  <span className="fs-stat-value">{s.value}</span>
                  <span className="fs-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BLOGS LIST ───────────────────────────────────────── */}
        {activeSection === 'blogs' && !selectedBlog && (
          <div className="fs-blogs-page">

            {/* Section header */}
            <div className="fs-blogs-header">
              <h1 className="fs-blogs-heading">
                {activeCluster ? activeCluster : 'All Articles'}
              </h1>
              {activeCluster && (
                <button className="fs-clear-cluster" onClick={()=>setActiveCluster(null)}>
                  <X size={14}/> Clear filter
                </button>
              )}
              <p className="fs-blogs-sub">Exploring and addressing critical social issues</p>
            </div>

            {/* Category pills */}
            <div className="fs-category-pills">
              <button
                className={`fs-pill ${!activeCluster ? 'fs-pill--active' : ''}`}
                onClick={()=>setActiveCluster(null)}
              >All</button>
              {Object.entries(PILLAR).map(([cat,p])=>(
                <button key={cat}
                  className={`fs-pill ${activeCluster===cat?'fs-pill--active':''}`}
                  style={activeCluster===cat?{background:p.bg,color:'#fff',borderColor:p.bg}:{borderColor:p.bg,color:p.bg}}
                  onClick={()=>setActiveCluster(cat===activeCluster?null:cat)}
                >{cat}</button>
              ))}
            </div>

            {loading && (
              <div className="fs-loading">
                {[1,2,3,4].map(i=>(
                  <div key={i} className="fs-skeleton">
                    <div className="fs-skel-img"/>
                    <div className="fs-skel-lines">
                      <div className="fs-skel-line fs-skel-line--wide"/>
                      <div className="fs-skel-line"/>
                      <div className="fs-skel-line fs-skel-line--short"/>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && (
              <div className="fs-articles-grid">
                {(activeCluster
                  ? filteredBlogs.filter(b=>b.category===activeCluster)
                  : filteredBlogs
                ).map((blog, i) => {
                  const p = getPillar(blog.category);
                  return (
                    <article key={blog.id||blog._id||i} className="fs-article-card"
                      onClick={()=>setSelectedBlog(blog)}>
                      <div className="fs-article-img" style={{background: blog.gradient || p.bg}}>
                        <div className="fs-article-img-overlay"/>
                        <PillarTag cat={blog.category}/>
                      </div>
                      <div className="fs-article-body">
                        <h3 className="fs-article-title">{blog.title}</h3>
                        <p className="fs-article-excerpt">{blog.excerpt}</p>
                        <div className="fs-article-foot">
                          <span className="fs-article-author"><User size={12}/>{blog.author}</span>
                          <span className="fs-article-reads">{(blog.reads||0).toLocaleString()} reads</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading && filteredBlogs.length === 0 && (
              <div className="fs-empty">
                <Search size={36}/>
                <p>No articles found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* ── ABOUT ────────────────────────────────────────────── */}
        {activeSection === 'about' && !selectedBlog && (
          <div className="fs-about">
            <div className="fs-about-hero">
              <h1 className="fs-about-title">About Fan Sitter</h1>
              <p className="fs-about-sub">A platform for voices that matter.</p>
            </div>

            <div className="fs-about-grid">
              <div className="fs-about-main">
                <section className="fs-about-section">
                  <h2>Mission</h2>
                  <p>Fan Sitter is dedicated to exploring and addressing critical social issues that affect our communities. Through research-backed articles and personal narratives, we raise awareness, inspire conversations, and catalyse meaningful change.</p>
                </section>

                <section className="fs-about-section">
                  <h2>Focus Areas</h2>
                  <ul className="fs-focus-list">
                    {Object.entries(PILLAR).map(([cat,p])=>(
                      <li key={cat} className="fs-focus-item">
                        <span className="fs-focus-dot" style={{background:p.bg}}/>
                        <div>
                          <strong style={{color:p.text}}>{cat}</strong>
                          <p>Evidence-based writing on {cat.toLowerCase()} in contemporary India.</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="fs-about-section">
                  <h2>Author</h2>
                  <div className="fs-author-card">
                    <div className="fs-author-avatar">FS</div>
                    <div>
                      <p className="fs-author-name">Fan Sitter Editorial</p>
                      <p className="fs-author-role">Social Issues Advocates & Writers</p>
                      <p className="fs-author-bio">Passionate about social change, gender equality, and building a more just society. We share insights and foster conversations on issues that matter.</p>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="fs-about-sidebar">
                <div className="fs-contact-box">
                  <h3>Get in Touch</h3>
                  <p>Have feedback or want to collaborate?</p>
                  <button className="fs-contact-btn">Send Email</button>
                  <button className="fs-contact-btn fs-contact-btn--outline">Share Page</button>
                </div>

                <div className="fs-cluster-nav-box">
                  <h3>Browse by Topic</h3>
                  {Object.entries(PILLAR).map(([cat,p])=>(
                    <button key={cat} className="fs-topic-link"
                      style={{'--tc':p.bg}}
                      onClick={()=>{ setActiveCluster(cat); nav('blogs'); }}>
                      <span className="fs-topic-dot" style={{background:p.bg}}/>
                      {cat} <ChevronRight size={13}/>
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ── ARTICLE DETAIL ────────────────────────────────────── */}
        {selectedBlog && (
          <div className="fs-article-detail">
            <button className="fs-back-btn" onClick={()=>setSelectedBlog(null)}>
              ← Back
            </button>

            {/* Hero */}
            <div className="fs-detail-hero" style={{background: selectedBlog.gradient || GRADIENTS[0]}}>
              <div className="fs-detail-hero-overlay">
                <PillarTag cat={selectedBlog.category}/>
                <h1 className="fs-detail-title">{selectedBlog.title}</h1>
                <div className="fs-detail-meta">
                  <span><User size={14}/>{selectedBlog.author}</span>
                  <span><Calendar size={14}/>{fmtDate(selectedBlog.date)}</span>
                  <span>{(selectedBlog.reads||0).toLocaleString()} reads</span>
                </div>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="fs-detail-layout">
              <article className="fs-detail-content">
                {/* Standfirst */}
                <p className="fs-standfirst">{selectedBlog.excerpt}</p>
                <hr className="fs-divider"/>

                {/* Body */}
                <div className="fs-body-text">
                  {selectedBlog.content?.split('\n\n').map((para,i)=>(
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Engagement */}
                <div className="fs-engagement">
                  <button
                    className={`fs-eng-btn ${likedPosts[selectedBlog.id||selectedBlog._id]?'fs-eng-btn--liked':''}`}
                    onClick={()=>handleLike(selectedBlog.id||selectedBlog._id)}>
                    <Heart size={18} fill={likedPosts[selectedBlog.id||selectedBlog._id]?'currentColor':'none'}/>
                    {likedPosts[selectedBlog.id||selectedBlog._id]?'Liked':'Like'}
                  </button>
                  <button className="fs-eng-btn" onClick={()=>handleShare(selectedBlog.title)}>
                    <Share2 size={18}/> Share
                  </button>
                  <button className="fs-eng-btn" onClick={()=>document.getElementById('comment-box')?.scrollIntoView({behavior:'smooth'})}>
                    <MessageCircle size={18}/> Comment
                  </button>
                </div>

                {/* Comments */}
                <div id="comment-box" className="fs-comments">
                  <h3 className="fs-comments-heading">
                    <MessageCircle size={18}/>
                    Comments ({allComments(selectedBlog).length})
                  </h3>

                  {allComments(selectedBlog).map((c,i)=>(
                    <div key={i} className="fs-comment">
                      <div className="fs-comment-avatar">{c.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <p className="fs-comment-name">{c.name}</p>
                        <p className="fs-comment-text">{c.text}</p>
                      </div>
                    </div>
                  ))}

                  <div className="fs-comment-form">
                    <h4>Leave a Comment</h4>
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={commenterName}
                      onChange={e=>setCommenterName(e.target.value)}
                      className="fs-comment-input"
                    />
                    <textarea
                      placeholder="Share your thoughts…"
                      value={comment}
                      onChange={e=>setComment(e.target.value)}
                      className="fs-comment-textarea"
                      rows={4}
                    />
                    <button className="fs-comment-submit"
                      onClick={()=>handleComment(selectedBlog.id||selectedBlog._id)}>
                      Post Comment <ArrowRight size={15}/>
                    </button>
                  </div>
                </div>
              </article>

              {/* Sidebar: related */}
              <aside className="fs-detail-sidebar">
                <div className="fs-related-box">
                  <h3 className="fs-related-heading">Related Articles</h3>
                  {displayBlogs
                    .filter(b=>(b.id||b._id)!==(selectedBlog.id||selectedBlog._id) && b.category===selectedBlog.category)
                    .slice(0,3)
                    .map((b,i)=>(
                      <button key={i} className="fs-related-item" onClick={()=>setSelectedBlog(b)}>
                        <div className="fs-related-dot" style={{background: getPillar(b.category).bg}}/>
                        <span>{b.title}</span>
                      </button>
                    ))
                  }
                  {displayBlogs.filter(b=>(b.id||b._id)!==(selectedBlog.id||selectedBlog._id)&&b.category===selectedBlog.category).length===0 && (
                    <p className="fs-related-empty">No related articles yet.</p>
                  )}
                </div>

                <div className="fs-all-topics-box">
                  <h3 className="fs-related-heading">All Topics</h3>
                  {clusters.map(({category})=>{
                    const p=getPillar(category);
                    return (
                      <button key={category} className="fs-topic-chip"
                        style={{borderColor:p.bg,color:p.bg}}
                        onClick={()=>{ setActiveCluster(category); setSelectedBlog(null); nav('blogs'); }}>
                        {category}
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* ══ FOOTER ═════════════════════════════════════════════════ */}
      <footer className="fs-footer">
        <div className="fs-footer-inner">
          <div className="fs-footer-brand">
            <span className="fs-footer-logo">Fan<span>Sitter</span></span>
            <p>Building awareness, driving change.</p>
          </div>
          <div className="fs-footer-cols">
            {[
              { head:'Content', links:['All Articles','Categories','Archive'] },
              { head:'Connect', links:['Twitter','LinkedIn','Email'] },
              { head:'Legal',   links:['Privacy Policy','Terms of Use','Contact'] },
            ].map(col=>(
              <div key={col.head}>
                <p className="fs-footer-col-head">{col.head}</p>
                <ul>{col.links.map(l=><li key={l}><button>{l}</button></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="fs-footer-bar">
          <p>© 2024 Fan Sitter. All rights reserved. Built with passion for change.</p>
        </div>
      </footer>
    </div>
  );
}

// ── Pillar tag component ─────────────────────────────────────────
function PillarTag({ cat }) {
  const p = getPillar(cat);
  return (
    <span className="fs-pillar-tag" style={{background: p.bg}}>
      {p.label}
    </span>
  );
}