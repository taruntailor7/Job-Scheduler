# Job-Scheduler

#Job-Scheduler application is deployed so for testing purposes you don't need to setup this repository you can directly access whole application using this client url(forntend) : https://apica-job-scheduler.netlify.app/.
and backend is also deployed and already integrated with above client url so all functionality is also working properly all you need to do is test the live application for the functionality you have asked for and for the code you can see in git repository after cloning or from git repository itself.
CODE : https://github.com/taruntailor7/Job-Scheduler.git

Backend configuration:
- Deployed URL : https://job-scheduler-ykb2.onrender.com/
- All Jobs : https://job-scheduler-ykb2.onrender.com/api/jobs (Backend is deployed on render from free service so it might take 1-2 minutes the all jobs so please wait for a while to                                                                  work api and application Thank you.)
- Clone repository : git clone https://github.com/taruntailor7/Job-Scheduler.git
- Inside backend directory run : npm install
- create .env file : touch .env
- Add these environment variables : MONGO_URI="Add your mongodb atlas db url", PORT=5000
- Running the project : npm start

Frontend configuration:
- Deployed URL : https://apica-job-scheduler.netlify.app/
- Clone repository : git clone https://github.com/taruntailor7/Job-Scheduler.git (Which you have already done above for backend configuration as both backend and frontend are in same repository)
- Inside frontend directory run : npm install
- Running the project : npm start

Additional configuration:
As i have deployed my application backend on render and frontend on netlify so both are currently deployed so for making api calls am using in my application deployed urls and for running this in local system you need to change deployed urls to: http://localhost:5000 but without changing also this will work as they are deployed and working properly so in your local also they will work properly.


## Here's a brief explanation of the design choices and approaches for this job scheduler application:

Frontend-Backend Separation:
  We've separated the frontend (React) and backend (Node.js) for better scalability and maintainability. This allows for independent development and deployment of each part.
RESTful API:
  The backend exposes a RESTful API for job management, following standard HTTP methods (GET for fetching jobs, POST for creating jobs). This provides a clear and standardized way for the frontend to interact with the backend.
Real-time Updates with WebSockets:
  WebSockets are used for real-time communication between the server and client. This allows for immediate updates to the job list without constant polling, improving user experience and reducing server load.
State Management in React:
  The frontend uses React's useState hook for local state management. For a small to medium-sized application, this is sufficient and keeps the implementation simple.
Component-Based Architecture:
  The frontend is built using reusable components (JobList, JobForm) for better organization and potential reusability.
Error Handling and Validation:
  Both frontend and backend implement error handling and validation to ensure data integrity and provide feedback to users.
Styling:
  CSS files are used for styling components, keeping styles separate from logic for better maintainability.
Deployment:
  The backend is deployed on Render, a cloud platform that simplifies deployment and scaling. The frontend can be deployed separately, allowing for independent scaling of each part of the application.

These choices aim to create a scalable, maintainable, and user-friendly job scheduling application. The separation of concerns, use of modern web technologies, and focus on real-time updates create a robust foundation for the application.

