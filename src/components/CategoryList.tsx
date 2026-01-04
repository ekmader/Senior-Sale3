interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['All', 'Textbooks', 'Furniture', 'Dorm Essentials', 'Cooking', 'Decor', 'Clothing', 'Misc'];

const CategoryList = ({ selectedCategory, onSelectCategory }: CategoryListProps) => {
  return (
    <div className="flex overflow-x-auto p-4 space-x-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;