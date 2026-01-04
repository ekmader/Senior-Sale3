import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { Item, User } from '../types';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [seller, setSeller] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      const itemDoc = await getDoc(doc(db, 'items', id));
      if (itemDoc.exists()) {
        const itemData = { id: itemDoc.id, ...itemDoc.data() } as Item;
        setItem(itemData);
        const sellerDoc = await getDoc(doc(db, 'users', itemData.sellerId));
        if (sellerDoc.exists()) {
          setSeller(sellerDoc.data() as User);
        }
      }
    };
    fetchItem();
  }, [id]);

  if (!item || !seller) return <div>Loading...</div>;

  return (
    <div className="p-4 pb-20">
      <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <p className="text-xl font-semibold mb-4">${item.price}</p>
      <p className="text-sm text-gray-500 mb-4">Sold by {seller.name}</p>
      <Link
        to={`/chat/${seller.uid}`}
        className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg"
      >
        Message Seller
      </Link>
    </div>
  );
};

export default ItemDetail;