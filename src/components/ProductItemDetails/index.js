import {Component} from 'react'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const statusObj = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    product: {},
    similarProducts: [],
    count: 1,
    status: statusObj.loading,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const request = await fetch(url, options)
    console.log(request.ok)
    if (request.ok === true) {
      const responseData = await request.json()
      const convertedData = {
        ...responseData,
        imageUrl: responseData.image_url,
        totalReviews: responseData.total_reviews,
        similarProducts: responseData.similar_products.map(eachKey => ({
          ...eachKey,
          imageUrl: eachKey.image_url,
          totalReviews: eachKey.total_reviews,
        })),
      }
      this.setState({
        product: convertedData,
        similarProducts: convertedData.similarProducts,
        status: statusObj.success,
      })
    } else {
      this.setState({
        status: statusObj.failure,
      })
    }
  }

  onDecrementItem = () => {
    const {count} = this.state
    this.setState({
      count: count > 1 ? count - 1 : count,
    })
  }

  onIncrementItem = () => {
    const {count} = this.state
    this.setState({
      count: count + 1,
    })
  }

  getProductPage = () => {
    const {product, similarProducts, count} = this.state

    const {
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = product
    return (
      <>
        <Header />

        <div className="bg-container">
          <div className="product-container">
            <img
              className="product-image"
              src={product.imageUrl}
              alt="product"
            />
            <div className="details-container">
              <h1>{title}</h1>
              <p>Rs {price}/-</p>
              <div className="rating-cont">
                <div className="rating">
                  <p>{rating}</p>
                  <img
                    className="star-image"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                  />
                </div>
                <p>{totalReviews} Reviews</p>
              </div>
              <p>{description}</p>
              <p>
                <span>Available:</span> {availability}
              </p>
              <p>
                <span>Brand:</span> {brand}
              </p>
              <div>
                <div>
                  <button
                    data-testid="minus"
                    type="button"
                    onClick={this.onDecrementItem}
                  >
                    <BsDashSquare />
                  </button>
                  <p>{count}</p>
                  <button
                    data-testid="plus"
                    type="button"
                    onClick={this.onIncrementItem}
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button type="button">ADD TO CART</button>
              </div>
            </div>
          </div>
          <div className="simPro-container">
            <h1>Similar Products</h1>
            <ul className="simPro-container">
              {similarProducts.map(eachPro => (
                <SimilarProductItem key={eachPro.id} eachPro={eachPro} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  getLoadingPage = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  goToProductPage = () => {
    const {history} = this.props
    history.replace('/products')
  }

  getFailurePage = () => (
    <div>
      <img
        className="error-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <center>
        <h1>Product Not Found</h1>
        <button className="button" type="button" onClick={this.goToProductPage}>
          Continue Shopping
        </button>
      </center>
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case statusObj.loading:
        return this.getLoadingPage()
      case statusObj.success:
        return this.getProductPage()
      case statusObj.failure:
        return this.getFailurePage()
      default:
        return null
    }
  }
}

export default ProductItemDetails
