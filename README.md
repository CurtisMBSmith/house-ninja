House Ninja
===========
An application for household meal planning and inventory tracking.

## Tech Stack
* **Database:** PostgreSQL 10
* **Backend Technologies:**
  * Spring Boot 2.0
  * Flyway Database Migrations
  * jOOQ for database access
  * Docker
* **Frontend Technologies:**
  * React
  * Redux
  * Webpack

## Developing House Ninja
### Prerequisites
* Docker version 17.12.1-ce+
* Gradle 4.6+
* Java 9
* Node.js 6.2+ with npm 3.8.9+

### Starting the Dev Server
1. Clone the project
2. Copy the file backend/conf/init/postgres/init.sql.template to init.sql in the same directory
3. Edit the DBA user password in the init.sql file
4. Copy the file backend/conf/properties/pgdb.properties.template to pgdb.properties in the same directory
5. Edit the pgpass property to match the password that you specified in the init.sql file
6. Navigate to the frontend directory
7. Execute: npm install
8. Execute: webpack
9. Navigate back to the project root
10. Execute docker-compose up
11. Your server should now be running on localhost:80

