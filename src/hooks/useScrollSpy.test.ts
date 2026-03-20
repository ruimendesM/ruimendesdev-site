import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
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

  it('returns first section id by default', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))
    expect(result.current).toBe('about')
  })

  it('updates to section that becomes intersecting', () => {
    const { result } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))

    act(() => {
      observerCallback(
        [{ isIntersecting: true, target: { id: 'career' } } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })

    expect(result.current).toBe('career')
  })

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollSpy(['about', 'career', 'projects']))
    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })
})
