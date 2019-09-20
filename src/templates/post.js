import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
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
  render() {
    const { data } = this.props
    const blogpost = data.markdownRemark
    return (
      <Layout>
        <div className="post">
          <SEO title={blogpost.frontmatter.title} />
          <article>
            <h1>
              <Lettering title={blogpost.frontmatter.title} />
            </h1>
            <p className="date">{blogpost.frontmatter.date}</p>
            <div dangerouslySetInnerHTML={{ __html: blogpost.html }}></div>
          </article>
        </div>
      </Layout>
    )
  }
}

export default Post
