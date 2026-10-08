import { useState } from 'react'
import { PageHeader } from '../components/Layout'
import { submitFeedback } from '../data/feedback'
import { lessons } from '../data/lessons'

const empty = {
  lessonId: '',
  impression: '',
  idea: '',
  extra: '',
}

export function FeedbackPage() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (!form.lessonId || !form.impression.trim()) {
      setStatus('invalid')
      return
    }
    setStatus('saving')
    try {
      const lesson = lessons.find((item) => item.id === form.lessonId)
      await submitFeedback({ ...form, lesson: lesson?.grade ?? form.lessonId })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section>
        <PageHeader title="수업 참관 의견 작성" />
        <div className="card empty">
          <h2>의견 전송을 요청했습니다.</h2>
          <p>브라우저 보안 정책으로 저장 완료 여부를 이 화면에서 직접 확인할 수 없습니다. 담당자는 구글 스프레드시트에 의견이 추가되었는지 확인해 주세요.</p>
          <button type="button" className="btn" onClick={() => { setForm(empty); setStatus('idle') }}>
            다른 의견 작성하기
          </button>
        </div>
      </section>
    )
  }

  return (
    <section>
      <PageHeader
        title="수업 참관 의견 작성"
        description="참관하신 수업을 선택한 뒤 의견을 적어 주세요. 손가락으로 누르기 쉬운 크기로 입력창을 마련했습니다."
      />
      <form className="form" onSubmit={onSubmit}>
        <label>
          참관한 수업 선택
          <select
            value={form.lessonId}
            onChange={(e) => update('lessonId', e.target.value)}
            required
          >
            <option value="">수업을 선택해 주세요</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.grade} · {lesson.subject}
              </option>
            ))}
          </select>
        </label>

        <label>
          인상 깊었던 점
          <textarea
            rows={5}
            value={form.impression}
            onChange={(e) => update('impression', e.target.value)}
            placeholder="수업에서 인상 깊었던 점을 적어 주세요."
            required
          />
        </label>

        <label>
          수업에서 얻은 아이디어
          <textarea
            rows={5}
            value={form.idea}
            onChange={(e) => update('idea', e.target.value)}
            placeholder="우리 학급이나 학교에 적용해 보고 싶은 아이디어가 있다면 적어 주세요."
          />
        </label>

        <label>
          기타 의견
          <textarea
            rows={4}
            value={form.extra}
            onChange={(e) => update('extra', e.target.value)}
            placeholder="추가로 전하고 싶은 말씀이 있으면 적어 주세요."
          />
        </label>

        {status === 'error' ? (
          <p className="form-error">전송 중 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.</p>
        ) : null}
        {status === 'invalid' ? (
          <p className="form-error">참관한 수업과 인상 깊었던 점은 꼭 입력해 주세요.</p>
        ) : null}

        <button type="submit" className="btn" disabled={status === 'saving'}>
          {status === 'saving' ? '저장 중...' : '의견 보내기'}
        </button>
      </form>
    </section>
  )
}
