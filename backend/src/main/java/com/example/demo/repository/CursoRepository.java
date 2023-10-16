package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

	void save(Optional<Curso> CursoToUpdate);
}
