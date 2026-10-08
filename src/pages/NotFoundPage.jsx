import { PageHeader } from '../components/Layout'
import { Link } from '../components/Link'

export function NotFoundPage() {
  return (
    <section>
      <PageHeader title="페이지를 찾을 수 없습니다" />
      <div className="card empty">
        <p>주소가 바뀌었거나 잘못된 경로입니다.</p>
        <Link to="/" className="btn">
          처음 화면으로
        </Link>
      </div>
    </section>
  )
}
