package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.dto.FixedDepositDTO;
import com.emranhss.mkbankspring.service.FixedDepositService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fd")
public class FixedDepositController {
    @Autowired
    private FixedDepositService fdService;

    @PostMapping("/create")
    public FixedDepositDTO createFD(@RequestParam double amount,
                                    @RequestParam int durationMonths,
                                    HttpServletRequest request) {
        Long accountId = (Long) request.getAttribute("accountId");
        return fdService.createFD(accountId, amount, durationMonths);
    }

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
