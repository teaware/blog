import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import header from "./header.module.scss";

const Header = ({ siteTitle }) => (
  <header className={header.header}>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className={header.links}>
        <li>
          <Link activeClassName={header.active} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName={header.active} to="blog">
            Blog
          </Link>
        </li>
        <li>
          <Link activeClassName={header.active} to="/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
