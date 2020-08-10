import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { kebabCase } from "lodash"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Lettering from "../components/lettering"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Comment from "../components/comment"
import { rhythm } from "../utils/typography"

class Post extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const commentBox = React.createRef()

    useEffect(() => {
      const commentEl = document.createElement("script")
      commentEl.async = true
      commentEl.src = "https://utteranc.es/client.js"
      commentEl.setAttribute("repo", "teaware/comments")
      commentEl.setAttribute("issue-term", "pathname")
      commentEl.setAttribute("id", "utterances")
      commentEl.setAttribute("theme", "github-light")
      commentEl.setAttribute("crossorigin", "anonymous")
      if (commentBox && commentBox.current) {
        commentBox.current.appendChild(commentEl)
      } else {
        console.log(`Error adding utterances comments on: ${commentBox}`)
      }
    }, [])

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="post">
          <header>
            <h2>
              <Lettering title={post.frontmatter.title} />
            </h2>
            <p className="date">{post.frontmatter.date}</p>
            {post.frontmatter.tags ? (
              <ul className="tags">
                {post.frontmatter.tags.map(tag => (
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
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />
          <section id="comments">
            <h2>Comments</h2>
            <Comment commentBox={commentBox} />
          </section>
        </article>
      </Layout>
    )
  }
}

export default Post

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        tags
      }
    }
  }
`
