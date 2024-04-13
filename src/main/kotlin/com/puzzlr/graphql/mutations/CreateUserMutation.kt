package com.puzzlr.graphql.mutations

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsMutation
import com.netflix.graphql.dgs.InputArgument
import com.puzzlr.graphql.types.*
import com.puzzlr.services.user.UserService

@DgsComponent
class CreateUserMutation(private val userService: UserService) {

  companion object {
    val PASSWORD_MISMATCH_ERROR = CreateUserError(
      message = "Passwords don't match",
      type = CreateUserErrorType.PASSWORD_MISMATCH
    )

    val USERNAME_ALREADY_ERROR = CreateUserError(
      message = "A user with that username already exists.",
      type = CreateUserErrorType.USERNAME_ALREADY_EXISTS
    )

    val EMAIL_ALREADY_EXISTS_ERROR = CreateUserError(
      message = "A user with that email already exists.",
      type = CreateUserErrorType.USERNAME_ALREADY_EXISTS
    )
  }

  @DgsMutation(field = "createUser")
  fun createUserMutation(@InputArgument("input") input: CreateUserInput): CreateUserResponse {
    val password = input.password
    val confirmPassWord = input.confirmPassword
    if (password != confirmPassWord) {
      return CreateUserResponse(
        success = false,
        user = null,
        errors = listOf(PASSWORD_MISMATCH_ERROR)
      )
    }

    val existingUserByEmail = userService.getUserByEmail(input.email)
    if (existingUserByEmail != null) {
      return CreateUserResponse(
        success = false,
        user = null,
        errors = listOf(EMAIL_ALREADY_EXISTS_ERROR)
      )
    }

    val existingUserByUsername = userService.getUserByUsername(input.username)
    if (existingUserByUsername != null) {
      return CreateUserResponse(
        success = false,
        user = null,
        errors = listOf(USERNAME_ALREADY_ERROR)
      )
    }

    val newlyCreatedUser = userService.createUser(input.username, input.email, input.password)
    if (newlyCreatedUser == null) {
      return CreateUserResponse(
        success = false,
        user = null,
        errors = listOf(USERNAME_ALREADY_ERROR)
      )
    }

    return CreateUserResponse(
      success = true,
      user = User(username = newlyCreatedUser.getUsername(), email = newlyCreatedUser.getEmail()),
      errors = listOf()
    )
  }
}