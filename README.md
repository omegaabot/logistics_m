# Logistics Dashboard Project

This project contains three main components for a logistics management system:
1. **Frontend (React)**: User and Admin dashboard for creating and managing shipments.
2. **Backend (Spring Boot)**: Java backend for handling REST API requests, connecting to the database, and managing drivers and shipments.
3. **Routing Service (Python FastAPI)**: A microservice using Dijkstra's algorithm to calculate the shortest path and cost between cities.

## Project Structure

- `/frontend` - React application
- `/backend` - Java Spring Boot application
- `/routing_service` - Python FastAPI microservice

## Getting Started

### 1. Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

### 2. Backend
Requires Java and Maven.
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:9090`

### 3. Routing Service
Requires Python 3.
```bash
cd routing_service
python -m pip install fastapi uvicorn pydantic
python -m uvicorn main:app --port 8001 --reload
```
Runs on `http://localhost:8001`
