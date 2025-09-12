package com.varun.gym.gymMember.security.repository;

import com.varun.gym.gymMember.security.entity.Role;
import com.varun.gym.gymMember.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<List<User>> findAllByRole(Role role);
}

