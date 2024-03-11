# Full Stack Spring Boot/React/GraphQL Template

This is a project template I use for creating new web applications. It uses the following technologies
- [Kotlin](https://kotlinlang.org/) as the server-side language of choice
- [Spring Boot](https://spring.io/projects/spring-boot) as the web application framework 
- [Postgres](https://www.postgresql.org/) as the database
- [Jooq](https://www.jooq.org/) for creating typesafe SQL queries.
- [Flyway](https://flywaydb.org/) for handling database migrations.
- [GraphQL](https://graphql.org/) as the API query language (using [Netflix DGS](https://netflix.github.io/dgs/))
- [TypeScript](https://www.typescriptlang.org/) as the client-side language of choice
- [React](https://react.dev/) as the UI rendering library.
- [Relay](https://relay.dev/) as the client-side data fetching API.
- [React-JSS](https://cssinjs.org/react-jss/?v=v10.3.0) for client-side styling
- [React Router](https://reactrouter.com/en/main) as the client-side routing framework

## Setup (for Mac)

### Setup database

1) Install [Postgres](https://www.postgresql.org/download/).
2) Create a `.env` file in the project root directory (use `.env.example` as an example)
3) Set the `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_URL` variables in your `.env` file as your database username, password, name, and URL, respectively.
4) Run `./bin/setup_database` in the root of the project. 

### How to run
In order to start:
```
./gradlew bootRun
```
and navigate to `localhost:8080` in your web browser. 

This command will: 
1. Compile all server-side code.
2. Run any pending database migrations
3. Install or update `node` and `npm`, if necessary
4. Runs `npm install` to get latest node dependencies defined in `package.json`
5. Runs webpack to compile and bundle client-side code
6. Starts the server on `localhost:8080`.

If you make client-side changes and want to see them without restarting the server, you can webpack running in development mode. In order to do so, open a new terminal and run the following:
```
./gradlew webpackDevelopment
```
This will make it so that webpack watches the client-side directories for changes and automatically compile them and bundle them into the `build` directory. Then, you can just refresh the page.

---
Whenever you change a client-side GraphQL query supported by Relay, you must rebuild the Relay models. In order to do so, run the following: 

```
./gradlew buildRelay
```
---
# Changing the database
### Adding a database migration

In order to change the database, you must add a new migration. Since we use Flyway for migrations, you can read about how to structure and run repeatable versus versioned migrations [here](https://documentation.red-gate.com/flyway/flyway-cli-and-api/concepts/migrations). 

For simplicity, we'll assume we want to run a versioned migration. From the Flyway link above:

> Versioned migrations have a version, a description and a checksum. The version must be unique. The description is purely informative for you to be able to remember what each migration does. The checksum is there to detect accidental changes. Versioned migrations are the most common type of migration. They are applied in order exactly once.
>
> Each versioned migration must be assigned a unique version. Any version is valid as long as it conforms to the usual dotted notation. For most cases a simple increasing integer should be all you need[...]
>
>Versioned migrations are applied in the order of their versions. Versions are sorted numerically as you would normally expect.

That is, the file name of the SQL file should be `<VERSION>__<short_description>.sql`. Since migrations are run in the sorted numerical order of their filenames, you should look at the version number of the last migration and increment it by 1. For example, if the first migration was named `V1__initial_setup.sql`, the second migration would be something like `V2__add_new_column.sql` and the third one could be `V3__add_second_table.sql`. 


For this project, migrations are stored in `src/main/resources/db/migration` but this can be configured.

### Running a database migration
There are two ways to run all pending migrations:

1. Start the application. 
    - By default, Spring automatically runs Flyway migrations on application startup (see [here](https://docs.spring.io/spring-boot/docs/2.0.0.M5/reference/html/howto-database-initialization.html#howto-execute-flyway-database-migrations-on-startup))
2. Run `./gradlew flywayMigrate` from the application root.

Once all pending migrations are run, you can regenerate the Jooq models for interacting with your tables in a typesafe way on the server.
```
./gradlew generateJooq
```