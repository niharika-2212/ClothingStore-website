# Full-Stack E-Commerce Website

A fully functional e-commerce web application with user authentication, product browsing, cart management, online payments, and order tracking — built using the MERN stack (MongoDB, Express, React, Node.js) with Firebase Auth and Razorpay integration.

## Tech-stack
### Frontend
- React + Vite
- HTML, CSS, JavaScript
- Firebase Auth

### Backend
- Node.js
- Express.js
- MongoDB
- Razorpay Integration
- Firebase Admin SDK

## Setup
1. Clone the repository
```
git clone "https://github.com/niharika-2212/ClothingStore-website.git"
```
### Backend
1. Install dependencies
```
cd backend
npm install
```
2. Create .env file
```
PORT=5000
MONGODB_URI = <mongodb_uri>
KEY_ID = <razorpay_id>
SECRET_KEY = <razorpay_secret>
```
3. Get Firebase key from console and move in lib as `firebasekey.json`
4. Start the server
```
node index.js
```

### Frontend
1. Install dependencies
```
cd frontend
npm install
```
2. Get firebase config and paste in src as `firebase.js`
3. Start the server
```
npm run dev
```

## Author
Niharika Manhar
