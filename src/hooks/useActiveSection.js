import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the middle band of the viewport.
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null)
  const key = ids.join(',')

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    const top = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActiveId(null),
      { rootMargin: '0px 0px -60% 0px' },
    )
    const hero = document.getElementById('top')

    elements.forEach((el) => observer.observe(el))
    if (hero) top.observe(hero)

    return () => {
      observer.disconnect()
      top.disconnect()
    }
  }, [key])

  return activeId
}
