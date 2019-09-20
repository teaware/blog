import React from "react"
import { graphql } from "gatsby"
import { TimelineMax, Back, Power1 } from "gsap"
import TransitionLink, { TransitionPortal } from "gatsby-plugin-transition-link"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.horizontal = this.horizontal.bind(this)
    this.vertical = this.vertical.bind(this)

    this.cover = React.createRef()
  }

  horizontal = ({ node, props: { length: seconds }, direction }) => {
    const directionTo = direction === "left" ? "-100%" : "100%"
    const directionFrom = direction === "left" ? "100%" : "-100%"

    const wait = seconds / 6
    const half = (seconds - wait) / 2

    return new TimelineMax()
      .set(this.cover, { y: 0, x: directionFrom, display: "block" })
      .to(this.cover, half, {
        x: "0%",
        ease: Power1.easeInOut,
      })
      .to(
        this.cover,
        half,
        {
          x: directionTo,
          ease: Power1.easeInOut,
        },
        `+=${wait}`
      )
  }

  vertical = ({ node, props: { length: seconds }, direction }) => {
    const directionTo = direction === "up" ? "-100%" : "100%"
    const directionFrom = direction === "up" ? "100%" : "-100%"

    const wait = seconds / 6
    const half = (seconds - wait) / 2

    return new TimelineMax()
      .set(this.cover, { y: directionFrom })
      .to(this.cover, half, {
        y: "0%",
        ease: Power1.easeInOut,
      })
      .set(node, { opacity: 0 })
      .to(
        this.cover,
        half,
        {
          y: directionTo,
          ease: Power1.easeIn,
        },
        `+=${wait}`
      )
  }

  moveInDirection = ({ props, direction, node }) => {
    if (direction === "left" || direction === "right")
      return this.horizontal({ props, direction, node })

    return this.vertical({ props, direction, node })
  }

  char(node) {
    return new TimelineMax().staggerFromTo(
      node.querySelectorAll(".char, p span"),
      0.5,
      { ease: Back.easeOut, opacity: 0, y: 40 },
      { ease: Back.easeOut, opacity: 1, y: 0 },
      0.05
    )
  }

  render() {
    const direction = this.props.direction || "left"
    const length = this.props.duration || 1
    const { data } = this.props

    const posts = data.allMarkdownRemark.edges

    return (
      <Layout>
        <SEO title="Blog" />
        <ol>
          {posts.map(edge => {
            return (
              <li key={edge.node.fields.slug}>
                <h2 className="blog-title">
                  <TransitionLink
                    to={`/blog/${edge.node.fields.slug}`}
                    exit={{
                      length: length,
                      trigger: ({ exit, node }) =>
                        this.moveInDirection({ props: exit, node, direction }),
                    }}
                    entry={{
                      delay: length / 2,
                      trigger: ({ node }) => this.char(node),
                    }}
                  >
                    {edge.node.frontmatter.title}
                  </TransitionLink>
                </h2>
                <p>{edge.node.frontmatter.date}</p>
              </li>
            )
          })}
        </ol>
        <TransitionPortal>
          <div
            ref={n => (this.cover = n)}
            style={{
              position: "fixed",
              background: this.props.bg || "#8c61ff",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              transform: "translateY(100%)",
            }}
          />
        </TransitionPortal>
      </Layout>
    )
  }
}

export default Blog
