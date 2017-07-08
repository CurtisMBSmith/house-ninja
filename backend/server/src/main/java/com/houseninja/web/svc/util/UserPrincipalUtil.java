package com.houseninja.web.svc.util;

import com.houseninja.sec.HouseninjaUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserPrincipalUtil {

    private UserPrincipalUtil() {
        throw new RuntimeException("Do not instantiate.");
    }

    public static HouseninjaUserDetails getUserPrincipal() {
        return (HouseninjaUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
