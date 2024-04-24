package com.almeidaprojects.springbackend;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PersonController {
    private final PersonRepository personRepository;

    @PostMapping("/person")
    public ResponseEntity<Person> save(@Valid @RequestBody Person person) {
        log.info("Saving person: {}", person);
        return ResponseEntity.ok(personRepository.save(person));
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        log.info("Finding person with id: {}", id);
        Person person = personRepository.findById(id).orElse(null);
        if (person == null) {
            return ResponseEntity.status(404).body("Person not found");
        }
        return ResponseEntity.ok(person);
    }

    @DeleteMapping("/person/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        log.info("Deleting person with id: {}", id);
        if (!personRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Person not found");
        }
        personRepository.deleteById(id);
        return ResponseEntity.ok("Person deleted");
    }

    @GetMapping("/person")
    public ResponseEntity<List<Person>> findAll() {
        log.info("Listing all persons");
        return ResponseEntity.ok(personRepository.findAll());
    }

}
