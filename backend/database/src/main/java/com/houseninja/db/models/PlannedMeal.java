package com.houseninja.db.models;

import com.houseninja.db.gen.tables.pojos.Plannedmeals;

import java.util.LinkedList;
import java.util.List;

public class PlannedMeal extends Plannedmeals {

    public PlannedMeal(Plannedmeals meal) {
        this.setCreatedAt(meal.getCreatedAt());
        this.setDay(meal.getDay());
        this.setHouseholdId(meal.getHouseholdId());
        this.setId(meal.getId());
        this.setType(meal.getType());
        this.setUpdatedAt(meal.getUpdatedAt());
    }

    private List<PlannedMealItem> plannedMealItems = new LinkedList<>();

    public List<PlannedMealItem> getPlannedMealItems() {
        return plannedMealItems;
    }

    public PlannedMeal setPlannedMealItems(List<PlannedMealItem> plannedMealItems) {
        this.plannedMealItems = plannedMealItems;
        return this;
    }
}
