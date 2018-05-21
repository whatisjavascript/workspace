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

 Date: 22/05/2018 07:41:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attence
-- ----------------------------
DROP TABLE IF EXISTS `attence`;
CREATE TABLE `attence`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `OpenId` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户OpenId',
  `StartTime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '上班时间',
  `EndTime` datetime(0) NULL DEFAULT NULL COMMENT '下班日期',
  `StartTimeState` tinyint(4) NULL DEFAULT NULL COMMENT '0: 正常 1:迟到 2:外勤 3:请假',
  `EndTimeState` tinyint(4) NULL DEFAULT NULL COMMENT '0:正常 1:早退 2: 外勤 3:请假',
  `StartLocation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上班打卡地点',
  `EndLocation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '下班打开地点',
  PRIMARY KEY (`Id`) USING BTREE,
  INDEX `OpenId`(`OpenId`) USING BTREE,
  CONSTRAINT `OpenId` FOREIGN KEY (`OpenId`) REFERENCES `userinfo` (`OpenId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
