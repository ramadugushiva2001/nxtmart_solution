import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProductItem from '../ProductItem'
import CategoriesList from '../CategoriesList'
import Header from '../Header'
import Footer from '../Footer'
import MobileNavbar from '../MobileNavbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    productsData: [],
    apiStatus: apiStatusConstants.initial,
    activeCategory: '',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    // console.log({jwtToken})

    const url = 'https://run.mocky.io/v3/8177da5e-b2fd-4474-9bb7-457f4099ae4e'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    // console.log(response)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.categories.map(each => ({
        name: each.name,
        products: each.products.map(product => ({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          weight: product.weight,
        })),
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        productsData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderHomeProducts = () => {
    const {productsData} = this.state

    return (
      <ul className="nxt-mart-products">
        {productsData.map(each => (
          <li className="products-list">
            <h1 className="product-name" id={each.name}>
              {each.name} &gt;
            </h1>
            <div className="all-products">
              {each.products.map(product => (
                <ProductItem products={product} key={product.id} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    )
  }

  setActiveCategory = category => {
    this.setState({activeCategory: category})
  }

  renderCategories = () => {
    const {productsData, activeCategory} = this.state
    return (
      <div>
        <h1 className="categories-heading">categories</h1>
        <ul className="categories-list-container">
          {productsData.map(each => (
            <CategoriesList
              categories={each}
              isActive={activeCategory === each.name}
              key={each.name}
              setActiveCategory={this.setActiveCategory}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderCategoriesAndProducts = () => (
    <div className="categories-and-products-list">
      {this.renderCategories()}
      {this.renderHomeProducts()}
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#088c03" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getProductDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712738513/failureView_ep2vmv.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We are having some troubles</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderHomeRoute = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderCategoriesAndProducts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderHomeRoute()}
        <MobileNavbar />
        <Footer />
      </>
    )
  }
}

export default Home

// > can be escaped with &gt
