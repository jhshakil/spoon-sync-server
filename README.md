
<div align="center">
  <h1>Project Overview</h1>
</div>

---

# Project Name
SP Booking Server

## Introduction

SP Booking is a sports facility booking platform

## Project Description

SP Booking is a digital solution designed to streamline the process of booking and managing sports facilities. These platforms serve as a centralized hub where users can easily find, reserve, and pay for access to various sports amenities.

## Features

- Authentication system
- User management system
- Create and maintain Facility
- Create and maintain Booking
- Implement aamar pay payment service

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Typescript.

## Installation Guideline

### Prerequisites

- Need to install Node.js

### Installation Steps

1. npm i
2. npm run start:dev
3. npm run build (for build)

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file (example in `.env.example` file).
   Example:
   ```bash
    NODE_ENV=development
    PORT=3030
    DATABASE_URL=
    BCRYPT_SALT_ROUNDS=
    JWT_ACCESS_SECRET =
    JWT_REFRESH_SECRET =
    JWT_ACCESS_EXPIRES_IN=
    JWT_REFRESH_EXPIRES_IN=
    STORE_ID=
    SIGNETURE_KEY=
    PAYMENT_URL=
    PAYMENT_VERIFY_URL=
    FRONTEND_URL=
   ```