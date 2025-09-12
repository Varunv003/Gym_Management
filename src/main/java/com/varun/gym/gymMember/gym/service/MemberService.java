package com.varun.gym.gymMember.gym.service;

import com.varun.gym.gymMember.gym.dto.ChartData;
import com.varun.gym.gymMember.gym.dto.MemberDTO;
import com.varun.gym.gymMember.gym.dto.PaymentDTO;
import com.varun.gym.gymMember.gym.entity.Member;
import com.varun.gym.gymMember.gym.entity.Payment;
import com.varun.gym.gymMember.gym.repository.MemberRepository;
import com.varun.gym.gymMember.security.entity.Role;
import com.varun.gym.gymMember.security.entity.User;
import com.varun.gym.gymMember.security.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Transactional
    public Member createMember(MemberDTO memberdto) {
        // 1. Create Member
        Member member = new Member();
        member.setName(memberdto.getName());
        member.setEmail(memberdto.getEmail());
        member.setDob(memberdto.getDob());
        member.setPhone(memberdto.getPhone());
        member.setJoinDate(LocalDate.now());
        member.setMembershipType(memberdto.getMembershipType());
        Member savedMember = memberRepository.save(member);

        // 2. Create User (for login)
        User user = new User();
        user.setName(member.getName());
        user.setEmail(memberdto.getEmail());
        user.setNumber(member.getPhone());
        user.setAddress(memberdto.getAddress()); // from DTO if you have it
        user.setRole(Role.ROLE_USER);
        user.setPassword(passwordEncoder.encode("securepassword")); // take from form
        userRepository.save(user);

        // 3. Optional Payment
        if (memberdto.getPayment() != null) {
            Payment payment = new Payment();

            payment.setAmount(memberdto.getPayment());
            payment.setDate(LocalDate.now());
            payment.setMember(savedMember);

            addPayment(savedMember.getId(), payment);
        }

        return savedMember;
    }

    public Member updateMember(Long id, Member memberDetails) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + id));

        if(memberDetails.getName() != null)member.setName(memberDetails.getName());
        if(memberDetails.getEmail() != null)member.setEmail(memberDetails.getEmail());
        if(memberDetails.getDob() != null)member.setDob(memberDetails.getDob());
        if(memberDetails.getPhone() != null)member.setPhone(memberDetails.getPhone());
        if(memberDetails.getJoinDate() != null)member.setJoinDate(memberDetails.getJoinDate());
        if(memberDetails.getMembershipType() != null)member.setMembershipType(memberDetails.getMembershipType());
        if(memberDetails.getServices() != null)member.setServices(memberDetails.getServices());

        return memberRepository.save(member);
    }

    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new EntityNotFoundException("Member not found with id: " + id);
        }
        memberRepository.deleteById(id);
    }

    public Member addPayment(Long memberId, Payment payment) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + memberId));
        payment.setMember(member);
        member.getPayments().add(payment);
        return memberRepository.save(member);
    }

    public List<ChartData> getMembersByType() {
        return memberRepository.countMembersByMembershipType();
    }

    public Map<String, List<ChartData>> getMonthlyRevenue() {
        List<ChartData> revenueData = memberRepository.calculateMonthlyRevenue();
        // The structure ngx-charts expects is { name: 'Revenue', series: [...] }
        return Map.of("series", revenueData);
    }

}

