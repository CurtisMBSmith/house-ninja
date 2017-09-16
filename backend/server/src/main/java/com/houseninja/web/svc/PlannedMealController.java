package com.houseninja.web.svc;

import com.houseninja.db.dao.PlannedMealDao;
import com.houseninja.db.gen.tables.pojos.Plannedmeals;
import com.houseninja.util.TimeUtils;
import com.houseninja.web.svc.util.UserPrincipalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class PlannedMealController {

    private static final String BASE_PATH = "/meal";

    @Autowired
    private PlannedMealDao plannedMealDao;

    @RequestMapping(value = BASE_PATH + "/retrieve", method = RequestMethod.GET)
    public List<Plannedmeals> fetchPlannedCooks(@RequestParam(value = "startDay") String start, @RequestParam(value = "endDay") String end) {
        Long userHouseholdId = UserPrincipalUtil.getUserPrincipal().getHouseholdId();
        if (userHouseholdId == null) {
            return Collections.emptyList();
        }

        LocalDate startDay = LocalDate.parse(start, DateTimeFormatter.ISO_DATE);
        LocalDate endDay = LocalDate.parse(end, DateTimeFormatter.ISO_DATE);
        List<Plannedmeals> retrievedMeals = plannedMealDao.retrieve(startDay, endDay, userHouseholdId);

        // Ensure that the result has an entry for every day requested.
        Set<LocalDate> daysFound = retrievedMeals.stream().map(meal -> meal.getDay().toLocalDate()).collect(Collectors.toSet());
        Set<LocalDate> daysExpected = TimeUtils.localDateStream(startDay, endDay).collect(Collectors.toSet());

        daysExpected.removeAll(daysFound);
        retrievedMeals.addAll(daysExpected.stream().map(day -> new Plannedmeals().setDay(Date.valueOf(day))).collect(Collectors.toList()));

        return retrievedMeals;
    }
}
