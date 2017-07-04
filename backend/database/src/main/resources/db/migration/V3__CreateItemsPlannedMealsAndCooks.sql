CREATE TABLE public."Items"
(
  ID                BIGSERIAL,
  DESCRIPTION       character varying(255) NOT NULL,
  -- Nullable to allow for some general, non-household-specific items.
  HOUSEHOLD_ID      BIGINT,
  CREATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  UPDATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT        "Items_pkey" PRIMARY KEY (ID),
  CONSTRAINT        "Items_householdId_fkey" FOREIGN KEY (HOUSEHOLD_ID)
      REFERENCES    public."Households" (ID) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE public."PlannedCooks"
(
  ID                BIGSERIAL,
  HOUSEHOLD_ID      BIGINT NOT NULL,
  ITEM_ID           BIGINT NOT NULL,
  DAY               DATE NOT NULL,
  COOK_TIME_MINS    INTEGER,
  NUM_SERVINGS      SMALLINT,
  COMPLETED         BOOLEAN DEFAULT false,
  CREATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  UPDATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT        "PlannedCooks_pkey" PRIMARY KEY (ID),
  CONSTRAINT        "PlannedCooks_householdId_fkey" FOREIGN KEY (HOUSEHOLD_ID)
      REFERENCES    public."Households" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT        "PlannedCooks_itemId_fkey" FOREIGN KEY (ITEM_ID)
      REFERENCES    public."Items" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE public."PlannedMeals"
(
  ID                BIGSERIAL,
  TYPE              varchar(30) NOT NULL,
  DAY               DATE NOT NULL,
  HOUSEHOLD_ID      BIGINT NOT NULL,
  CREATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  UPDATED_AT        timestamp with time zone NOT NULL DEFAULT NOW(),
  CONSTRAINT        "PlannedMeals_pkey" PRIMARY KEY (id),
  CONSTRAINT        "PlannedMeals_householdId_fkey" FOREIGN KEY (HOUSEHOLD_ID)
      REFERENCES    public."Households" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

CREATE TABLE public."PlannedMealItems"
(
  ID                BIGSERIAL,
  PLANNED_MEAL_ID   BIGINT NOT NULL,
  ITEM_ID           BIGINT NOT NULL,
  CREATED_AT        timestamp with time zone NOT NULL,
  UPDATED_AT        timestamp with time zone NOT NULL,
  CONSTRAINT        "PlannedMealItems_pkey" PRIMARY KEY (ID),
  CONSTRAINT        "PlannedMealItems_itemId_fkey" FOREIGN KEY (ITEM_ID)
      REFERENCES    public."Items" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT        "PlannedMealItems_plannedMealId_fkey" FOREIGN KEY (PLANNED_MEAL_ID)
      REFERENCES    public."PlannedMeals" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT        "PlannedMealItems_plannedMealId_itemId_key" UNIQUE (PLANNED_MEAL_ID, ITEM_ID)
);

CREATE TABLE public."UserPlannedMealItems"
(
  ID                BIGSERIAL,
  PLANNED_MEAL_ITEM_ID  BIGINT NOT NULL,
  USER_ID           BIGINT NOT NULL,
  CREATED_AT        timestamp with time zone NOT NULL,
  UPDATED_AT        timestamp with time zone NOT NULL,
  CONSTRAINT        "UserPlannedMeals_pkey" PRIMARY KEY (ID),
  CONSTRAINT        "UserPlannedMealItems_plannedMealItemId_fkey" FOREIGN KEY (PLANNED_MEAL_ITEM_ID)
      REFERENCES    public."PlannedMealItems" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT        "UserPlannedMeals_userId_fkey" FOREIGN KEY (USER_ID)
      REFERENCES    public."Users" (id) MATCH SIMPLE
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  CONSTRAINT        "UserPlannedMealItems_plannedMealItemId_userId_key" UNIQUE (PLANNED_MEAL_ITEM_ID, USER_ID)
);
