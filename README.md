# NotePad - MERN Stack Application

A full-stack notepad application built with MongoDB, Express.js, React, and Node.js.

## Features

- Create, read, update, and delete notes
- Clean and responsive UI
- RESTful API backend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/awromal/notePad.git
cd notePad
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/notepad_db
```

For deployment, use MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notepad_db
```

Start the backend server:

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
mern/
├── backend/
│   ├── controllers/
│   │   └── noteController.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Create a MongoDB Atlas database
2. Set environment variables on your hosting platform:
   - `PORT` (usually auto-set)
   - `MONGO_URI` (your MongoDB Atlas connection string)
3. Deploy the backend folder

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update the API URL in your frontend to point to your deployed backend
2. Deploy the frontend folder

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Mongoose, CORS, dotenv

## Author

Aromal Sreekumar

## License

ISC
