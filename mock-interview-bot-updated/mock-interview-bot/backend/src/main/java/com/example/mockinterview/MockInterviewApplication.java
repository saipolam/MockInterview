
package com.example.mockinterview;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MockInterviewApplication {

    public static void main(String[] args) {
        SpringApplication.run(MockInterviewApplication.class, args);
    }

    @PostMapping("/ask")
    public String askQuestion(@RequestBody String question) {
        // Logic to interact with conversational bot (e.g., Dialogflow)
        return "This is a mock response for: " + question;
    }
}
