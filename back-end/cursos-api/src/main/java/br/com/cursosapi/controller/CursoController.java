package br.com.cursosapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/cursos")
public class CursoController {

    @GetMapping
    public ResponseEntity<String> teste() {
        return ResponseEntity.ok("Teste ok");
    }
}
