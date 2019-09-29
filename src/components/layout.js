/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/index.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="container">
      <div className="content">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </div>
      <footer>
        © {new Date().getFullYear()} 阿江
        <div className="social-links">
          <a
            href="https://twitter.com/anikijiang"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>{" "}
          &bull;{" "}
          <a
            href="https://instagram.com/veryben"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>{" "}
          &bull;{" "}
          <a
            href="https://github.com/teaware"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>{" "}
          &bull;{" "}
          <a
            href="https://codepen.io/farm-boy"
            target="_blank"
            rel="noopener noreferrer"
          >
            codepen
          </a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
