package com.puzzlr.config

import org.jooq.DSLContext
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.sql.DriverManager

@Configuration
open class DatabaseConfiguration {

  @Value("\${spring.datasource.username}")
  lateinit var dbUserName: String

  @Value("\${spring.datasource.password}")
  lateinit var dbPassword: String

  @Value("\${spring.datasource.url}")
  lateinit var dbUrl: String

  @Bean
  open fun context(): DSLContext {
    val connection = DriverManager.getConnection(dbUrl, dbUserName, dbPassword)
    return DSL.using(
      connection,
      SQLDialect.POSTGRES
    )
  }
}