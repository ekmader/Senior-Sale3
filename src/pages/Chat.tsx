import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { Message } from '../types';

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user || !userId) return;
    const q = query(
      collection(db, 'messages'),
      where('fromUserId', 'in', [user.uid, userId]),
      where('toUserId', 'in', [user.uid, userId]),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(messagesData);
    });
    return unsubscribe;
  }, [user, userId]);

  const sendMessage = async () => {
    if (!user || !userId || !newMessage.trim()) return;
    await addDoc(collection(db, 'messages'), {
      fromUserId: user.uid,
      toUserId: userId,
      text: newMessage,
      createdAt: new Date(),
    });
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen pb-20">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-2 ${msg.fromUserId === user?.uid ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.fromUserId === user?.uid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;