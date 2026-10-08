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
      await submitFeedback(form)
      setForm(empty)
      setStatus('done')
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'done') {
    return (
      <section>
        <PageHeader title="수업 참관 의견 작성" />
        <div className="card empty">
          <h2>의견을 남겨 주셔서 감사합니다.</h2>
          <p>작성하신 내용은 연구학교 운영 개선에 참고하겠습니다.</p>
          <button type="button" className="btn" onClick={() => setStatus('idle')}>
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
