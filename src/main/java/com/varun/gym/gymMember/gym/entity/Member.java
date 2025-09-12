package com.varun.gym.gymMember.gym.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.varun.gym.gymMember.gym.enums.MembershipType;
import com.varun.gym.gymMember.gym.enums.ServiceType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private LocalDate dob;
    private String phone;
    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    private MembershipType membershipType;

    @ElementCollection(targetClass = ServiceType.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "member_services", joinColumns = @JoinColumn(name = "member_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "service_type")
    private List<ServiceType> services = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    @OrderBy("date DESC")
    private List<Payment> payments = new ArrayList<>();

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public MembershipType getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(MembershipType membershipType) {
        this.membershipType = membershipType;
    }

    public List<ServiceType> getServices() {
        return services;
    }

    public void setServices(List<ServiceType> services) {
        this.services = services;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    public Member(Long id, String name, String email, LocalDate dob, String phone, LocalDate joinDate, MembershipType membershipType, List<ServiceType> services, List<Payment> payments) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.joinDate = joinDate;
        this.membershipType = membershipType;
        this.services = services;
        this.payments = payments;
    }

    public Member() {
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                ", joinDate=" + joinDate +
                ", membershipType=" + membershipType +
                ", services=" + services +
                ", payments=" + payments +
                '}';
    }


}

