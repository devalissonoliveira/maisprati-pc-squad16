package com.br.maisprati.squad16.EncontreMeuPet.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long planId;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "monthly_price", precision = 10, scale = 2)
    private BigDecimal monthlyPrice;

    @Column(name = "annual_price", precision = 10, scale = 2)
    private BigDecimal annualPrice;

    @Column(name = "min_pets", nullable = false)
    private Integer minPets;

    @Column(name = "max_pets")
    private Integer maxPets;

    @Column(name = "active")
    private boolean active;

    public Plan() {
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getMonthlyPrice() {
        return monthlyPrice;
    }

    public void setMonthlyPrice(BigDecimal monthlyPrice) {
        this.monthlyPrice = monthlyPrice;
    }

    public BigDecimal getAnnualPrice() {
        return annualPrice;
    }

    public void setAnnualPrice(BigDecimal annualPrice) {
        this.annualPrice = annualPrice;
    }

    public Integer getMinPets() {
        return minPets;
    }

    public void setMinPets(Integer minPets) {
        this.minPets = minPets;
    }

    public Integer getMaxPets() {
        return maxPets;
    }

    public void setMaxPets(Integer maxPets) {
        this.maxPets = maxPets;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Plan plan = (Plan) o;

        return planId != null ? planId.equals(plan.planId) : plan.planId == null;
    }

    @Override
    public int hashCode() {
        return planId != null ? planId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Plan{"
                + "planId=" + planId
                + ", name='" + name + '\''
                + ", description='" + description + '\''
                + ", monthlyPrice=" + monthlyPrice
                + ", annualPrice=" + annualPrice
                + ", minPets=" + minPets
                + ", maxPets=" + maxPets
                + ", active=" + active
                + '}';
    }
}
