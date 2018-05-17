/*
Navicat MySQL Data Transfer

Source Server         : my
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : company

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-05-17 12:12:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for attence
-- ----------------------------
DROP TABLE IF EXISTS `attence`;
CREATE TABLE `attence` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `OpenId` varchar(30) NOT NULL COMMENT '用户OpenId',
  `StartTime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '上班时间',
  `EndTime` datetime DEFAULT NULL COMMENT '下班日期',
  PRIMARY KEY (`Id`),
  KEY `OpenId` (`OpenId`),
  CONSTRAINT `OpenId` FOREIGN KEY (`OpenId`) REFERENCES `userinfo` (`OpenId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
