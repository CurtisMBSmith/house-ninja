package com.houseninja.db.models;

import com.houseninja.db.gen.tables.pojos.Items;
import com.houseninja.db.gen.tables.pojos.Plannedmealitems;
import com.houseninja.db.gen.tables.pojos.Plannedmeals;
import com.houseninja.db.gen.tables.pojos.Userplannedmealitems;

import java.util.List;

public class PlannedMealItem extends Plannedmealitems {

    private Items item;
    private Plannedmeals plannedMeal;
    private List<UserPlannedMealItems> userplannedmealitems;

    public PlannedMealItem(Plannedmealitems plannedMealItems) {
        this.setCreatedAt(plannedMealItems.getCreatedAt());
        this.setId(plannedMealItems.getId());
        this.setItemId(plannedMealItems.getItemId());
        this.setPlannedMealId(plannedMealItems.getPlannedMealId());
        this.setUpdatedAt(plannedMealItems.getUpdatedAt());
    }

    public Items getItem() {
        return item;
    }

    public PlannedMealItem setItem(Items item) {
        this.item = item;
        return this;
    }

    public Plannedmeals getPlannedMeal() {
        return plannedMeal;
    }

    public PlannedMealItem setPlannedMeal(Plannedmeals plannedMeal) {
        this.plannedMeal = plannedMeal;
        return this;
    }

    public List<UserPlannedMealItems> getUserplannedmealitems() {
        return userplannedmealitems;
    }

    public PlannedMealItem setUserplannedmealitems(List<UserPlannedMealItems> userplannedmealitems) {
        this.userplannedmealitems = userplannedmealitems;
        return this;
    }
}
