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
('other')
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

-- populating all brands with name 'other'
UPDATE cigars SET name = 'other';


--getting the whole cigar TABLE
SELECT * FROM cigars;

--cigars and brand and name and body and wrapper color
SELECT cigars.id, brand.brand, cigars.name, body.name as body, wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description
FROM cigars
LEFT OUTER JOIN body ON cigars.body_id = body.id
LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id
LEFT OUTER JOIN brand ON cigars.brand_id = brand.id;

--origin and country
SELECT origin.id, country.country as origin_country
FROM country
RIGHT OUTER JOIN origin ON country.id = origin.country_id;

--cigarId brand name body originCountry wrapperColorName wrapperColorDescription wrapperCountry
SELECT cigars.id, brand.brand, cigars.name, body.name as body, wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, country.country as origin_country, wrapper.country as wrapper_country
FROM cigars
LEFT OUTER JOIN body ON cigars.body_id = body.id
LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id
LEFT OUTER JOIN brand ON cigars.brand_id = brand.id
LEFT OUTER JOIN origin ON cigars.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id
LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id
;

--insert one cigar in postico
INSERT INTO cigars (brand_id, name, body_id, origin_id, wrapper_color_id, wrapper_country_id) VALUES
((SELECT id FROM brand WHERE brand = 'AVO'),
'test',
(SELECT id FROM wrapper_color WHERE name = 'Claro'),
(SELECT origin.id FROM origin LEFT JOIN country ON origin.country_id = country.id WHERE country = 'Brazil'),
(SELECT wrapper_color.id FROM wrapper_color WHERE wrapper_color.name = 'Claro'),
(SELECT wrapper_country.id FROM wrapper_country LEFT JOIN country as c ON wrapper_country.country_id = c.id WHERE country = 'Dominican Republic'));


INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = '5 Vegas'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'A.J. Fernandez'), 'other'),
((SELECT id FROM brand WHERE brand = 'AVO'), 'other'),
((SELECT id FROM brand WHERE brand = 'Acid'), 'other'),
((SELECT id FROM brand WHERE brand = 'Aging Room'), 'other'),
((SELECT id FROM brand WHERE brand = 'Alec Bradley'), 'other'),
((SELECT id FROM brand WHERE brand = 'El Aroma'), 'other'),
((SELECT id FROM brand WHERE brand = 'El Aroma de Cuba'), 'other'),
((SELECT id FROM brand WHERE brand = 'Arturo Fuente'), 'other'),
((SELECT id FROM brand WHERE brand = 'Ashton Cigars'), 'other'),
((SELECT id FROM brand WHERE brand = 'Augusto Reyes'), 'other'),
((SELECT id FROM brand WHERE brand = 'La Aurora'), 'other'),
((SELECT id FROM brand WHERE brand = 'Bolivar'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'CAO'), 'other'),
((SELECT id FROM brand WHERE brand = 'Cain'), 'other'),
((SELECT id FROM brand WHERE brand = 'Camacho'), 'other'),
((SELECT id FROM brand WHERE brand = 'Carlos Torano'), 'other'),
((SELECT id FROM brand WHERE brand = 'Cifuentes'), 'other'),
((SELECT id FROM brand WHERE brand = 'Cohiba'), 'other'),
((SELECT id FROM brand WHERE brand = 'La Corona'), 'other'),
((SELECT id FROM brand WHERE brand = 'Cuban Crafters'), 'other'),
((SELECT id FROM brand WHERE brand = 'Davidoff'), 'other'),
((SELECT id FROM brand WHERE brand = 'Diesel'), 'other'),
((SELECT id FROM brand WHERE brand = 'Don Pepin Garcia'), 'other'),
((SELECT id FROM brand WHERE brand = 'Dunhill'), 'other'),
((SELECT id FROM brand WHERE brand = 'Dutch Masters'), 'other'),
((SELECT id FROM brand WHERE brand = 'Excalibur'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'Flor de las Antillas'), 'other'),
((SELECT id FROM brand WHERE brand = 'La Flor de Cuba'), 'other'),
((SELECT id FROM brand WHERE brand = 'Fonseca'), 'other'),
((SELECT id FROM brand WHERE brand = 'Fuente'), 'other'),
((SELECT id FROM brand WHERE brand = 'La Gloria Cubana'), 'other'),
((SELECT id FROM brand WHERE brand = 'Gran Habano'), 'other'),
((SELECT id FROM brand WHERE brand = 'Gurkha'), 'other'),
((SELECT id FROM brand WHERE brand = 'H. Upmann'), 'other'),
((SELECT id FROM brand WHERE brand = 'Habana'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'La Habanera'), 'other'),
((SELECT id FROM brand WHERE brand = 'Hacienda Veracruz'), 'other'),
((SELECT id FROM brand WHERE brand = 'Henry Clay'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'La Herencia de Cuba'), 'other'),
((SELECT id FROM brand WHERE brand = 'Heritage'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'Hoyo de Monterrey'), 'other'),
((SELECT id FROM brand WHERE brand = 'Java'), 'other'),
((SELECT id FROM brand WHERE brand = 'Joya de Havana'), 'other'),
((SELECT id FROM brand WHERE brand = 'Joya de Nicaragua'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'Liga Privada'), 'other'),
((SELECT id FROM brand WHERE brand = 'Macanudo'), 'other'),
((SELECT id FROM brand WHERE brand = 'Maker''s Mark'), 'other'),
((SELECT id FROM brand WHERE brand = 'Man O'' War'), 'other'),
((SELECT id FROM brand WHERE brand = 'Montecristo'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'My Father'), 'other'),
((SELECT id FROM brand WHERE brand = 'Natural Cigars'), 'other'),
((SELECT id FROM brand WHERE brand = 'Nat Sherman'), 'other'),
((SELECT id FROM brand WHERE brand = 'Oliva'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'other'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'Padron'), 'other'),
((SELECT id FROM brand WHERE brand = 'Partagas'), 'other'),
((SELECT id FROM brand WHERE brand = 'Perdomo'), 'other'),
((SELECT id FROM brand WHERE brand = 'Punch'), 'other'),
((SELECT id FROM brand WHERE brand = 'Quorom'), 'other');
INSERT INTO cigars (brand_id, name) VALUES
((SELECT id FROM brand WHERE brand = 'Rocky Patel'), 'other'),
((SELECT id FROM brand WHERE brand = 'Saint Luis Rey'), 'other'),
((SELECT id FROM brand WHERE brand = 'San Miguel'), 'other'),
((SELECT id FROM brand WHERE brand = 'Sancho Panza'), 'other'),
((SELECT id FROM brand WHERE brand = 'Siglo'), 'other'),
((SELECT id FROM brand WHERE brand = 'Tatiana'), 'other'),
((SELECT id FROM brand WHERE brand = 'Tatuaje'), 'other'),
((SELECT id FROM brand WHERE brand = 'Te Amo'), 'other'),
((SELECT id FROM brand WHERE brand = 'Torano'), 'other'),
((SELECT id FROM brand WHERE brand = 'Vegafina'), 'other');

