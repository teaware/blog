import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Emoji from "./emoji"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      darkmode: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      darkmode: !this.state.darkmode,
    })
  }

  render() {
    const { siteTitle } = this.props
    return (
      <header>
        <div className="navbar">
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          <div className="dark" onClick={this.handleClick}>
            {this.state.darkmode ? (
              <Emoji symbol="🌝" label="Full Moon Face" />
            ) : (
              <Emoji symbol="🌚" label="New Moon Face" />
            )}
          </div>
        </div>
      </header>
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
