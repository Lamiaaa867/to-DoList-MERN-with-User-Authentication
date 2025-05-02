# TO-DO-LIST Platform 🛒

A TO-DO-LIST application built with Node.js, Express, React, and MongoDB.

## Features ✨
- User authentication (JWT)
- (CRUD)

- USER dashboard
- Responsive UI with React

## Tech Stack 🛠️
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT

## Installation 🚀

### Prerequisites
- Node.js (>= 16)
- MongoDB
- npm 

### Documentation
```bash
cd backend
npm install
npm start


### Frontend Setup
cd Front-End
npm install
npm start


/e-commerce-app
│── /backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│── /frontend
│   ├── src/
│   ├── components/
│   


# User Roles & Permissions 🛡️

## 1️⃣ User Role
A **User** can:
- View his tasks
- Add new task
- delete or update  or search on his tasks 
- update his data

### API Endpoints:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/task/getall` | Fetch all tasks |
| GET | `/task/search` | Fetch filtered tasks |

| POST | `/task/addnewtask` | Create a new task |

| PATCH | `/task/update` | update a new task |

| DELETE | `/task/delete` | delete a new task |

