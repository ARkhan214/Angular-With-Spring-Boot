package com.emranhss.mkbankspring.service;

import com.emranhss.mkbankspring.entity.Accounts;
import com.emranhss.mkbankspring.entity.Transaction;
import com.emranhss.mkbankspring.entity.TransactionType;
import com.emranhss.mkbankspring.entity.User;
import com.emranhss.mkbankspring.repository.AccountRepository;
import com.emranhss.mkbankspring.repository.TransactionRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;


    @Autowired
    private EmailService emailService;



    // Method for Transaction Taka (connected with TransactionResCon Method Number -1)
    public Transaction addTransaction(Transaction transaction, Long id,String token) {

        Accounts sender = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        System.out.println(sender);

        if (!sender.isAccountActiveStatus()) {
            throw new RuntimeException("Sender account is closed!");
        }

        double newBalance = sender.getBalance();
        System.out.println("Sender current balance: " + newBalance);


        if (transaction.getType() == TransactionType. INITIALBALANCE) {
            newBalance = transaction.getAmount();
            System.out.println("Sender current balance: " + newBalance);
        }

        else if (transaction.getType() == TransactionType.DEPOSIT) {
            newBalance += transaction.getAmount();

        } else if (transaction.getType() == TransactionType.WITHDRAW) {
            if (transaction.getAmount() > newBalance) {
                throw new RuntimeException("Insufficient balance!");
            }
            newBalance -= transaction.getAmount();
        }

        sender.setBalance(newBalance);    //save balance after Deposit or Withdraw

        accountRepository.save(sender);

        transaction.setAccount(sender);
        transaction.setTransactionTime(new Date());
        transaction.setToken(token);

        Transaction savedTransaction = transactionRepository.save(transaction);

        // Send transaction email
        this.sendTransactionEmail(savedTransaction);
        System.out.println("Sender current balance: " + newBalance);
        return transactionRepository.save(transaction);
    }




    //method for transfer
    public Transaction onlyTransfer(Transaction transaction, Long senderId,Long receiverId ,String token) {

            Accounts sender = accountRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender account not found!"));
        System.out.println("Sender current balance: " + sender);

        Accounts receiver = accountRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver account not found!"));
        System.out.println("Receiver current balance: " + receiver);

        double newBalance = sender.getBalance();

        if (transaction.getType() == TransactionType.TRANSFER) {

        if (!receiver.isAccountActiveStatus()){
            throw new RuntimeException("Receiver account is closed!");
        }
        if (!sender.isAccountActiveStatus()) {
                throw new RuntimeException("Sender account is closed!");
        }

        if (transaction.getAmount() > newBalance) {
            throw new RuntimeException("Insufficient balance!");
        }

        newBalance -= transaction.getAmount();              //minus amount from sender account
        sender.setBalance(newBalance);                      //sender er balance save korlam
             accountRepository.save(sender);

        //update reciver balance
        double receiverBalance = receiver.getBalance();     //receiver balance find
        receiverBalance +=transaction.getAmount();          //receiver balance update
        receiver.setBalance(receiverBalance);               //save receiver new balance
        accountRepository.save(receiver);

        transaction.setAccount(sender);
        transaction.setReceiverAccount(receiver);
        transaction.setTransactionTime(new Date());
        transaction.setToken(token);

        this.cashIN(receiverId,transaction.getAmount());     // Send receiver email
        }
        return transactionRepository.save(transaction);

    }




    // Email method inside TransactionService
    //method for receiver cashIn notification
    private void cashIN(Long receiverId, double amount) {
        Accounts receiver = accountRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver account not found!"));

        User user = receiver.getUser();   //find receiver from user

        String subject = "Cash In Notification";
        String mailText = "<html><body>"
                + "<p>Dear " + user.getName() + ",</p>"
                + "<p>You have received a cash-in of amount: TK " + amount
                + " successfully.</p>"
                + "<p>Your new balance is: " + receiver.getBalance() + " TK</p>"
                + "<p>Thanks for staying with us.</p>"
                + "</body></html>";

        try {
            emailService.sendSimpleEmail(user.getEmail(), subject, mailText);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send cash-in email", e);
        }
    }







    // Save or update transaction
    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }




    // Get all transactions(connected with TransactionResCon Method Number -2)
    public List<Transaction> getAllTransactions(){
        return transactionRepository.findAll();
    }




    // Get transactions by Account ID
    public Transaction getTransactionByAccountId(Long accountId){
        return transactionRepository.findById(accountId).get();
    }



    // Get transactions by accountId
    public List<Transaction> getTransactionsByAccountId(Long accountId){
        return transactionRepository.findByAccountId(accountId);
    }



    //for delete transaction by id (connected with TransactionResCon Method Number -4)
    public void deleteTransactionByAccountId(Long accountId) {
        transactionRepository.deleteByAccountId(accountId);
    }




    // Get transactions by Accounts object (connected with TransactionResCon Method Number -3)
    public List<Transaction> getTransactionsByAccount(Accounts account) {
        return transactionRepository.findByAccount(account);
    }



    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Transaction Type baboher kore filter kora(connected with TransactionResCon Method Number -5)
    //Method for Search Transaction by deposit
    public List<Transaction> getDepositsByAccount(Long accountId) {
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        return account.getTransactions().stream()
                .filter(t -> t.getType() == TransactionType.DEPOSIT)
                .toList();
    }


    //Table Relation Use kore filter kora(Transaction table er sathe Account Table er Relation k kaje lagano)
    //Transaction Type baboher kore filter kora(connected with TransactionResCon Method Number -6)
    //Method for Search Transaction by withdraw
    public List<Transaction> getWithdrawsByAccount(Long accountId) {
        Accounts account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found!"));

        return account.getTransactions().stream()
                .filter(t -> t.getType() == TransactionType.WITHDRAW)
                .toList();
    }






    public void sendTransactionEmail(Transaction transaction) {
        Accounts accounts = transaction.getAccount();
        User user = accounts.getUser();  // account holder

        String subject = "Transaction Confirmation";
        String mailText =  "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "  body { font-family: Arial, sans-serif; line-height: 1.6; }"
                + "  .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; }"
                + "  .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 10px 10px 0 0; }"
                + "  .content { padding: 20px; }"
                + "  .footer { font-size: 0.9em; color: #777; margin-top: 20px; text-align: center; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "  <div class='container'>"
                + "    <div class='header'>"
                + "      <h2>Congratulations!!</h2>"
                + "    </div>"
                + "    <div class='content'>"
                + "<p>Dear " + user.getName() + ",</p>"
                + "<p>TK " + transaction.getAmount() + " " + transaction.getType() + " successful on " + transaction.getTransactionTime() + " From Account ID: "+accounts.getId()+" Your Current balance is "+ accounts.getBalance()+"</p>"
                + "<p>Thanks for staying with us.</p>"
                + "    <div class='footer'>"
                + "      <p> Sincerely,</p>"
                + "      <p>MK Bank Ltd.</p>"
                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendSimpleEmail(user.getEmail(), subject, mailText);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send transaction email", e);
        }
    }

}