SELECT body.id, body.name, wrapper_color.id, wrapper_color.name wrapper_color.description, country.id, country.country as origin_country, wrapper.country as wrapper_country
FROM body
JOIN wrapper_color
JOIN brand ON cigars.brand_id = brand.id
LEFT OUTER JOIN origin ON cigars.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id
LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id;


SELECT sizes.id, sizes.number, gauges.id, gauges.number FROM sizes, gauges;

--arrayList query
SELECT gauges.id as id, gauges.number as gauge_number, sizes.number as sizes_number, wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, wrapper_country.country_id as wrapper_country_id, country.country as wrapper_country, c.country as all_country, filler.country_id as filler_country_id, c_f.country as filler_country, c_o.id as origin_country_id, c_o.country as origin_country, body.name as body
FROM gauges
FULL OUTER JOIN sizes ON gauges.id = sizes.id
FULL OUTER JOIN wrapper_color ON gauges.id = wrapper_color.id
FULL OUTER JOIN wrapper_country ON gauges.id = wrapper_country.id
LEFT JOIN country ON wrapper_country.country_id = country.id
FULL OUTER JOIN country as c ON gauges.id = c.id
FULL OUTER JOIN filler ON gauges.id = filler.id
LEFT JOIN country as c_f ON filler.country_id = c_f.id
FULL OUTER JOIN origin ON gauges.id = origin.id
LEFT JOIN country as c_o ON origin.country_id = c_o.id
FULL OUTER JOIN	body ON gauges.id = body.id
ORDER BY id;

--cigars with all the fields
SELECT cigars.id, brand.brand, cigars.name, body.name as body,
wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description,
country.country as origin_country, wrapper.country as wrapper_country, c_f.country as filler_country
FROM cigars
LEFT OUTER JOIN body ON cigars.body_id = body.id
LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id
LEFT OUTER JOIN brand ON cigars.brand_id = brand.id
LEFT OUTER JOIN origin ON cigars.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id
LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id
LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id
LEFT JOIN filler ON filler_combo.filler_id = filler.id
LEFT JOIN country as c_f ON filler.country_id = c_f.id;

--filler_combo entry
INSERT INTO filler_combo (cigars_id, filler_id) VALUES
((SELECT cigars.id FROM cigars WHERE cigars.id = 253),
(SELECT filler.id FROM filler LEFT JOIN country ON filler.country_id = country.id WHERE country.country = 'Dominican Republic'));

--insert into users-cigars
--with id's
INSERT INTO users_cigars (user_id, cigars_id, date, quantity, sizes_id, gauges_id, condition, comments) VALUES
((1),
(253),
('08/12/2016'),
(7),
(12),
(19),
('Fake'),
('Some awesomely honest and true comment.'));
--with only certain attributes known
INSERT INTO users_cigars (user_id, cigars_id, date, quantity, sizes_id, gauges_id, condition, comments) VALUES
((SELECT users.id FROM users WHERE users.username = 'brian'),
(SELECT cigars.id FROM cigars LEFT JOIN brand ON cigars.brand_id = brand.id WHERE brand.brand = '5 Vegas' AND cigars.name = 'Classic'),
('08/12/2016'),
(7),
(SELECT sizes.id FROM sizes WHERE sizes.id = '12'),
(SELECT gauges.id FROM gauges WHERE gauges.number = '54'),
('Fake'),
('Some awesomely honest and true comment.'));

