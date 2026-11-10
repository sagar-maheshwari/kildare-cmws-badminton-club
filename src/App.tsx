import { useEffect, useState, type KeyboardEvent } from 'react'
import {
  Menu, X, ArrowUpRight, ChevronLeft, CalendarDays, Users, Trophy, BookOpen,
  FileText, MapPin, Mail, Facebook, ChevronRight, Download,
  ExternalLink, ShieldCheck, Clock3, Dumbbell, Image as ImageIcon,
  HeartHandshake, Volleyball, Award, ClipboardList
} from 'lucide-react'

const facebookUrl = 'https://www.facebook.com/profile.php?id=100057039956153'
const baseUrl = import.meta.env.BASE_URL

const committee = [
  { role: 'Chairperson', name: 'Esther Brady' },
  { role: 'Vice Chairperson', name: 'David Thompson' },
  { role: 'Secretary', name: 'Teresa Harrington' },
  { role: 'Treasurer', name: 'Jennifer Kelly' },
  { role: 'Child Safety Officer', name: 'Michelle Vance' },
  { role: 'Committee Member', name: 'Roy Serviss' },
  { role: 'Committee Member', name: 'Kieran Downey' },
  { role: 'Committee Member', name: 'Sagar Maheshwari' },
  { role: 'Additional Committee Member', name: 'Sebastian Firsaev' },
]

const constitutionTopics = [
  ['1-3', 'Name, aim and objectives', 'The club encourages and fosters badminton, provides playing opportunities for all levels, coaching, competition and junior participation.'],
  ['4-14', 'Affiliation and membership', 'Affiliation, eligibility, membership categories, waiting lists, trial sessions, membership obligations and representation in competition.'],
  ['15-20', 'Club committee and officers', 'Committee structure, co-option, eligibility, financial records, authorised signatories and the Secretary’s administrative responsibilities.'],
  ['21-24', 'Meetings, rules and complaints', 'Committee changes, club rules, written complaints, disciplinary matters and constitutional amendments.'],
  ['25-31', 'AGMs, EGMs and voting', 'Quorum, voting eligibility, annual subscriptions, AGM agenda, notice periods and extraordinary meetings.'],
  ['32-34', 'Conduct and insurance', 'Badminton Ireland rules, the Code of Conduct and insurance information for eligible registered members.'],
]

const ruleTopics = [
  ['Membership fees', 'Full club fees are due from the start of the season. A payment schedule may be discussed with the Treasurer, over up to three payments.'],
  ['Membership preference', 'Full club membership is the first preference, followed by full payment of the membership amount less the BI registration fee where applicable.'],
  ['Trial sessions', 'Receipt of a nightly fee is discouraged after two nights of trial at club nights.'],
  ['Membership applications', 'Applications are assessed by the committee, with priority given in the order stated in the supplied rules.'],
  ['Club night courts', 'At least two courts will be kept for club play on club nights regardless of match schedules.'],
  ['Club night organisation', 'Club setup and games on club nights are organised by a random selection system.'],
  ['Team selection', 'Team selections are the responsibility of the committee. Teams may be entered in Southwest leagues and cups.'],
  ['Team captains', 'Captains coordinate match notifications, score sheets, shuttles, schedule changes, home-match contributions, supper arrangements and result reporting.'],
  ['Respect and fair play', 'Members are expected to treat other members, visitors and property with respect, and to observe fair play at all times.'],
  ['Keeping the club area tidy', 'All members are expected to keep the club area tidy during the club night.'],
  ['Complaints', 'Complaints about club organisation or other members must be put in writing to the Secretary for discussion by the Club Committee.'],
]

type Page = 'home' | 'playing' | 'club' | 'gallery' | 'resources' | 'documents' | 'contact'

const pageTitles: Record<Page, string> = {
  home: 'Home',
  playing: 'Playing schedule',
  club: 'Club',
  gallery: 'Club gallery',
  resources: 'Resources',
  documents: 'Documents',
  contact: 'Contact',
}

