package com.houseninja.web.svc;

import com.houseninja.constants.HouseholdTypes;
import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.gen.tables.daos.HouseholdsDao;
import com.houseninja.db.gen.tables.daos.HouseholdusersDao;
import com.houseninja.db.gen.tables.pojos.Households;
import com.houseninja.db.gen.tables.pojos.Householdusers;
import com.houseninja.sec.HouseninjaUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
public class HouseholdController {

    private static final String BASE_PATH = "/household";

    @Autowired
    private HouseholdDao householdDao;

    @Autowired
    private HouseholdusersDao householdUserDao;

    @RequestMapping(value = BASE_PATH + "/details", method = RequestMethod.GET)
    public Households retrieveHouseholdDetails() {
        HouseninjaUserDetails user = (HouseninjaUserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        Householdusers userHousehold = householdUserDao.fetchOneByUserid(user.getId());

        if (userHousehold == null) {
            return null;
        }

        List<Households> households = householdDao.fetchById(userHousehold.getHouseholdid());
        return households.isEmpty() ? null : households.get(0);
    }

    @RequestMapping(value = BASE_PATH + "/create", method = RequestMethod.POST)
    public Households createHousehold(@RequestBody Households household) {
        HouseninjaUserDetails user = (HouseninjaUserDetails) SecurityContextHolder.getContext().getAuthentication()
            .getPrincipal();

        household.setId(null);

        Instant now = Instant.now();
        household.setCreatedat(new Timestamp(now.toEpochMilli()));
        household.setUpdatedat(new Timestamp(now.toEpochMilli()));
        household.setCreatedby(user.getId());
        household.setType(HouseholdTypes.Family.toString());

        Households created = householdDao.createReturningId(household);

        householdUserDao.insert(new Householdusers().setCreatedat(new Timestamp(now.toEpochMilli()))
            .setUpdatedat(new Timestamp(now.toEpochMilli()))
            .setHouseholdid(created.getId())
            .setUserid(user.getId()));

        return created;
    }
}
