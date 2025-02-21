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
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @Column(name = "neighborhood", length = 100, nullable = false)
    private String neighborhood;

    @Column(name = "street", length = 200, nullable = false)
    private String street;

    @Column(name = "number", length = 20, nullable = false)
    private String number;

    @Column(name = "postal_code", length = 8, nullable = false)
    private String postalCode;

    public Address() {
    }

    public Address(City city, String neighborhood, String street, String number, String postalCode) {
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
        this.number = number;
        this.postalCode = postalCode;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Address address = (Address) o;

        return addressId != null ? addressId.equals(address.addressId) : address.addressId == null;
    }

    @Override
    public int hashCode() {
        return addressId != null ? addressId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Address{"
                + "addressId=" + addressId
                + ", city=" + city.getName()
                + ", neighborhood='" + neighborhood + '\''
                + ", street='" + street + '\''
                + ", number='" + number + '\''
                + ", postalCode='" + postalCode + '\''
                + '}';
    }
}
