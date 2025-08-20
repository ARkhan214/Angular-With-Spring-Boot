-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: mkbank
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_active_status` bit(1) NOT NULL,
  `account_closing_date` datetime(6) DEFAULT NULL,
  `account_opening_date` datetime(6) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `balance` double NOT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nid` varchar(17) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','USER') DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8vf3fb0dpwnwu3bt0jov7ile9` (`nid`),
  UNIQUE KEY `UKaien07q29q89wriyl53yj841h` (`phone_number`),
  UNIQUE KEY `UKe4w4av1wrhanry7t6mxt42nou` (`user_id`),
  CONSTRAINT `FKf5vyi6yktkuwkfot8hctl2e75` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,_binary '',NULL,'2025-08-20 06:00:00.000000','SAVINGS','Dhaka',7500,'2025-08-20 06:00:00.000000','Abdur Rahim','11111111','01777050706','Abdur_Rahim_1f660c63-80fd-4031-a432-1697d03f47a0','USER',1),(2,_binary '',NULL,NULL,'Savings','Dhaka',1000,'1990-01-01 06:00:00.000000','MD Rahim Khan','1234567890123','017778899','MD_Rahim_Khan_49012c95-97ca-4bd3-bb47-95e9d6b0c92a',NULL,2),(3,_binary '',NULL,NULL,'Savings','Dhaka',3500,'1990-01-01 06:00:00.000000','MD Rahim Khan','134567890123','17778899','MD_Rahim_Khan_206fe57a-c680-42f8-bdab-e72f4d2d8817',NULL,3),(4,_binary '',NULL,'2025-08-16 06:00:00.000000','Savings','Dhaka',9000,'1990-01-01 06:00:00.000000','Fariha Mariam','1567890123','1788990000','Fariha_Mariam_74e2ad4a-9da8-478f-9657-bc530ae20be8','USER',4),(5,_binary '',NULL,'2025-08-16 06:00:00.000000','Savings','Dhaka',5000,'1990-01-01 06:00:00.000000','Sadier Rahman','156789012300','1788990001','Sadier_Rahman_7ae49bb7-ffac-4aff-b5b8-7ed1a22d4410','USER',7),(6,_binary '',NULL,'2025-08-20 06:00:00.000000','CURRENT','Dhaka',100000,'2025-08-20 06:00:00.000000','Parvej','444444444','012365444','Parvej_3acfe9c9-5a25-425d-b4be-96996648c642','USER',10);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dps`
--

DROP TABLE IF EXISTS `dps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `dps_last_updated_at` datetime(6) DEFAULT NULL,
  `dps_maturity_date` date DEFAULT NULL,
  `dps_status` enum('ACTIVE','CLOSED','DEFAULTED') DEFAULT NULL,
  `duration_in_months` int DEFAULT NULL,
  `interest_rate` double DEFAULT NULL,
  `maturity_amount` double DEFAULT NULL,
  `monthly_installment` double DEFAULT NULL,
  `start_dps_date` date DEFAULT NULL,
  `total_deposits_made` int DEFAULT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3fsywk7dily0tetscdqimxj7a` (`account_id`),
  CONSTRAINT `FK3fsywk7dily0tetscdqimxj7a` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dps`
--

