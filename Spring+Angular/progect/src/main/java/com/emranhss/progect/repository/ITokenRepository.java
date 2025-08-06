package com.emranhss.progect.repository;

import com.emranhss.progect.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);

    @Query("""
            Select t from Token t inner join User u on t.user.id=u.id
            where t.user.id= :userId and t.logout=false 
            """)
    List<Token> findAllTokenByUser(int userId);





//    Optional<Token> findByToken(String token);
//
//    @Query("""
//        SELECT t FROM Token t
//        WHERE t.user.id = :userId AND t.logout = false
//    """)
//    List<Token> findAllValidTokensByUserId(int userId); // ✅ meaningful name



}
