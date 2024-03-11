import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import com.github.gradle.node.npm.task.NpmTask
import org.springframework.boot.gradle.tasks.run.BootRun

plugins {
  id("org.jetbrains.kotlin.jvm") version "1.9.22"
  id("org.springframework.boot") version "3.2.2"
  id("io.spring.dependency-management") version "1.1.0"
  id("com.github.node-gradle.node") version "7.0.2"
  id("com.netflix.dgs.codegen") version "5.2.4"
  id("nu.studer.jooq") version "8.0"
  id("org.flywaydb.flyway") version "9.6.0"
  id("java")
}

dependencyManagement {
  imports {
    mavenBom("com.netflix.graphql.dgs:graphql-dgs-platform-dependencies:latest.release")
  }
}

group = "com.puzzlr"
version = "1.0-SNAPSHOT"

repositories {
  mavenCentral()
}

dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
  implementation("com.netflix.graphql.dgs:graphql-dgs-spring-boot-starter")
  implementation("org.postgresql:postgresql:42.5.1")
  jooqGenerator("org.postgresql:postgresql:42.5.1")

  // With these two dependencies, Spring will automatically run Flyway migrations on startup. See:
  // https://flywaydb.org/documentation/usage/plugins/springboot
  // https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties.data-migration
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.flywaydb:flyway-core:9.16.0")
}

tasks.withType<KotlinCompile> {
  kotlinOptions {
    jvmTarget = "17"
  }
}

tasks.withType<JavaCompile> {
  sourceCompatibility = "17"
  targetCompatibility = "17"
}

tasks.register<NpmTask>("webpack") {
  npmCommand.set(listOf("run", "webpack"))
}

tasks.register<NpmTask>("webpackDevelopment") {
  npmCommand.set(listOf("run", "webpack-development"))
}

tasks.register<NpmTask>("buildRelay") {
  npmCommand.set(listOf("run", "relay"))
}

tasks.register<NpmTask>("generateReactPages") {
  npmCommand.set(listOf("run", "generate-react-pages"))
}

// make sure webpack runs before the processResources task so the TypeScript files are compiled before
// being copied into the build folder
tasks.processResources {
  dependsOn("npm_install", "webpack")
}

node {
  version.set("20.11.0")
  npmVersion.set("10.4.0")
  download.set(true)
}

tasks.withType<com.netflix.graphql.dgs.codegen.gradle.GenerateJavaTask> {
  schemaPaths = mutableListOf("${projectDir}/src/main/resources/schema")
  generateClient = true
  packageName = "com.puzzlr.graphql"
}

val getEnvironmentVariables = fun(): Map<String, String> {
  val map = hashMapOf<String, String>()

  val envFile = file(".env")
  if (!envFile.exists()) {
    return map
  }
  envFile.readLines().forEach {
    val (key, value) = it.split("=")
    map[key] = value
  }
  return map
}
val envVariables: Map<String, String> = getEnvironmentVariables()

val dbUser = envVariables.getValue("DB_USER")
val dbPassword = envVariables.getValue("DB_PASSWORD")
val dbUrl = envVariables.getValue("DB_URL")

tasks.getByName<BootRun>("bootRun") {
  // This makes the environment variables specified in the .env file accessible to the application
  environment = envVariables
}

// Spring automatically handles flyway migrations but adding this task allows running flyway tasks
// from the command line. See: https://flywaydb.org/documentation/usage/gradle/
flyway {
  url = dbUrl
  user = dbUser
  password = dbPassword
}

jooq {
  version.set("3.14.1")
  configurations {
    create("main") {
      generateSchemaSourceOnCompilation.set(false)
      jooqConfiguration.apply {
        jdbc.apply {
          driver = "org.postgresql.Driver"
          url = dbUrl
          user = dbUser
          password = dbPassword
        }
        generator.apply {
          name = "org.jooq.codegen.KotlinGenerator"
          target.apply {
            packageName = "generated.jooq"
            directory = "src/main/kotlin/com/puzzlr/db"
          }
          database.apply {
            // See https://www.postgresqltutorial.com/postgresql-administration/postgresql-schema/
            // for more explanation about the difference between databases and schemas in Postgres
            inputSchema = "public"
            excludes = "flyway_schema_history"
          }
          generate.apply {
            isImmutablePojos = true
          }
        }
      }
    }

  }
}