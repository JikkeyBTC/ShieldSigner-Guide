import { animate, stagger } from 'animejs'

type AnimationTargets = Element | Element[]
type AnimationOptions = { reducedMotion?: boolean }

const shouldReduce = (requested?: boolean) => {
  if (requested) return true
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

const visible = (targets: AnimationTargets) => {
  const elements = Array.isArray(targets) ? targets : [targets]
  elements.forEach((element) => {
    element.removeAttribute('data-animation-pending')
    ;(element as HTMLElement).style.opacity = '1'
    ;(element as HTMLElement).style.transform = 'none'
  })
}

export function animateEnter(targets: AnimationTargets, options: AnimationOptions = {}): void {
  if (shouldReduce(options.reducedMotion)) {
    visible(targets)
    return
  }
  animate(targets, { opacity: [0, 1], translateY: [12, 0], delay: stagger(50), duration: 300, ease: 'out(3)' })
}

export function animateSwap(targets: AnimationTargets, options: AnimationOptions = {}): void {
  if (shouldReduce(options.reducedMotion)) {
    visible(targets)
    return
  }
  animate(targets, { opacity: [0, 1], translateX: [8, 0], duration: 250, ease: 'out(3)' })
}
