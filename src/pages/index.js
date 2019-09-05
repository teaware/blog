import React from "react"

import { TimelineMax, Back } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Index extends React.Component {
  // constructor(props) {
  //   super(props)

  //   // this.verticalAnimation = this.verticalAnimation.bind(this)

  //   // this.layoutContents = React.createRef()
  //   // this.transitionCover = React.createRef()
  // }

  // verticalAnimation = ({ length }, direction) => {
  //   const directionTo = direction === "up" ? "-100%" : "100%"
  //   const directionFrom = direction === "up" ? "100%" : "-100%"

  //   // convert ms to s for gsap
  //   const seconds = length

  //   return new TimelineMax()
  //     .set(this.transitionCover, { y: directionFrom })
  //     .to(this.transitionCover, seconds / 2, {
  //       y: "0%",
  //       ease: Power1.easeInOut,
  //     })
  //     .set(this.layoutContents, { opacity: 0 })
  //     .to(this.transitionCover, seconds / 2, {
  //       y: directionTo,
  //       ease: Power1.easeIn,
  //     })
  // }

  test(node) {
    return new TimelineMax().staggerFromTo(
      node.querySelectorAll("p"),
      1,
      { ease: Back.easeOut, opacity: 0, y: "+=150" },
      { ease: Back.easeOut, opacity: 1, y: "+=10" },
      0.1
    )
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <TransitionLink
          to="/about"
          exit={{
            trigger: ({ exit }) => console.log(exit),
          }}
          entry={{
            delay: 0.5,
            trigger: ({ node }) => this.test(node),
          }}
        >
          Go to about
        </TransitionLink>
        <p>Now go build something great.</p>
      </Layout>
    )
  }
}

export default Index
