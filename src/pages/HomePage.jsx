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
    title: '연구학교 운영 성과 나눔 자료',
    desc: '보고서, 일반화 자료, 패들렛, 리플렛을 확인합니다.',
  },
]

export function HomePage() {
  return (
    <section className="home">
      <div className="hero-card">
        <p className="eyebrow">{site.schoolName} | 2026 연구학교 운영 성과 발표회</p>
        <h1 className="research-title"><span>「잇다 프로그램」 적용을 통한</span><strong>학생 문해력·수리력 신장 방안 연구</strong></h1>
        <p className="date event-date">2026. 11. 12.(목)</p>
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
