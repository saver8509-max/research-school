import { useEffect, useRef, useState } from 'react'
import { PageHeader } from '../components/Layout'
import { site } from '../data/site'
import { asset } from '../lib/assets'

const MIN_ZOOM = 0.6
const MAX_ZOOM = 4
const clampZoom = (value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value))

export function MapPage() {
  const [open, setOpen] = useState(false)
  const [hasImage, setHasImage] = useState(true)
  const [zoom, setZoom] = useState(1)
  const zoomRef = useRef(1)
  const viewportRef = useRef(null)
  const pointersRef = useRef(new Map())
  const gestureRef = useRef(null)
  const src = asset(site.mapImage)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function updateZoom(value, anchorX, anchorY) {
    const el = viewportRef.current
    const bounded = clampZoom(value)
    const previous = zoomRef.current
    if (!el || bounded === previous) return
    const rect = el.getBoundingClientRect()
    const x = anchorX ?? rect.left + rect.width / 2
    const y = anchorY ?? rect.top + rect.height / 2
    const localX = x - rect.left
    const localY = y - rect.top
    const imageX = (el.scrollLeft + localX) / previous
    const imageY = (el.scrollTop + localY) / previous
    zoomRef.current = bounded
    setZoom(bounded)
    requestAnimationFrame(() => {
      if (viewportRef.current !== el) return
      el.scrollLeft = imageX * bounded - localX
      el.scrollTop = imageY * bounded - localY
    })
  }

  function resetMap() {
    pointersRef.current.clear()
    gestureRef.current = null
    zoomRef.current = 1
    setZoom(1)
    requestAnimationFrame(() => viewportRef.current?.scrollTo(0, 0))
  }

  function openMap() {
    resetMap()
    setOpen(true)
  }

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const el = viewportRef.current
    if (!el) return
    el.setPointerCapture(event.pointerId)
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const points = [...pointersRef.current.values()]
    if (points.length === 1) {
      gestureRef.current = { type: 'pan', x: points[0].x, y: points[0].y, left: el.scrollLeft, top: el.scrollTop }
    } else if (points.length === 2) {
      const [a, b] = points
      gestureRef.current = {
        type: 'pinch',
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        zoom: zoomRef.current,
        centerX: (a.x + b.x) / 2,
        centerY: (a.y + b.y) / 2,
      }
    }
  }

  function onPointerMove(event) {
    if (!pointersRef.current.has(event.pointerId)) return
    const el = viewportRef.current
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const points = [...pointersRef.current.values()]
    const gesture = gestureRef.current
    if (!el || !gesture) return
    if (points.length === 1 && gesture.type === 'pan') {
      el.scrollLeft = gesture.left - (points[0].x - gesture.x)
      el.scrollTop = gesture.top - (points[0].y - gesture.y)
    } else if (points.length === 2 && gesture.type === 'pinch') {
      const [a, b] = points
      const distance = Math.hypot(a.x - b.x, a.y - b.y)
      const centerX = (a.x + b.x) / 2
      const centerY = (a.y + b.y) / 2
      updateZoom(gesture.zoom * distance / gesture.distance, centerX, centerY)
      // Keep the center of the two fingers moving naturally while pinching.
      el.scrollLeft -= centerX - gesture.centerX
      el.scrollTop -= centerY - gesture.centerY
      gesture.centerX = centerX
      gesture.centerY = centerY
    }
  }

  function onPointerUp(event) {
    pointersRef.current.delete(event.pointerId)
    const el = viewportRef.current
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId)
    const points = [...pointersRef.current.values()]
    if (points.length === 1 && el) {
      gestureRef.current = { type: 'pan', x: points[0].x, y: points[0].y, left: el.scrollLeft, top: el.scrollTop }
    } else {
      gestureRef.current = null
    }
  }

  return (
    <section>
      <PageHeader title="학교 안내지도" description={site.mapCaption} />
      {hasImage ? (
        <button type="button" className="map-frame" onClick={openMap} aria-label="안내지도를 크게 보기">
          <img src={src} alt={`${site.schoolName} 학교 안내지도`} onError={() => setHasImage(false)} />
        </button>
      ) : (
        <div className="map-frame map-frame-static" aria-label="안내지도 영역">
          <div className="map-placeholder">
            <strong>안내지도 영역</strong>
            <p>실제 지도 이미지는 <code>public/{site.mapImage}</code> 경로에 넣어 주세요.</p>
          </div>
        </div>
      )}
      {hasImage && <p className="hint">지도를 누르면 크게 볼 수 있습니다. 한 손가락으로 이동하고 두 손가락으로 확대·축소하세요.</p>}
      {open && hasImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="안내지도 확대">
          <div className="map-toolbar">
            <span className="map-toolbar-label">한 손가락 이동 · 두 손가락 확대/축소</span>
            <button type="button" onClick={() => updateZoom(zoomRef.current - 0.25)} aria-label="축소">−</button>
            <span className="map-zoom-value">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => updateZoom(zoomRef.current + 0.25)} aria-label="확대">+</button>
            <button type="button" onClick={resetMap}>초기화</button>
            <button type="button" onClick={() => setOpen(false)}>닫기</button>
          </div>
          <div
            ref={viewportRef}
            className="lightbox-body map-pan-viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={src}
              alt={`${site.schoolName} 학교 안내지도 확대`}
              draggable="false"
              style={{ width: `calc(max(100%, 1100px) * ${zoom})` }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
