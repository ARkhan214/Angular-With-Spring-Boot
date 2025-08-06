package com.emranhss.progect.jwt;


import com.emranhss.progect.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,       // Incoming HTTP Request
            HttpServletResponse response,     // HTTP Response
            FilterChain filterChain           // Chain of filters to execute
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);            // Continue with the next filter in the chain
            return;                                             // Exit current filter as no JWT is provided
        }

        String token = authHeader.substring(7);

        String username = jwtService.extractUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userService.loadUserByUsername(username);

            boolean valid = jwtService.isValid(token, userDetails);


            if (jwtService.isValid(token, userDetails)) {

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,                      // Principal (user details)
                        null,                             // Credentials (password) — null since already authenticated
                        userDetails.getAuthorities()      // User roles/authorities
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)  {
        String path = request.getRequestURI();
        boolean skip = path.equals("/api/user/login") || path.startsWith("/images/") || path.startsWith("api/user/active/") || path.startsWith("/auth/login");
        return skip;
    }
}
