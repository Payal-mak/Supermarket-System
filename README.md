# Supermarket Management System

A full-stack supermarket management system designed for local retail stores.
The system manages products, inventory, suppliers, customers, and is designed to support future online ordering and delivery.

## Tech Stack

* React (Frontend)
* Node.js + Express (Backend)
* PostgreSQL (Database)

## Project Structure

```
supermarket-system
│
├── frontend       # React application
├── backend        # Node.js API server
├── database       # SQL schema and seed data
└── README.md
```

## Features

* Product catalog
* Category management
* Supplier management
* Inventory tracking
* Stock movement history
* Customer management
* Order system (future)
* Delivery system (future)

## Setup

Clone the repository:

```
git clone https://github.com/yourusername/supermarket-system.git
```

Install dependencies:

Backend:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

## Database

The database schema and sample data are located in:

```
database/01_tables.sql
database/02_indexes.sql
database/03_seed_data.sql
```

Import them into PostgreSQL to initialize the database.
