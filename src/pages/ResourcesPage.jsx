import { PageHeader } from '../components/Layout'
import { resources } from '../data/resources'
import { asset } from '../lib/assets'

export function ResourcesPage() {
  return (
    <section>
      <PageHeader
        title="연구학교 운영 성과 나눔 자료"
        description="연구학교 보고서와 일반화 자료, 패들렛, 리플렛을 확인할 수 있습니다."
      />
      <ul className="card-grid">
        {resources.map((item) => {
          const isPdf = item.type === 'pdf'
          const available = isPdf ? Boolean(item.file) : Boolean(item.url)
          return (
            <li key={item.id} className="info-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {available ? (
                isPdf ? (
                  <a className="btn" href={asset(item.file)} download>
                    PDF 다운로드
                  </a>
                ) : (
                  <a className="btn" href={item.url} target="_blank" rel="noopener noreferrer">
                    패들렛 바로가기 ↗
                  </a>
                )
              ) : (
                <p className="hint">{isPdf ? 'PDF 자료 준비 중' : '패들렛 링크 준비 중'}</p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
