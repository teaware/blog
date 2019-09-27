import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Instagram from "../components/instagram"

const NotFound = () => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <h1>使徒侵入</h1>
      <p>Page not found!</p>
      <p>页面丢失！</p>
      <Instagram />
    </Layout>
  )
}

export default NotFound
