package com.emranhss.progect.restcontroller;


import com.emranhss.progect.dto.EducationDTO;
import com.emranhss.progect.entity.Education;
import com.emranhss.progect.entity.JobSeeker;
import com.emranhss.progect.entity.User;
import com.emranhss.progect.repository.IUserRepo;
import com.emranhss.progect.service.EducationService;
import com.emranhss.progect.service.JobSeekerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/education/")
public class EducationRestController {

@Autowired
private EducationService educationService;

@Autowired
private JobSeekerService jobSeekerService;

@Autowired
private IUserRepo userRepo;


@PostMapping("add")
public ResponseEntity<Education> addEducation(@RequestBody Education education, Authentication authentication) {
    String email = authentication.getName();
    Education savedEducation = educationService.saveEducation(education,email);
    return ResponseEntity.ok(savedEducation);

}



@GetMapping("all")
public ResponseEntity<List<EducationDTO>> getEducationsByJobSeekerId(Authentication authentication) {
    String email = authentication.getName();

    Optional<User> user = userRepo.findByEmail(email);
    JobSeeker jobSeeker = jobSeekerService.getProfileByUserId(user.get().getId());

    List<EducationDTO> educations = educationService.getByJobSeekerId(jobSeeker.getId());
    return ResponseEntity.ok(educations);
}


@DeleteMapping("{id}")
public ResponseEntity<Void>deleteEducation(@PathVariable Long id){
    educationService.delete(id);
    return ResponseEntity.noContent().build();
}

}
