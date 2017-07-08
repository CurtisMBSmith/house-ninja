package com.houseninja.web.svc;

import com.houseninja.db.dao.PlannedCookDao;
import com.houseninja.db.gen.tables.pojos.Plannedcooks;
import com.houseninja.sec.HouseninjaUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@RestController
public class PlannedCookController {

    private static final String BASE_PATH = "/cook";

    @Autowired
    private PlannedCookDao plannedCookDao;

    @RequestMapping(value = BASE_PATH + "/retrieve/{day}", method = RequestMethod.GET)
    public List<Plannedcooks> fetchPlannedCooks(@PathVariable(value = "day") String day) {
        Long userHouseholdId = ((HouseninjaUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getHouseholdId();
        if (userHouseholdId == null) {
            return Collections.emptyList();
        }

        LocalDate localDay = LocalDate.parse(day, DateTimeFormatter.ISO_DATE);
        return plannedCookDao.retrieve(localDay, userHouseholdId);
    }
}
