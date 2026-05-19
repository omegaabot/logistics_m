# Logistics Management System - Project Folder Structure

## About the Project

The **Logistics Management System** is a comprehensive web application designed for managing shipments, drivers, and routes in a logistics operation. It provides an integrated platform where:

- **Users** can create and track shipments with real-time route optimization
- **Admins** can manage drivers, locations, and monitor system operations
- **Routing Service** calculates the most efficient delivery paths using Dijkstra's shortest path algorithm across multiple regional hubs

### Key Features
- **Real-time Route Optimization:** Automatically calculates the shortest and most cost-effective delivery routes
- **Multi-Hub Network:** Supports routing across 6 regional hubs (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad) covering 24+ cities
- **User Dashboard:** User-friendly interface for shipment creation and tracking
- **Admin Panel:** Comprehensive management interface for drivers, locations, and system monitoring
- **REST API:** Full-featured APIs for integration and programmatic access
- **Microservices Architecture:** Modular design with separate services for frontend, backend, and route optimization

### Technology Stack
- **Frontend:** React 19.2.6 with React Router for navigation
- **Backend:** Spring Boot 4.0.6 with Java 17 and PostgreSQL
- **Routing Engine:** Python FastAPI with Dijkstra algorithm implementation
- **Database:** PostgreSQL for persistent data storage
- **Build Tools:** Maven (Java), npm (Node.js)

---

```
logistics_m/
│
├── .git/                                  # Git repository
├── .gitignore                             # Git ignore rules
├── README.md                              # Project documentation
├── FOLDER_STRUCTURE.md                    # This file - Project structure documentation
│
├── backend/                               # Spring Boot Backend (Java)
│   ├── .gitattributes                     # Git attributes for line endings
│   ├── .gitignore                         # Backend-specific git ignore
│   ├── .idea/                             # IntelliJ IDEA project files
│   ├── mvnw                               # Maven Wrapper (Unix/Linux)
│   ├── mvnw.cmd                           # Maven Wrapper (Windows)
│   ├── pom.xml                            # Maven project configuration
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/logistics/backend/
│   │   │   │       ├── BackendApplication.java          # Spring Boot main entry point
│   │   │   │       │
│   │   │   │       ├── config/                           # Configuration classes
│   │   │   │       │   ├── AppConfig.java                # Application configuration beans
│   │   │   │       │   └── WebConfig.java                # Web/CORS configuration
│   │   │   │       │
│   │   │   │       ├── controller/                       # REST API Controllers
│   │   │   │       │   ├── DriverController.java         # Driver management endpoints
│   │   │   │       │   ├── LocationController.java       # Location/City endpoints
│   │   │   │       │   ├── ShipmentController.java       # Shipment management endpoints
│   │   │   │       │   ├── TestController.java           # Testing endpoints
│   │   │   │       │   └── UserController.java           # User management endpoints
│   │   │   │       │
│   │   │   │       ├── model/                            # Entity/Data Models
│   │   │   │       │   ├── City.java                     # City entity
│   │   │   │       │   ├── Driver.java                   # Driver entity
│   │   │   │       │   ├── Shipment.java                 # Shipment entity
│   │   │   │       │   ├── State.java                    # State entity
│   │   │   │       │   └── User.java                     # User entity
│   │   │   │       │
│   │   │   │       ├── repository/                       # Data Access Layer (Spring Data JPA)
│   │   │   │       │   ├── CityRepository.java           # City data operations
│   │   │   │       │   ├── DriverRepository.java         # Driver data operations
│   │   │   │       │   ├── ShipmentRepository.java       # Shipment data operations
│   │   │   │       │   ├── StateRepository.java          # State data operations
│   │   │   │       │   └── UserRepository.java           # User data operations
│   │   │   │       │
│   │   │   │       └── service/                          # Business Logic Layer
│   │   │   │           ├── DriverService.java            # Driver business logic
│   │   │   │           ├── LocationService.java          # Location business logic
│   │   │   │           ├── ShipmentService.java          # Shipment business logic
│   │   │   │           └── UserService.java              # User business logic
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties                # Spring Boot configuration
│   │   │       └── data.sql                              # Initial SQL data
│   │   │
│   │   └── test/
│   │       └── java/
│   │           └── com/logistics/backend/
│   │               └── BackendApplicationTests.java      # Integration/Unit tests
│   │
│   └── target/                            # Maven build output (generated)
│       ├── classes/                       # Compiled Java classes
│       ├── generated-sources/             # Generated source files
│       └── ...                            # Other Maven build artifacts
│
├── frontend/                              # React Frontend (JavaScript)
│   ├── package.json                       # Node.js project configuration & dependencies
│   ├── README.md                          # Frontend documentation
│   │
│   ├── public/                            # Static assets & HTML entry point
│   │   ├── favicon.ico                    # Browser favicon
│   │   ├── index.html                     # Main HTML file (React root)
│   │   ├── logo192.png                    # Logo (192x192)
│   │   ├── logo512.png                    # Logo (512x512)
│   │   ├── manifest.json                  # PWA manifest
│   │   └── robots.txt                     # SEO robots directive
│   │
│   ├── src/                               # React source code
│   │   ├── App.css                        # Main App component styles
│   │   ├── App.js                         # Main App component
│   │   ├── App.test.js                    # App component tests
│   │   ├── index.css                      # Global styles
│   │   ├── index.js                       # React entry point
│   │   ├── logo.svg                       # Logo SVG
│   │   ├── reportWebVitals.js             # Performance monitoring
│   │   ├── setupTests.js                  # Test configuration
│   │   │
│   │   ├── api/                           # API integration
│   │   │   └── index.js                   # API client/axios configuration
│   │   │
│   │   ├── components/                    # Reusable React components
│   │   │   ├── Admin/
│   │   │   │   └── AdminPanel.js          # Admin panel component
│   │   │   └── Shipment/
│   │   │       └── Shipment.js            # Shipment component
│   │   │
│   │   ├── pages/                         # Page components (routes)
│   │   │   ├── AdminPage.js               # Admin page
│   │   │   └── UserPage.js                # User page
│   │   │
│   │   └── style/                         # Additional styles
│   │       └── global.css                 # Global stylesheet
│   │
│   └── node_modules/                      # Dependencies (generated by npm)
│
└── routing_service/                       # FastAPI Python Microservice
    ├── main.py                            # FastAPI application entry point
    ├── dijkstra.py                        # Dijkstra algorithm implementation
    ├── graph_data.py                      # Graph structure & city-hub mappings
    ├── __pycache__/                       # Python cache (generated)
    └── requirements.txt                   # Python dependencies (if present)
```

