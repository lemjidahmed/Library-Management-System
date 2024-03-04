package com.ALM.library.springsecurity.controllers;

import com.ALM.library.api.model.Author;
import com.ALM.library.springsecurity.models.User;
import com.ALM.library.springsecurity.repository.UserRepository;
import com.ALM.library.springsecurity.security.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600, allowCredentials="true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/password")
public class ForgotPasswordController {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/forgot_password")
    public ResponseEntity<User> processForgotPassword(@RequestBody String email) {
        String link="http://localhost:8081/reset-pass";
        try {
            User user =this.userRepository.findByEmail(email);
            if(user!=null)
            {
                this.authService.sendEmail(email,link);
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/reset_password")
    public ResponseEntity<HttpStatus> processResetPassword(@RequestBody User user,String password) {

        try {
            this.authService.updatePassword(user,password);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
