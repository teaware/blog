import React from "react"
import { graphql } from "gatsby"
import { TimelineMax, Power3 } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

import SEO from "../components/seo"
import Lettering from "../components/lettering"
import "./post.scss"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      html
    }
  }
`

class Post extends React.Component {
  char(node) {
    return new TimelineMax()
      .fromTo(
        node.querySelector(".close"),
        0.4,
        { opacity: 1, y: 0 },
        { ease: Power3.easeIn, opacity: 0, y: 180 },
        0
      )
      .fromTo(
        node.querySelector("article"),
        0.5,
        { opacity: 1, y: 0 },
        { ease: Power3.easeIn, opacity: 0, y: 80 },
        0.6
      )
      .fromTo(
        node.querySelector(".post"),
        0.5,
        { y: 0 },
        { ease: Power3.easeIn, y: "100%" },
        1
      )
  }

  render() {
    const { data } = this.props
    const blogpost = data.markdownRemark
    return (
      <div className="post">
        <SEO title={blogpost.frontmatter.title} />
        <TransitionLink
          exit={{
            length: 2,
            zIndex: 1,
            trigger: ({ node }) => this.char(node),
          }}
          entry={{
            zIndex: 0,
          }}
          to={`/blog`}
          className="close"
        >
          Close
        </TransitionLink>
        <article>
          <h1>
            <Lettering title={blogpost.frontmatter.title} />
          </h1>
          <p className="date">{blogpost.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: blogpost.html }}></div>
        </article>
      </div>
    )
  }
}

export default Post
