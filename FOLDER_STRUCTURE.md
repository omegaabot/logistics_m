# 📁 Project Folder Structure

This document provides a comprehensive view of the directory and file structure of the **Logistics Management System**, detailing the role, purpose, and architecture of each component within the workspace.

---

## ℹ️ About the Project

The **Logistics Management System** is a comprehensive web application designed for managing shipments, drivers, and routes in a logistics operation. It provides an integrated platform where:

- **Users** can create and track shipments with real-time route optimization.
- **Admins** can manage drivers, locations, and monitor system operations.
- **Routing Service** calculates the most efficient delivery paths using Dijkstra's shortest path algorithm across multiple regional hubs.

### Key Features

- **Real-Time Route Optimization:** Automatically calculates the shortest and most cost-effective delivery routes.
- **Multi-Hub Network:** Supports routing across 6 regional hubs (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad) covering 24+ cities.
- **User Dashboard:** User-friendly interface for shipment creation and tracking.
- **Admin Panel:** Comprehensive management interface for drivers, locations, and system monitoring.
- **REST API:** Full-featured APIs for integration and programmatic access.
- **Microservices Architecture:** Modular design with separate services for frontend, backend, and route optimization.

### Technology Stack

- **Frontend:** React 19.2.6 with React Router for navigation.
- **Backend:** Spring Boot 4.0.6 with Java 17 and PostgreSQL.
- **Routing Engine:** Python FastAPI with Dijkstra algorithm implementation.
- **Database:** PostgreSQL for persistent data storage.
- **Build Tools:** Maven (Java), npm (Node.js).

---

## 🌳 Interactive Visual Tree

```
📁 logistics/ (Root Workspace)
├── 📂 .github/                   # GitHub Action workflows and upgrade hooks
│   └── 📂 java-upgrade/          # Scripted procedures for Java upgrades
│       ├── 📄 .gitignore
│       └── 📂 hooks/scripts/
│           ├── 📄 recordToolUse.ps1
│           └── 📄 recordToolUse.sh
├── 📂 .vscode/                   # VS Code configuration settings
│   └── 📄 settings.json
├── 📂 backend/                   # Java Spring Boot backend service
│   ├── 📄 .gitattributes
│   ├── 📄 .gitignore
│   ├── 📄 HELP.md
│   ├── 📄 mvnw
│   ├── 📄 mvnw.cmd
│   ├── 📄 pom.xml                # Project Object Model for Maven dependencies
│   └── 📂 src/
│       ├── 📂 main/
│       │   ├── 📂 java/com/logistics/backend/
│       │   │   ├── 📄 BackendApplication.java # Spring Boot main entry point
│       │   │   ├── 📂 config/                 # Core configuration beans (Security, CORS, Web, App)
│       │   │   │   ├── 📄 AppConfig.java
│       │   │   │   ├── 📄 CorsConfig.java
│       │   │   │   ├── 📄 SecurityConfig.java
│       │   │   │   └── 📄 WebConfig.java
│       │   │   ├── 📂 controller/             # REST API Endpoints / Request Controllers
│       │   │   │   ├── 📄 AuthController.java
│       │   │   │   ├── 📄 DriverController.java
│       │   │   │   ├── 📄 LocationController.java
│       │   │   │   ├── 📄 ShipmentController.java
│       │   │   │   ├── 📄 TestController.java
│       │   │   │   └── 📄 UserController.java
│       │   │   ├── 📂 model/                  # Data Models / JPA Entities
│       │   │   │   ├── 📄 City.java
│       │   │   │   ├── 📄 Driver.java
│       │   │   │   ├── 📄 Role.java
│       │   │   │   ├── 📄 Shipment.java
│       │   │   │   ├── 📄 State.java
│       │   │   │   └── 📄 User.java
│       │   │   ├── 📂 repository/             # Spring Data JPA Repository Interfaces
│       │   │   │   ├── 📄 CityRepository.java
│       │   │   │   ├── 📄 DriverRepository.java
│       │   │   │   ├── 📄 ShipmentRepository.java
│       │   │   │   ├── 📄 StateRepository.java
│       │   │   │   └── 📄 UserRepository.java
│       │   │   ├── 📂 security/               # Authentication & Authorization (JWT)
│       │   │   │   ├── 📄 JwtFilter.java
│       │   │   │   └── 📄 JwtUtil.java
│       │   │   └── 📂 service/                # Business Logic layer
│       │   │       ├── 📄 AuthService.java
│       │   │       ├── 📄 DriverService.java
│       │   │       ├── 📄 LocationService.java
│       │   │       ├── 📄 ShipmentService.java
│       │   │       └── 📄 UserService.java
│       │   └── 📂 resources/
│       │       ├── 📄 application.properties  # Global environment settings & DB connection
│       │       └── 📄 data.sql                # SQL initialization queries & seed data
│       └── 📂 test/java/com/logistics/backend/
│           └── 📄 BackendApplicationTests.java # Application unit & integration tests
├── 📂 frontend/                  # React dashboard application
│   ├── 📄 .gitignore
│   ├── 📄 package.json           # npm manifest with scripts & dependency definitions
│   ├── 📄 package-lock.json
│   ├── 📄 README.md
│   ├── 📂 public/                 # Static assets directory
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 index.html          # Webapp main HTML host page
│   │   ├── 📄 logo192.png
│   │   ├── 📄 logo512.png
│   │   ├── 📄 manifest.json       # Progressive Web App (PWA) manifest
│   │   └── 📄 robots.txt
│   └── 📂 src/
│       ├── 📄 App.js              # Layout manager & React component router
│       ├── 📄 App.css
│       ├── 📄 App.test.js
│       ├── 📄 index.js            # Initial React DOM bootstrapping entry point
│       ├── 📄 index.css
│       ├── 📄 logo.svg
│       ├── 📄 reportWebVitals.js
│       ├── 📄 setupTests.js
│       ├── 📂 api/                # HTTP API Client layer
│       │   └── 📄 index.js
│       ├── 📂 components/         # Reusable UI widgets
│       │   ├── 📂 Admin/
│       │   │   └── 📄 AdminPanel.js
│       │   └── 📂 Shipment/
│       │       └── 📄 Shipment.js
│       ├── 📂 pages/              # Primary route view components
│       │   ├── 📄 AdminPage.js
│       │   ├── 📄 LoginPage.js
│       │   └── 📄 UserPage.js
│       └── 📂 style/              # Global application CSS variables & style systems
│           └── 📄 global.css
├── 📂 routing_service/           # Shortest-path routing service (FastAPI)
│   ├── 📄 main.py                # Service entry point and endpoints
│   ├── 📄 dijkstra.py            # Dijkstra's path calculation algorithm
│   └── 📄 graph_data.py          # City nodes and distance weights database
├── 📄 .gitignore
├── 📄 backend.zip                # Backed-up archive of the Spring Boot application
├── 📄 FOLDER_STRUCTURE.md        # Structure reference document (this file)
└── 📄 README.md                  # Root execution and setup handbook
```

