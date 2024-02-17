package com.puzzlr.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
open class WebConfiguration : WebMvcConfigurer {
  override fun addViewControllers(registry: ViewControllerRegistry) {
    // map all request to root
    // note: the last js/css override causes the bundles to get overwritten somehow so I removed it
    // https://stackoverflow.com/a/42998817/11283051
    /*registry.addViewController("/{spring:\\w+}")
      .setViewName("forward:/")
    registry.addViewController("/**/{spring:\\w+}")
      .setViewName("forward:/")*/
  }
}