Overview
The IMF Gadget API is a secure API built with Node.js, Express, and PostgreSQL. It allows the Impossible Missions Force (IMF) to manage gadgets for their missions.

Features
Gadget Inventory:
Add gadgets with unique, randomly generated codenames.
Retrieve all gadgets with "mission success probability."
Update gadget details.
Soft-delete gadgets by marking them as "Decommissioned."
Self-Destruct Sequence:
Trigger a self-destruct sequence for a gadget with a randomly generated confirmation code.
Tech Stack
Backend: Node.js, Express
Database: PostgreSQL with Sequelize ORM
Authentication: JWT for secure endpoints
Prerequisites
Install Node.js.
Install PostgreSQL.
Use Thunder Client, Postman, or any API testing tool to test the endpoints.
Setup
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-repo/imf-gadget-api.git
cd imf-gadget-api
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory and configure it:

makefile
Copy
Edit
DB_NAME=imf_gadget
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
Run the app:

bash
Copy
Edit
npm start
If running for the first time, ensure the database is created and the table structure is updated:

bash
Copy
Edit
npx sequelize-cli db:migrate
API Endpoints
Authentication
1. Login
POST /api/auth/login
Request:

json
Copy
Edit
{
  "username": "imf_agent",
  "password": "your_password"
}
Response:

json
Copy
Edit
{
  "token": "jwt_token_here"
}
Gadget Inventory
2. Retrieve All Gadgets
GET /api/gadgets/
Response:

json
Copy
Edit
[
  {
    "id": "uuid",
    "name": "The Falcon",
    "status": "Available",
    "missionSuccessProbability": "87%"
  }
]
3. Add a New Gadget
POST /api/gadgets/
Response:

json
Copy
Edit
{
  "id": "uuid",
  "name": "The Kraken",
  "status": "Available"
}
4. Update Gadget Details
PATCH /api/gadgets/:id
Request:

json
Copy
Edit
{
  "status": "Deployed"
}
Response:

json
Copy
Edit
{
  "id": "uuid",
  "name": "The Falcon",
  "status": "Deployed"
}
5. Soft-Delete Gadget
DELETE /api/gadgets/:id
Response:

json
Copy
Edit
{
  "id": "uuid",
  "name": "The Nightingale",
  "status": "Decommissioned",
  "decommissionedAt": "2025-01-26T14:00:00.000Z"
}
Self-Destruct Sequence
6. Trigger Self-Destruct
POST /api/gadgets/:id/self-destruct
Response:

json
Copy
Edit
{
  "id": "uuid",
  "confirmationCode": "ABC123",
  "status": "Destroyed"
}
Database Schema
Gadgets Table
Column	Type	Description
id	UUID	Unique identifier for the gadget
name	String	Gadget codename
status	Enum	Gadget status (Available, Deployed, Destroyed, Decommissioned)
createdAt	Timestamp	Record creation time
updatedAt	Timestamp	Last update time
decommissionedAt	Timestamp	Time when gadget was decommissioned
Testing
Use Thunder Client or Postman to test the endpoints.

Bonus Features
Authentication: All endpoints are protected using JWT. Add a valid Authorization header:

makefile
Copy
Edit
Authorization: Bearer <your_jwt_token>
Filtering: Filter gadgets by status using the GET /api/gadgets?status={status} endpoint.

Deployment
Deploy to platforms like Heroku, Render, or Railway.
Ensure you configure your database connection and environment variables in the platform settings.