---

## Service Architecture Overview

### Backend (Spring Boot)
- **Port:** `9090`
- **Framework:** Spring Boot 4.0.6
- **Language:** Java 17
- **Database:** PostgreSQL (`localhost:5432`)
- **Database Name:** `logistics_db`
- **API Documentation:** Swagger UI at `/swagger-ui.html`

### Routing Service (FastAPI)
- **Port:** `8001`
- **Framework:** FastAPI
- **Language:** Python 3.x
- **Key Dependencies:** `uvicorn`, `pydantic`, `heapq`
- **API Documentation:** Swagger UI at `/docs`

### Frontend (React)
- **Port:** `3000`
- **Framework:** React 19.2.6
- **Routing:** React Router 7.15.1
- **HTTP Client:** Axios
- **Notifications:** React Toastify

---

## Key Files Summary

| File | Purpose |
| :--- | :--- |
| `backend/pom.xml` | Maven dependency management and build configuration |
| `backend/src/main/resources/application.properties` | Database, port, & security settings configuration |
| `frontend/package.json` | Node packages, scripts, & project manifest |
| `routing_service/main.py` | FastAPI application server and path calculation endpoint |
| `routing_service/dijkstra.py` | Implementation of Dijkstra's algorithm for route optimization |
| `routing_service/graph_data.py` | Database mapping city node weights, hubs, and edges |

---

## Directory Purposes

- **`config/`** - Configuration beans and Spring setup (Web, CORS, Security)
- **`controller/`** - REST API endpoints handling incoming HTTP requests
- **`model/`** - JPA Entity classes matching database tables
- **`repository/`** - JPA interfaces implementing query methods for database access
- **`service/`** - Service layer hosting business workflows and logic
- **`api/`** - Frontend API endpoint configurations and instance clients
- **`components/`** - Reusable visual widgets and layout modules in React
- **`pages/`** - Layout route containers for user/admin entry views
- **`style/`** - CSS modules containing variable custom stylings

---

> [!NOTE]
> This structure documentation is kept synchronized with actual workspace scans. If files or configurations are modified, please ensure this reference document is updated.
