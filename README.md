# Figure Shop

Figure Shop is a full-stack web application for buying and selling collectible figures.
The project is split into a Node.js/Express REST API that persists data in MongoDB and an
EJS-based dashboard/storefront that consumes those APIs through Axios.

## Highlights
- Session-based authentication flow with bcrypt password hashing and username availability checks.
- Product catalog management with category tagging, image uploads via Multer, and discount scheduling.
- Shopping cart, order, payment method/type, and address endpoints that cover the entire checkout pipeline.
- Analytics routes that aggregate MongoDB data to surface best-selling categories and per-user spending.
- Admin-facing EJS views for product/discount CRUD plus a customer-facing shop, product detail, cart, and tracking pages.

## Tech Stack
- Backend: Node.js, Express, Mongoose, Multer, bcrypt, express-session, cors, dotenv.
- Frontend: Node.js, Express, EJS, Axios, dotenv.
- Database: MongoDB (connection string injected via environment variable).

## Project Structure
```
Final_Project_Database_SQL/
├── Backend/           # REST API, models, controllers, and routers
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── Images/        # Uploaded product images (stored as base64)
│   └── index.js
└── Frontend/          # EJS storefront & admin panel powered by Axios calls
    ├── assets/
    ├── partials/
    ├── public/
    ├── views/
    └── app.js
```

## Getting Started
### Prerequisites
- Node.js 18+ and npm
- Running MongoDB instance or Atlas connection string

### 1. Clone
```bash
git clone https://github.com/Jarukit-PM/Final_Project_Database_SQL.git
cd Final_Project_Database_SQL
```

### 2. Backend API
```bash
cd Backend
npm install
cp .env.example .env   # create this file if it does not exist
```

Add the following variables to `.env`:
```
MONGOURI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=8080
DB_HOST=localhost        # or the hostname/IP of your MySQL/MariaDB server
DB_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=test_nodejs
```

Start the API:
```bash
npm start
```

### 3. Frontend (Storefront + Admin Panel)
```bash
cd ../Frontend
npm install
cp .env.example .env   # optional: set PORT=9090
```

Run the EJS app:
```bash
npm start
```

Open http://localhost:9090 to browse the storefront and admin panel.
The frontend expects the backend to run on http://localhost:8080; update the Axios base URLs in `Frontend/app.js` if you use a different port or host.

### 4. Run Everything with Docker Compose
To avoid installing Node.js, MySQL, and Mongo locally, you can spin up the full stack with Docker:
```bash
docker compose up --build
```
- `my-shop-db` builds from `Backend/Mariadb/Dockerfile` and seeds the schema defined in `Backend/Mariadb/Schema.sql`.
- `my-shop-backend` gets its DB connection details from environment variables provided in `compose.yaml`. Update them if you need custom credentials.
- `my-shop-frontend` automatically points to the backend service via the Docker network.

After the containers finish starting, visit http://localhost:9090. To stop all services, press `Ctrl+C` in the compose terminal or run:
```bash
docker compose down
```
Add `-v` if you want to remove the database volume.

## Key API Endpoints
| Area | Endpoint | Description |
|------|----------|-------------|
| Auth | `POST /api/Authentication/register` | Register a user + default address (password hashed with bcrypt). |
| Auth | `POST /api/Authentication/login` | Creates a session and returns username. |
| Products | `GET /api/Product/getProduct` | List every product with populated categories. |
| Products | `POST /api/Product/addProduct` | Create product, parse category tags, upload base64 image. |
| Discounts | `POST /api/Discount/addDiscount` | Configure promotions and discount categories. |
| Cart | `POST /api/ShoppingCartItem/:cartId/:productId` | Add an item to a user’s cart. |
| Orders | `POST /api/Order/createOrder` | Persist order + payment metadata. |
| Analytics | `GET /api/Analyze/bestCategory` | Aggregates order items to find best-selling categories. |
| Analytics | `GET /api/Analyze/bestCategoryFromUser/:user_id` | Finds a user’s most purchased categories and spending total. |

Each router lives under `Backend/Routes` with matching controller logic in `Backend/Controllers`.

## Development Notes
- Image uploads are processed by Multer and stored as base64 strings within MongoDB; ensure your deployment target can handle the resulting payload sizes.
- Session data uses the in-memory store provided by express-session. Use a persistent session store (e.g., Redis) in production.
- The admin EJS screens currently depend on Axios calls embedded inside the view-specific scripts; keep API contracts synchronized when evolving endpoints.

## License
This project is released under the ISC License (see `Backend/package.json` and `Frontend/package.json`).
