package com.emranhss.progect.restcontroller;


import com.emranhss.progect.entity.JobSeeker;
import com.emranhss.progect.entity.User;
import com.emranhss.progect.repository.IJobSeekerRepository;
import com.emranhss.progect.repository.IUserRepo;
import com.emranhss.progect.service.AuthService;
import com.emranhss.progect.service.JobSeekerService;
import com.emranhss.progect.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobseeker/")
@CrossOrigin("*")
public class JobSeekerRestController {

    @Autowired
    private AuthService authService;

    @Autowired
    private IJobSeekerRepository iJobSeekerRepository;

    @Autowired
    private IUserRepo userRepo;

    @Autowired
    private JobSeekerService jobSeekerService;



    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerJobSeeker(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "jobSeeker") String jobSeekerJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        JobSeeker jobSeeker = objectMapper.readValue(jobSeekerJson, JobSeeker.class);


        try {
            authService.registerJobSeeker(user, file, jobSeeker);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User registered successfully");

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild" + e);

            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }


    @GetMapping("all")
    public ResponseEntity<List<JobSeeker>> getAllUsers(){
        List<JobSeeker> jobSeekerList = jobSeekerService.grtAll();
        return ResponseEntity.ok(jobSeekerList);
    }


    @GetMapping("profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        System.out.println("Authenticated User: " + authentication.getName());
        System.out.println("Authorities: " + authentication.getAuthorities());
        String email = authentication.getName();
        Optional<User> user =userRepo.findByEmail(email);
        JobSeeker jobSeeker = jobSeekerService.getProfileByUserId(user.get().getId());
        return ResponseEntity.ok(jobSeeker);

    }





}
