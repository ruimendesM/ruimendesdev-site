import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollSpy } from './useScrollSpy'

let observerCallback: IntersectionObserverCallback
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

vi.stubGlobal('IntersectionObserver', vi.fn(function (callback: IntersectionObserverCallback) {
  observerCallback = callback
  return { observe: mockObserve, disconnect: mockDisconnect }
}))

describe('useScrollSpy', () => {
  beforeEach(() => {
    mockObserve.mockClear()
    mockDisconnect.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns first section id as activeSection by default', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))
    expect(result.current.activeSection).toBe('about')
  })

  it('updates activeSection when a section becomes intersecting', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: { id: 'career' } } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current.activeSection).toBe('career')
  })

  it('setActiveSection immediately updates activeSection', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))

    act(() => {
      result.current.setActiveSection('projects')
    })

    expect(result.current.activeSection).toBe('projects')
  })

  it('ignores observer while isScrolling (set via setActiveSection)', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))

    act(() => {
      result.current.setActiveSection('projects')
    })

    // Observer fires for a different section during scroll — must be ignored
    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: { id: 'career' } } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current.activeSection).toBe('projects')
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))
    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('resumes observing after the 400ms fallback timer elapses', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))

    // setActiveSection sets isScrolling = true and starts the 400ms timer.
    // Calling outside act() prevents React's act() from auto-flushing the timer.
    result.current.setActiveSection('projects')

    // Advance past the 400ms fallback — isScrolling should clear
    vi.advanceTimersByTime(401)

    // Observer should now be unblocked — career intersection should take effect
    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: { id: 'career' } } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current.activeSection).toBe('career')
    vi.useRealTimers()
  })
})
