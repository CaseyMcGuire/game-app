package com.puzzlr.services

import com.puzzlr.daos.UserDao
import com.puzzlr.models.UserDetailsImpl
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component

@Component
class UserDetailsServiceImpl(private val userDao: UserDao) : UserDetailsService {
  @Throws(UsernameNotFoundException::class)
  override fun loadUserByUsername(username: String?): UserDetails {
    val ex = UsernameNotFoundException("No user with username $username found")
    if (username == null) {
      throw ex
    }
    val user = userDao.getByUsername(username) ?: throw ex
    return UserDetailsImpl(user)
  }
}