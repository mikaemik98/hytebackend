/*M!999999\- enable the sandbox mode */
-- MariaDB dump 10.19-11.5.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: HealthDiary
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */
;

--
-- Table structure for table `body_measurements`
--

DROP TABLE IF EXISTS `body_measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `body_measurements` (
    `measurement_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `measurement_date` date NOT NULL,
    `waist_cm` decimal(5, 2) DEFAULT NULL,
    `chest_cm` decimal(5, 2) DEFAULT NULL,
    PRIMARY KEY (`measurement_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `body_measurements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `body_measurements`
--

LOCK TABLES `body_measurements` WRITE;
/*!40000 ALTER TABLE `body_measurements` DISABLE KEYS */
;
INSERT INTO
    `body_measurements`
VALUES (
        2,
        1,
        '2026-01-20',
        85.00,
        96.00
    ),
    (
        3,
        1,
        '2026-02-10',
        83.00,
        98.00
    );
/*!40000 ALTER TABLE `body_measurements` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `diaryentries`
--

DROP TABLE IF EXISTS `diaryentries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `diaryentries` (
    `entry_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) DEFAULT NULL,
    `entry_date` date NOT NULL,
    `mood` varchar(50) DEFAULT NULL,
    `weight` decimal(5, 2) DEFAULT NULL,
    `sleep_hours` int(11) DEFAULT NULL,
    `notes` text DEFAULT NULL,
    `created_at` datetime DEFAULT current_timestamp(),
    PRIMARY KEY (`entry_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `diaryentries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `diaryentries`
--

LOCK TABLES `diaryentries` WRITE;
/*!40000 ALTER TABLE `diaryentries` DISABLE KEYS */
;
INSERT INTO
    `diaryentries`
VALUES (
        3,
        1,
        '2024-01-11',
        'Tired',
        70.20,
        6,
        'Long day at work, need rest',
        '2024-01-11 20:00:00'
    ),
    (
        4,
        2,
        '2024-01-10',
        'Stressed',
        65.00,
        7,
        'Busy day, a bit stressed out',
        '2024-01-10 21:00:00'
    ),
    (
        5,
        1,
        '2026-01-20',
        'Felt energetic',
        90.00,
        8,
        'Good day',
        '2026-01-26 15:32:11'
    ),
    (
        6,
        1,
        '2026-01-21',
        'Felt fatigued',
        90.20,
        6,
        'Rough day',
        '2026-01-26 15:32:11'
    );
/*!40000 ALTER TABLE `diaryentries` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `goals` (
    `goal_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `goal_type` varchar(50) NOT NULL,
    `target_value` decimal(6, 2) DEFAULT NULL,
    `current_value` decimal(6, 2) DEFAULT NULL,
    `target_date` date DEFAULT NULL,
    `status` varchar(20) DEFAULT 'active',
    PRIMARY KEY (`goal_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */
;
INSERT INTO
    `goals`
VALUES (
        1,
        1,
        'incline_bench',
        60.00,
        50.00,
        '2026-01-01',
        'active'
    ),
    (
        2,
        1,
        'hack_squat',
        80.00,
        70.00,
        '2026-01-01',
        '¨completed'
    );
/*!40000 ALTER TABLE `goals` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `users` (
    `user_id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    `created_at` datetime DEFAULT current_timestamp(),
    `user_level` varchar(10) DEFAULT 'regular',
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO
    `users`
VALUES (
        1,
        'johndoe',
        'temp-pw-1',
        'johndoe@example.com',
        '2024-01-02 10:00:00',
        'admin'
    ),
    (
        2,
        'janedoe',
        'temp-pw-2',
        'janedoe@example.com',
        '2026-01-26 13:51:08',
        'admin'
    ),
    (
        3,
        'mike_smith',
        'temp-pw-3',
        'mike@example.com',
        '2026-01-26 13:51:08',
        'moderator'
    ),
    (
        4,
        'mikael',
        'password1',
        'mikael@example.com',
        '2026-01-26 15:16:24',
        'regular'
    );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `workout_log`
--

DROP TABLE IF EXISTS `workout_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!40101 SET character_set_client = utf8 */
;
CREATE TABLE `workout_log` (
    `workout_id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `workout_date` date NOT NULL,
    `exercise` varchar(100) NOT NULL,
    `sets` int(11) DEFAULT NULL,
    `reps` int(11) DEFAULT NULL,
    `weight_kg` decimal(5, 2) DEFAULT NULL,
    `notes` text DEFAULT NULL,
    PRIMARY KEY (`workout_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `workout_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `workout_log`
--

LOCK TABLES `workout_log` WRITE;
/*!40000 ALTER TABLE `workout_log` DISABLE KEYS */
;
INSERT INTO
    `workout_log`
VALUES (
        1,
        1,
        '2026-01-20',
        'Incline Bench',
        3,
        8,
        45.00,
        'Felt good'
    ),
    (
        2,
        1,
        '2026-01-21',
        'Hack Squat',
        3,
        7,
        70.00,
        'Last set to failure'
    );
/*!40000 ALTER TABLE `workout_log` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */
;

-- Dump completed on 2026-01-26 15:33:05