package com.varun.gym.gymMember.gym.controller;

import com.varun.gym.gymMember.gym.dto.ChartData;
import com.varun.gym.gymMember.gym.dto.MemberDTO;
import com.varun.gym.gymMember.gym.entity.Member;
import com.varun.gym.gymMember.gym.entity.Payment;
import com.varun.gym.gymMember.gym.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular dev server
public class MemberController {


    @Autowired
    private MemberService memberService;

    // --- CRUD Operations ---

    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.getAllMembers();
    }

    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody MemberDTO member) {
        Member createdMember = memberService.createMember(member);
        return new ResponseEntity<>(createdMember, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member memberDetails) {
        Member updatedMember = memberService.updateMember(id, memberDetails);
        return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{memberId}/payments")
    public ResponseEntity<Member> addPayment(@PathVariable Long memberId, @RequestBody Payment payment) {
        Member updatedMember = memberService.addPayment(memberId, payment);
        return ResponseEntity.ok(updatedMember);
    }

    // --- Statistics for Charts ---

    @GetMapping("/stats/by-type")
    public List<ChartData> getMembersByType() {
        return memberService.getMembersByType();
    }

    @GetMapping("/stats/monthly-revenue")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyRevenue() {
        Map<String, List<ChartData>> revenueData = memberService.getMonthlyRevenue();
        // Format for ngx-charts line chart
        List<Map<String, Object>> response = List.of(Map.of("name", "Revenue", "series", revenueData.get("series")));
        return ResponseEntity.ok(response);
    }
}


