import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    const { siteTitle } = this.props
    return (
      <>
        <header className={this.state.expanded ? "header expanded" : "header"}>
          <div className="navbar">
            <h1>
              <Link to="/">{siteTitle}</Link>
            </h1>
            <div className="menu" onClick={this.handleClick}>
              <span role="img">{this.state.expanded ? "🙉" : "🙈"}</span>
            </div>
          </div>
        </header>
        <div className={this.state.expanded ? "popup poped" : "popup"}>
          <ul className="links">
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="/blog">博客</Link>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `zhu`,
}

export default Header
