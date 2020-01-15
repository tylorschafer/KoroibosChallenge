# Koroibos Challenge

### Overview
* Koroibos Challenge is a NodeJS Express API written in 48 hours.
* Koroibos Challenge features endpoints that display data from the 2016 Summer Olympics.
* The API features 6 endpoints containing relational and buisness logic data across 5 database tables.
* Data for all tables is imported from a CSV file via `jake` tasks.
* This project was developed as a school project for Turing School of Software and Design.

**Production URL** https://ts-koroibos.herokuapp.com/

### Local Setup

**Clone and Install Dependecies**
1. Clone down this repo onto your machine.
2. Move into the project directory: `cd KoroibosChallenge`
3. Make sure you have NodeJs installed, you can install with homebrew using: `brew install node`
4. Install dependecies: `npm install`

**Setup Database**
1. Make sure you have PostgreSQL installed, then run `psql` to enter shell.
2. In shell create development database: `CREATE DATABASE koroibos_dev`
3. Next, create test database: `CREATE DATABASE koroibos_test`
4. Exit the shell with: `\q`
5. Run table migrations: `knex migrate:latest`

**Seed Database Entries**
* Run these Jake commands in the following order to seed all tables:
    1. `Jake 2016SummerImport`
    2. `Jake sportImport`
    3. `Jake eventImport`
    4. `Jake olympianImport`
    5. `Jake olympianEventsImport`

**Testing Suite**
1. Run Jest testing suite with: `npm test`

### Project Board
https://github.com/tylorschafer/KoroibosChallenge/projects/1

### Schema Design
![schema](/bin/schema.png)

### Tech Stack
* This is a [NodeJS](https://nodejs.org/en/) project utilizing [Express Framework](https://expressjs.com/).
* [KNEX.JS](http://knexjs.org/) is used as a SQL query builder for the [Postgres database](http://knexjs.org/).
* All testing is utilizes the [Jest Testing Framework](https://jestjs.io/).

### How to Use Endpoints
* The url prefix for all routes in development is `localhost:3000`
* The url prefix for all routes in production is `https://ts-koroibos.herokuapp.com`

#### Endpoints
1. **/api/v1/olympians**
    * This endpoint returns all Olympian table entries
    * Example Response:
         ```
        {
          "olympians":
            [
              {
                "name": "Maha Abdalsalam",
                "team": "Egypt",
                "age": 18,
                "sport": "Diving"
                "total_medals_won": 0
              },
              {
                "name": "Ahmad Abughaush",
                "team": "Jordan",
                "age": 20,
                "sport": "Taekwondo"
                "total_medals_won": 1
              },
              {...}
            ]
        }
        
        ```
2. **/api/v1/events**
    * This endpoint returns all Event / Sport table entries
    * Example Response:
        ```
        
        {
          "events":
            [
              {
                "sport": "Archery",
                "events": [
                  "Archery Men's Individual",
                  "Archery Men's Team",
                  "Archery Women's Individual",
                  "Archery Women's Team"
                ]
              },
              {
                "sport": "Badminton",
                "events": [
                  "Badminton Men's Doubles",
                  "Badminton Men's Singles",
                  "Badminton Women's Doubles",
                  "Badminton Women's Singles",
                  "Badminton Mixed Doubles"
                ]
              },
              {...}
            ]
        }
        
        ```
3. **/api/v1/events/:id/medalists**
    * This endpoint returns all of the medalists for a specific event
    * **Must supply a valid event resource id in endpoint**
    * Example Response:
        ```
        
        {
          "event": "Badminton Mixed Doubles",
          "medalists": [
              {
                "name": "Tontowi Ahmad",
                "team": "Indonesia-1",
                "age": 29,
                "medal": "Gold"
              },
              {
                "name": "Chan Peng Soon",
                "team": "Malaysia",
                "age": 28,
                "medal": "Silver"
              }
            ]
        }
        
        ```
4. **api/v1/olympian_stats**
    * This endpoint returns a single object of statistical averages across all Olympians.
    * Example Response:
        ```
        
        {
            "olympian_stats": {
              "total_competing_olympians": 3120
              "average_weight:" {
                "unit": "kg",
                "male_olympians": 75.4,
                "female_olympians": 70.2
              }
              "average_age:" 26.2
            }
          }
        
        ```
5. **`api/v1/olympians?age=youngest` && `api/v1/olympians?age=oldest`**
    * The Olympians endpoint can be queried to show the youngest or oldest Olympians.
    * Example Response `api/v1/olympians?age=youngest`:
    ```
    
    {
      [
        {
          "name": "Ana Iulia Dascl",
          "team": "Romania",
          "age": 13,
          "sport": "Swimming"
          "total_medals_won": 0
        }
      ]
    }
    
    ```

### Known Issues
* `jake` tasks must be run in the correct order to properly seed the database. In future iterations all tasks will be compiled into a single command.

### Contributers
**Tylor Schafer** : [Github](https://github.com/tylorschafer) , [LinkedIn](https://www.linkedin.com/in/tylor-schafer/)



