package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.dto.FixedDepositDTO;
import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.User;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.repository.UserRepository;
import com.emranhss.mkbankspring.service.FixedDepositService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fd")
public class FixedDepositController {
    @Autowired
    private FixedDepositService fdService;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/create")
    public FixedDepositDTO createFD(
            @RequestBody FixedDepositDTO fdDTO,
            Authentication authentication) {

        String token = (String) authentication.getCredentials(); // raw JWT
        String username = authentication.getName();

        User u = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + username));

        Accounts sender = accountRepository.findAccountByUser(u)
                .orElseThrow(() -> new RuntimeException("Account not found for user: " + username));

        return fdService.createFD(fdDTO, sender.getId(), token);
    }



//    @PostMapping("/create")
//    public FixedDepositDTO createFD(@RequestParam double amount,
//                                    @RequestParam int durationMonths,
//                                    HttpServletRequest request) {
//        Long accountId = (Long) request.getAttribute("accountId");
//        return fdService.createFD(accountId, amount, durationMonths);
//    }

    @GetMapping("/my-fds")
    public List<FixedDepositDTO> getMyFDs(HttpServletRequest request) {
        Long accountId = (Long) request.getAttribute("accountId");
        return fdService.getFDsByAccount(accountId);
    }

    @PostMapping("/close/{fdId}")
    public FixedDepositDTO closeFD(@PathVariable Long fdId, HttpServletRequest request) {
        Long accountId = (Long) request.getAttribute("accountId");
        return fdService.closeFD(fdId, accountId);
    }
}
