import React from "react"
import Emoji from "./emoji"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import PropTypes from "prop-types"

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
            <AniLink cover direction="down" bg="#8c61ff" to="/">
              {siteTitle}
            </AniLink>
          </h1>
          <div className="tog" onClick={this.handleClick}>
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

export default Header
