package com.bank.controller;

import com.bank.model.Transaction;
import com.bank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody Map<String, Object> payload) {
        try {
            String accountNo = (String) payload.get("accountNo");
            Double amount = Double.valueOf(payload.get("amount").toString());
            String description = (String) payload.get("description");
            
            Transaction transaction = transactionService.deposit(accountNo, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestBody Map<String, Object> payload) {
        try {
            String accountNo = (String) payload.get("accountNo");
            Double amount = Double.valueOf(payload.get("amount").toString());
            String description = (String) payload.get("description");
            
            Transaction transaction = transactionService.withdraw(accountNo, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody Map<String, Object> payload) {
        try {
            String fromAccountNo = (String) payload.get("fromAccountNo");
            String toAccountNo = (String) payload.get("toAccountNo");
            Double amount = Double.valueOf(payload.get("amount").toString());
            String description = (String) payload.get("description");
            
            Transaction transaction = transactionService.transfer(fromAccountNo, toAccountNo, amount, description);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
