package com.houseninja.web.svc;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HouseholdController {

    private static final String BASE_PATH = "/household";
    @RequestMapping(value = BASE_PATH + "/details", method = RequestMethod.GET)
    public Long retrieveHouseholdDetails() {
        return 1L;
    }
}
