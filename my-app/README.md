# Dashboard Web Frontend (React.js)

A responsive web application built with React to interface with the Task Management API.

## Features


- **User Authentication** – Register, login, logout with JWT-based session

- **Protected Routes** – Role-based access to pages and actions

- **Task Management** – Create, view, update, and delete tasks

- **Recurring Tasks** – Support for daily, weekly, and monthly recurrences

- **Dashboard and Statistics** – Visualize task data using charts (Recharts)

- **User Management** – Admin panel for managing users and assigning tasks

- **Responsive UI** – Styled with Tailwind CSS  for all screen sizes

- **Error Handling** & Notifications – Friendly  alerts for actions and API responses



## Installation

1. Clone the repository
   git clone 
    cd my-app

2. Install dependencies
   npm install


5. Start the server
   \`\`\`bash
   # Development mode
   npm run dev
   

##  API Documentation

---

###  Authentication

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/api/auth/register`  | Register a new user              |
| POST   | `/api/auth/login`     | Login and receive JWT token      |
| GET    | `/api/auth/profile`   | Fetch logged-in user profile     |

---

###  Tasks

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| GET    | `/api/tasks`         | Get all tasks (role-based filtering)  |
| GET    | `/api/tasks/:id`     | Get a specific task                   |
| POST   | `/api/tasks`         | Create a new task                     |
| PUT    | `/api/tasks/:id`     | Update a task                         |
| DELETE | `/api/tasks/:id`     | Delete a task                         |

---

###  Recurring Tasks

Recurring tasks are supported with the following intervals:
- `daily`
- `weekly`
- `monthly`

The server automatically generates the next occurrence upon completion or when the due date passes.

---

###  Statistics

| Endpoint                                | Description                                |
|----------------------------------------|--------------------------------------------|
| GET `/api/statistics/by-status`        | Number of tasks by status (for charts)     |
| GET `/api/statistics/completed-over-time` | Completed tasks over time (line chart)  |
| GET `/api/statistics/by-priority`      | Task count by priority                     |
| GET `/api/statistics/overdue`          | List of overdue tasks                      |
| GET `/api/statistics/dashboard-summary`| Dashboard summary with aggregated data     |

---

### Users (Admin only)

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/users`           | Get all users                  |
| GET    | `/api/users/:id`       | Get user details               |
| GET    | `/api/users/:id/tasks` | Get tasks assigned to a user   |
| PUT    | `/api/users/:id`       | Update user info               |
| DELETE | `/api/users/:id`       | Delete a user (admin only)     |

---

###  Authorization

All protected routes require a valid JWT token in the `Authorization` header:


 Tech Stack
React 19 + Vite

Tailwind CSS 4

Redux Toolkit & React Redux

React Router v7

Recharts for charting

Axios for API requests

React Hook Form for form handling

React Hot Toast for notifications

