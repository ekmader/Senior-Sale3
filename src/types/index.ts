export interface User {
  uid: string;
  name: string;
  email: string;
  universityId: string;
  createdAt: any; // Timestamp
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string;
  universityId: string;
  createdAt: any;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: any;
}

export interface Group {
  id: string;
  name: string;
  universityId: string;
  members: string[];
}