import { useEffect, useRef, useState } from 'react'
import { PageHeader } from '../components/Layout'
import { site } from '../data/site'
import { asset } from '../lib/assets'

export function MapPage() {
  const [open, setOpen] = useState(false)
  const [hasImage, setHasImage] = useState(true)
  const [zoom, setZoom] = useState(1)
  const viewportRef = useRef(null)
  const dragRef = useRef(null)
  const src = asset(site.mapImage)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  function openMap() {
    setZoom(1)
    setOpen(true)
  }

  function changeZoom(next) {
    const viewport = viewportRef.current
    const bounded = Math.min(3, Math.max(0.6, next))
    if (viewport) {
      const centerX = viewport.scrollLeft + viewport.clientWidth / 2
      const centerY = viewport.scrollTop + viewport.clientHeight / 2
      const ratio = bounded / zoom
      setZoom(bounded)
      requestAnimationFrame(() => {
        viewport.scrollLeft = centerX * ratio - viewport.clientWidth / 2
        viewport.scrollTop = centerY * ratio - viewport.clientHeight / 2
      })
    } else setZoom(bounded)
  }

  function onPointerDown(event) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    const el = viewportRef.current
    dragRef.current = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop }
    el.setPointerCapture(event.pointerId)
  }
  function onPointerMove(event) {
    if (!dragRef.current) return
    const el = viewportRef.current
    el.scrollLeft = dragRef.current.left - (event.clientX - dragRef.current.x)
    el.scrollTop = dragRef.current.top - (event.clientY - dragRef.current.y)
  }
  function onPointerUp() { dragRef.current = null }

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
      {hasImage && <p className="hint">지도를 누르면 확대됩니다. 확대 화면에서 손가락으로 위아래·좌우 이동할 수 있습니다.</p>}
      {open && hasImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="안내지도 확대">
          <div className="map-toolbar">
            <span className="map-toolbar-label">손가락으로 지도를 움직여 보세요</span>
            <button type="button" onClick={() => changeZoom(zoom - 0.25)} aria-label="축소">−</button>
            <span className="map-zoom-value">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => changeZoom(zoom + 0.25)} aria-label="확대">+</button>
            <button type="button" onClick={() => { setZoom(1); viewportRef.current?.scrollTo(0, 0) }}>초기화</button>
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
