import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { Item } from '../types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ItemCard from '../components/ItemCard';

const Home = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'items'),
      where('universityId', '==', user.universityId),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Item));
      setItems(itemsData);
      setFilteredItems(itemsData);
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    let filtered = items;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="pb-20">
      <Header />
      <SearchBar onSearch={setSearchQuery} />
      <CategoryList selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;