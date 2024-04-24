package com.almeidaprojects.springbackend;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@RequiredArgsConstructor
public class Person {
    @Id
    private String id;
    @NotNull
    private String name;

}
