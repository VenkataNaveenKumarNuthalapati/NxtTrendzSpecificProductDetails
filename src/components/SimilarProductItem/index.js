import './index.css'

const SimilarProductItem = props => {
  const {eachPro} = props
  const {brand, imageUrl, price, rating, title} = eachPro

  return (
    <li className="each-card">
      <img className="card-image" src={imageUrl} alt="similar product" />
      <h4>{title}</h4>
      <p>by {brand}</p>
      <div className="price-rating-container">
        <p>Rs {price}/-</p>
        <div className="rating-cont">
          <div className="rating">
            <span>{rating}</span>
            <img
              className="star-image"
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
