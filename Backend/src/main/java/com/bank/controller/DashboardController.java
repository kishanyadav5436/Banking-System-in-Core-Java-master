package com.bank.controller;

import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.CustomerRepository;
import com.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalCustomers = customerRepository.count();
        long totalAccounts = accountRepository.count();
        
        Double totalBalance = accountRepository.findAll().stream()
                .mapToDouble(a -> a.getBalance() != null ? a.getBalance() : 0.0)
                .sum();
                
        List<Transaction> allTransactions = transactionRepository.findAllByOrderByDateDesc();
        long totalTransactions = allTransactions.size();
        
        List<Transaction> recentTransactions = allTransactions.stream()
                .limit(5)
                .collect(Collectors.toList());

        // Simple mock for monthly data until aggregation is implemented
        List<Map<String, Object>> monthlyData = List.of(
                Map.of("month", "Nov", "deposits", 320000, "withdrawals", 180000),
                Map.of("month", "Dec", "deposits", 450000, "withdrawals", 210000),
                Map.of("month", "Jan", "deposits", 380000, "withdrawals", 195000),
                Map.of("month", "Feb", "deposits", 520000, "withdrawals", 280000),
                Map.of("month", "Mar", "deposits", 410000, "withdrawals", 230000),
                Map.of("month", "Apr", "deposits", 480000, "withdrawals", 250000)
        );

        stats.put("totalCustomers", totalCustomers);
        stats.put("totalAccounts", totalAccounts);
        stats.put("totalBalance", totalBalance);
        stats.put("totalTransactions", totalTransactions);
        stats.put("recentTransactions", recentTransactions);
        stats.put("monthlyData", monthlyData);

        return stats;
    }
}
