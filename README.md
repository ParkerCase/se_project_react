# WTWR (What to Wear?): React + Vite Frontend
**Project Description**
This project represents the React-based frontend for the WTWR (What to Wear?) application. Built with Vite for a faster development experience and React for building dynamic user interfaces, this application serves as the client-side interface for managing clothing items and user profiles.

Key Features:
- User registration and login.
- Profile editing.
- Adding, viewing, liking, and disliking clothing items.
- Dynamic and responsive UI.


##Setup Instructions
**Installation**
To set up the project locally:

**Clone the repository:**
- git clone (https://github.com/ParkerCase/se_project_react.git)
- Navigate to the project directory: cd se_project_react
- Install dependencies: npm install

**Running the Project**
- Start the Development Server
- Run the server with Hot Module Replacement (HMR): npm run dev
- The application will be available at http://localhost:3000.
**Build for Production**
To create a production-ready version: npm run build
- The build files will be available in the dist folder.
**Preview the Production Build**
To preview the production build locally: npm run preview

##Backend Integration
The backend for this project is built with Express.js and MongoDB. You can find the backend repository here:

WTWR Backend Repository
Setting Up the Backend
- Clone the backend repository: git clone https://github.com/ParkerCase/se_project_express.git
- Follow the instructions in the backend's README.md to start the server.

Ensure the backend server runs on a different port (e.g., http://localhost:3001).

##Plugins and Tools
This project uses the following official Vite plugins:

- @vitejs/plugin-react: Uses Babel for Fast Refresh.
- @vitejs/plugin-react-swc: Uses SWC for Fast Refresh.

**Additional Tools**
- ESLint: Ensures code quality and consistent formatting.
- Prettier: Automatically formats code for readability.

**Notes**
- Backend Connection: Ensure the backend server is running and update API endpoints accordingly (e.g., http://localhost:3001).
- MongoDB: Verify that the MongoDB database is active before testing API calls.
