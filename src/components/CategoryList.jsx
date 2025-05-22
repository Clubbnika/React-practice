export const CategoryList = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={`button mr-6 is-outlined is-success`}
      onClick={() => onSelectCategory(null)}
    >
      All
    </a>

    {categories.map(category => (
      <a
        key={category.id}
        href="#/"
        data-cy="Category"
        className={`button mr-2 my-1 ${selectedCategoryId === category.id ? 'is-info' : ''}`}
        onClick={() => onSelectCategory(category.id)}
      >
        {category.title}
      </a>
    ))}
  </div>
);
