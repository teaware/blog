import React from "react"
// import PropTypes from "prop-types"

// class Lettering extends React.Component {
//   getSpanElement(elem, className, index, spacer) {
//     const key = `${className}-${index}`
//     return (
//       <span key={key} className={`${className} ${key}`}>
//         {elem}
//         {spacer}
//       </span>
//     )
//   }

//   getWrappedChars() {
//     let wordIndex = 0,
//       charIndex = 0
//     const { title, wordClass, charClass } = this.props
//     const wordsArray = title.split(" ")
//     const words = wordsArray.map(word => {
//       wordIndex += 1
//       const charsArray = word.split("")
//       const chars = charsArray.map(char => {
//         charIndex += 1
//         return this.getSpanElement(char, charClass, charIndex)
//       })
//       return this.getSpanElement(chars, wordClass, wordIndex, " ")
//     })
//     return words
//   }

//   render() {
//     const wrappedChars = this.getWrappedChars()
//     return <div className={this.props.className}>{wrappedChars}</div>
//   }
// }

// Lettering.propTypes = {
//   className: PropTypes.string,
//   charClass: PropTypes.string,
//   wordClass: PropTypes.string,
// }

// Lettering.defaultProps = {
//   className: "lettering",
//   charClass: "char",
//   wordClass: "word",
// }

class Lettering extends React.Component {
  render() {
    const letts = this.props.title.split("")
    return (
      <>
        {letts.map((lett, i) => (
          <span key={"char" + (i + 1)} className={"char char" + (i + 1)}>
            {lett}
          </span>
        ))}
      </>
    )
  }
}

export default Lettering
