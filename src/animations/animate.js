import React from "react"
import { Transition, TransitionGroup } from "react-transition-group"
import { TweenLite, TimelineLite, Elastic } from "gsap/TweenMax"

const ANIMATION_DONE_EVENT = "animation::done"
const triggerAnimationDoneEvent = node =>
  node.dispatchEvent(new Event(ANIMATION_DONE_EVENT))

const animateLettering = char => {
  TweenLite.fromTo(
    char,
    1,
    {
      y: -50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      ease: Elastic.easeOut,
      onComplete: () => triggerAnimationDoneEvent(char),
    }
  )
}

export default animateLettering
