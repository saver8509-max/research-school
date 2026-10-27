import { PageHeader } from '../components/Layout'
import { Link } from '../components/Link'
import { lessons } from '../data/lessons'

export function LessonsPage() {
  return (
    <section>
      <PageHeader
        title="수업 지도안"
        description="학급별 프로젝트 과정과 공개수업 활동을 확인하고 원본 PDF를 다운로드하세요."
      />
      <ul className="card-grid">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="info-card">
            <p className="badge">{lesson.period}</p>
            <h2>{lesson.grade}</h2>
            <p>{lesson.project.title}</p>
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
              프로젝트 및 공개수업 보기
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
