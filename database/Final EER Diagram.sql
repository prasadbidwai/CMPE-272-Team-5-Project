SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `AnimalDynamicsNew` DEFAULT CHARACTER SET utf8 ;
USE `AnimalDynamicsNew` ;

-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`Animals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`Animals` (
  `identifier` INT(11) NOT NULL AUTO_INCREMENT,
  `common_name` VARCHAR(45) NULL DEFAULT NULL,
  `scientific_name` VARCHAR(60) NULL DEFAULT NULL,
  `threat_status` VARCHAR(45) NULL DEFAULT NULL,
  `population` VARCHAR(45) NULL DEFAULT NULL,
  `habitat` VARCHAR(1000) NULL DEFAULT NULL,
  `threats` VARCHAR(3000) NULL DEFAULT NULL,
  `solutions` VARCHAR(3000) NULL DEFAULT NULL,
  `information` VARCHAR(3000) NULL DEFAULT NULL,
  PRIMARY KEY (`identifier`),
  INDEX `threat_status_id_fk_idx` (`threat_status` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 97
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`Solutions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`Solutions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `context` VARCHAR(100) NULL DEFAULT NULL,
  `actions` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`Yearwise_Count`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`Yearwise_Count` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(100) NULL DEFAULT NULL,
  `year_1998` INT(11) NULL DEFAULT NULL,
  `year_2000` INT(11) NULL DEFAULT NULL,
  `year_2002` INT(11) NULL DEFAULT NULL,
  `year_2003` INT(11) NULL DEFAULT NULL,
  `year_2004` INT(11) NULL DEFAULT NULL,
  `year_2006` INT(11) NULL DEFAULT NULL,
  `year_2007` INT(11) NULL DEFAULT NULL,
  `year_2008` INT(11) NULL DEFAULT NULL,
  `year_2009` INT(11) NULL DEFAULT NULL,
  `year_2010` INT(11) NULL DEFAULT NULL,
  `year_2011` INT(11) NULL DEFAULT NULL,
  `year_2012` INT(11) NULL DEFAULT NULL,
  `year_2013` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`country` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 250
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`countrywise_count`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`countrywise_count` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `country_id` INT(11) NULL DEFAULT NULL,
  `mammals` INT(11) NULL DEFAULT NULL,
  `birds` INT(11) NULL DEFAULT NULL,
  `reptiles` INT(11) NULL DEFAULT NULL,
  `amphibians` INT(11) NULL DEFAULT NULL,
  `fishes` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `CountrywiseCount_CountryId` (`country_id` ASC),
  CONSTRAINT `CountrywiseCount_CountryId`
    FOREIGN KEY (`country_id`)
    REFERENCES `AnimalDynamicsNew`.`country` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 250
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AnimalDynamicsNew`.`countrywise_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `AnimalDynamicsNew`.`countrywise_status` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `country_id` INT(11) NULL DEFAULT NULL,
  `extinct` INT(11) NULL DEFAULT NULL,
  `critically_endangered` INT(11) NULL DEFAULT NULL,
  `endangered` INT(11) NULL DEFAULT NULL,
  `vulnerable` INT(11) NULL DEFAULT NULL,
  `near_threatened` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `Countrywise_CountryId` (`country_id` ASC),
  CONSTRAINT `Countrywise_CountryId`
    FOREIGN KEY (`country_id`)
    REFERENCES `AnimalDynamicsNew`.`country` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 252
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
