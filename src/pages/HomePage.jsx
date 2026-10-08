import { site } from '../data/site'
import { Link } from '../components/Link'

const menus = [
  {
    to: '/schedule',
    title: '발표회 순서 안내',
    desc: '시간, 내용, 장소를 한눈에 확인합니다.',
  },
  {
    to: '/map',
    title: '학교 안내지도',
    desc: '공개수업 교실과 주요 장소를 찾습니다.',
  },
  {
    to: '/lessons',
    title: '수업 지도안',
    desc: '공개수업 주제와 학습 흐름을 봅니다.',
  },
  {
    to: '/feedback',
    title: '수업 참관 의견 작성',
    desc: '참관한 수업에 대한 의견을 남깁니다.',
  },
  {
    to: '/resources',
    title: '연구학교 일반화 자료',
    desc: '연구 성과와 활용 자료를 확인합니다.',
  },
]

export function HomePage() {
  return (
    <section className="home">
      <div className="hero-card">
        <p className="eyebrow">방문 교사 안내</p>
        <h1>{site.eventTitle}</h1>
        <p className="school">{site.schoolName}</p>
        <p className="date">{site.eventDate}</p>
        <p className="welcome">{site.welcome}</p>
      </div>

      <h2 className="section-label">메뉴</h2>
      <ul className="menu-list">
        {menus.map((item, index) => (
          <li key={item.to}>
            <Link to={item.to} className="menu-card">
              <span className="menu-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="menu-text">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </span>
              <span className="menu-go" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
