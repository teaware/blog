import React from "react"
import profilePic from "../assets/profile-pic.jpg"

import { rhythm } from "../utils/typography"

const Bio = () => {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1),
      }}
    >
      <img
        src={profilePic}
        alt={`阿江`}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2),
          borderRadius: "50%",
        }}
      />
      <p style={{ maxWidth: 180 }}>
        阿江记事本
        <br />
        be water my friend
      </p>
    </div>
  )
}

export default Bio
