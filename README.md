# myTravels
![myTravels](https://github.com/user-attachments/assets/b28bf614-6513-4f4e-8e85-cb00daf83ca2)
myTravels is an **API-powered atlas and travel manager application**, built with the **PEAN** stack (PostgreSQL, Express, Angular, Node.js). It offers registered users a complete **travel managing dashboard** and an **interactive map with travel-related info** gathered dynamically from multiple APIs.

Users can explore the world through an interactive map, discovering top destinations, real-time weather, and gorgeous photography. They can also create, view, edit, and delete personal travel plans that are saved securely on their account.

### **[Try it out](https://mytravels-drab.vercel.app/)**


## Features
#### Authentication: *Create an account and log in securely using JWT.*
![Auth](https://github.com/user-attachments/assets/9f1abc23-4022-4833-9cf0-758f5010f1e1)

#### Interactive Atlas: *Explore a clean, vector-based interactive world map built with Leaflet.*
![Atlas](https://github.com/user-attachments/assets/bfb505bf-28e9-4727-b60d-95477b79945f)

#### Travel Guide: *A detailed slide-out guide seamlessly combines data from multiple API's into a single, unified interface.*
![Guide](https://github.com/user-attachments/assets/92c66680-2590-4f41-b0cb-1ce5450b3e40)

#### Trip Planning: *Once you find the perfect destination, create a new travel plan directly from the guide drawer.*
![Create](https://github.com/user-attachments/assets/b62edc57-8235-4896-941d-3fd95cc4a777)

#### Trip Management: *Or, create future and past travel plans directly from the main page.*
![Visited](https://github.com/user-attachments/assets/254cc0ff-2b40-4d2c-b670-166c4e0fb8e2)

#### Trip Editing: *Easily edit, delete, and toggle trips between "Upcoming Adventures" and "Visited".*
![Edit](https://github.com/user-attachments/assets/0feaa826-bf58-4743-ae3b-c49fcdcbc151)

#### User Experience: *Toggle between Light and Dark modes.*
![UX](https://github.com/user-attachments/assets/1f77181f-1728-45d1-8c39-c2953ca1bb40)

#### Profile Management: Update your username and manage your session.
![Profile](https://github.com/user-attachments/assets/ddcd458a-519c-45e9-b4c7-281c723eeb3a)

## Operation & Stack
### Server

The server folder contains the backend logic, API endpoints, and database interactions.

The backend acts as a **Backend-For-Frontend (BFF)** and a RESTful API. It processes client requests, handles business logic and security, interacts with the database via Prisma ORM, and securely orchestrates requests to multiple 3rd-party APIs.

The main technologies used here are:

**Node.js & Express**: Handles HTTP requests, routing, and middleware logic.

**TypeScript**: Ensures type safety and code reliability across the backend.

**PostgreSQL**: Relational database used to store Users and Travel Plans with strict referential integrity.

**Prisma ORM**: Used for schema definition, migrations, and type-safe database queries.

**External APIs**: Integrates **GeoDB Cities API** (locations), **REST Countries API** (demographics), **Unsplash API** (photography), and **WeatherAPI** (real-time climate data).

**Bcrypt**: Hashes user passwords before storage to ensure security.

**Json Web Token (JWT)**: Manages user sessions and protects private API routes.

### Client

The client folder contains the frontend application built with Angular 17+.

The frontend provides a reactive, single-page application (SPA) experience. It utilizes modern Angular features like Signals for state management to ensure the UI stays in sync with the backend instantly (Optimistic UI).

The main technologies used here are:

**Angular**: The core framework for the UI, utilizing Standalone Components and Signals.

**Leaflet**: The leading open-source JavaScript library for mobile-friendly interactive maps, used to render the world atlas and handle geographic interactions.

**Tailwind CSS**: Utility-first CSS framework used for styling, heavily customized with CSS variables to create a soft, modern design system (Light/Dark mode).

**RxJS**: Handles asynchronous data streams and HTTP requests.

### Database

This project uses PostgreSQL running inside a Docker Container.

The database schema is managed by Prisma. It relies on a straightforward relational structure where:

    A User has many Travel Plans.

To run the database locally without installing PostgreSQL on your machine, the project includes a docker-compose.yml file.

## How to Run

This project requires Docker, Node.js, and NPM installed. You will also need free API keys from [Unsplash](https://unsplash.com/developers) and [WeatherAPI](https://www.weatherapi.com/).

#### 1. Clone the project:
```
git clone https://github.com/paulo-ads/mytravels.git
cd mytravels
```
#### 2. Start the Database (Docker):
From the root folder, spin up the PostgreSQL container:
```
docker-compose up -d
```
#### 3. Setup the Backend:
Navigate to the server folder, install dependencies, and set up the database schema.
```
cd server
npm install
```
Create a `.env` file in the server folder based on `.env.example` (or set the following variables):
```env
DATABASE_URL="postgresql://traveluser:travelpassword@localhost:5432/mytravels?schema=public"
JWT_SECRET="your_secret_key"
WEATHER_API_KEY="your_weather_api_key"
UNSPLASH_ACCESS_KEY="your_unsplash_access_key"
```

Run the migrations to create the tables:
```
npx prisma migrate dev
```
Start the server:
```
npm run dev
```
#### 4. Setup the Frontend:

Open a new terminal, navigate to the client folder, and install dependencies.
```
cd client
npm install
```
Start the Angular application:
```
npm start
```
The application will be available at http://localhost:4200

The backend API will be running at http://localhost:3000.
