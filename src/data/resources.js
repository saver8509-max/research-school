/**
 * 연구학교 운영 성과 나눔 자료
 * PDF를 등록할 때 public/materials/ 폴더에 파일을 넣고 file 값을 수정하세요.
 * 패들렛 주소가 정해지면 url에 https:// 로 시작하는 주소를 입력하세요.
 */
export const resources = [
  {
    id: 'report',
    title: '연구학교 보고서',
    description: '연구학교 운영 과정과 성과를 담은 보고서입니다.',
    type: 'pdf',
    file: null, // 예: 'materials/research-report.pdf'
  },
  {
    id: 'generalization',
    title: '일반화 자료',
    description: '학교 현장에서 활용할 수 있는 연구학교 일반화 자료입니다.',
    type: 'pdf',
    file: null, // 예: 'materials/generalization.pdf'
  },
  {
    id: 'padlet',
    title: '패들렛',
    description: '연구학교 운영 성과와 자료를 패들렛에서 확인합니다.',
    type: 'link',
    url: null, // 예: 'https://padlet.com/...'
  },
  {
    id: 'leaflet',
    title: '리플렛',
    description: '연구학교 발표회 안내 리플렛입니다.',
    type: 'pdf',
    file: null, // 예: 'materials/leaflet.pdf'
  },
]
