# Flight Booking System – Angular Frontend

A complete, production‑ready flight booking application built using Angular.  
This frontend communicates with a Spring Boot backend and supports secure authentication, role‑based access, flight management, seat selection, and a full user booking flow.

![Application Preview](./src/assets/images/app-preview.png)

---

## Backend Repository (Spring Boot)

This Angular frontend works together with the Spring Boot backend for authentication, flight management, airline management, and booking operations.

**Backend GitHub Repository:**  
[Flight Booking System – Spring Boot Backend](https://github.com/Pranitha161/Flight_Booking_System_Reactive_JWT)

---

## Overview

This project is a full‑stack airline reservation system designed for both **end‑users** and **administrators**.  
It includes:

- A modern Angular UI  
- Secure JWT‑based authentication  
- Role‑aware navigation    
- Admin flight management  
- Airline management  
- User profile management  
- Password policy enforcement  
- Change Password flow with validation  
- Docker Compose orchestration for backend services  
- Reusable components and clean architecture  

---

## Authentication & Authorization
### Login Page
![Login](./src/assets/images/login-preview.png)

### Signup Page
![Signup](./src/assets/images/signup-preview.png)

### JWT Authentication  
- Login generates a JWT token from backend  
- Token stored in `localStorage`  
- Token attached to every API request using an **HTTP interceptor**

### Password Policy  
- Minimum length: 12 characters  
- Must include uppercase, lowercase, number, and special character  

### Change Password  
- Users can update their password securely from the **Change Password** page  
- Validates old vs new password  
- Enforces password policy rules before submission  
- On success: clears session, forces re‑login  
- Error messages shown instantly in the UI  

### Route Guards  
- **AuthGuard** → blocks routes unless user is logged in  
- **AdminGuard** → blocks admin pages unless role = ADMIN  
- Guards validate token + role before navigation

---

## Navigation System
### User Navbar
![User Navbar](./src/assets/images/user-navbar.png)

### Admin Navbar
![Admin Navbar](./src/assets/images/admin-navbar.png)

### Role‑based Navbar  
- User sees: Home, Search Flights, Profile, Change Password, Logout  
- Admin sees: Add Flight, Flight List, Airlines, Change Password, Logout  
- Navbar updates dynamically based on login state

### Standalone Components  
All components use Angular’s modern standalone architecture for cleaner imports and faster builds.

---

## User Features
![Flight search](./src/assets/images/search-flight-user.png)

### Flight Search
- Search by source, destination, date  
- Validates inputs  
- Calls backend `/flights/search`  
- Displays results in responsive cards  

![Edit Profile](./src/assets/images/edit-profile.png)
### User Profile
- Fetches details  
- Update name, email  
- Booking history integration planned  

### Change Password
![Change Password](./src/assets/images/change-password.png)
- Accessible from profile  
- Validates password length & complexity  
- Prevents reuse of old password  
- Forces logout after successful change  

---

## Admin Features

### Add Flight
![Airline Add](./src/assets/images/add-airline.png)

- Form includes airline, source, destination, date, time, price, seats  
- Validates all fields  
- Sends POST request to backend

### Edit Flight
- Pre‑filled form  
- Update any field  
- Sends PUT request to backend

### Delete Flight
- Confirmation before delete  
- UI updates instantly  
- No page refresh required

### Airline Management
- Add airline  
- View airline list  
- Used in flight creation dropdown  

---

## Deployment & Environment
- Secrets stored in `.env` file (ignored via `.gitignore`)  
- Example configuration provided in `.env.example`  
- Docker Compose used to run backend services (Spring Boot, Kafka, Zookeeper, DB)  
- Commands:  
  ```bash
  docker compose up --build  
  docker compose stop         
  docker compose down         

---
Asked for pull request