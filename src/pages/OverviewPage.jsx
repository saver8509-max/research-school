import { PageHeader } from '../components/Layout'
import { asset } from '../lib/assets'

const overviewImage = 'materials/research-overview-mobile.png'

export function OverviewPage() {
  return (
    <section className="overview-page">
      <PageHeader
        title="연구학교 운영 개요"
        description="「잇다 프로그램」의 3단계와 연구과제를 살펴보세요."
      />
      <div className="overview-poster-wrap">
        <a
          className="overview-poster-link"
          href={asset(overviewImage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="연구학교 운영 개요 인포그래픽 원본 확대 보기 (새 창)"
        >
          <img
            className="overview-poster"
            src={asset(overviewImage)}
            alt="우산초등학교 잇다 프로그램 연구학교 운영 개요. 기초를 잇다, 배움을 잇다, 우리의 삶을 잇다의 세 단계와 연구과제 1 운영 체계 개선, 연구과제 2 심화 및 일반화, 연구과제 3 학교 밖 세상과 연계 및 확산"
            loading="eager"
          />
        </a>
      </div>
      <p className="overview-image-hint">이미지를 누르면 원본 크기로 열어 확대해서 볼 수 있습니다.</p>
    </section>
  )
}
