package com.bank.service;

import com.bank.model.Account;
import com.bank.model.Transaction;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateDesc();
    }

    @Transactional
    public Transaction deposit(String accountNo, Double amount, String description) {
        Account account = accountRepository.findByAccountNo(accountNo)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        account.setBalance(account.getBalance() + amount);
        account.setLastTransactionDate(LocalDate.now());
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountNo(accountNo);
        transaction.setCustomerName(account.getCustomerName());
        transaction.setType("deposit");
        transaction.setAmount(amount);
        transaction.setBalanceAfter(account.getBalance());
        transaction.setDescription(description);
        transaction.setStatus("completed");

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction withdraw(String accountNo, Double amount, String description) {
        Account account = accountRepository.findByAccountNo(accountNo)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(account.getBalance() - amount);
        account.setLastTransactionDate(LocalDate.now());
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountNo(accountNo);
        transaction.setCustomerName(account.getCustomerName());
        transaction.setType("withdraw");
        transaction.setAmount(amount);
        transaction.setBalanceAfter(account.getBalance());
        transaction.setDescription(description);
        transaction.setStatus("completed");

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction transfer(String fromAccountNo, String toAccountNo, Double amount, String description) {
        Account fromAccount = accountRepository.findByAccountNo(fromAccountNo)
                .orElseThrow(() -> new RuntimeException("Source account not found"));
        
        Account toAccount = accountRepository.findByAccountNo(toAccountNo)
                .orElseThrow(() -> new RuntimeException("Destination account not found"));

        if (fromAccount.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        fromAccount.setLastTransactionDate(LocalDate.now());
        accountRepository.save(fromAccount);

        toAccount.setBalance(toAccount.getBalance() + amount);
        toAccount.setLastTransactionDate(LocalDate.now());
        accountRepository.save(toAccount);

        Transaction transaction = new Transaction();
        transaction.setAccountNo(fromAccountNo);
        transaction.setCustomerName(fromAccount.getCustomerName());
        transaction.setType("transfer");
        transaction.setAmount(amount);
        transaction.setBalanceAfter(fromAccount.getBalance());
        transaction.setDescription(description != null ? description : "Transfer to " + toAccountNo);
        transaction.setStatus("completed");

        return transactionRepository.save(transaction);
    }
}
