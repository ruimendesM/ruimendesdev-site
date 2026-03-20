import { useState, useEffect, useRef, useCallback } from 'react'

export interface UseScrollSpyResult {
  activeSection: string
  setActiveSection: (id: string) => void
}

export function useScrollSpy(sectionIds: string[]): UseScrollSpyResult {
  const [activeSection, setActiveSectionState] = useState(sectionIds[0])
  const isScrolling = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollEndHandlerRef = useRef<(() => void) | null>(null)

  const setActiveSection = useCallback((id: string) => {
    // Cancel any in-flight cleanup from a previous call
    if (scrollTimeoutRef.current !== null) {
      clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = null
    }
    if (scrollEndHandlerRef.current !== null) {
      window.removeEventListener('scrollend', scrollEndHandlerRef.current)
      scrollEndHandlerRef.current = null
    }

    setActiveSectionState(id)
    isScrolling.current = true

    const handleScrollEnd = () => {
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
      scrollEndHandlerRef.current = null
      isScrolling.current = false
    }

    scrollEndHandlerRef.current = handleScrollEnd
    window.addEventListener('scrollend', handleScrollEnd, { once: true })

    scrollTimeoutRef.current = setTimeout(() => {
      if (scrollEndHandlerRef.current !== null) {
        window.removeEventListener('scrollend', scrollEndHandlerRef.current)
        scrollEndHandlerRef.current = null
      }
      scrollTimeoutRef.current = null
      isScrolling.current = false
    }, 400)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionState((entry.target as HTMLElement).id)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      observer.disconnect()
      // Clean up any pending scroll-end timer/listener on unmount
      if (scrollTimeoutRef.current !== null) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (scrollEndHandlerRef.current !== null) {
        window.removeEventListener('scrollend', scrollEndHandlerRef.current)
      }
    }
  }, [sectionIds])

  return { activeSection, setActiveSection }
}
