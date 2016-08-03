-- creating the users table

CREATE TABLE "public"."Users" (
    "id" serial,
    "username" text NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("username")
);

-- creating the cigars TABLE
CREATE TABLE "public"."Cigars" (
    "id" serial,
    "brand" text NOT NULL,
    "name" text NOT NULL,
    "origin" text,
    "filer" text,
    "body" text,
    PRIMARY KEY ("id"),
    UNIQUE ("name")
);

-- creating the ratings TABLE
CREATE TABLE "public"."Ratings" (
    "id" serial,
    "cigar_id" serial NOT NULL,
    "user_id" serial NOT NULL,
    "date" date NOT NULL,
    "rating" integer NOT NULL,
    "pictures" bytea,
    "size" double precision,
    "gauge" integer,
    "taste" text,
    "draw" text,
    "condition" text,
    "pairing" text,
    "comments" text,
    PRIMARY KEY ("id"),
    CONSTRAINT "cigar_id" FOREIGN KEY ("cigars_id") REFERENCES "public"."Cigars"("id"),
    CONSTRAINT "user_id" FOREIGN KEY ("users_id") REFERENCES "public"."Users"("id")
);

-- creating the users-cigars TABLE
CREATE TABLE "public"."Users-Cigars" (
    "id" serial,
    "user_id" serial NOT NULL,
    "cigar_id" serial NOT NULL,
    "date" date NOT NULL,
    "quantity" integer NOT NULL,
    "size" integer,
    "gauge" double precision,
    "condition" text,
    PRIMARY KEY ("id"),
    CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id"),
    CONSTRAINT "cigar_id" FOREIGN KEY ("cigar_id") REFERENCES "public"."Cigars"("id")
);

-- creating the hygrometer TABLE
CREATE TABLE "public"."Hygrometer" (
    "id" serial,
    "user_id" serial NOT NULL,
    "name" text NOT NULL,
    "temperature" double precision NOT NULL,
    "humidity" double precision NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id")
);
