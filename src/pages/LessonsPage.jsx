import { PageHeader } from '../components/Layout'
import { Link } from '../components/Link'
import { lessons } from '../data/lessons'

export function LessonsPage() {
  return (
    <section>
      <PageHeader
        title="수업 지도안"
        description="공개수업별 정보를 확인하고 웹페이지용 지도안을 열어 보세요."
      />
      <ul className="card-grid">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="info-card">
            <p className="badge">{lesson.subject}</p>
            <h2>{lesson.grade}</h2>
            <dl>
              <div>
                <dt>수업 장소</dt>
                <dd>{lesson.place}</dd>
              </div>
              <div>
                <dt>수업 시간</dt>
                <dd>{lesson.time}</dd>
              </div>
            </dl>
            <Link to={`/lessons/${lesson.id}`} className="btn">
              수업 지도안 보기
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
