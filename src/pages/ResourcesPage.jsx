import { PageHeader } from '../components/Layout'
import { resources } from '../data/resources'
import { asset } from '../lib/assets'

export function ResourcesPage() {
  return (
    <section>
      <PageHeader
        title="연구학교 일반화 자료"
        description="연구학교에서 제작한 자료를 확인하고 내려받을 수 있습니다."
      />
      <ul className="card-grid">
        {resources.map((item) => (
          <li key={item.id} className="info-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            {item.file ? (
              <a className="btn" href={asset(item.file)} target="_blank" rel="noreferrer">
                자료 보기
              </a>
            ) : (
              <p className="hint">자료 파일은 추후 연결됩니다.</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
