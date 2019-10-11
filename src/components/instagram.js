import React, { useState, useEffect } from "react"
import axios from "axios"

// const ImageSet = ({ images }) => {
//   return (
//     <div>
//       {images.map(image => (
//         <img key={image.id} src={image.images.standard_resolution.url} alt="" />
//       ))}
//     </div>
//   )
// }

const Instagram = () => {
  // const [images, setImages] = useState([])
  const [random, setRandom] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetch = () => {
      const token = "5632485.17be2c5.a0dde7bc53794f219dafa8eaa22061de"
      const num_photos = 20 // 最大值是20 默认也是20

      axios
        .get(
          "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
            token +
            "&count=" +
            num_photos
        )
        .then(res => {
          // setImages([...images, ...res.data.data])

          const i = Math.floor(Math.random() * 20)
          setRandom(res.data.data[i].images.standard_resolution.url)
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetch()
  }, [])

  const load = () => {
    setLoaded(true)
  }

  return (
    <div className="randomgram">
      {loaded ? (
        <p>
          Wait... We found a image from{" "}
          <a
            href="https://instagram.com/veryben"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>
        </p>
      ) : (
        ""
      )}
      <div className={loaded ? "img-loaded" : "img-loading"}>
        <img
          src={random}
          alt={loaded ? "Freedom" : "Not Yet"}
          onLoad={() => load()}
        />
        {/* <ImageSet images={images} /> */}
      </div>
    </div>
  )
}

export default Instagram
