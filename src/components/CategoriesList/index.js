import './index.css'

const CategoriesList = props => {
  const {categories, setActiveCategory, isActive} = props
  const {name} = categories

  const onClickCategory = () => {
    setActiveCategory(name)
  }

  return (
    <li className="categories-list-item">
      <button
        className={isActive ? 'active-category' : 'category'}
        type="button"
        onClick={onClickCategory}
      >
        <a
          href={`#${name}`}
          className={isActive ? 'active-category' : 'category'}
        >
          {name}
        </a>
      </button>
    </li>
  )
}

export default CategoriesList