## Service Architecture Overview

### Backend (Spring Boot)
- **Port:** 9090
- **Framework:** Spring Boot 4.0.6
- **Language:** Java 17
- **Database:** PostgreSQL (localhost:5432)
- **Database Name:** logistics_db
- **API Documentation:** Swagger UI at `/swagger-ui.html`

### Routing Service (FastAPI)
- **Port:** 8001
- **Framework:** FastAPI
- **Language:** Python 3.x
- **Key Dependencies:** uvicorn, pydantic, heapq
- **API Documentation:** Swagger UI at `/docs`

### Frontend (React)
- **Port:** 3000
- **Framework:** React 19.2.6
- **Routing:** React Router 7.15.1
- **HTTP Client:** Axios
- **Notifications:** React Toastify

## Key Files Summary

| File | Purpose |
|------|---------|
| `backend/pom.xml` | Maven dependency management and build configuration |
| `backend/src/main/resources/application.properties` | Database & server configuration |
| `frontend/package.json` | Node dependencies and npm scripts |
| `routing_service/main.py` | FastAPI server and route calculation endpoint |
| `routing_service/dijkstra.py` | Shortest path algorithm for route optimization |
| `routing_service/graph_data.py` | Hub network graph and city-to-hub mapping |

## Directory Purposes

- **config/** - Configuration beans and Spring configurations
- **controller/** - REST API endpoints
- **model/** - JPA entity classes
- **repository/** - Spring Data JPA interfaces for database operations
- **service/** - Business logic and service layer
- **api/** - Frontend API client configuration
- **components/** - Reusable React components
- **pages/** - Page-level React components
- **style/** - CSS stylesheets
