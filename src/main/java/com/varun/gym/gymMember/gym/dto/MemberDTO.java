package com.varun.gym.gymMember.gym.dto;


import com.varun.gym.gymMember.gym.enums.MembershipType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private String name;
    private String email;
    private LocalDate dob;
    private String phone;
    private String address;
    private MembershipType membershipType;
    private String payment;


}

