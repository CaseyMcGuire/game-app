package com.puzzlr.config

import com.puzzlr.services.UserDetailsServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler

@Configuration
@EnableWebSecurity
open class SecurityConfiguration(private val userDetailsService: UserDetailsServiceImpl) {
  @Bean
  open fun passwordEncoder(): PasswordEncoder? {
    return BCryptPasswordEncoder()
  }

  @Bean
  open fun authenticationManager(http: HttpSecurity): AuthenticationManager {
    val authenticationManagerBuilder = http.getSharedObject(
      AuthenticationManagerBuilder::class.java
    )
    authenticationManagerBuilder
      .userDetailsService(userDetailsService)
      .passwordEncoder(passwordEncoder())
    return authenticationManagerBuilder.build()
  }

  @Bean
  open fun filterChain(http: HttpSecurity): SecurityFilterChain {

    // Spring Security 6 introduced new behavior around CSRF tokens. This was preventing
    // me from logging in so I added the below code to opt out of the new default. It might
    // be worth revisiting at some point because I didn't spend the time to figure out how to
    // make it work
    // https://docs.spring.io/spring-security/reference/5.8/migration/servlet/exploits.html#_i_need_to_opt_out_of_deferred_tokens_for_another_reason
    val requestHandler = CsrfTokenRequestAttributeHandler()
    requestHandler.setCsrfRequestAttributeName(null)

    http {
      authorizeRequests {
        authorize("/**", permitAll)
        authorize("/login", permitAll)
      }
      formLogin {
        loginPage = "/login"
        defaultSuccessUrl("/?success=true", true)
        failureUrl = "/login?error=true"
        // note usernameParameter and password parameter aren't available yet but they will be at some point:
        // https://github.com/spring-projects/spring-security/issues/14474
      }
      csrf {
        csrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse()
        csrfTokenRequestHandler = requestHandler
        disable()
      }
      logout {
        logoutSuccessUrl = "/"
      }
    }

    return http.build();
  }
}