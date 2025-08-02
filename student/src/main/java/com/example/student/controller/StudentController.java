package com.example.student.controller;

import com.example.student.entity.Student;
import com.example.student.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/home")
    public String home(){

        return "home";
    }

    @GetMapping("/studentForm")
    public String studentForm(Model model){
        model.addAttribute("student", new Student());
        return "addstudent";
    }

//    @PostMapping("/save")
//    public  String save(@ModelAttribute Student student){
//        studentService.save(student);
//        return "redirect:/";
//
//    }


    @PostMapping("/save")
    public  String save(@ModelAttribute Student student, RedirectAttributes redirectAttributes){
        studentService.save(student);
        redirectAttributes.addFlashAttribute("message", "Saved Successfully!");
        return "redirect:/";

    }


    @GetMapping("")
    public String getAllStudent(Model model){
        List<Student> list=studentService.getAll();
        model.addAttribute("list",list);
        return "home";

    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable int id, Model model) {
        Student student=studentService.findById(id);
        model.addAttribute("student", student);
        return "addstudent";
    }

//    @GetMapping("/delete/{id}")
//    public String delete(@PathVariable int id) {
//        studentService.deleteById(id);
//        return "redirect:/";
//    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable int id, RedirectAttributes redirectAttributes) {
        studentService.deleteById(id);
        redirectAttributes.addFlashAttribute("message", "Deleted Successfully!");
        return "redirect:/";
    }
}
