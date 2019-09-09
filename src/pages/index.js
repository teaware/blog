import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Emoji from "../components/emoji"

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1 className="page-title">be water my friend</h1>
        <p>
          像水一样 时而平静 时而波涛汹涌{" "}
          <Emoji symbol="🌊" label="Water Wave" />
        </p>
      </Layout>
    )
  }
}

export default Index
