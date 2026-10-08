import { site } from '../data/site'
import { Link } from './Link'

const navItems = [
  { to: '/schedule', label: '순서', full: '발표회 순서' },
  { to: '/map', label: '지도', full: '학교 안내지도' },
  { to: '/lessons', label: '지도안', full: '수업 지도안' },
  { to: '/feedback', label: '의견', full: '참관 의견' },
  { to: '/resources', label: '자료', full: '일반화 자료' },
]

export function Layout({ routeName, children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-kicker">연구학교 발표회</span>
          <span className="brand-name">{site.schoolName}</span>
        </Link>
      </header>

      <nav className="top-nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={routeName === item.to.slice(1) || (routeName === 'lesson' && item.to === '/lessons') ? 'active' : ''}
          >
            {item.full}
          </Link>
        ))}
      </nav>

      <main className="page">{children}</main>

      <nav className="bottom-nav" aria-label="모바일 메뉴">
        {navItems.map((item) => {
          const active =
            routeName === item.to.slice(1) || (routeName === 'lesson' && item.to === '/lessons')
          return (
            <Link key={item.to} to={item.to} className={active ? 'active' : ''}>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function PageHeader({ title, description }) {
  return (
    <div className="page-header">
      <Link to="/" className="back-link">
        ← 처음 화면
      </Link>
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
