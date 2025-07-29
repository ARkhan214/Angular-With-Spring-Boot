package com.emranhss.progect.restcontroller;


import com.emranhss.progect.entity.User;
import com.emranhss.progect.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin("*")
public class UserRestController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Map<String,String>>saveUser(
            @RequestPart(value = "user")String userJson,
            @RequestParam(value = "photo")MultipartFile file
            )
    throws JsonProcessingException {
        ObjectMapper objectMapper=new ObjectMapper();
        User user=objectMapper.readValue(userJson,User.class);



        try {
            userService.seveOrUpda(user,file);
            Map<String,String> response=new HashMap<>();
            response.put("Message","User Save Successful");


            return new  ResponseEntity<>(response, HttpStatus.OK);
        }

        catch (Exception e){
            Map<String,String> errorResponse=new HashMap<>();
            errorResponse.put("Message","User Add Failed");
            return new  ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<List<User>> getAllUser(){
        List<User> users=userService.findAll();
           return ResponseEntity.ok(users);
    }

//    @DeleteMapping("{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable int id) {
//        userService.delete(id);
//        return ResponseEntity.ok("User deleted successfully");
//    }



}
