CREATE TABLE "tags" (
  "id" serial PRIMARY KEY,
  "name" varchar(100),
  "slug" varchar(100)
);


INSERT INTO "tags"("name", "slug") VALUES ('python','python'),('flask','flask');


CREATE TABLE "posts" (
  "id" serial PRIMARY KEY,
  "title" varchar(140),
  "slug" varchar(140) UNIQUE,
  "body" text,
  "created" timestamp
);


INSERT INTO "posts"("title", "slug", "body", "created") VALUES ('First post','First-post','First post body','2020-11-11 01:11:40'),('Second post','Second-post','Second post body','2020-11-11 01:11:40'),('Third post! 3-test','Third-post--3-test','Third post body','2020-11-11 01:11:40'),('Fifth 5 post','Fifth-5-post','5 post','2020-11-11 17:58:51'),('6 post','6-post','Six post','2020-11-11 18:05:31'),('seven post rev. 2','seven-post','seven post','2020-11-11 18:05:31'),('8 post','8-post','8 post','2020-11-11 18:05:31'),('9 post','9-post','post # 9','2020-11-11 18:05:31'),('10 post','10-post','post 10','2020-11-11 18:05:31'),('11 post','11-post','11 post','2020-11-11 18:05:31'),('12 post','12-post','12 post','2020-11-11 18:05:31'),('13 post','13-post','13 post','2020-11-11 18:05:31'),('New title gen patch','New-title-gen','body','2020-11-12 00:49:02'),('Test patch blog v2 v3','Test-patch-blog','Test patch blog body','2020-11-24 00:53:36'),('Swagger','Swagger','Hello, Swagger!','2020-11-24 17:20:28'),('1','1','2','2020-11-25 00:55:49'),('2','2','3','2020-11-25 00:56:14');


CREATE TABLE "comments" (
  "id" serial PRIMARY KEY,
  "post_id" int NOT NULL REFERENCES posts(id),
  "name" varchar(140),
  "body" text,
  "created" timestamp,
  "email" varchar(100)
);


INSERT INTO "comments"("post_id", "name", "body", "created", "email") VALUES (1,'Admin','Great!','2020-11-23 22:05:52','admin@mail.ru'),(2,'test','test','2020-11-23 23:53:40','test'),(3,'New comm','New comm body','2020-11-25 00:11:20','admin@mail.ru'),(4,'test','nest boby','2020-11-25 00:14:36','Test@mail.ru'),(2,'test','rest','2020-11-25 00:24:33','anastasia@mail.ru');


CREATE TABLE "posts_tags" (
  "id" serial PRIMARY KEY,
  "post_id" int NOT NULL REFERENCES posts(id),
  "tag_id" int NOT NULL REFERENCES tags(id)
);