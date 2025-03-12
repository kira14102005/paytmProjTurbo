# PaytmProjTurbo 🚀💰

## Overview 📑

**PaytmProjTurbo** is a full-stack financial transaction system designed to facilitate peer-to-peer (P2P) money transfers, on-ramp transactions, and user balance management. The project leverages a monorepo architecture using **Turborepo**, integrating multiple applications and packages to deliver a cohesive financial platform. It uses **Next.js** for both frontend and backend, and an **Express.js-based bank webhook** to handle transactions.

## Features ✨

- 🔒 **Secure Authentication:** Uses NextAuth to handle secure user login and session management.
- 🔁 **Peer-to-Peer (P2P) Transfers:** Seamlessly transfer money between users with real-time updates.
- 💳 **On-Ramp Transactions:** Load money into the user's account via integrated banking APIs.
- 📜 **Transaction History:** View a list of all sent and received transactions, including timestamps and statuses.
- 🖥️ **Express Webhook Handling:** Uses an Express.js server to listen to bank transaction updates and process them efficiently.
- 💵 **User Balance Management:** View and manage the current balance and locked funds.
- 🗃️ **Efficient Monorepo Structure:** Uses Turborepo for managing apps and packages under one unified project.
- 🔧 **Robust CI/CD Pipelines:** Automates build and deployment processes using GitHub Actions and Docker.
- 🐳 **Dockerized Deployment:** Seamless deployment with Docker and EC2 integration for scalability and reliability.

## Tech Stack 🛠️

- ⚛️ **Frontend & Backend:** Next.js
- 🐘 **Database:** PostgreSQL managed with Prisma ORM
- 🔑 **Authentication:** NextAuth
- 📝 **Server Actions:** Custom server-side functions for transaction processing
- 🌐 **Webhook Handling:** Express.js
- 📦 **Monorepo Management:** Turborepo
- 🚀 **Deployment & CI/CD:** Docker, GitHub Actions

## Installation & Setup 🛑

### Prerequisites 📂

Ensure you have the following installed:

- 🌐 **Node.js** (v20+ recommended)
- 🐘 **PostgreSQL**
- 🐳 **Docker** (for production deployment)

### Setup Instructions 📝

1. Clone the repository:
   ```bash
   git clone https://github.com/kira14102005/paytmProjTurbo.git
   cd paytmProjTurbo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   DATABASE_URL=your_postgres_connection_string
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Generate Prisma Client and run database migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Setup 🐋

1. **Build the Docker Image:**
   ```bash
   docker build -t paytmproj .
   ```
2. **Run the Docker Container:**
   ```bash
   docker run -d -p 3000:3000 --name paytmapp paytmproj
   ```
3. **Access the App:**
   Visit `http://localhost:3000` to see the application in action.

### Docker Compose (Recommended) 🗃️

1. **Build and Start Services:**
   ```bash
   docker-compose up --build -d
   ```
2. **Check Running Containers:**
   ```bash
   docker-compose ps
   ```
3. **Stop All Containers:**
   ```bash
   docker-compose down
   ```

### Logging and Debugging 📝

View logs from the running container:
```bash
sudo docker logs -f paytmapp
```
Access the container's shell:
```bash
sudo docker exec -it paytmapp /bin/sh
```

## API Endpoints (Webhook) 🌐

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| POST   | `/webhook/transaction` | Handles bank transaction updates |

## Deployment (Coming Soon) 🚀

The website is not yet deployed. Deployment will be done shortly, and the **LIVE URL** will be updated here.

## Contributing 🤝

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License 📄

This project is licensed under the **MIT License**.

---

