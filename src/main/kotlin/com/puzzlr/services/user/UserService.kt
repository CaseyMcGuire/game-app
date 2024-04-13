package com.puzzlr.services.user

import com.puzzlr.daos.UserDao
import com.puzzlr.models.User
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class UserService(
  private val userDao: UserDao,
  private val passwordEncoder: PasswordEncoder
  ) {

  fun getUserByEmail(email: String): User? {
    return userDao.getByEmail(email)?.let {
      User(it)
    }
  }

  fun getUserByUsername(username: String): User? {
    return userDao.getByUsername(username)?.let {
      User(it)
    }
  }

  fun createUser(
    username: String,
    email: String,
    password: String
  ): User? {
    val hashedPassword = passwordEncoder.encode(password)
    val insertedSuccessfully = userDao.create(username, email, hashedPassword)
    if (insertedSuccessfully) {
      return getUserByUsername(username)
    }
    return null
  }

}