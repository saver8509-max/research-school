/**
 * 공개수업 학급 목록 (2026 우산초등학교 연구학교 발표회)
 * 실제 지도안이 제공되면 subject, time, plan, pdf 등을 입력하세요.
 * 원본 PDF는 public/materials/lessons/ 아래에 보관합니다.
 */
export const lessons = [
  '2학년 1반',
  '2학년 2반',
  '4학년 1반',
  '5학년 1반',
  '5학년 2반',
].map((grade, index) => ({
  id: `lesson-${index + 1}`,
  grade,
  subject: '추후 안내',
  place: `${grade} 교실`,
  time: '추후 안내',
  teacher: '추후 안내',
  pdf: null,
  plan: {
    topic: '지도안 등록 예정',
    goals: [],
    process: [],
  },
}))

export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id) ?? null
}
