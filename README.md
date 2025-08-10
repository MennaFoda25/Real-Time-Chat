# 💬 Real-Time Chat Application

A real-time chat platform built with React (Vite), Node.js, Express, Socket.IO, and MongoDB.
It supports multiple chat rooms, private messaging, typing indicators, and live updates, all with a fast and responsive UI.
🚀 Features
⚡ Real-time messaging with Socket.IO

📂 Multiple chat rooms with join/leave notifications

🔒 Private one-on-one messaging

✍ Typing indicators

👥 Online user list per room

🗄 MongoDB persistence for messages and users

⚡ Vite-powered React frontend for blazing-fast development

📱 Responsive design for mobile and desktop

🌐 REST API integration using the native fetch API

## 🛠 Tech Stack
### Frontend
React (Vite)

Socket.IO Client

Native Fetch API for REST requests

CSS Modules / Styled Components for styling

### Backend
Node.js + Express

Socket.IO for real-time events

MongoDB + Mongoose

dotenv for environment variables

## ⚙️ Installation & Setup:

### 1️⃣ Clone the repository

git clone https://github.com/MennaFoda25/Real-Time-Chat.git
cd Real-Time-Chat

### 2️⃣ Backend Setup

cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/realtimechat


Start the backend:

npm run dev

### 3️⃣ Frontend Setup (Vite + React)

cd ../client
npm install

Start the frontend:

npm run dev
The app will be available at the Vite dev server URL (usually http://localhost:5173).
