package com.puzzlr.models

import generated.jooq.tables.pojos.Users
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl(private val user: Users) : UserDetails {
  override fun getAuthorities(): MutableCollection<out GrantedAuthority> = mutableListOf()
  override fun getPassword(): String = user.password!!
  override fun getUsername(): String = user.username!!
  override fun isAccountNonExpired(): Boolean = true
  override fun isAccountNonLocked(): Boolean = true
  override fun isCredentialsNonExpired(): Boolean = true
  override fun isEnabled(): Boolean = true
}