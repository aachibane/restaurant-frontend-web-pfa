# Restaurant Management Dashboard — Web Frontend

> Part of the **Restaurant Management System** — Projet de Fin d'Année (PFA)

A React-based web application built for **restaurant owners** to manage and monitor their business operations from a single intuitive dashboard. It communicates with the [Spring Boot backend API](https://github.com/aachibane/restaurant-backend-pfa) to handle all core operations.

---

## Related Repositories

| Project                                                            | Description                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------- |
| [Backend API](https://github.com/aachibane/restaurant-backend-pfa) | Spring Boot REST API serving this web app and the mobile apps |
| Mobile App (Clients)                                               | React Native app for customers                                |
| Mobile App (Waiters)                                               | React Native app for restaurant staff                         |

---

## Features

- **Authentication** — Secure login & registration using JWT with HttpOnly cookies
- **Operations Dashboard** — Real-time overview of restaurant activity
- **Order Management** — Monitor, track and manage incoming orders
- **Menu Management** — Add, edit and remove menu items
- **Promotions & Offers** — Create and manage special deals for loyal customers
- **User Management** — Manage staff accounts and roles (Admin, Waiter)
- **Role-based Access** — Different views and permissions per user role
- **Dynamic Navigation** — Context-aware navigation based on authenticated user

---

## Tech Stack

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React.js     | Frontend framework         |
| React Hooks  | State management           |
| React Router | Client-side routing        |
| Axios        | HTTP requests to the API   |
| Tailwind CSS | Styling                    |
| Formik + Yup | Form handling & validation |
| JWT          | Authentication tokens      |

---

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn
- Backend API running on `http://localhost:8080` — see [restaurant-backend-pfa](https://github.com/aachibane/restaurant-backend-pfa)

### Installation

```bash
# Clone the repository
git clone https://github.com/aachibane/restaurant-frontend-web.git

# Navigate into the project
cd restaurant-frontend-web

# Install dependencies
npm install
# or
yarn install
```

### Configuration

Create a `.env` file at the root of the project:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Running the App

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Integration

This app connects to the Spring Boot backend. Make sure it's running before launching the frontend. Key endpoints used:

| Resource | Endpoint           |
| -------- | ------------------ |
| Auth     | `POST /auth/login` |
| Users    | `GET /api/users`   |
| Orders   | `GET /api/orders`  |
| Menu     | `GET /api/menu`    |
| Offers   | `GET /api/offers`  |

Authentication uses JWT — the token is stored in an HttpOnly cookie and sent automatically with each request.

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Route-level pages (Dashboard, Orders, Menu...)
├── services/         # Axios API call wrappers
├── hooks/            # Custom React hooks
└── utils/            # Helper functions & constants
```

---

## Author

**Akram Achibane**
Final Year Project (PFA) — 2024

---

## License

This project is developed for academic purposes as part of a final year engineering project (PFA).
