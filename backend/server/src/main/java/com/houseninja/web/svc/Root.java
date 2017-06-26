package com.houseninja.web.svc;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Root {

    @RequestMapping(value = "/a", method = RequestMethod.GET)
    public String getRoot() {
        return "Root";
    }
}
