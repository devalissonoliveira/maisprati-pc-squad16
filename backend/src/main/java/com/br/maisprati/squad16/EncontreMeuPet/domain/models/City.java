package com.br.maisprati.squad16.EncontreMeuPet.domain.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "city_id")
    private Long cityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    public City() {
    }

    public City(State state, String name) {
        this.state = state;
        this.name = name;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        City city = (City) o;

        return cityId != null ? cityId.equals(city.cityId) : city.cityId == null;
    }

    @Override
    public int hashCode() {
        return cityId != null ? cityId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "City{"
                + "cityId=" + cityId
                + ", state=" + state.getStateCode()
                + ", name='" + name + '\''
                + '}';
    }
}
