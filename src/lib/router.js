import { useEffect, useState } from 'react'

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return parseRoute(hash)
}

export function parseRoute(hash) {
  const raw = (hash || '#/').replace(/^#/, '') || '/'
  const path = raw.startsWith('/') ? raw : `/${raw}`
  const lessonMatch = path.match(/^\/lessons\/([^/]+)\/?$/)
  if (lessonMatch) {
    return { name: 'lesson', path, params: { id: decodeURIComponent(lessonMatch[1]) } }
  }

  const routes = {
    '/': 'home',
    '/schedule': 'schedule',
    '/map': 'map',
    '/lessons': 'lessons',
    '/feedback': 'feedback',
    '/resources': 'resources',
  }

  return { name: routes[path] || 'notfound', path, params: {} }
}

export function href(to) {
  return `#${to.startsWith('/') ? to : `/${to}`}`
}
