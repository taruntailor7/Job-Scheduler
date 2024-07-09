# Job-Scheduler

#Job-Scheduler application is deployed so for testing purposes you don't need to setup this repository you can directly access whole application using this client url(forntend) : https://apica-job-scheduler.netlify.app/.
and backend is also deployed and already integrated with above client url so all functionality is also working properly all you need to do is test the live application for the functionality you have asked for and for the code you can see in git repository after cloning or from git repository itself.
CODE : https://github.com/taruntailor7/Job-Scheduler.git

Backend configuration:
- Deployed URL : https://job-scheduler-ykb2.onrender.com/
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

