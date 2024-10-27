# Geo Data App

## Description
This Geo Data App is a geospatial data manager that allows users to upload GeoJSON or KML files and visualize them on an interactive map. The application provides user authentication, file uploads, and data management capabilities, enabling users to manage and interact with their geospatial data efficiently.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node Package Manager comes with Node.js, but ensure it is updated. Run `npm install -g npm` to update.
- **Database**: You need to have MySQL installed and configured for the backend.

### Setup

#### Frontend
The frontend of the application is built using React with Vite and utilizes `react-leaflet` for map visualization. The Bootstrap library is included via CDN.

##### Packages
You will need to install the following packages (You can run npm install in the respective folders):

```bash
npm install react react-dom react-router-dom react-leaflet axios
```

##### To run the frontend:
Navigate to the app folder
```bash
cd geo-data-app
```
Install the dependencies
```bash
npm install
```
Run the client (Runs on Port 5173 by default)
```bash
npm run dev
```
#### Backend
The backend of the application is written in Node.js and uses `Express.js` for writing API's. The Sequelize library is used for ORM (Object-Relational Mapping) with a MySQL database. JSON Web Token (JWT) is used for user management.

##### Packages
You will need to install the following packages (You can run npm install in the respective folders):

```bash
npm install express multer mysql2 sequelize jsonwebtoken cors
```
##### NOTE: Make sure that you have a Database created in MySQL before you run the app. Sequelize models will automatically create the tables for you, but not the "database" itself.

##### To run the backend:
Navigate to the backend folder
```bash
cd geo-data-backend
```
Install the dependencies
```bash
npm install
```
Run the server (start script can be specified in package.json)
```bash
npm run server
```
