package com.emranhss.mkbankspring.restcontroller;

import com.emranhss.mkbankspring.dto.DpsPaymentDto;
import com.emranhss.mkbankspring.dto.DpsRequestDto;
import com.emranhss.mkbankspring.entity.Dps;
import com.emranhss.mkbankspring.service.AccountService;
import com.emranhss.mkbankspring.service.DpsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dps")
public class DpsController {
    @Autowired
    private DpsService dpsService;

    @Autowired
    private AccountService accountService;

    // ✅ নতুন DPS খোলা (login account)
    @PostMapping("/create")
    public Dps createDps(@RequestBody DpsRequestDto requestDto, Authentication authentication) {
        Long accountId = accountService.findAccountByEmail(authentication.getName()).getId();
        return dpsService.createDps(requestDto, accountId);
    }

    @PostMapping("/pay/{dpsId}")
    public String processPayment(
            @PathVariable Long dpsId,
            @RequestHeader ("Authorization") String authHeader

    ) {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        dpsService.processMonthlyPayment(dpsId,token);
        return "Monthly DPS payment successful!";
    }

    @PostMapping("/penalty")
    public String processPenaltyPayment(@RequestBody DpsPaymentDto paymentDto) {
        dpsService.applyPenalty(paymentDto.getDpsId(), paymentDto.getPenaltyPercent());
        return "Penalty payment successful!";
    }

    @PostMapping("/close/{dpsId}")
    public String closeDps(@PathVariable Long dpsId) {
        dpsService.closeDps(dpsId);
        return "DPS closed successfully!";
    }

    @PostMapping("/force-close/{dpsId}")
    public String forceClose(@PathVariable Long dpsId) {
        dpsService.forceCloseIfMissed(dpsId);
        return "DPS force-closed due to non-payment!";
    }



    //==============View Part
    // ✅ Login account এর সব DPS দেখার API
    @GetMapping("/my-dps")
    public ResponseEntity<List<Dps>> getMyDps(Authentication authentication) {
        Long accountId = accountService.findAccountByEmail(authentication.getName()).getId();
        List<Dps> dpsList = dpsService.getDpsByAccountId(accountId);
        return ResponseEntity.ok(dpsList);
    }

    // ✅ Login account এর এক DPS এর বিস্তারিত view
    @GetMapping("/view/{dpsId}")
    public ResponseEntity<Dps> getDps(@PathVariable Long dpsId, Authentication authentication) {
        Long accountId = accountService.findAccountByEmail(authentication.getName()).getId();
        Dps dps = dpsService.getDpsById(dpsId, accountId);
        return ResponseEntity.ok(dps);
    }
}
