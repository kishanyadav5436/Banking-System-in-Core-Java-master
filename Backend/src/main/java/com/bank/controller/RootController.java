package com.bank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String home() {
        return "<html><body>" +
               "<h1 style='font-family: sans-serif; color: #2e7d32; text-align: center; margin-top: 50px;'>" +
               "✅ Banking System API is Running Successfully!" +
               "</h1>" +
               "<p style='font-family: sans-serif; text-align: center; color: #555;'>" +
               "This is the backend server. Please visit your React Frontend URL to view the website." +
               "</p>" +
               "</body></html>";
    }
}
