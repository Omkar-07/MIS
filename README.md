# User Authentication and Employee Management System

## 📌 Project Overview
This system consists of a **Spring Boot REST API** backend and a **React frontend** that provides user authentication and employee management features, including registration, login, password reset, and payroll management.

## 🚀 Features
### Backend
- **User Registration**: Users can sign up with a unique email and password.
- **User Login**: JWT-based authentication for secure access.
- **Password Reset**: Supports password reset for both logged-in and non-logged-in users.
- **Security**: Utilizes **Spring Security** with JWT authentication.

### Frontend
- User Registration & Email Verification
- Secure Login & Logout
- Password Reset & Forgot Password
- Employee Management
- Payroll Management
- Time & Attendance Tracking
- Reports
- Auto Logout on Inactivity (30 minutes)

## 🛠️ Tech Stack
- **Backend**: Java, Spring Boot, Spring Security, JWT
- **Database**: MySQL / PostgreSQL
- **Containerization**: Docker
- **Hosting**: Render (via Docker Hub)
- **Frontend**: React, React Router, MUI (Material-UI), Bootstrap, Axios

## 📂 Project Structure
```
backend/
│── src/
│   ├── main/java/com/example/authentication/  # Main Java files
│   │   ├── controller/  # REST Controllers
│   │   ├── service/  # Business logic
│   │   ├── repository/  # Database interactions
│   │   ├── security/  # JWT Security configuration
│   │   ├── config/  # App configurations
│   ├── resources/
│   │   ├── application.properties  # Database & server configuration
│── Dockerfile  # Containerization setup
│── .gitignore  # Files to ignore (includes .env)
│── README.md  # Documentation

frontend/
│── src/
│   ├── components/     # Navbar, Login, Register, etc.
│   ├── pages/          # Employee Management, Payroll, etc.
│   ├── services/       # API calls (authService.js)
│   ├── App.jsx         # Main application file
│   ├── index.js        # Entry point
│── public/             # Static assets
│── .env                # Environment variables
│── package.json        # Dependencies and scripts
```

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Backend Setup
#### Setup Environment Variables
Create a `.env` file in the `backend/` directory and add:
```
DB_URL=your_database_url
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
```

#### Build & Run the Application
```sh
cd backend
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup
#### Install dependencies
```sh
cd frontend
npm install
```
#### Set up environment variables
- Create a `.env` file in the `frontend/` directory.
- Add the following variables:
  ```env
  REACT_APP_API_URL=http://your-backend-url
  ```
#### Run the application
```sh
npm run dev
```

## 🐳 Running Backend with Docker
### 1️⃣ Build Docker Image
```sh
docker build -t your-dockerhub-username/auth-backend .
```

### 2️⃣ Run Docker Container
```sh
docker run -p 8080:8080 --env-file .env your-dockerhub-username/auth-backend
```

## 🚀 Deployment
### Backend Deployment on Render (via Docker Hub)
1. Push your image to **Docker Hub**:
   ```sh
   docker push your-dockerhub-username/auth-backend
   ```
2. Deploy on **Render** by linking the Docker image.

### Frontend Deployment on Netlify
1. **Build the project**
   ```sh
   npm run build
   ```
2. **Upload the `dist/` folder to Netlify**
3. **Configure Netlify Redirects**
   - Create a `_redirects` file in `public/`
   - Add this line:
     ```
     /* /index.html 200
     ```

## API Integration
- The frontend interacts with the backend API for authentication and user management.
- Example API calls are handled in `services/authService.js`.

## Authentication Flow
1. User registers → Email verification required
2. User logs in → Token is stored in `localStorage`
3. On inactivity for 30 minutes → Auto logout
4. If the token is invalid → Redirect to login

## Issues & Troubleshooting
- If the login page is not found after deployment, check the **Netlify redirects**.
- Ensure `REACT_APP_API_URL` is correctly set in `.env`.
- If CORS errors occur, update backend CORS settings.

## Contribution
Contributions are welcome! Fork the repo and submit a pull request.

## License
MIT License

