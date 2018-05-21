/*
 Navicat Premium Data Transfer

 Source Server         : workspace
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : company

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 22/05/2018 07:41:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for company_location
-- ----------------------------
DROP TABLE IF EXISTS `company_location`;
CREATE TABLE `company_location`  (
  `CompanyId` int(11) NOT NULL,
  `Latitude` int(11) NOT NULL,
  `Longitude` int(11) NOT NULL,
  INDEX `CompanyId`(`CompanyId`) USING BTREE,
  CONSTRAINT `CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `company` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
