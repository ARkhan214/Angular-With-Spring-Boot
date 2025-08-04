package com.emranhss.progect.jwt;


import com.emranhss.progect.repository.ITokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;

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
        byte[] kebByte = Base64.Decoder.BASE64URL.decode(SECREAT_KEY);
        return Keys.hmacShaKeyFor(kebByte);
    }


}
