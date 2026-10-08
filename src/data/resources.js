/**
 * 연구학교 일반화 자료
 * title, description, file 을 추가·수정하면 목록이 바뀝니다.
 * file은 public 폴더 기준 경로입니다. 아직 파일이 없으면 null 로 둡니다.
 */
export const resources = [
  {
    id: 'report',
    title: '연구학교 운영 보고서(요약)',
    description: '연구 주제, 운영 과정, 주요 성과를 한눈에 볼 수 있는 요약 자료입니다.',
    file: null,
  },
  {
    id: 'model',
    title: '수업 모형 안내 자료',
    description: '연구학교에서 적용한 수업 모형의 흐름과 활용 방법을 안내합니다.',
    file: null,
  },
  {
    id: 'toolkit',
    title: '일반화 자료집',
    description: '다른 학교에서 활용할 수 있는 활동지, 체크리스트 등 일반화 자료입니다.',
    file: null,
  },
]
