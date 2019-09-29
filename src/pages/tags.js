// https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/#add-tags-to-your-markdown-files

import React from "react"
import { graphql } from "gatsby"
import { kebabCase } from "lodash"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tags = ({ data }) => {
  const allTags = data.allMarkdownRemark.group

  return (
    <Layout>
      <div>
        <SEO title="Tags" />
        <h2>Tags</h2>
        <ul>
          {allTags.map(tag => (
            <li key={tag.fieldValue}>
              <AniLink
                cover
                direction="left"
                bg="#639c6b"
                to={`/tags/${kebabCase(tag.fieldValue)}`}
              >
                {tag.fieldValue} ({tag.totalCount})
              </AniLink>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
