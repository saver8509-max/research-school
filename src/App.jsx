import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { useHashRoute } from './lib/router'
import { HomePage } from './pages/HomePage'
import { SchedulePage } from './pages/SchedulePage'
import { MapPage } from './pages/MapPage'
import { LessonsPage } from './pages/LessonsPage'
import { LessonPlanPage } from './pages/LessonPlanPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { NotFoundPage } from './pages/NotFoundPage'

function renderPage(route) {
  switch (route.name) {
    case 'home':
      return <HomePage />
    case 'schedule':
      return <SchedulePage />
    case 'map':
      return <MapPage />
    case 'lessons':
      return <LessonsPage />
    case 'lesson':
      return <LessonPlanPage id={route.params.id} />
    case 'feedback':
      return <FeedbackPage />
    case 'resources':
      return <ResourcesPage />
    default:
      return <NotFoundPage />
  }
}

export default function App() {
  const route = useHashRoute()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route.path])

  return <Layout routeName={route.name}>{renderPage(route)}</Layout>
}
