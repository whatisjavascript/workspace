/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : company

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-17 09:12:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for company_location
-- ----------------------------
DROP TABLE IF EXISTS `company_location`;
CREATE TABLE `company_location` (
  `CompanyId` int(11) NOT NULL,
  `Latitude` int(11) NOT NULL,
  `Longitude` int(11) NOT NULL,
  KEY `CompanyId` (`CompanyId`),
  CONSTRAINT `CompanyId` FOREIGN KEY (`CompanyId`) REFERENCES `company` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
