import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaClock, FaArrowRight, FaBrain, FaWaveSquare, FaVideo } from 'react-icons/fa'

const blogs = [
  {
  slug: '/blog/uncertainty-in-classification',
  cat: 'Machine Learning',
  date: 'September 12, 2026',
  read: '18 min read',
  title: 'Understanding Uncertainty in Classification — From Softmax to Evidential Deep Learning',
  excerpt: 'A practical introduction to uncertainty quantification in classification, covering softmax confidence, entropy, calibration, Bayesian uncertainty, deep ensembles, and Evidential Deep Learning.',
  tags: ['Uncertainty', 'Bayesian ML', 'EDL'],
  Icon: FaBrain,
  grad: 'g1',
  },
  {
    slug: '/blog/mamba-state-space-models',
    cat: 'Architecture',
    date: 'February 20, 2025',
    read: '16 min read',
    title: 'State Space Models & Mamba: The Transformer Alternative',
    excerpt: 'Exploring the mathematics behind State Space Models and how the Mamba architecture achieves linear-time sequence modeling — challenging the Transformer\'s dominance in long-context tasks.',
    tags: ['Mamba', 'SSM', 'Sequence Modeling'],
    Icon: FaWaveSquare,
    grad: 'g4',
  },
  // {
  //   slug: '/blog/ai-research-vlog',
  //   cat: 'Vlog',
  //   date: 'March 5, 2025',
  //   read: '5 min watch',
  //   title: 'A Week in the Life of an AI Researcher',
  //   excerpt: 'A candid behind-the-scenes look at what research actually looks like — paper reading sessions, failed experiments, debugging models at 2am, and the small wins that keep you going.',
  //   tags: ['Research Life', 'AI', 'Vlog'],
  //   Icon: FaVideo,
  //   grad: 'g3',
  // },
]

export default function Blogs() {
  return (
    <section id="blogs" className="section">
      <div className="container">
        <div className="s-head">
          <p className="s-label">My Writing</p>
          <h2 className="s-title">Blog</h2>
          <p className="s-sub">Tutorials, insights, and deep-dives on AI &amp; ML</p>
        </div>

        <div className="blogs-grid">
          {blogs.map(({ slug, cat, date, read, title, excerpt, tags, Icon, grad }) => (
            <Link key={slug} to={slug} target="_blank" className="blog-card reveal" style={{ textDecoration: 'none' }}>
              <div className="blog-cover">
                <div className={`blog-cover-bg ${grad}`}>
                  <Icon style={{ color: '#fff', opacity: .9 }} />
                </div>
                <span className="blog-cat-badge">{cat}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span><FaCalendarAlt /> {date}</span>
                  <span><FaClock /> {read}</span>
                </div>
                <h3 className="blog-title">{title}</h3>
                <p className="blog-excerpt">{excerpt}</p>
                <div className="blog-tags">
                  {tags.map(t => <span className="blog-tag" key={t}>{t}</span>)}
                </div>
                <span className="blog-more">
                  {cat === 'Vlog' ? 'Watch Vlog' : 'Read Article'} <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
