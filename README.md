# MediConnect

MediConnect is a web application designed to connect patients with doctors for online consultations. The platform allows users to browse and filter doctors based on various criteria, and doctors can be added to the system through an admin interface.

## Features

### Client-Side Features
- **Doctor Listing**: View a list of doctors with detailed information.
- **Filters**: Filter doctors by specialty, experience, consultation mode, language, and more.
- **Pagination**: Navigate through the list of doctors with pagination.
- **Add Doctor**: Admins can add new doctors to the system through a dedicated form.

### Server-Side Features
- **Database Integration**: MongoDB is used to store doctor information.
- **API Endpoints**:
  - `GET /api/doctors`: Fetch a list of doctors with optional filters and pagination.
  - `POST /api/doctor`: Add a new doctor to the database.
  - `GET /api/doctors/seed`: Seed the database with initial doctor data.
- **Validation**: Ensures all required fields are provided when adding a doctor.

## Technologies Used

### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: React hooks (`useState`, `useEffect`)
- **HTTP Client**: Axios

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Environment Variables**: Managed using `dotenv`

## Project Structure

### Client
- `src/app`: Contains the main pages and layouts for the Next.js application.
- `src/components`: Reusable React components like `DoctorCard`, `Sidebar`, and `AboutPopup`.
- `src/types`: TypeScript type definitions.

### Server
- `src/index.ts`: Entry point for the Express server.
- `src/models`: Mongoose models for MongoDB collections.
- `src/config`: Configuration files, such as database connection setup.
- `src/seed`: Seed data for initializing the database.
