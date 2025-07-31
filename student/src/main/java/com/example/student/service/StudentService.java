package com.example.student.service;

import com.example.student.entity.Student;
import com.example.student.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {


    @Autowired
    private StudentRepo studentRepo;

    public List<Student> getAll() {
        return studentRepo.findAll();
    }

    public Student findById(int id) {return studentRepo.findById(id).orElse(null);}

    public void save(Student student){ studentRepo.save(student);}

    public void deleteById(int id){studentRepo.deleteById(id);}
}
