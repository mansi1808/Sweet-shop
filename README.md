"# Sweet-shop-" 
# Sweet Shop Management System

A full-stack web application for managing a sweet shop, featuring an admin dashboard for inventory management and a customer-facing shop interface.

## Project Structure

- **Backend**: Spring Boot (Java) application handling API requests, authentication, and database interactions.
- **Frontend**: React (TypeScript) application with Express middleware for proxying.

## Prerequisites

- **Java JDK 25** (or compatible JDK 17+)
- **Maven** (v3.9+)
- **Node.js** (v18+)
- **MySQL Database**

## Setup Instructions

### 1. Database Setup

1.  Install and start MySQL Server.
2.  Create a new database named `shopsweet`.
3.  Ensure you have a user with:
    -   Username: `root`
    -   Password: `root`
    -   *Or update `Sweet-Shop-Backend/src/main/resources/application.properties` with your credentials.*

### 2. Backend Setup

1.  Open a terminal and navigate to the backend directory:
    ```bash
    cd Sweet-Shop-Backend
    ```
2.  Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
    *Note: Ensure your `JAVA_HOME` environment variable is set correctly.*

    The backend will start on `http://localhost:8080`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd Sweet-Shop-Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

    The frontend will start on `http://localhost:5000`.

## Accessing the Application

-   **Home Page**: [http://localhost:5000](http://localhost:5000)
-   **Login Page**: [http://localhost:5000/login](http://localhost:5000/login)

### Default Credentials

-   **Admin User**:
    -   Username: `admin`
    -   Password: `admin`

    *Login as admin to access the Dashboard at `/admin/dashboard`.*

## Troubleshooting

-   **401 Unauthorized Errors**: Ensure only ONE instance of the backend is running. If issues persist, kill all Java processes (`taskkill /F /IM java.exe`) and restart the backend.
-   **Port Conflicts**: The frontend runs on port 5000. Ensure this port is free.
