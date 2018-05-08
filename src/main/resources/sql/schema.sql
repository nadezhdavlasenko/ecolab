SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

SET NAMES 'utf8';
SET CHARACTER SET 'utf8';
SET SESSION collation_connection = 'utf8_general_ci';
-- -----------------------------------------------------
-- Schema ecolab
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ecolab` ;

-- -----------------------------------------------------
-- Schema diploma
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecolab` DEFAULT CHARACTER SET utf8 ;
USE `ecolab` ;

-- -----------------------------------------------------
-- Table `ecolab`.`pollutant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ecolab`.`pollutant` ;

CREATE TABLE IF NOT EXISTS `ecolab`.`pollutant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `class` INT NULL,
  `averageConcentration` DOUBLE NULL,
  `MCL` DOUBLE NULL,
  `Prob` DOUBLE NULL,
  `riskShort` DOUBLE NULL,
  `b` DOUBLE NULL,
  `riskLong` DOUBLE NULL,

  PRIMARY KEY (`id`))
  ENGINE = InnoDB;

-- -----------------------------------------------------

DROP TABLE IF EXISTS `ecolab`.`waterobject` ;

CREATE TABLE IF NOT EXISTS `ecolab`.`waterobject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `lat` INT NULL,
  `lon` INT NULL,
  `ph` INT NULL,
  `epid` DOUBLE NULL,
  `naturColor` INT NULL,
  `color` INT NULL,
  `x1` INT NULL,
  `x2` INT NULL,
  `x3` INT NULL,
  `waterProb` INT NULL,
  `waterRisk` DOUBLE NULL,
  `colorProb` DOUBLE NULL,
  `colorRisk` DOUBLE NULL,
  `rekrRisk` DOUBLE NULL,
  `drinkRisk` DOUBLE NULL,

  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;