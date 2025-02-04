package com.br.maisprati.squad16.EncontreMeuPet.domain.repositories;

import com.br.maisprati.squad16.EncontreMeuPet.domain.models.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long > {
    List<Plan> findAllByActive(
            boolean active
    );
}
