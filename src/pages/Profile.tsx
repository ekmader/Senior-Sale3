import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-4"><strong>University:</strong> {user.universityId}</p>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;