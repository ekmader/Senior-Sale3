import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/groups', label: 'Groups', icon: '👥' },
    { path: '/sell', label: 'Sell', icon: '➕' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center p-2 ${
            location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;