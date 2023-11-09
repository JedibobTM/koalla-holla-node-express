CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200),
	"age" DATE,
	"gender" INTEGER,
	"transfer_status" BOOLEAN,
	"notes" VARCHAR(500)
);

INSERT INTO "koalas"
	("name", "age", "gender", "transfer_status", "notes")
	VALUES
	('Jacob', 134, 'M', true, 'unhinged'),
	('Evan', 33, 'F', true, 'so handsome'),
	('Christian', 21, 'M', true, 'referred to as the infamous poncho hooch'),
	('James', 56, 'attack-helicopter', false, 'likes yelling and baked beans on toast'),
	('Hannah', 23, 'F', false, 'referred to as white mystery');

SELECT * FROM "koalas"