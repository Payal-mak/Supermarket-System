# Supermarket Management System

A full-stack supermarket management system designed for local retail stores.  
The system manages products, inventory, suppliers, customers, and is designed to support future online ordering and delivery.

## 🌐 Live Demo

The application is currently deployed and accessible at: **http://100.29.14.148**

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (AWS RDS)
- **Hosting**: AWS EC2
- **Web Server**: Nginx
- **Process Management**: PM2

## Project Structure

```
supermarket-system/
├── backend/           # Node.js + Express API server
│   ├── server.js      # Entry point
│   ├── db.js          # PostgreSQL connection
│   ├── routes/        # Express route definitions
│   ├── controllers/   # Business logic
│   └── middleware/    # Error handling, etc.
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── data/
│   └── public/
├── database/          # SQL schema and seed data
├── docs/              # ER diagram, data dictionary, Excel files
├── scripts/           # Data parsing utilities
└── README.md
```

## Features

- Product catalog with categories
- Category management
- Supplier management
- Inventory tracking
- Stock movement history
- Customer management
- Comprehensive client-side form validations with clear error messages
- Admin Reports dashboard (Daily, Monthly, Yearly views)
- Secure payment gateway integration (Razorpay)
- Order system (future)
- Delivery system (future)

## Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Clone the repository

```bash
git clone https://github.com/yourusername/supermarket-system.git
cd supermarket-system
```

### Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

Or install both at once from the root:

```bash
npm run install:all
```

### Environment Variables

Copy the example env file and update with your credentials:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials.

### Database

Import the SQL files into PostgreSQL to initialize the database:

```
database/01_tables.sql
database/02_indexes.sql
database/03_seed_data.sql
```

### Running the Application

Start the backend (from root):

```bash
npm run dev:backend
```

Start the frontend (from root):

```bash
npm run dev:frontend
```

Or start them individually:

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

## API Endpoints

| Resource   | Method | Endpoint           | Description         |
|------------|--------|--------------------|---------------------|
| Products   | GET    | `/api/products`    | List all products   |
| Products   | GET    | `/api/products/:id`| Get a product       |
| Products   | POST   | `/api/products`    | Create a product    |
| Products   | PUT    | `/api/products/:id`| Update a product    |
| Products   | DELETE | `/api/products/:id`| Delete a product    |
| Categories | GET    | `/api/categories`  | List all categories |
| Customers  | GET    | `/api/customers`   | List all customers  |
| Orders     | GET    | `/api/orders`      | List all orders     |
| Orders     | POST   | `/api/orders`      | Create an order     |
| Inventory  | GET    | `/api/inventory`   | List all inventory  |
| Suppliers  | GET    | `/api/suppliers`   | List all suppliers  |
| Payments   | POST   | `/api/payments/create-order` | Create Razorpay order |
| Payments   | POST   | `/api/payments/verify` | Verify payment signature |
| Health     | GET    | `/api/health`      | Health check        |
