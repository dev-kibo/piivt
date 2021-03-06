
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `piivt` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `piivt`;
DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actor` (
  `actor_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`actor_id`),
  UNIQUE KEY `actor_actor_id_uindex` (`actor_id`),
  UNIQUE KEY `uq_actor__first_name_middle_name_last_name` (`first_name`,`middle_name`,`last_name`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (13,'Liam','','Neeson',0),(14,'Kurt','','Russell',0),(15,'Drew','','Barrymore',0),(16,'Tim','','Allen',0),(17,'Jennifer','','Aniston',0),(18,'Hugh','','Jackman',0),(19,'Jamie','Lee','Curtis',0),(20,'Tommy','Lee','Jones',0),(21,'Keanu','','Reeves',0),(22,'Vin','','Diesel',0),(23,'Dwayne','','Johnson',0),(24,'Bill','','Murray',0),(25,'Julia','','Roberts',0),(26,'James','Earl','Jones',0),(27,'Samuel','L.','Jackson',0),(28,'Bruce','','Willis',0),(29,'Will','','Smith',0);
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `password_hash` varchar(320) NOT NULL,
  `refresh_token` varchar(2048) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `admin_admin_id_uindex` (`admin_id`),
  KEY `ix_admin_email` (`email`),
  KEY `ix_admin_refresh_token` (`refresh_token`(768))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'bojan@example.com','$2b$11$0WdiISQx3DtVQ4bpPMSpRevFtnw1xxgn.tY1wDUujkJZGKATZd50q','94af135b2abf344d8e22c984b8c48eb52e024718f6743c206bd02e38fc0c75789c98ab70881a6675f6f581954f0dd7327ef263ae8c129b63fe89f53ad84e14cb','2021-06-08 20:11:10',0),(5,'test@example.com','$2b$11$fJ6d3xkqbRbWbe5ljVjyieqTog/BCusGe6.Juo23x2KCEjwui2Xse','b3387ee29907be2ee0be27d08a0ec54aa64c33b00c2a3dfd4e07286b054637891868daf75226a7624de13b551ad4a19a6b4508c2c11e4fae0473192e162d6912','2021-06-20 17:53:58',0);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cinema` (
  `cinema_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cinema_id`),
  UNIQUE KEY `cinema_cinema_id_uindex` (`cinema_id`),
  UNIQUE KEY `uq_cinema_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (35,'Cinema 1',0),(36,'Cinema 2',0),(37,'Cinema 3',0),(38,'Cinema 4',0),(39,'Cinema 5',0);
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `released_at` date NOT NULL,
  `poster_path` varchar(255) DEFAULT NULL,
  `duration` int(3) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `movie_movie_id_uindex` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (26,'Tenet','In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time. The mission: prevent Andrei Sator, a renegade Russian oligarch with precognition abilities, from starting World War III. The Protagonist will soon master the art of \"time inversion\" as a way of countering the threat that is to come.','2020-08-22','static/uploads/movies/26/77423635-db9a-4d39-afec-205f4bd47949.jpg',180,0),(27,'Bad Boys For Life','Marcus and Mike have to confront new issues (career changes and midlife crises), as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.','2020-01-07','static/uploads/movies/27/111e16fc-ed6f-4429-863b-85c37988b350.jpg',124,0),(28,'Fast & Furious 9','Cipher enlists the help of Jakob, Dom\'s younger brother to take revenge on Dom and his team.\n','2021-06-25','static/uploads/movies/28/16deb11f-ee11-4be3-80b9-4983fb2ac5af.jpg',245,0),(29,'A Quiet Place Part II','Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize the creatures that hunt by sound are not the only threats lurking beyond the sand path.','2020-03-08','static/uploads/movies/29/6309c3eb-ad7d-41b1-a9ad-c9b531a1626c.jpg',97,0),(30,'Godzilla vs. Kong','The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.','2021-03-24','static/uploads/movies/30/c18559a7-a2aa-44da-b8d8-375a443412ee.jpg',113,0),(31,'No Time to Die','James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.','2021-07-01','static/uploads/movies/31/597a4aa3-d4e3-42d1-9cfa-315925e49260.jpg',163,0);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `movie_actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie_actor` (
  `movie_actor_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`movie_actor_id`),
  UNIQUE KEY `movie_actor_movie_actor_id_uindex` (`movie_actor_id`),
  KEY `fk_movie_actor_actor_id` (`actor_id`),
  KEY `fk_movie_actor_movie_id` (`movie_id`),
  CONSTRAINT `fk_movie_actor_actor_id` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`actor_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_actor_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `movie_actor` WRITE;
/*!40000 ALTER TABLE `movie_actor` DISABLE KEYS */;
INSERT INTO `movie_actor` VALUES (68,'Protagonist',26,13,0),(69,'Driver',26,22,0),(70,'Neil',26,24,0),(71,'Kat',26,19,0),(72,'Mike',27,29,0),(73,'Marcus',27,26,0),(74,'Rafe',27,14,0),(75,'Kelly',27,25,0),(76,'Dominic Toretto',28,22,0),(77,'Cipher',28,17,0),(78,'Mia',28,15,0),(79,'Roman',28,21,0),(80,'Jakob',28,23,0),(81,'Evelyn',29,25,0),(82,'Lee ',29,18,0),(83,'Emmett',29,16,0),(84,'Regan',29,15,0),(85,'Nathan',30,28,0),(86,'Bernie Hayes',30,27,0),(87,'Illene Andrews',30,15,0),(88,'Madison Russell',30,19,0),(89,'James Bond',31,21,0),(90,'M',31,13,0),(91,'Paloma',31,17,0),(92,'Q',31,18,0);
/*!40000 ALTER TABLE `movie_actor` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `projection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projection` (
  `projection_id` int(11) NOT NULL AUTO_INCREMENT,
  `repertoire_id` int(11) NOT NULL,
  `starts_at` datetime NOT NULL,
  `ends_at` datetime NOT NULL,
  `cinema_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`projection_id`),
  KEY `fk_projection_cinema_id` (`cinema_id`),
  KEY `fk_projection_movie_id` (`movie_id`),
  KEY `fk_projection_repertoire_id` (`repertoire_id`),
  CONSTRAINT `fk_projection_cinema_id` FOREIGN KEY (`cinema_id`) REFERENCES `cinema` (`cinema_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_projection_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_projection_repertoire_id` FOREIGN KEY (`repertoire_id`) REFERENCES `repertoire` (`repertoire_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `projection` WRITE;
/*!40000 ALTER TABLE `projection` DISABLE KEYS */;
INSERT INTO `projection` VALUES (36,55,'2021-07-01 10:00:00','2021-07-01 13:25:00',35,26,0),(37,55,'2021-07-01 13:25:00','2021-07-01 17:55:00',35,28,0),(38,55,'2021-07-01 17:55:00','2021-07-01 21:03:00',38,31,0),(39,56,'2021-07-04 12:15:00','2021-07-04 14:17:00',35,29,0),(40,56,'2021-07-04 14:17:00','2021-07-04 18:47:00',39,28,0),(41,56,'2021-07-04 18:47:00','2021-07-04 21:55:00',36,31,0),(42,56,'2021-07-04 21:55:00','2021-07-05 02:25:00',35,28,0),(43,57,'2021-07-06 16:00:00','2021-07-06 19:25:00',39,26,0),(44,57,'2021-07-06 19:25:00','2021-07-06 21:27:00',39,29,0),(45,57,'2021-07-06 21:27:00','2021-07-07 00:52:00',35,26,0),(46,57,'2021-07-07 00:52:00','2021-07-07 05:22:00',38,28,0),(47,57,'2021-07-07 05:22:00','2021-07-07 07:40:00',39,30,0),(48,58,'2021-07-08 13:45:00','2021-07-08 16:03:00',35,30,0),(49,58,'2021-07-08 16:03:00','2021-07-08 18:05:00',35,29,0);
/*!40000 ALTER TABLE `projection` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `repertoire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `repertoire` (
  `repertoire_id` int(11) NOT NULL AUTO_INCREMENT,
  `show_at` date NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`repertoire_id`),
  UNIQUE KEY `uq_repertoire_date_at` (`show_at`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `repertoire` WRITE;
/*!40000 ALTER TABLE `repertoire` DISABLE KEYS */;
INSERT INTO `repertoire` VALUES (55,'2021-07-01',0),(56,'2021-07-04',0),(57,'2021-07-06',0),(58,'2021-07-08',0);
/*!40000 ALTER TABLE `repertoire` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

