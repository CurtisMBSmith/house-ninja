CREATE TABLE public."Users"
(
  id BIGSERIAL PRIMARY KEY,
  email character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  "givenName" character varying(50),
  surname character varying(50),
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Users_email_key" UNIQUE (email)
);

CREATE TABLE public."Households"
(
  id BIGSERIAL PRIMARY KEY,
  name character varying(255) NOT NULL,
  type character varying(255) NOT NULL,
  lat double precision,
  "long" double precision,
  --"locGran" "enum_Households_locGran",
  "createdBy" integer,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "Households_createdBy_fkey" FOREIGN KEY ("createdBy")
      REFERENCES public."Users" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE public."HouseholdUsers"
(
  "userId" BIGSERIAL NOT NULL,
  "householdId" BIGSERIAL NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone NOT NULL,
  CONSTRAINT "HouseholdUsers_pkey" PRIMARY KEY ("userId"),
  CONSTRAINT "HouseholdUsers_householdId_fkey" FOREIGN KEY ("householdId")
      REFERENCES public."Households" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "HouseholdUsers_userId_fkey" FOREIGN KEY ("userId")
      REFERENCES public."Users" (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "HouseholdUsers_userId_householdId_key" UNIQUE ("userId", "householdId")
);
