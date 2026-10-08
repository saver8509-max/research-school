/**
 * 수업 참관 의견 수집 설정
 *
 * 지금은 서버 없이 브라우저에만 저장합니다.
 * Google Forms로 바꿀 때는 mode를 'google-form'으로 바꾸고
 * action URL과 entry ID를 넣으면 됩니다.
 */
export const feedbackConfig = {
  mode: 'local', // 'local' | 'google-form'
  googleForm: {
    action: '',
    fields: {
      lessonId: '',
      impression: '',
      idea: '',
      extra: '',
    },
  },
}

export async function submitFeedback(payload) {
  if (feedbackConfig.mode === 'google-form' && feedbackConfig.googleForm.action) {
    const body = new FormData()
    const { fields, action } = feedbackConfig.googleForm
    if (fields.lessonId) body.append(fields.lessonId, payload.lessonId)
    if (fields.impression) body.append(fields.impression, payload.impression)
    if (fields.idea) body.append(fields.idea, payload.idea)
    if (fields.extra) body.append(fields.extra, payload.extra)
    await fetch(action, { method: 'POST', mode: 'no-cors', body })
    return { ok: true, mode: 'google-form' }
  }

  const key = 'research-school-feedback'
  const prev = JSON.parse(sessionStorage.getItem(key) || '[]')
  prev.push({ ...payload, submittedAt: new Date().toISOString() })
  sessionStorage.setItem(key, JSON.stringify(prev))
  return { ok: true, mode: 'local' }
}