LOCK TABLES `dps` WRITE;
/*!40000 ALTER TABLE `dps` DISABLE KEYS */;
/*!40000 ALTER TABLE `dps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `date_of_joining` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nid` varchar(17) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `position` enum('ACCOUNTANT','CASHIER','MANAGER','TELLER') DEFAULT NULL,
  `retirement_date` datetime(6) DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','USER') DEFAULT NULL,
  `salary` double NOT NULL,
  `status` enum('ACTIVE','INACTIVE','RETIRED') DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKkiod4yhba1xgq82wiku0n8k42` (`nid`),
  UNIQUE KEY `UKif2qx9bhvigig71puh5sow65g` (`phone_number`),
  UNIQUE KEY `UKmpps3d3r9pdvyjx3iqixi96fi` (`user_id`),
  CONSTRAINT `FK6lk0xml9r7okjdq0onka4ytju` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Dhaka,Bangladesh','1995-05-20 06:00:00.000000','2024-01-01 06:00:00.000000','Halima','123456089660','01712345660','Halima_962758ee-c516-4e98-84fa-b500455989e4','CASHIER',NULL,'EMPLOYEE',25000,'ACTIVE',5);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixed_deposit`
--

DROP TABLE IF EXISTS `fixed_deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fixed_deposit` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deposit_amount` double DEFAULT NULL,
  `duration_in_months` int DEFAULT NULL,
  `fdlust_updated_at` datetime(6) DEFAULT NULL,
  `interest_rate` double DEFAULT NULL,
  `maturity_amount` double DEFAULT NULL,
  `maturity_date` date DEFAULT NULL,
  `premature_interest_rate` double DEFAULT NULL,
  `premature_withdrawal_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` enum('ACTIVE','CLOSED','WITHDRAWN') DEFAULT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeu513r266by93l5rxh4k2w015` (`account_id`),
  CONSTRAINT `FKeu513r266by93l5rxh4k2w015` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_deposit`
--

LOCK TABLES `fixed_deposit` WRITE;
/*!40000 ALTER TABLE `fixed_deposit` DISABLE KEYS */;
/*!40000 ALTER TABLE `fixed_deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `duration_in_months` int NOT NULL,
  `emi_amount` double NOT NULL,
  `interest_rate` double NOT NULL,
  `last_payment_date` date DEFAULT NULL,
  `loan_amount` double NOT NULL,
  `loan_maturity_date` date DEFAULT NULL,
  `loan_start_date` date DEFAULT NULL,
  `loan_type` enum('BUSINESS','CAR','EDUCATION','HOME','PERSONAL') DEFAULT NULL,
  `penalty_rate` double NOT NULL,
  `remaining_amount` double NOT NULL,
  `status` enum('ACTIVE','CLOSED','DEFAULTED') DEFAULT NULL,
  `total_already_paid_amount` double NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `account_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsar6c4pt4hwmd7cfgonuo6xct` (`account_id`),
  CONSTRAINT `FKsar6c4pt4hwmd7cfgonuo6xct` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `is_log_out` bit(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe32ek7ixanakfqsdaokm4q9y2` (`user_id`),
  CONSTRAINT `FKe32ek7ixanakfqsdaokm4q9y2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmR1cnJhaGlta2hhbjIxNEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NTY4NDMwNSwiZXhwIjoxNzU1NzcwNzA1fQ.gYzONmjnoyvwEEuFnjgtL7PQ97saH8LxgHnFyQlEyaY',1),(2,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M',3),(3,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXJpaGFtYXJpYW1AZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTU2ODY4MDMsImV4cCI6MTc1NTc3MzIwM30._qYbkSch8YtECRBgqg0DmXH0akVbMxRKL3xsb1ou23g',4),(4,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWRpYXIucmFobWFuOTcwQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg4OTM4LCJleHAiOjE3NTU3NzUzMzh9.-sN2I2hUGYh8JwJBySDQ-M7jC4o8sWLx_C4_ZR67Wdg',7),(5,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbXJlamF1bGthcmltQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1NTY4OTg2MCwiZXhwIjoxNzU1Nzc2MjYwfQ.30cdS_8MYtqchcymuuVm99-e1MfPGhe5VrUMAbvAOTo',9),(6,_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXJ2ZWptZDQ0NjlAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTU2OTQ3NzgsImV4cCI6MTc1NTc4MTE3OH0.aRA4grbca3JLoUs199RePiG0v8EYp-sSAKjbGpcdGnY',10);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `transaction_time` datetime(6) NOT NULL,
  `type` enum('DEPOSIT','FIXED_DEPOSIT','INITIALBALANCE','RECEIVE','TRANSFER','WITHDRAW') NOT NULL,
  `account_id` bigint NOT NULL,
  `receiver_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK20w7wsg13u9srbq3bd7chfxdh` (`account_id`),
  KEY `FKrspclyipil8qrxop31nvc7rrc` (`receiver_account_id`),
  CONSTRAINT `FK20w7wsg13u9srbq3bd7chfxdh` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `FKrspclyipil8qrxop31nvc7rrc` FOREIGN KEY (`receiver_account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,10000,'Initial deposit',NULL,'2025-08-20 15:59:01.697000','INITIALBALANCE',1,NULL),(2,5000,'Initial deposit',NULL,'2025-08-20 16:19:25.408000','INITIALBALANCE',2,NULL),(3,5000,'Initial deposit',NULL,'2025-08-20 16:20:27.981000','INITIALBALANCE',3,NULL),(4,500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:26:33.942000','DEPOSIT',1,NULL),(5,1500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:27:51.926000','WITHDRAW',1,NULL),(6,1500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:30:48.099000','WITHDRAW',1,NULL),(7,1500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:31:21.069000','WITHDRAW',2,NULL),(8,500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:31:38.157000','DEPOSIT',2,NULL),(9,500,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:31:48.502000','DEPOSIT',3,NULL),(10,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:32:37.427000','WITHDRAW',3,NULL),(11,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:34:17.630000','TRANSFER',3,2),(12,5000,'Initial deposit',NULL,'2025-08-20 16:44:18.785000','INITIALBALANCE',4,NULL),(13,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 16:47:41.101000','TRANSFER',2,4),(14,5000,'Initial deposit',NULL,'2025-08-20 17:21:08.550000','INITIALBALANCE',5,NULL),(15,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 18:31:01.618000','TRANSFER',2,4),(16,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzU1Njg1MzQwLCJleHAiOjE3NTU3NzE3NDB9.-kieenyRs7Dw8oQ2FeqBTkeqJCTjq55-5Eqvg-mwF1M','2025-08-20 18:31:28.766000','TRANSFER',2,4),(17,1000,'Payment for invoice #123','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmR1cnJhaGlta2hhbjIxNEBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1NTY4NDMwNSwiZXhwIjoxNzU1NzcwNzA1fQ.gYzONmjnoyvwEEuFnjgtL7PQ97saH8LxgHnFyQlEyaY','2025-08-20 18:32:33.507000','TRANSFER',2,4),(18,100000,'Initial deposit',NULL,'2025-08-20 18:36:31.753000','INITIALBALANCE',6,NULL);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_lock` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4bgmpi98dylab6qdvf9xyaxu4` (`phone_number`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '','2025-08-20 06:00:00.000000','abdurrahimkhan214@gmail.com',_binary '\0','Abdur Rahim','$2a$10$.LvlKwOQtkssRpcIBxDLqeqwcQu/uPORPYsKJO8ONcrQwtd4MVk9y','01777050706','Abdur Rahim_7197a7f9-15a3-4dc4-9eaa-546f63e3ac18','USER'),(2,_binary '','1990-01-02 06:00:00.000000','mdrahimkhan107107@gmail.com',_binary '\0','MD Rahim Khan','$2a$10$Ak9MoSqlnLyPPLULFjM3leYvZ5TKxcn.Q2PKxyFCkbAfloKRU16Qq','0175998800','MD Rahim Khan_945a1aab-2d83-4d7f-95ae-a68488715d6c','USER'),(3,_binary '','1990-01-02 06:00:00.000000','asdf@gmail.com',_binary '\0','MD Rahim Khan','$2a$10$bnPnz.vu.IPTbCQ7hkx0Cu327arokaX63YKUsXbVmuBgkPj2baUp2','175998800','MD Rahim Khan_6f275b42-7d8b-49e8-b50a-d8f5115e2a8a','USER'),(4,_binary '','1990-01-02 06:00:00.000000','farihamariam@gmail.com',_binary '\0','Fariha Mariam','$2a$10$1r101RlDkpt6yjknnC0cWurBBJgXRTN63X4W7W059u2U0U1aSB3Ey','1788990000','Fariha Mariam_318840b8-a15e-4327-8e3e-b2d7e9ab3fcd','USER'),(5,_binary '','1995-05-20 06:00:00.000000','halimaaktershemanto@gmail.com',_binary '\0','Halima','$2a$10$QGlZagrIxlMzLyJd3VV5xeJXZPxMH04tMAEuZsu4MXLKl16UVynQG','01712345660','Halima_e51db7b2-cff3-4330-94da-caf467e04ddf','EMPLOYEE'),(7,_binary '','1990-01-02 06:00:00.000000','sadiar.rahman970@gmail.com',_binary '\0','Sadier Rahman','$2a$10$JT7dcaCknJAJHS3coW3fEum2y7t03cM6g0b1lEU6W4wNcbsZ3jL1O','1788990001','Sadier Rahman_8943f61a-cedc-4ac9-a67a-296d13185e4c','USER'),(8,_binary '\0','1990-01-02 06:00:00.000000','mr.t.imran11@gmail.com',_binary '\0','Emran Mia','12345','01785995','Emran Mia_db7976b3-3eb8-4c59-939d-a6b13609d666','ADMIN'),(9,_binary '','1990-01-02 06:00:00.000000','cmrejaulkarim@gmail.com',_binary '\0','CM REJA','$2a$10$ZmA73WdXAqTbOpokZ1Vg7uqULDHGMMTy11YUGoKwdb1dk3UYn.Q/6','017859950','CM REJA_ff826289-d31e-48a8-9580-b8f9f3cbd32f','ADMIN'),(10,_binary '','2025-08-20 06:00:00.000000','parvejmd4469@gmail.com',_binary '\0','Parvej','$2a$10$/vCcJLW13IddS7eJdfvKiuj8P7vi.1M1ttYEO81L.qwiCjbEP1p3i','012365444','Parvej_fd04c6c8-a108-4cd1-8052-5d918f1f59b1','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tokens`
--

DROP TABLE IF EXISTS `user_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tokens` (
  `user_id` bigint NOT NULL,
  `tokens_id` bigint NOT NULL,
  UNIQUE KEY `UKhd6pmh9nk57h7ftrmym1cs6lk` (`tokens_id`),
  KEY `FKcd1yoodas8b3t22j5jhd9vjvw` (`user_id`),
  CONSTRAINT `FKcd1yoodas8b3t22j5jhd9vjvw` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKibdp4o7oc018jdd80so4p91eo` FOREIGN KEY (`tokens_id`) REFERENCES `token` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tokens`
--

LOCK TABLES `user_tokens` WRITE;
/*!40000 ALTER TABLE `user_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tokens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-20 19:09:59
