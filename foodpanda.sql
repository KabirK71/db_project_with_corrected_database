-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: foodpanda
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CART`
--

DROP TABLE IF EXISTS `CART`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CART` (
  `CUST_ID` int NOT NULL,
  `FOOD_ID` int DEFAULT NULL,
  `REST_ID` int DEFAULT NULL,
  `QUANTITY` int DEFAULT NULL,
  `PRICE` int DEFAULT NULL,
  `FOOD_NAME` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CART`
--

LOCK TABLES `CART` WRITE;
/*!40000 ALTER TABLE `CART` DISABLE KEYS */;
INSERT INTO `CART` VALUES (1,11,1,50,585,'Pizza'),(22,10,1,2,400,'Burger'),(22,11,1,2,585,'Pizza');
/*!40000 ALTER TABLE `CART` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CUSTOMER`
--

DROP TABLE IF EXISTS `CUSTOMER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CUSTOMER` (
  `CUST_ID` int NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CUST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CUSTOMER`
--

LOCK TABLES `CUSTOMER` WRITE;
/*!40000 ALTER TABLE `CUSTOMER` DISABLE KEYS */;
INSERT INTO `CUSTOMER` VALUES (21,'Muhammad','Sarim'),(22,'kabir','Sarim'),(23,'mrm','mrm');
/*!40000 ALTER TABLE `CUSTOMER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_CONTACT`
--

DROP TABLE IF EXISTS `C_CONTACT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_CONTACT` (
  `CUST_ID` int NOT NULL AUTO_INCREMENT,
  `PHONE_NO` bigint DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PWD` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CUST_ID`),
  CONSTRAINT `C_CONTACT_ibfk_1` FOREIGN KEY (`CUST_ID`) REFERENCES `CUSTOMER` (`CUST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_CONTACT`
--

LOCK TABLES `C_CONTACT` WRITE;
/*!40000 ALTER TABLE `C_CONTACT` DISABLE KEYS */;
INSERT INTO `C_CONTACT` VALUES (21,1234,'sarim@sarim','sarim123'),(22,12356,'mrm@mrm','mrm'),(23,123,'kabir@farhan','sarim123');
/*!40000 ALTER TABLE `C_CONTACT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_LOCATION`
--

DROP TABLE IF EXISTS `C_LOCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_LOCATION` (
  `CUST_ID` int NOT NULL AUTO_INCREMENT,
  `CITY` varchar(255) DEFAULT NULL,
  `AREA` varchar(255) DEFAULT NULL,
  `STREET` varchar(255) DEFAULT NULL,
  `BUILDING` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CUST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_LOCATION`
--

LOCK TABLES `C_LOCATION` WRITE;
/*!40000 ALTER TABLE `C_LOCATION` DISABLE KEYS */;
INSERT INTO `C_LOCATION` VALUES (1,'Lahore','DHA','5','1'),(2,'Lahore','DHA','sukkur','LUMS');
/*!40000 ALTER TABLE `C_LOCATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MENU`
--

DROP TABLE IF EXISTS `MENU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MENU` (
  `FOOD_ID` int NOT NULL AUTO_INCREMENT,
  `REST_ID` int DEFAULT NULL,
  `FOOD_NAME` varchar(255) DEFAULT NULL,
  `FOOD_PRICE` int DEFAULT NULL,
  `DISCOUNT` int DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`FOOD_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MENU`
--

LOCK TABLES `MENU` WRITE;
/*!40000 ALTER TABLE `MENU` DISABLE KEYS */;
INSERT INTO `MENU` VALUES (10,1,'Burger',400,NULL,'Yummy'),(11,1,'Pizza',585,NULL,'Yummy');
/*!40000 ALTER TABLE `MENU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDERS`
--

DROP TABLE IF EXISTS `ORDERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDERS` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `CUST_ID` int DEFAULT NULL,
  `REST_ID` int DEFAULT NULL,
  `RIDER_ID` int DEFAULT NULL,
  `FOOD_ID` int DEFAULT NULL,
  `FINAL_PRICE` int DEFAULT NULL,
  `TIMENDATE` varchar(255) DEFAULT NULL,
  `STATUS_ORDER` varchar(255) DEFAULT NULL,
  `COUNT_ORDER` int DEFAULT NULL,
  PRIMARY KEY (`ORDER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDERS`
--

LOCK TABLES `ORDERS` WRITE;
/*!40000 ALTER TABLE `ORDERS` DISABLE KEYS */;
INSERT INTO `ORDERS` VALUES (44,1,1,NULL,10,2800,'4:16','DELIVERING',7),(45,1,1,NULL,11,1170,'4:16','DELIVERING',2);
/*!40000 ALTER TABLE `ORDERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESTAURANT`
--

DROP TABLE IF EXISTS `RESTAURANT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESTAURANT` (
  `REST_ID` int NOT NULL AUTO_INCREMENT,
  `REST_NAME` varchar(255) DEFAULT NULL,
  `CUISINES` varchar(255) DEFAULT NULL,
  `PRICE_RATING` varchar(255) DEFAULT NULL,
  `DELIVERY_FEE` int DEFAULT NULL,
  `REST_RATING` int DEFAULT NULL,
  `DISCOUNT` int DEFAULT NULL,
  PRIMARY KEY (`REST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESTAURANT`
--

LOCK TABLES `RESTAURANT` WRITE;
/*!40000 ALTER TABLE `RESTAURANT` DISABLE KEYS */;
INSERT INTO `RESTAURANT` VALUES (1,'KFC','FAST FOOD','$$',50,5,0),(2,'PIZZA HUT','PIZZA','$',105,3,10),(3,'LONDON COURTYARD','PASTA','$$$',55,4,0),(4,'PDC','DESI','$',0,1,80),(5,'jj',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `RESTAURANT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RIDER`
--

DROP TABLE IF EXISTS `RIDER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RIDER` (
  `RIDER_ID` int NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(255) DEFAULT NULL,
  `LAST_NAME` varchar(255) DEFAULT NULL,
  `ORDER_COUNT` int DEFAULT NULL,
  `ORDER_ID` int DEFAULT NULL,
  `FREE` int DEFAULT NULL,
  PRIMARY KEY (`RIDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RIDER`
--

LOCK TABLES `RIDER` WRITE;
/*!40000 ALTER TABLE `RIDER` DISABLE KEYS */;
/*!40000 ALTER TABLE `RIDER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `R_CONTACT`
--

DROP TABLE IF EXISTS `R_CONTACT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `R_CONTACT` (
  `REST_ID` int NOT NULL AUTO_INCREMENT,
  `PHONE_NO` bigint DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `PWD` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`REST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `R_CONTACT`
--

LOCK TABLES `R_CONTACT` WRITE;
/*!40000 ALTER TABLE `R_CONTACT` DISABLE KEYS */;
INSERT INTO `R_CONTACT` VALUES (1,90078601,'jj@jj','jj');
/*!40000 ALTER TABLE `R_CONTACT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `R_LOCATION`
--

DROP TABLE IF EXISTS `R_LOCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `R_LOCATION` (
  `REST_ID` int NOT NULL AUTO_INCREMENT,
  `CITY` varchar(255) DEFAULT NULL,
  `AREA` varchar(255) DEFAULT NULL,
  `STREET` varchar(255) DEFAULT NULL,
  `BUILDING` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`REST_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `R_LOCATION`
--

LOCK TABLES `R_LOCATION` WRITE;
/*!40000 ALTER TABLE `R_LOCATION` DISABLE KEYS */;
INSERT INTO `R_LOCATION` VALUES (1,'lahore','dha','5','1');
/*!40000 ALTER TABLE `R_LOCATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VOUCHER`
--

DROP TABLE IF EXISTS `VOUCHER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VOUCHER` (
  `CODE` varchar(255) NOT NULL,
  `REST_ID` int NOT NULL,
  `DEDUCT` int DEFAULT NULL,
  PRIMARY KEY (`CODE`),
  KEY `REST_ID` (`REST_ID`),
  CONSTRAINT `VOUCHER_ibfk_1` FOREIGN KEY (`REST_ID`) REFERENCES `RESTAURANT` (`REST_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VOUCHER`
--

LOCK TABLES `VOUCHER` WRITE;
/*!40000 ALTER TABLE `VOUCHER` DISABLE KEYS */;
INSERT INTO `VOUCHER` VALUES ('12',1,55),('sarim132',1,33);
/*!40000 ALTER TABLE `VOUCHER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-09  3:15:59