--users-cigars select
SELECT users_cigars.id, users_cigars.cigars_id, users_cigars.users_id, brand.brand, cigars.name, body.name as body,
wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description,
country.country as origin_country, wrapper.country as wrapper_country,
c_f.country as filler_country
FROM users_cigars
LEFT JOIN users ON users_cigars.users_id = users.id
LEFT JOIN cigars ON users_cigars.cigars_id = cigars.id
LEFT OUTER JOIN body ON cigars.body_id = body.id
LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id
LEFT OUTER JOIN brand ON cigars.brand_id = brand.id
LEFT OUTER JOIN origin ON cigars.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id
LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id
LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id
LEFT JOIN filler ON filler_combo.filler_id = filler.id
LEFT JOIN country as c_f ON filler.country_id = c_f.id
ORDER BY cigars.id;

--insert into ratings knowing id's
INSERT INTO ratings (cigars_id, users_id, date, rating, sizes_id, gauges_id, taste, draw, condition, pairing, comments) VALUES
((99),
(1),
('08-08-2016'),
(7),
(11),
(17),
('Smooth'),
('Smooth'),
('New'),
('Middleton'),
('Scotchity, Scotch, Scotch'));

--ratings select
SELECT ratings.id, ratings.cigars_id, ratings.users_id, brand.brand, cigars.name, body.name as body,
wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description,
country.country as origin_country, wrapper.country as wrapper_country,
c_f.country as filler_country
FROM ratings
LEFT JOIN users ON ratings.users_id = users.id
LEFT JOIN cigars ON ratings.cigars_id = cigars.id
LEFT OUTER JOIN body ON cigars.body_id = body.id
LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id
LEFT OUTER JOIN brand ON cigars.brand_id = brand.id
LEFT OUTER JOIN origin ON cigars.origin_id = origin.id
LEFT JOIN country ON origin.country_id = country.id
LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id
LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id
LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id
LEFT JOIN filler ON filler_combo.filler_id = filler.id
LEFT JOIN country as c_f ON filler.country_id = c_f.id
ORDER BY cigars.id;

--insert into hygrometer knowing id's
INSERT INTO hygrometer (users_id, name, temperature_min, temperature_max, humidity_min, humidity_max, location, display) VALUES
((1),
('small humidor'),
(65),
(80),
(67),
(77),
('desk drawer'),
(false));

--hygrometer list select
SELECT hygrometer.id, users.id as users_id, users.username, hygrometer.name, hygrometer.temperature_min, hygrometer.temperature_max, hygrometer.humidity_min, hygrometer.humidity_max, hygrometer.location, hygrometer.display
FROM hygrometer
LEFT JOIN users ON hygrometer.users_id = users.id;

--insert new cigar and add to users_cigars
WITH new AS (INSERT INTO cigars (brand_id, name, body_id, wrapper_color_id,
wrapper_country_id, origin_id) VALUES ((1),('bleh'), (2), (2), (3), (2))
RETURNING id) INSERT INTO users_cigars (users_id, cigars_id, date, quantity,
sizes_id, gauges_id, condition, comments) VALUES (1, (SELECT new.id from new),
'08-13-2016', 3, 13, 13, 'work', 'please?');

--insert new brand, with other and users data
WITH newbrand AS (INSERT INTO brand (brand) VALUES ('test') returning id),
newcigar AS (INSERT INTO cigars(brand_id, name, body_id, wrapper_color_id,
wrapper_country_id, origin_id, filler_combo_id) VALUES ((SELECT newbrand.id FROM
newbrand), 'test', 5, 4, 5, 1, 2) returning id),
useful AS (INSERT INTO cigars(brand_id, name, body_id, wrapper_color_id,
wrapper_country_id, origin_id, filler_combo_id) VALUES ((SELECT newbrand.id FROM newbrand),
'other', null, null, null, null, null) returning id)
INSERT INTO users_cigars(users_id, cigars_id, date, quantity, sizes_id, gauges_id,
condition, comments) VALUES(1,(SELECT newcigar.id FROM newcigar), '09-14-2016', 3,
3, 3, 'like new', 'please work');

--update cigars and add to users_cigars
WITH updated AS (UPDATE cigars SET body_id = 3, wrapper_color_id = 3 WHERE cigars.name = 'bleh' RETURNING id) INSERT INTO users_cigars (users_id, cigars_id, date, quantity, sizes_id, gauges_id, condition, comments) VALUES (1, (SELECT updated.id FROM updated), '09-16-2016', 5, 5, 5, 'like new', 'bleh');
