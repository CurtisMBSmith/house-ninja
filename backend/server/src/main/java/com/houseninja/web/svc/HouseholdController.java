package com.houseninja.web.svc;

import com.houseninja.constants.HouseholdTypes;
import com.houseninja.db.dao.HouseholdDao;
import com.houseninja.db.gen.tables.daos.HouseholdsDao;
import com.houseninja.db.gen.tables.daos.HouseholdusersDao;
import com.houseninja.db.gen.tables.pojos.Households;
import com.houseninja.db.gen.tables.pojos.Householdusers;
import com.houseninja.sec.HouseninjaUserDetails;
import com.houseninja.web.svc.util.UserPrincipalUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
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
        HouseninjaUserDetails user = UserPrincipalUtil.getUserPrincipal();

        Householdusers userHousehold = householdUserDao.fetchOneByUserid(user.getId());

        if (userHousehold == null) {
            return null;
        }

        List<Households> households = householdDao.fetchById(userHousehold.getHouseholdid());

        Households foundHousehold = households.isEmpty() ? null : households.get(0);
        if (foundHousehold != null) {
            user.setHouseholdId(foundHousehold.getId());
        }

        return foundHousehold;
    }

    @RequestMapping(value = BASE_PATH + "/create", method = RequestMethod.POST)
    public Households createHousehold(@RequestBody Households household) {
        HouseninjaUserDetails user = UserPrincipalUtil.getUserPrincipal();

        household.setId(null);

        OffsetDateTime now = OffsetDateTime.now();
        household.setCreatedat(now);
        household.setUpdatedat(now);
        household.setCreatedby(user.getId());
        household.setType(HouseholdTypes.Family.toString());

        Households created = householdDao.createReturningId(household);

        householdUserDao.insert(new Householdusers().setCreatedat(now)
            .setUpdatedat(now)
            .setHouseholdid(created.getId())
            .setUserid(user.getId()));

        // Update the user session with the household id.
        user.setHouseholdId(created.getId());

        return created;
    }
}
