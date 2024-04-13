package com.puzzlr.models

import generated.jooq.tables.pojos.Users

class User(private val users: Users) {

  fun getUsername(): String {
    return users.username!!
  }

  fun getEmail(): String {
    return users.email!!
  }
}