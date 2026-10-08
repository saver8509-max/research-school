/** GitHub Pages의 base 경로를 포함한 public 자산 경로 */
export function asset(path) {
  if (!path) return ''
  const clean = String(path).replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
