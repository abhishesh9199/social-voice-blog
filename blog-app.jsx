import React, { useState, useEffect } from 'react';
import { Menu, X, Search, MessageCircle, Share2, Heart, Calendar, User, ArrowRight } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function BlogApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fallback blogs if API fails
  const defaultBlogs = [
    {
      id: 1,
      title: "The Silent Burden: Understanding Dowry System in Modern India",
      excerpt: "Dowry remains one of the most persistent social evils in our society. Let's explore its origins, consequences, and pathways to change.",
      date: "May 18, 2024",
      author: "Your Name",
      category: "Social Issues",
      reads: 2847,
      image: "bg-gradient-to-r from-purple-500 to-pink-500",
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
Change requires collective action—legal reforms, community awareness, education, and economic empowerment of women. We must challenge the narrative that associates a woman's worth with material possessions.

Call to Action:
Support organizations fighting dowry-related abuse. Speak up against dowry demands in your communities. Education and awareness are the first steps toward change.`,
      comments: [
        { name: "Priya Sharma", text: "Powerful message. We need more voices speaking against this practice." },
        { name: "Amit Kumar", text: "This issue affects my extended family too. Great perspective." }
      ]
    },
    {
      id: 2,
      title: "Women's Economic Empowerment: Breaking the Chains",
      excerpt: "Economic independence is the strongest weapon against exploitation. How can we empower women financially and socially?",
      date: "May 15, 2024",
      author: "Your Name",
      category: "Social Issues",
      reads: 1952,
      image: "bg-gradient-to-r from-green-500 to-teal-500",
      content: `Women's economic empowerment is not just about earning money—it's about dignity, autonomy, and freedom.

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

The intersection of women's economic empowerment with dowry is crucial—economically independent women are less likely to be exploited.`,
      comments: []
    },
    {
      id: 3,
      title: "Child Marriage: A Violation That Steals Futures",
      excerpt: "When children are married off before reaching adulthood, their dreams, education, and health suffer. Understanding the urgency of ending child marriage.",
      date: "May 10, 2024",
      author: "Your Name",
      category: "Social Issues",
      reads: 3421,
      image: "bg-gradient-to-r from-red-500 to-orange-500",
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
The Prohibition of Child Marriage Act (2006) sets 18 as the minimum age for marriage. However, implementation remains weak with high rates of unregistered marriages.

Why It Happens:
- Poverty and economic insecurity
- Dowry-related pressures
- Gender inequality and patriarchal norms
- Lack of education and awareness

Solutions:
1. Enforce legal frameworks strictly
2. Invest in girls' education
3. Economic support to vulnerable families
4. Community awareness programs
5. Empower local governance to monitor and prevent

Change is possible when communities unite against this practice.`,
      comments: []
    },
    {
      id: 4,
      title: "Domestic Violence: Breaking the Cycle of Silence",
      excerpt: "Behind closed doors, many suffer in silence. Let's understand domestic violence and create safe spaces for survivors.",
      date: "May 5, 2024",
      author: "Your Name",
      category: "Social Issues",
      reads: 2534,
      image: "bg-gradient-to-r from-blue-500 to-indigo-500",
      content: `Domestic violence is a pervasive problem affecting millions globally. In India, 1 in 3 women experience physical or sexual violence.

Types of Abuse:
- Physical violence
- Psychological and emotional abuse
- Sexual abuse
- Economic control
- Social isolation

The Cycle:
Abuse typically follows a cycle: tension building, incident, reconciliation, calm. Understanding this helps survivors recognize patterns.

Impact on Families:
- Children exposed to violence develop behavioral and psychological issues
- Intergenerational trauma
- Disrupted family structures

Legal Protections:
The Domestic Violence Act (2005) provides comprehensive protection and remedies for women.

Breaking Free:
1. Recognize warning signs
2. Build support networks
3. Access legal assistance
4. Utilize shelter homes and counseling
5. Report to authorities

For Supporters:
Listen without judgment, support survivors' decisions, help them access resources, and challenge perpetrators.

Resources are available, and recovery is possible.`,
      comments: []
    },
    {
      id: 5,
      title: "Gender Equality in Education: Building Future Leaders",
      excerpt: "Education is the foundation for equality. Examining how we can ensure equal educational opportunities for all genders.",
      date: "April 28, 2024",
      author: "Your Name",
      category: "Social Issues",
      reads: 1876,
      image: "bg-gradient-to-r from-yellow-500 to-amber-500",
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
6. Create STEM opportunities for girls

Success Models:
Countries that invested in girls' education (Rwanda, Vietnam) show remarkable development.

Education is not just a right—it's a responsibility we owe to our future.`,
      comments: []
    }
  ];

  // Use fetched blogs or fallback to defaults
  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;
  
  const filteredBlogs = displayBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveSection('home'); setSelectedBlog(null); }}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                SV
              </div>
              <span className="font-bold text-lg text-slate-900 hidden sm:inline">Social Voice</span>
            </div>

            <div className="hidden md:flex gap-6">
              {['home', 'blogs', 'about'].map(item => (
                <button
                  key={item}
                  onClick={() => { setActiveSection(item); setSelectedBlog(null); }}
                  className={`capitalize font-medium transition-colors ${
                    activeSection === item
                      ? 'text-purple-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 flex flex-col gap-2">
              {['home', 'blogs', 'about'].map(item => (
                <button
                  key={item}
                  onClick={() => { setActiveSection(item); setSelectedBlog(null); setMobileMenuOpen(false); }}
                  className={`capitalize font-medium py-2 transition-colors text-left ${
                    activeSection === item
                      ? 'text-purple-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Home Section */}
        {activeSection === 'home' && !selectedBlog && (
          <div className="space-y-12">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 text-white">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Social Voice</h1>
              <p className="text-lg sm:text-xl text-purple-100 mb-8">
                Exploring social issues, championing change, and building awareness for a more equitable society.
              </p>
              <button
                onClick={() => setActiveSection('blogs')}
                className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Read Latest Articles
              </button>
            </div>

            {/* Featured Blog */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900">Featured</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-200">
                <div className={`h-48 sm:h-64 ${blogs[0].image}`}></div>
                <div className="p-6 sm:p-8">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {blogs[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{blogs[0].title}</h3>
                  <p className="text-slate-600 mb-4">{blogs[0].excerpt}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} /> {blogs[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={16} /> {blogs[0].author}
                    </span>
                    <span>{blogs[0].reads.toLocaleString()} reads</span>
                  </div>
                  <button
                    onClick={() => setSelectedBlog(blogs[0])}
                    className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
                  >
                    Read More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Articles Published', value: '5+' },
                { label: 'Active Readers', value: '12K+' },
                { label: 'Social Impact', value: 'Growing' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-slate-200 text-center">
                  <p className="text-slate-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs Section */}
        {activeSection === 'blogs' && !selectedBlog && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">All Articles</h1>
              <p className="text-slate-600 mb-6">Exploring and addressing critical social issues</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-slate-600">Loading articles...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            )}

            {/* Blog Grid */}
            {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map(blog => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-200 cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className={`h-40 ${blog.image}`}></div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{blog.date}</span>
                      <span>{blog.reads.toLocaleString()} reads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-slate-600">No articles found matching your search.</p>
              </div>
            )}
            )}
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && !selectedBlog && (
          <div className="max-w-3xl space-y-8">
            <h1 className="text-4xl font-bold text-slate-900">About This Blog</h1>

            <div className="bg-white p-8 rounded-lg border border-slate-200 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Mission</h2>
                <p className="text-slate-700 leading-relaxed">
                  Social Voice is dedicated to exploring and addressing critical social issues that affect our communities. Through research-backed articles and personal narratives, we aim to raise awareness, inspire conversations, and catalyze meaningful change.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Focus Areas</h2>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Dowry System:</strong> Understanding and fighting one of India's most persistent evils</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Women's Empowerment:</strong> Education, economic independence, and social rights</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Child Protection:</strong> Combating child marriage and ensuring safe childhoods</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Domestic Violence:</strong> Supporting survivors and breaking cycles of abuse</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Author</h2>
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    YN
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Your Name</p>
                    <p className="text-slate-600 text-sm">Social Issues Advocate & Writer</p>
                    <p className="text-slate-600 text-sm mt-2">
                      Passionate about social change, gender equality, and building a more just society. Through this blog, I share insights and foster conversations on issues that matter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold text-slate-900 mb-3">Get in Touch</h3>
                <p className="text-slate-700 mb-4">
                  Have feedback or want to collaborate? Reach out through social media or email.
                </p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Email
                  </button>
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Detail View */}
        {selectedBlog && (
          <div className="max-w-3xl mx-auto space-y-8">
            <button
              onClick={() => setSelectedBlog(null)}
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2 mb-4"
            >
              ← Back to Articles
            </button>

            <div className={`h-64 sm:h-96 ${selectedBlog.image} rounded-lg`}></div>

            <div>
              <div className="flex gap-2 mb-4">
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {selectedBlog.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">{selectedBlog.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 pb-6 border-b border-slate-200">
                <span className="flex items-center gap-1">
                  <User size={16} /> {selectedBlog.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} /> {selectedBlog.date}
                </span>
                <span>{selectedBlog.reads.toLocaleString()} reads</span>
              </div>
            </div>

            <div className="prose prose-sm sm:prose max-w-none text-slate-700 space-y-4">
              {selectedBlog.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Engagement */}
            <div className="border-y border-slate-200 py-6 flex flex-wrap gap-6">
              <button className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                <Heart size={20} /> <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                <Share2 size={20} /> <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
                <MessageCircle size={20} /> <span className="text-sm">Comment</span>
              </button>
            </div>

            {/* Comments */}
            {selectedBlog.comments.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Comments ({selectedBlog.comments.length})</h3>
                {selectedBlog.comments.map((comment, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg">
                    <p className="font-semibold text-slate-900">{comment.name}</p>
                    <p className="text-slate-700 text-sm mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <div className="bg-slate-50 p-6 rounded-lg space-y-4">
              <h3 className="font-bold text-slate-900">Leave a Comment</h3>
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 text-sm"
                rows="4"
              ></textarea>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Post Comment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4"></div>
              <p className="font-bold text-white mb-2">Social Voice</p>
              <p className="text-sm">Building awareness, driving change.</p>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Content</p>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition-colors">All Articles</button></li>
                <li><button className="hover:text-white transition-colors">Categories</button></li>
                <li><button className="hover:text-white transition-colors">Archive</button></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Connect</p>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition-colors">Twitter</button></li>
                <li><button className="hover:text-white transition-colors">LinkedIn</button></li>
                <li><button className="hover:text-white transition-colors">Email</button></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white mb-4">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Use</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Social Voice. All rights reserved. Built with passion for change.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
