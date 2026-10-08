import { PageHeader } from '../components/Layout'
import { schedule } from '../data/schedule'

export function SchedulePage() {
  return (
    <section>
      <PageHeader
        title="발표회 순서 안내"
        description="오늘 발표회의 진행 순서를 시간 흐름에 따라 안내합니다."
      />
      <ol className="timeline">
        {schedule.map((item, index) => (
          <li key={item.id} className="timeline-item">
            <div className="timeline-mark" aria-hidden>
              <span>{index + 1}</span>
            </div>
            <article className="card">
              <p className="meta-time">{item.time}</p>
              <h2>{item.title}</h2>
              <p className="place">{item.place}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
