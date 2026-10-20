import { useEffect } from 'react'

// Sets <html data-scene> to the scene of the zone crossing the middle of the
// viewport. Zones are marked with data-scene-zone="paper|ink|blueprint".
// Only <html> carries data-scene, so every color transitions together.
export function useScene() {
  useEffect(() => {
    const root = document.documentElement
    const zones = document.querySelectorAll('[data-scene-zone]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) root.dataset.scene = entry.target.dataset.sceneZone
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )

    zones.forEach((zone) => observer.observe(zone))
    return () => {
      observer.disconnect()
      delete root.dataset.scene
    }
  }, [])
}
