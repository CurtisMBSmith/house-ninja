package com.houseninja.db.models;

import com.houseninja.db.gen.tables.pojos.Userplannedmealitems;
import com.houseninja.db.gen.tables.pojos.Users;

public class UserPlannedMealItems extends Userplannedmealitems {

    private Users user;
    private PlannedMealItem plannedMealItem;

    public UserPlannedMealItems(Userplannedmealitems userPlannedItems) {
        this.setCreatedAt(userPlannedItems.getCreatedAt());
        this.setId(userPlannedItems.getId());
        this.setPlannedMealItemId(userPlannedItems.getPlannedMealItemId());
        this.setUpdatedAt(userPlannedItems.getUpdatedAt());
        this.setUserId(userPlannedItems.getUserId());
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public PlannedMealItem getPlannedMealItem() {
        return plannedMealItem;
    }

    public void setPlannedMealItem(PlannedMealItem plannedMealItem) {
        this.plannedMealItem = plannedMealItem;
    }
}