const galleryImages = [
  {
    src: 'dev 4 mens league winners 2018.jpg',
    alt: 'Division 4 mens league winners, 2018',
    caption: 'DDLC Div 4 Mens League Winners 2018',
  },
  {
    src: 'div 9 cup winners 2025.jpg',
    alt: 'Division 9 cup winners, 2025',
    caption: 'DDLC Div 9 Mixed Cup Winners 2025',
  },
  {
    src: 'div 9 league final winners 2025.jpg',
    alt: 'Division 9 league final winners, 2025',
    caption: 'DDLC Div 9 Mixed Leaguel Winners 2025',
  },
]

function getPageFromHash(): Page {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0] as Page
  return Object.prototype.hasOwnProperty.call(pageTitles, route) ? route : 'home'
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'constitution' | 'rules'>('constitution')
  const [page, setPage] = useState<Page>(getPageFromHash)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)

  const closeMenu = () => setMenuOpen(false)
  const handleDocumentTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let nextTab: 'constitution' | 'rules'
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        nextTab = activeTab === 'constitution' ? 'rules' : 'constitution'
        break
      case 'Home':
        nextTab = 'constitution'
        break
      case 'End':
        nextTab = 'rules'
        break
      default:
        return
    }
    event.preventDefault()
    setActiveTab(nextTab)
    document.getElementById(`${nextTab}-tab`)?.focus()
  }

  useEffect(() => {
    const syncPage = () => {
      const nextPage = getPageFromHash()
      setPage(nextPage)
      document.title = `${pageTitles[nextPage]} | Kildare CMWS Badminton Club`
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', syncPage)
    syncPage()
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    if (selectedGalleryIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleGalleryKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedGalleryIndex(null)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedGalleryIndex((selectedGalleryIndex + galleryImages.length - 1) % galleryImages.length)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedGalleryIndex((selectedGalleryIndex + 1) % galleryImages.length)
      }
    }

    window.addEventListener('keydown', handleGalleryKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleGalleryKeyDown)
    }
  }, [selectedGalleryIndex])

  const navItems = [
    ['Home', '#/home'], ['Playing schedule', '#/playing'], ['Club', '#/club'], ['Gallery', '#/gallery'], ['Resources', '#/resources'],
    ['Documents', '#/documents'], ['Contact', '#/contact']
  ]

  return (
    <div className="site-shell">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span><MapPin size={14} /> Kildare, County Kildare, Ireland</span>
          <a href={facebookUrl} target="_blank" rel="noreferrer"><Facebook size={14} /> Follow us on Facebook <ArrowUpRight size={13} /></a>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a className="brand" href="#/home" onClick={closeMenu} aria-label="Kildare CMWS home">
            <img src={`${baseUrl}assets/club-logo.jpg`} alt="Kildare CMWS Badminton Club logo" />
            <span><strong>Kildare CMWS</strong><small>BADMINTON CLUB</small></span>
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav id="primary-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu} aria-current={href === `#/${page}` ? 'page' : undefined}>{label}</a>)}
            <a className="nav-cta" href="#/contact" onClick={closeMenu} aria-current={page === 'contact' ? 'page' : undefined}>Get in touch <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main>
        {page === 'home' && <>
        <section className="hero" id="home">
          <div className="hero-court court-lines" aria-hidden="true">
            <div className="court-net" /><div className="court-circle" />
            <div className="shuttle-shape"><span /><span /><span /><b /></div>
          </div>
          <div className="container hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> COMMUNITY · COMPETITION · SPORT</div>
            <h1>More than a game.<br /><em>It's our community.</em></h1>
            <p className="hero-copy">A welcoming badminton club bringing players together in Kildare. Whether you're picking up a racket for the first time or competing in league matches, there's a place for you here.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#/contact">Get involved <ArrowUpRight size={17} /></a>
              <a className="button button-outline" href="#/playing">Explore the club <ChevronRight size={17} /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> PLAY · IMPROVE · BELONG</div>
          </div>
          <div className="hero-mark">KILDARE CMWS <span>BADMINTON CLUB</span></div>
        </section>

        <section className="quick-info">
          <div className="container quick-grid">
            <div className="quick-item"><span className="quick-icon"><Users /></span><div><b>All levels welcome</b><small>From beginners to competitors</small></div></div>
            <div className="quick-item"><span className="quick-icon"><Trophy /></span><div><b>Club competition</b><small>League, cups and club events</small></div></div>
            <div className="quick-item"><span className="quick-icon"><HeartHandshake /></span><div><b>Community first</b><small>Play, connect and belong</small></div></div>
          </div>
        </section>

        <section className="section intro-section" id="about">
          <div className="container intro-grid">
            <div>
              <div className="section-kicker">WELCOME TO KILDARE CMWS</div>
              <h2>A club built around<br /><em>the love of badminton.</em></h2>
            </div>
            <div className="intro-text">
              <p>Our aim is to encourage and foster the game of badminton and provide playing opportunities for all levels of play. We value coaching, fair competition, participation and the friendships that grow around the court.</p>
              <p>Whether your goal is to learn the basics, sharpen your doubles game or represent the club in competition, Kildare CMWS is about enjoying the sport together.</p>
              <a className="text-link" href="#/club">Discover the club <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
        </>}

        {page === 'playing' && <section className="section dark-section" id="playing">
          <div className="container">
            <div className="section-heading light-heading">
              <div><div className="section-kicker">FIND US ON COURT</div><h2>Where we <em>play.</em></h2></div>
              <p>Join us for club badminton in Kildare Town. We use two venues during the week, with league fixtures taking priority on selected evenings.</p>
            </div>
            <div className="venue-grid">
              <article className="venue-card">
                <div className="venue-number">01 / MONDAY</div>
                <div className="venue-icon"><MapPin size={22} /></div>
                <h3>Kildare Town Community School</h3>
                <p className="venue-address">Kildare Town, County Kildare</p>
                <div className="venue-detail"><Clock3 size={17} /><b>8:00 PM - 10:00 PM</b></div>
                <div className="venue-detail"><Volleyball size={17} /><b>4 courts</b></div>
                <span className="venue-tag">MONDAY CLUB NIGHT</span>
              </article>
              <article className="venue-card">
                <div className="venue-number">02 / TUESDAY & THURSDAY</div>
                <div className="venue-icon"><MapPin size={22} /></div>
                <h3>CMWS Hall</h3>
                <p className="venue-address">Kildare Town, County Kildare</p>
                <div className="venue-detail"><Clock3 size={17} /><b>8:00 PM - 11:00 PM</b></div>
                <div className="venue-detail"><Volleyball size={17} /><b>1 court</b></div>
                <span className="venue-tag">SUBJECT TO LEAGUE FIXTURES</span>
                <p className="venue-condition">Tuesday and Thursday club play takes place provided there are no league games scheduled.</p>
              </article>
            </div>
            <div className="venue-footnote"><CalendarDays size={15} /> Playing arrangements may vary around league fixtures. Check the club's Facebook page for updates. <a href={facebookUrl} target="_blank" rel="noreferrer">Visit Facebook <ArrowUpRight size={13} /></a></div>
            <div className="venue-visual-grid" aria-label="CMWS Hall and its location in Kildare Town">
              <figure className="venue-photo">
                <img src={`${baseUrl}assets/cmws-hall.jpg`} alt="Exterior of CMWS Hall in Kildare Town" loading="lazy" />
                <figcaption>CMWS HALL · OUR CLUB VENUE</figcaption>
              </figure>
              <figure className="venue-map">
                <img src={`${baseUrl}assets/cmws-hall-location-map.png`} alt="Map showing the location of CMWS Hall in Kildare Town" loading="lazy" />
                <figcaption>FIND US · KILDARE TOWN</figcaption>
              </figure>
            </div>
          </div>
        </section>}

        {page === 'club' && <>
        <section className="section club-section" id="club">
          <div className="container">
            <div className="section-heading">
              <div><div className="section-kicker">THE PEOPLE BEHIND THE CLUB</div><h2>Meet our <em>committee.</em></h2></div>
              <p>Our committee helps guide the club, support members and keep everything running smoothly throughout the season.</p>
            </div>
            <div className="committee-grid">
              {committee.map((person, index) => (
                <article className="committee-card" key={person.name}>
                  <div className="person-avatar">{person.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                  <div className="person-info"><span>{person.role}</span><h3>{person.name}</h3></div>
                  <span className="person-index">0{index + 1}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
        </>}

        {page === 'resources' && <section className="training-band" id="training">
          <div className="container resources-heading">
            <div><div className="section-kicker">LEARN · CONNECT · COMPETE</div><h2>Badminton <em>resources.</em></h2></div>
            <p>A collection of useful links for players, coaches and club organisers, bringing together coaching support, official badminton organisations and competition platforms.</p>
          </div>
          <div className="container resource-grid">
            <article className="resource-card">
              <span className="resource-index">01</span><div className="resource-icon"><BookOpen /></div>
              <h3>Coaching Video Resources</h3>
              <p>Build skills with beginner-friendly videos and structured coaching material from the Badminton World Federation.</p>
              <ul className="resource-link-list">
                <li><a href="https://youtube.com/playlist?list=PLYqPBxMmvqpIWYh7U9fCYQ-e6Ft1R7CWw&amp;si=EokwK3EANrPXhvlh" target="_blank" rel="noreferrer">BWF Shuttle Time Coaching Videos <ArrowUpRight size={14} /></a><small>Beginner-friendly school and club resources</small></li>
                <li><a href="https://youtube.com/playlist?list=PLYqPBxMmvqpJL5NP37SD3r_OEPLSsaW7L&amp;si=Dz3HYKGXa5ivGFEK" target="_blank" rel="noreferrer">BWF Level 1 Coaching Resources <ArrowUpRight size={14} /></a><small>Entry-level coaching framework</small></li>
                <li><a href="https://youtube.com/playlist?list=PLYqPBxMmvqpL2run_GKAQW5U-CXkTJUYk&amp;si=Hs0iUCKvayck74BU" target="_blank" rel="noreferrer">BWF Level 2 Coaching Resources <ArrowUpRight size={14} /></a><small>Intermediate coaching certification materials</small></li>
              </ul>
            </article>
            <article className="resource-card">
              <span className="resource-index">02</span><div className="resource-icon"><ShieldCheck /></div>
              <h3>Governing Bodies and Official Sites</h3>
              <p>Keep up with badminton at national, European and international level.</p>
              <ul className="resource-link-list">
                <li><a href="https://www.badmintonireland.com/home" target="_blank" rel="noreferrer">Badminton Ireland <ArrowUpRight size={14} /></a><small>National governing body</small></li>
                <li><a href="https://badmintoneurope.com" target="_blank" rel="noreferrer">Badminton Europe <ArrowUpRight size={14} /></a><small>Continental body for European badminton</small></li>
                <li><a href="https://bwfbadminton.com" target="_blank" rel="noreferrer">Badminton World Federation (BWF) <ArrowUpRight size={14} /></a><small>International governing body</small></li>
              </ul>
            </article>
            <article className="resource-card">
              <span className="resource-index">03</span><div className="resource-icon"><Trophy /></div>
              <h3>Competitions and Events</h3>
              <p>Find player registration, event entry, tournament schedules, draws and results.</p>
              <ul className="resource-link-list">
                <li><a href="https://badmintonireland.sport80.com/" target="_blank" rel="noreferrer">Sport80 <ArrowUpRight size={14} /></a><small>Player registration and event entry</small></li>
                <li><a href="https://bi.tournamentsoftware.com/#TabUpcoming" target="_blank" rel="noreferrer">Tournament Software <ArrowUpRight size={14} /></a><small>Tournament schedules, draws and results</small></li>
              </ul>
            </article>
          </div>
        </section>}

        {page === 'documents' && <section className="section documents-section" id="documents">
          <div className="container">
            <div className="section-heading">
              <div><div className="section-kicker">YOUR CLUB, YOUR INFORMATION</div><h2>Club <em>documents.</em></h2></div>
              <p>Access the club's governing document and playing rules. The club documents are available to view and download below.</p>
            </div>
            <div className="document-tabs" role="tablist" aria-label="Club documents">
              <button id="constitution-tab" className={activeTab === 'constitution' ? 'doc-tab active' : 'doc-tab'} onClick={() => setActiveTab('constitution')} onKeyDown={handleDocumentTabKeyDown} role="tab" aria-selected={activeTab === 'constitution'} aria-controls="constitution-panel" tabIndex={activeTab === 'constitution' ? 0 : -1}><ShieldCheck size={17} /> Constitution</button>
              <button id="rules-tab" className={activeTab === 'rules' ? 'doc-tab active' : 'doc-tab'} onClick={() => setActiveTab('rules')} onKeyDown={handleDocumentTabKeyDown} role="tab" aria-selected={activeTab === 'rules'} aria-controls="rules-panel" tabIndex={activeTab === 'rules' ? 0 : -1}><ClipboardList size={17} /> Club rules</button>
            </div>
            <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`} tabIndex={0}>
            {activeTab === 'constitution' ? (
              <div className="document-panel">
                <div className="document-cover constitution-cover"><div className="cover-logo"><img src={`${baseUrl}assets/club-logo.jpg`} alt="" /></div><span>OFFICIAL CLUB DOCUMENT</span><strong>Club<br />Constitution</strong><small>KILDARE CMWS BADMINTON CLUB</small><div className="cover-lines" /></div>
                <div className="document-details"><span className="doc-label">GOVERNANCE · 34 CLAUSES</span><h3>Club Constitution</h3><p>The constitution sets out the club's name, aims, membership, committee structure, meetings, voting arrangements, conduct and other governing provisions.</p><div className="doc-meta"><span><FileText size={15} /> 2 scanned pages</span><span><BookOpen size={15} /> Original supplied document</span></div><div className="doc-actions"><a className="button button-dark" href={`${baseUrl}documents/kildare-cmws-club-constitution.pdf`} target="_blank" rel="noreferrer">View PDF <ExternalLink size={15} /></a><a className="download-link" href={`${baseUrl}documents/kildare-cmws-club-constitution.pdf`} download><Download size={16} /> Download</a></div></div>
              </div>
            ) : (
              <div className="document-panel">
                <div className="document-cover rules-cover"><div className="cover-logo"><img src={`${baseUrl}assets/club-logo.jpg`} alt="" /></div><span>MEMBER GUIDANCE</span><strong>Club<br />Rules</strong><small>MEMBER GUIDANCE</small><div className="cover-lines" /></div>
                <div className="document-details"><span className="doc-label">MEMBERSHIP · PLAYING · TEAM RESPONSIBILITIES</span><h3>Club Rules</h3><p>Guidance covering membership fees, trial sessions, club-night arrangements, team selection, team captain responsibilities, respect, fair play and complaints.</p><div className="doc-meta"><span><FileText size={15} /> 2 scanned pages</span><span><BookOpen size={15} /> Original supplied document</span></div><div className="doc-actions"><a className="button button-dark" href={`${baseUrl}documents/kildare-cmws-club-rules.pdf`} target="_blank" rel="noreferrer">View PDF <ExternalLink size={15} /></a><a className="download-link" href={`${baseUrl}documents/kildare-cmws-club-rules.pdf`} download><Download size={16} /> Download</a></div></div>
              </div>
            )}
            <div className="constitution-summary">
              <div className="summary-heading"><div className="section-kicker">AT A GLANCE</div><h3>{activeTab === 'constitution' ? 'Inside the constitution' : 'Key club rules'}</h3></div>
              <div className="summary-list">
                {(activeTab === 'constitution' ? constitutionTopics : ruleTopics).map((item) => (
                  <div className="summary-row" key={item[0]}>
                    {activeTab === 'constitution' ? (
                      <><span className="summary-number">{item[0]}</span><div><b>{item[1]}</b><p>{item[2]}</p></div></>
                    ) : (
                      <div><b>{item[0]}</b><p>{item[1]}</p></div>
                    )}
                  </div>
                ))}
              </div>
              <p className="summary-disclaimer">This is a navigation summary only. The original PDF is the authoritative source for the complete wording.</p>
            </div>
            </div>
          </div>
        </section>}

        {page === 'club' && <section className="history-strip">
          <div className="container history-inner">
            <div className="history-icon"><Award size={28} /></div>
            <div className="history-intro"><span>ESTABLISHED 27 NOVEMBER 1973</span><h2>A proud history. A growing club. A love of badminton that brings generations together.</h2></div>
            <p>Kildare CYMS Badminton Club was formed in 1973. From its early league teams and strong juvenile section to today's club community, the club has continued to create opportunities for social and competitive players.</p>
          </div>
          <div className="container history-details">
            <article><span>1973</span><h3>Where it began</h3><p>The club was formed on 27 November 1973. In its early years it had as many as 60 players across different ages and grades, and entered teams in the South West Leinster League.</p></article>
            <article><span>1984</span><h3>All-Ireland final</h3><p>One of the club's most successful teams won the Grade 5 Cup, the Kildare League and the Leinster Intercounties, reaching the All-Ireland Final in Dublin.</p></article>
            <article><span>1990s</span><h3>People and tradition</h3><p>The club celebrated its 21st anniversary in 1994. Its history also includes a strong juvenile section, junior tournaments and the annual Mick Gannon Tournament in memory of a long-serving club coach.</p></article>
            <article><span>2012 ONWARDS</span><h3>A renewed club</h3><p>After a period when membership declined, the club renewed its focus on promoting badminton and building participation. The club's profile describes the growth of adult and junior sections and teams competing in Dublin District and South-West Leinster leagues and cups.</p></article>
            <article className="history-wide"><span>CLUB LEGACY</span><h3>Players, coaches and achievements</h3><p>The club's archive recognises the contributions of generations of players and volunteers. Esther Brady and Kathleen Kelly are noted for winning multiple Leinster doubles titles, while Esther also represented the county team. Coaching, junior development, club tournaments and social events have all played an important part in the club's story.</p></article>
          </div>
          <div className="container history-source">History adapted from the club's <a href="https://sites.google.com/site/kildarecmws/about-us/history?authuser=0" target="_blank" rel="noreferrer">historical archive</a> and <a href="https://sites.google.com/site/kildarecmws/about-us?authuser=0" target="_blank" rel="noreferrer">About Us page</a>. Membership figures and team counts from the older profile are historical snapshots, not current totals.</div>
        </section>}

        {page === 'gallery' && <section className="section gallery-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="section-kicker">MOMENTS FROM OUR CLUB</div><h2>Club <em>gallery.</em></h2></div>
              <p>Celebrating the people, teams and moments that make Kildare CMWS special.</p>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <figure className="gallery-card" key={image.src}>
                  <button className="gallery-image-button" type="button" onClick={() => setSelectedGalleryIndex(index)} aria-label={`Expand image: ${image.alt}`}>
                    <img src={`${baseUrl}assets/gallery/${image.src}`} alt={image.alt} loading="lazy" />
                  </button>
                  <figcaption className={image.caption ? 'gallery-caption' : 'gallery-caption gallery-caption-placeholder'}>
                    {image.caption || 'No caption provided.'}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>}

        {page === 'contact' && <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div><div className="section-kicker">COME AND SAY HELLO</div><h2>Ready to get<br /><em>in the game?</em></h2><p className="contact-lead">Interested in joining, trying a session or finding out more? Get in touch with the club and follow our updates.</p><a className="button button-dark" href={facebookUrl} target="_blank" rel="noreferrer"><Facebook size={17} /> Find us on Facebook <ArrowUpRight size={15} /></a></div>
            <div className="contact-card"><div className="contact-card-top"><span>GET IN TOUCH</span><Volleyball size={23} /></div><div className="contact-row"><span className="contact-icon"><Facebook /></span><div><small>FACEBOOK  </small><a href={facebookUrl} target="_blank" rel="noreferrer">Kildare CMWS Badminton Club <ArrowUpRight size={13} /></a></div></div><div className="contact-row"><span className="contact-icon"><Mail /></span><div><small>EMAIL</small><p>cmwsbckildare@gmail.com</p></div></div><div className="contact-row"><span className="contact-icon"><MapPin /></span><div><small>MONDAY · KILDARE TOWN COMMUNITY SCHOOL</small><p>8:00 PM - 10:00 PM · 4 courts</p></div></div>
              <div className="contact-row"><span className="contact-icon"><MapPin /></span><div><small>TUESDAY & THURSDAY · CMWS HALL</small><p>8:00 PM - 11:00 PM · 1 court<br /><small className="muted">Subject to there being no league games.</small></p></div></div><div className="contact-card-bottom">WE LOOK FORWARD TO MEETING YOU ON COURT.</div></div>
          </div>
        </section>}
      </main>

      {selectedGalleryIndex !== null && (() => {
        const image = galleryImages[selectedGalleryIndex]
        return (
          <div className="gallery-lightbox" onClick={() => setSelectedGalleryIndex(null)}>
            <div className="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label={image.alt} onClick={(event) => event.stopPropagation()}>
              <button className="gallery-lightbox-close" type="button" onClick={() => setSelectedGalleryIndex(null)} aria-label="Close image viewer"><X /></button>
              <div className="gallery-lightbox-content">
                <button className="gallery-lightbox-nav" type="button" onClick={() => setSelectedGalleryIndex((selectedGalleryIndex + galleryImages.length - 1) % galleryImages.length)} aria-label="Previous image"><ChevronLeft /></button>
                <figure className="gallery-lightbox-figure">
                  <img src={`${baseUrl}assets/gallery/${image.src}`} alt={image.alt} />
                  <figcaption className={image.caption ? 'gallery-lightbox-caption' : 'gallery-lightbox-caption gallery-caption-placeholder'}>
                    {image.caption || 'No caption provided.'}
                  </figcaption>
                </figure>
                <button className="gallery-lightbox-nav" type="button" onClick={() => setSelectedGalleryIndex((selectedGalleryIndex + 1) % galleryImages.length)} aria-label="Next image"><ChevronRight /></button>
              </div>
            </div>
          </div>
        )
      })()}

      <footer className="footer">
        <div className="container footer-main"><a className="footer-brand" href="#/home"><img src={`${baseUrl}assets/club-logo.jpg`} alt="" /><span><b>Kildare CMWS</b><small>BADMINTON CLUB</small></span></a><p>Play together. Compete together. Grow together.</p><div className="footer-social"><a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a><a href="#/home" aria-label="Back to top"><ArrowUpRight /></a></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Kildare CMWS Badminton Club</span><span className="developer-credit">Website developed by Sagar Maheshwari</span></div>
      </footer>
    </div>
  )
}

export default App
