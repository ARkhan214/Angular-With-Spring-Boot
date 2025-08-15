package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.User;
import com.emranhss.mkbankspring.service.AccountService;
import com.emranhss.mkbankspring.service.AuthService;
import com.emranhss.mkbankspring.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/account/")
@CrossOrigin("*")
public class AccountRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private AccountService accountService;

    // for account save or update or registration (Method Number -1)
    @PostMapping("")
    public ResponseEntity<Map<String, String>> registerAccount(
            @RequestPart(value = "user") String userJson,
            @RequestPart(value = "account") String accountJson,
            @RequestParam(value = "photo") MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(userJson, User.class);
        Accounts accounts = objectMapper.readValue(accountJson, Accounts.class);

        try {
            authService.registerAccount(user, file, accounts);
            Map<String, String> response = new HashMap<>();
            response.put("Message", "User Added Successfully ");

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Message", "User Add Faild " + e);
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // for account view by id (Method Number -2)
    @GetMapping("{id}")
    public ResponseEntity<Accounts> getAccountById(@PathVariable Long id) {
        Accounts account = accountService.findAccountById(id);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //for all account view (Method Number -3)
    @GetMapping("all")
    public List<Accounts>  getAllAccounts() {
        return accountService.getAll();
    }


    // Method for Transaction Taka (Method Number -4)
    @PutMapping("{id}")
    public ResponseEntity<Accounts> updateAccount(
            @PathVariable Long id,
            @RequestBody Accounts account) {

        // Find existing account(ami j account id dicci sai id khuja)
        Accounts existing = accountService.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

        // Update only relevant fields
        existing.setName(account.getName());
        existing.setBalance(account.getBalance());
        existing.setAccountActiveStatus(account.isAccountActiveStatus());

        Accounts updated = accountService.save(existing);

        return ResponseEntity.ok(updated);
    }


}







