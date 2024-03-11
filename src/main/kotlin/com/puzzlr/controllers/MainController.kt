package com.puzzlr.controllers

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MainController {

  @GetMapping("/")
  fun home(model: Model): String {
    model.addAttribute("entryKey", "index")
    return "index"
  }
}