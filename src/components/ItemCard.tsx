import { Link } from 'react-router-dom';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Link to={`/item/${item.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover" />
        <div className="p-3">
          <h3 className="font-semibold text-sm">{item.title}</h3>
          <p className="text-gray-600 text-sm">${item.price}</p>
          <p className="text-gray-400 text-xs">{item.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;