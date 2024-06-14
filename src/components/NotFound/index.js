import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712738739/notFound_nqhl6f.png"
      alt="not found"
      className="not-found-image"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you <br /> requested could not be found
    </p>
  </div>
)

export default NotFound
