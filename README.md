# 🎵 sonic-drop-player

`sonic-drop-player` is a music playlist manager where logged-in users can browse a searchable song catalog, and create, edit, and delete playlists while adding and removing songs from them.

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [✅ Prerequisites](#-prerequisites)
- [📦 Clone the Repository](#-clone-the-repository)
- [🐳 Database Setup (Docker)](#-database-setup-docker)
- [⚙️ Backend Setup](#️-backend-setup)
- [🎨 Frontend Setup](#-frontend-setup)
- [🌟 Key Features](#-key-features)

## ✅ Prerequisites

Make sure the following are installed on your machine before you begin:

- **Node.js** (v18 or later) & **npm**
- **Docker Desktop** (to run the PostgreSQL database)
- **Git**

## 📦 Clone the Repository

```bash
git clone https://github.com/sudarshan-sh/sonic-drop-player.git
cd sonic-drop-player
```

The repository already contains the full source for both the `backend/` (Express API) and `frontend/` (React + Vite client) — you don't need to scaffold anything, just install dependencies and configure your environment as shown below.

## 🐳 Database Setup (Docker)

This project uses **PostgreSQL** running inside a **Docker** container.

### 1. Start the PostgreSQL Container

_(Note: Replace `your_secure_password`, `your_username`, and `your_database_name` with your preferred local values — you'll reuse these exact values in the backend `.env` file in the next section)._

```bash
docker run -d --name myDb -p 5432:5432 -e POSTGRES_PASSWORD=your_secure_password -e POSTGRES_USER=your_username -e POSTGRES_DB=your_database_name postgres
```

Give the container a few seconds to finish initializing before continuing.

### 2. Load the Database Schema & Seed Data

The repo ships with a ready-to-use schema at [`backend/data/schema.sql`](backend/data/schema.sql) — it creates the `users`, `songs`, `playlists`, and `playlist_songs` tables and seeds the `songs` table with a starter catalog. Load it directly into the running container:

```bash
docker exec -i myDb psql -U your_username -d your_database_name < backend/data/schema.sql
```

_(Optional) To verify the tables were created, you can open an interactive session:_

```bash
docker exec -it myDb psql -U your_username -d your_database_name -c "\dt"
```

## ⚙️ Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

This installs everything already declared in `backend/package.json`: **express**, **pg**, **bcryptjs**, **jsonwebtoken**, **cookie-parser**, **cors**, **dotenv**, and the dev-only auto-reloader **nodemon**.

### 2. Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

Open the newly created `backend/.env` and fill it in — the `DB_*` values **must match** the credentials you used in the `docker run` command above:

```bash
PORT=8000
CLIENT_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_secure_password

JWT_SECRET=any_long_random_string_here
```

### 3. Launch the Server

```bash
npm run dev
```

The API will start listening at `http://localhost:8000`.

---

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd ../frontend
npm install
```

This installs everything already declared in `frontend/package.json`: **react**, **react-dom**, **react-router-dom**, **axios**, **tailwindcss** + **@tailwindcss/vite**, and the Vite/TypeScript tooling.

### 2. Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

Open the newly created `frontend/.env` and point it at your running backend (must match the backend's `PORT` from the previous section):

```bash
VITE_API_URL="http://localhost:8000"
```

### 3. Launch the Application

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to explore your music player application.

---

## 🌟 Key Features

- **🔐 Secure Login:** Create an account and log in safely to save your music library.
- **🎶 Browse Music:** Browse a paginated, searchable catalog of all songs by title or artist.
- **✨ Create & Edit Playlists:** Make new playlists with a title and description, and rename or update them whenever you want.
- **🗑️ Delete Playlists:** Easily delete old playlists you don't want anymore.
- **🎵 Add & Remove Songs:** Add songs from the catalog to any playlist, or remove ones you no longer want in it, right from the song list.
