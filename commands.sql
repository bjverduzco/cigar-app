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

-- populating brands
INSERT INTO cigars (brand) VALUES
('5 Vegas'),
('A.J. Fernandez'),
('AVO'),
('Acid'),
('Aging Room'),
('Alec Bradley'),
('El Aroma'),
('El Aroma de Cuba'),
('Arturo Fuente'),
('Ashton Cigars'),
('Augusto Reyes'),
('La Aurora'),
('Bolivar'),
('CAO'),
('Cain'),
('Camacho'),
('Carlos Torano'),
('Cifuentes'),
('Cohiba'),
('La Corona'),
('Cuban Crafters'),
('Davidoff'),
('Diesel'),
('Don Pepin Garcia'),
('Dunhill'),
('Dutch Masters'),
('Excalibur'),
('Flor de las Antillas'),
('La Flor de Cuba'),
('Fonseca'),
('Fuente'),
('La Gloria Cubana'),
('Gran Habano'),
('Gurkha'),
('H. Upmann'),
('Habana'),
('La Habanera'),
('Hacienda Veracruz'),
('Henry Clay'),
('La Herencia de Cuba'),
('Heritage'),
('Hoyo de Monterrey'),
('Java'),
('Joya de Havana'),
('Joya de Nicaragua'),
('Liga Privada'),
('Macanudo'),
('Maker\'s Mark'),
('Man O\' War'),
('Montecristo'),
('My Father'),
('Natural Cigars'),
('Nat Sherman'),
('Oliva'),
('Padron'),
('Partagas'),
('Perdomo'),
('Punch'),
('Quorom'),
('Rocky Patel'),
('Saint Luis Rey'),
('San Miguel'),
('Sancho Panza'),
('Siglo'),
('Tatiana'),
('Tatuaje'),
('Te Amo'),
('Torano'),
('Vegafina');


-- countries
'Brazil', 'Barbados', 'Cameroon', 'Costa Rica' 'Cuba', 'Dominican Republic', 'Holland',
'Honduras', 'Indonesia', 'Italy', 'Jamaica', 'Mexico', 'Ecuador', 'Nicaragua', 'Panama',
'Peru', 'Philippines', 'Puerto Rico', 'Canary Islands(Spain)', 'United States'


-- Wrappers and descriptions
Candela(Double Claro)
-very light, slightly greenish. Achieved by picking leaves before maturity and drying quickly, the color coming from retained green chlorophyll
Claro
-very light tan or yellowish
Colorado Claro
-medium brown
Colorado(Rosado)
-	reddish-brown
Colorado Maduro
-	darker brown
Maduro
-very dark brown
Oscuro(Double Maduro)
-black
-- wrappper countries
'Cuba', 'Ecuador', 'Indonesia', 'Honduras', 'Nicaragua', 'Costa Rica', 'Brazil',
'Mexico', 'Cameroon', 'United States'
