import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div>
      <p className="footer-description">
        For any Queries contact +91-9876543210 <br /> or mail us
        help@nxtmart.co.in
      </p>
      <div className="contact-images">
        <img
          src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712570884/facebookLogo_k077bc.png"
          alt="facebook"
          className="social-media-icons"
        />
        <img
          src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712570865/PinterestLogo_fgcj1p.png"
          alt="pinterest"
          className="social-media-icons"
        />
        <img
          src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712570851/TwitterLogo_vkbfo3.png"
          alt="twitter"
          className="social-media-icons"
        />
        <img
          src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712570832/InstagramLogo_iaa9w1.png"
          alt="instagram"
          className="social-media-icons"
        />
      </div>
    </div>
    <p className="footer-description">
      Copyright © 2023 NxtMart Grocery Supplies Pvt Ltd{' '}
    </p>
  </div>
)

export default Footer
