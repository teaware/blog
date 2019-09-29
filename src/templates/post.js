import React from "react"
import { graphql } from "gatsby"
import { kebabCase } from "lodash"
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
        tags
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
          <SEO
            title={blogpost.frontmatter.title}
            keywords={blogpost.frontmatter.tags}
          />
          <article>
            <h2>
              <Lettering title={blogpost.frontmatter.title} />
            </h2>
            <p className="date">{blogpost.frontmatter.date}</p>
            {blogpost.frontmatter.tags ? (
              <ul className="tags">
                {blogpost.frontmatter.tags.map(tag => (
                  <li key={tag + `tag`}>
                    <AniLink
                      cover
                      direction="down"
                      bg="#ccb833"
                      to={`/tags/${kebabCase(tag)}`}
                    >
                      #{tag}
                    </AniLink>
                  </li>
                ))}
              </ul>
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: blogpost.html }}></div>
          </article>
        </div>
      </Layout>
    )
  }
}

export default Post
