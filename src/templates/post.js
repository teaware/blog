import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { kebabCase } from "lodash"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Lettering from "../components/lettering"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Comment from "../components/comment"
import { rhythm } from "../utils/typography"

const Post = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const commentBox = React.createRef()

  useEffect(() => {
    const scriptEl = document.createElement("script")
    scriptEl.async = true
    scriptEl.src = "https://utteranc.es/client.js"
    scriptEl.setAttribute("repo", "teaware/comments")
    scriptEl.setAttribute("issue-term", "pathname")
    scriptEl.setAttribute("id", "utterances")
    scriptEl.setAttribute("theme", "github-light")
    scriptEl.setAttribute("crossorigin", "anonymous")
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(scriptEl)
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`)
    }
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
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
        <section
          id="comments"
          style={{
            marginBottom: rhythm(1),
          }}
        >
          <h3>Comments</h3>
          <Comment commentBox={commentBox} />
        </section>
      </article>
    </Layout>
  )
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
