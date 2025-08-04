package com.emranhss.progect.jwt;


import com.emranhss.progect.entity.Token;
import com.emranhss.progect.entity.User;
import com.emranhss.progect.repository.ITokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.xml.crypto.Data;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Autowired
    private ITokenRepository tokenRepository;

    private  final String SECREAT_KEY="lWIJtNufZLx1KeT18wZw3Oyl1eXISYtkOzlpDG3yG83rmiaNii";


    //ekhane token er sob part pabo
    private Claims extractAllClaims(String token){

        return Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSigningKey() {
        byte[] kebByte = Decoders.BASE64URL.decode(SECREAT_KEY);
        return Keys.hmacShaKeyFor(kebByte);
    }


    public String generateToken(User  user ){
        return  Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role",user.getRole())
                .setIssuedAt(new Date(System.currentTimeMillis()+24*60*60*1000))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractUsername(String token){

        return extractClaim(token,Claims::getSubject);

    }


    // Extract a specific Claim from the Token Claims
    public <T> T extractClaim(String token, Function<Claims,T>resolve){
        Claims claims = extractAllClaims(token);
        return resolve.apply(claims);
    }

private Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
}

private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
}

public boolean isValid(String token, UserDetails user){

        String username = extractUsername(token);

        boolean validToken = tokenRepository
                .findByToken(token)
                .map(t-> !t.isLogout())
                .orElse(false);
        return (username.equals(user.getUsername()) && !isTokenExpired(token) && validToken);
}


//get user role from token
    public String extractUserRole(String token){
        return  extractClaim(token,claims -> claims.get("role",String.class));
    }


}
