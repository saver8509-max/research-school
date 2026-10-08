import { PageHeader } from '../components/Layout'
import { Link } from '../components/Link'
import { getLessonById } from '../data/lessons'
import { asset } from '../lib/assets'

export function LessonPlanPage({ id }) {
  const lesson = getLessonById(id)

  if (!lesson) {
    return (
      <section>
        <PageHeader title="수업 지도안" />
        <div className="card empty">
          <p>해당 수업을 찾을 수 없습니다.</p>
          <Link to="/lessons" className="btn">
            수업 목록으로
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <PageHeader title="웹페이지용 수업 지도안" description={`${lesson.grade} · ${lesson.subject}`} />

      <article className="card plan-meta">
        <p className="badge">{lesson.subject}</p>
        <h2>{lesson.plan.topic}</h2>
        <p>
          {lesson.place} · {lesson.time}
        </p>
      </article>

      <section className="block">
        <h3>1. 수업 주제</h3>
        <div className="card">
          <p className="lead">{lesson.plan.topic}</p>
        </div>
      </section>

      <section className="block">
        <h3>2. 학습 목표</h3>
        <ul className="goal-list">
          {lesson.plan.goals.length === 0 ? <li className="card">지도안 등록 예정</li> : null}
          {lesson.plan.goals.map((goal) => (
            <li key={goal} className="card">
              {goal}
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h3>3. 교수·학습 과정</h3>
        <div className="process">
          {lesson.plan.process.length === 0 ? <p className="card">지도안 등록 예정</p> : null}
          {lesson.plan.process.map((step, index) => (
            <div key={step.stage}>
              {index > 0 ? (
                <div className="flow-arrow" aria-hidden>
                  ↓
                </div>
              ) : null}
              <section className="stage">
                <header className="stage-head">
                  <h4>{step.stage}</h4>
                  {step.duration ? <span>{step.duration}</span> : null}
                </header>
                <ul className="activity-list">
                  {step.activities.map((activity) => (
                    <li key={activity.title} className="card activity-card">
                      <strong>{activity.title}</strong>
                      <p>{activity.detail}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ))}
        </div>
      </section>

      <div className="pdf-row">
        {lesson.pdf ? (
          <a className="btn" href={asset(lesson.pdf)} target="_blank" rel="noreferrer">
            원본 지도안 PDF 보기
          </a>
        ) : (
          <button type="button" className="btn" disabled>
            원본 지도안 PDF 보기
          </button>
        )}
        <Link to="/lessons" className="btn btn-ghost">
          다른 수업 보기
        </Link>
      </div>
      {lesson.pdf ? null : (
        <p className="hint">
          원본 PDF는 public/materials/lessons/ 에 파일을 넣은 뒤 수업 데이터에 경로를 연결하면 열립니다.
        </p>
      )}
    </section>
  )
}
