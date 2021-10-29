
# mr messenger

## This project was generated by [Flatlogic generator](https://flatlogic.com/generator).


  - Frontend: [React.js](https://flatlogic.com/templates?framework%5B%5D=react&sort=default)
  
  - Design: [Classic](https://flatlogic.com/templates?design%5B%5D=classic&sort=default)
  
  - Backend: [NodeJS](https://flatlogic.com/templates?backend%5B%5D=nodejs&sort=default)

  - Database: PostgreSQL


## To start the project:

### Backend:

  ##### Install local dependencies:
  - `yarn install`

  ------------

  ##### Adjust local db:
  ###### 1.  Install postgres:
  - MacOS:
  - `brew install postgres`

  - Ubuntu:
  - `sudo apt update`
  - `sudo apt install postgresql postgresql-contrib`

  ###### 2. Create db and admin user:
  - Before run and test connection, make sure you have created a database as described in the above configuration. You can use the `psql` command to create a user and database.
  - `psql postgres --u postgres`

  - Next, type this command for creating a new user with password then give access for creating the database.
  - `postgres-# CREATE ROLE admin WITH LOGIN PASSWORD 'admin_pass';`
  - `postgres-# ALTER ROLE admin CREATEDB;`

  - Quit `psql` then log in again using the new user that previously created.
  - `postgres-# \q`
  - `psql postgres -U admin`

  - Type this command to creating a new database.
  - `postgres=> CREATE DATABASE development;`

  - Then give that new user privileges to the new database then quit the `psql`.
  - `postgres=> GRANT ALL PRIVILEGES ON DATABASE development TO admin;`
  - `postgres=> \q`

  ------------

  ##### Setup database tables:
  - `yarn run reset`

  ##### Start development build:
  - `yarn start:dev`

  ##### Start production build:
  - `yarn start`

### Frontend:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## To start the project with Docker:
  ## Description:

  - The project contains `docker-compose.yml` and a couple of helper scripts:

  - `docker-compose.yml` (all our services: web, backend, db are described here)
  - `start-backend.sh` (starts nodejs app)
  - `wait-for-it.sh` (imported from https://github.com/vishnubob/wait-for-it)

  ## Run services:

  1. Install docker compose (https://docs.docker.com/compose/install/)

  2. Move to `docker` folder. All next steps should be done from this folder.
  - `cd docker`

  3. Make executables from `wait-for-it.sh` and `start-backend.sh`:
  - `chmod +x start-backend.sh && chmod +x wait-for-it.sh`


  4. Download dependend projects for services. In our case wee also need `singup-react`.

  5. Review the docker-compose.yml file. Make sure that all services have Dockerfiles. Only db service doesn't require a Dockerfile. I've created docker branches for user-management-template-backend and sing-app-react projects. You should switch to them before running `docker-compose up`.

  6. Make sure you have needed ports (see them in `ports`) available on your local machine.

  7. Start services:
  - With an empty database `rm -rf data && docker-compose up`
  - With a stored (from previus runs) database data `docker-compose up`

  8. Check http://localhost:3000

  9. Stop services:
  - Just press `Ctr+C`