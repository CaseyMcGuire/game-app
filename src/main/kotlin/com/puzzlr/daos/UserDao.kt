package com.puzzlr.daos

import generated.jooq.tables.pojos.Users
import generated.jooq.tables.references.USERS
import org.jooq.DSLContext
import org.springframework.stereotype.Component

@Component
class UserDao(val context: DSLContext) {

  fun create(
    username: String,
    email: String,
    password: String
  ): Boolean {
    return context.insertInto(USERS, USERS.USERNAME, USERS.EMAIL, USERS.PASSWORD)
      .values(username, email, password)
      .execute() == 1
  }

  fun getByUsername(username: String): Users? {
    return context.select()
      .from(USERS)
      .where(USERS.USERNAME.eq(username))
      .fetchOne()
      ?.into(Users::class.java)
  }

  fun getByEmail(email: String): Users? {
    return context.select()
      .from(USERS)
      .where(USERS.EMAIL.eq(email))
      .fetchOne()
      ?.into(Users::class.java)
  }
}