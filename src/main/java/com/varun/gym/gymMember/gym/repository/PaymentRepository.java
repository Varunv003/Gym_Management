package com.varun.gym.gymMember.gym.repository;

import com.varun.gym.gymMember.gym.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Optional: Find all payments for a specific member
    List<Payment> findByMemberId(Long memberId);
}

