ALTER TABLE public."Households" ALTER COLUMN "createdBy" TYPE BIGINT;

ALTER TABLE public."HouseholdUsers" ALTER COLUMN "userId" TYPE BIGINT;
ALTER TABLE public."HouseholdUsers" ALTER COLUMN "householdId" TYPE BIGINT;
