import { useSyncExternalStore } from 'react'

const query = '(hover: hover) and (pointer: fine)'

function subscribe(callback) {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

// True on devices with a precise pointer (mouse/trackpad), false on touch.
export function useCanHover() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
