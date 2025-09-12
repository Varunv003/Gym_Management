package com.varun.gym.gymMember.gym.repository;

import com.varun.gym.gymMember.gym.dto.ChartData;
import com.varun.gym.gymMember.gym.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("SELECT new com.varun.gym.gymMember.gym.dto.ChartData(m.membershipType, COUNT(m)) FROM Member m GROUP BY m.membershipType")
    List<ChartData> countMembersByMembershipType();

    @Query("SELECT new com.varun.gym.gymMember.gym.dto.ChartData(" +
            "   CONCAT(YEAR(p.date), '-', LPAD(str(MONTH(p.date)), 2, '0')), " +
            "   SUM(p.amount)" +
            ") " +
            "FROM Payment p " +
            "GROUP BY CONCAT(YEAR(p.date), '-', LPAD(str(MONTH(p.date)), 2, '0')) " + // <-- FIX IS HERE
            "ORDER BY CONCAT(YEAR(p.date), '-', LPAD(str(MONTH(p.date)), 2, '0')) ASC")
    List<ChartData> calculateMonthlyRevenue();
}

