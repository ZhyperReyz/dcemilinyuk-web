import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ref: Scroll Animation/30 (OneElementScroll)
 * Triggers a staggered reveal animation on child elements when scrolling into view.
 */
export function useScrollReveal(
  options: {
    stagger?: number
    y?: number
    duration?: number
    delay?: number
    start?: string
  } = {}
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = containerRef.current?.querySelectorAll('.reveal-child')
      if (!children || children.length === 0) return

      gsap.set(children, {
        y: options.y ?? 60,
        opacity: 0,
      })

      gsap.to(children, {
        y: 0,
        opacity: 1,
        duration: options.duration ?? 1.2,
        ease: 'power3.out',
        stagger: options.stagger ?? 0.15,
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

/**
 * Ref: Text Animations/1 (ScrollTextMotion)
 * Animates text lines from below with overflow hidden wrapper.
 */
export function useTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll('.text-line')
      if (!lines || lines.length === 0) return

      gsap.set(lines, { yPercent: 110 })

      gsap.to(lines, {
        yPercent: 0,
        duration: 1.4,
        ease: 'power4.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

/**
 * Ref: Scroll Animation/6 (Staggered3DGridAnimations)
 * Parallax effect on images — moves them at different speed than scroll.
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * Ref: Scroll Animation/22 (ImagePixelLoading)
 * Clip-path reveal animation for images.
 */
export function useClipReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const img = ref.current?.querySelector('img')
      if (!img) return

      gsap.set(ref.current, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(img, { scale: 1.3 })

      gsap.to(ref.current!, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to(img, {
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return ref
}
