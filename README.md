# Project_Flow

This application aims to create a website for organizing,dividing, delegating and tracking different projects. 

## Currently included features:

- User authentication
- Project handling
- Project division into tasks
- Task assignment for team members
- Newsfeed for notifications
- Inbuilt calendar for deadline tracking
- Comment and Reply Handling
- Relevant data storing in database

## Used Technologies

- Laravel
- ReactJs
- MariaDB
- TailwindCSS

## How to use

This project requires that your machine is able run Laravel and ReactJs projects.
!!The frontend requires node version 16!!
(The following instructions are for running the app on localhost, but it can be hosted with other technologies too (i.e. Apache), in which case you should change the in-built endpoints).
(The current version now relies on an already existing database). 

1. Download this repository to your machine
2. Navigate to the project directory
3. Move to backend folder
  ```sh
   cd backend
  ```
4. Install dependencies(backend)
  ```sh
    composer update && composer install
  ```
5. Create tables in database
  ```sh
    php artisan migrate
  ```
6. Make a copy of the ".env.example" file, and fill it with the information of your own database. Name the file as ".env".
7. Start backend
  ```sh
    php artisan serve --port=<YOUR_PORT_NUMBER>
  ```
8. Open new terminal and navigate to the project directory
9. Move to frontend folder
  ```sh
   cd frontend
  ```
10. Install dependencies(frontend)
  ```sh
   npm install
  ```
11. Fill out config.js (it can be found src folder) with your <YOUR_PORT_NUMBER>
12. Start frontend
  ```sh
  npm start
  ```

If you change the url where the backend is running dont forget to change the frontend config file to match.

## Features to be implemented

- Automatic database creation
- Improved user experience
- Containerization/pipeline support

