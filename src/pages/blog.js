import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            title
            slug
            publishedDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Blog" />
      <ol>
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li key={edge.node.slug}>
              <h2>
                <Link to={`/blog/${edge.node.slug}`}>{edge.node.title}</Link>
              </h2>
              <p>{edge.node.publishedDate}</p>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Blog
