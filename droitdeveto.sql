DROP DATABASE IF EXISTS Droit2Veto; 

CREATE DATABASE Droit2Veto; 

USE Droit2Veto; 

/* Création des tables  */

CREATE TABLE DVM_Legal_Entity ( 
  id INT AUTO_INCREMENT PRIMARY KEY, 
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100)NOT NULL,
  lastname VARCHAR(100), 
  firstname VARCHAR(100),
  establishment_name VARCHAR(100),
  address_of_establishment_1 VARCHAR (100),
  address_of_establishment_2 VARCHAR (100),
  city VARCHAR(100),
  postal_code VARCHAR(100),
  telephone_of_the_establishment VARCHAR(100),
  personal_phone VARCHAR(100),
  logo varchar(100),
  admin TINYINT(1),
  ordinal_number INT(7) 
);

CREATE TABLE Activities (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  title VARCHAR(100) NOT NULL,
  description TEXT, 
  logo VARCHAR(255)
);

CREATE TABLE DVM_Activities (   
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  
  DVM_id INT NOT NULL,   
  Activities_id INT NOT NULL
);

CREATE TABLE PurchasesOrders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quantity INT NOT NULL,
  DVM_id INT NOT NULL, 
  CONSTRAINT fk_DVM_po_id FOREIGN KEY (DVM_id) REFERENCES DVM_Legal_Entity(id)
);

CREATE TABLE Products ( 
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type_logo VARCHAR(250),
  film_personnalisé_anesthésie TINYINT(1), 
  film_personnalisé_activités TINYINT(1),
  WallOfFame_sticker TINYINT(1)
);

CREATE TABLE Activities_Products(
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Activities_id int,
   Products_id int 
);

CREATE TABLE PurchasesOrders_Products(
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
   PurchasesOrders_id int,
   Products_id int 
);

/*données de test */
INSERT INTO Activities (`id`, `title`, `description`, `logo`) VALUES (1, 'Echocardiographie', 'technique d\'imagerie médicale employant les ultrasons pour visualiser le coeur', 'logo/LMV_radiology_belize-hole_optimisé.svg'),(2, 'Echographie', 'technique d\'imagerie employant des ultrasons', 'logo/LMV_radiology_belize-hole_optimisé.svg'),(3, 'Médecine générale', 'spécialité médicale prenant en charge le suivi durable, le bien-être et les soins de santé généraux primaires', 'logo/LMV_radiology_belize-hole_optimisé.svg'), (4, 'Médecine interne', 'spécialité médicale qui s\'intéresse au diagnostic et à la prise en charge globale des maladies', 'logo/LMV_radiology_belize-hole_optimisé.svg'), (5, 'Ostéopathie', 'manipulations manuelles du système musculo-squelettique', 'logo/LMV_radiology_belize-hole_optimisé.svg'), (6, 'Pneumologie', ' branche de la médecine s\'intéressant aux pathologies respiratoires', 'logo/LMV_radiology_belize-hole_optimisé.svg'), (7, 'Rhumatologie', ' spécialité médicale qui s\'intéresse au diagnostic et au traitement des maladies de l\'appareil locomoteur', 'logo/LMV_radiology_belize-hole_optimisé.svg'), (8, 'Traumatologie', 'étude médicale des traumatismes physiques', 'logo/LMV_radiology_belize-hole_optimisé.svg');

INSERT INTO DVM_Legal_Entity (`email`, `password`, `ordinal_number`) VALUES ('user@gmail.com', '$2b$10$auTHzlHJEeVl6CvjZmiHi.xF0lAQIhUKl96/LoLW.bumcvEk8WC5.', '648567');

INSERT INTO DVM_Activities (`DVM_id`, `Activities_id`) VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('1', '4');

/*Contraint*/
ALTER TABLE Activities_Products
ADD CONSTRAINT `fk_Activities_Products_Activitie`
FOREIGN KEY (`Activities_id`)
REFERENCES `Activities`(`id`);

ALTER TABLE Activities_Products
ADD CONSTRAINT `fk_Activities_Products_Products`
FOREIGN KEY (`Products_id`)
REFERENCES `Products`(`id`);

ALTER TABLE PurchasesOrders_Products
ADD CONSTRAINT `fk_PurchasesOrders_Products_Products`
FOREIGN KEY (`Products_id`)
REFERENCES `Products`(`id`);

ALTER TABLE PurchasesOrders_Products
ADD CONSTRAINT `fk_PurchasesOrders_Products_PurchasesOrders`
FOREIGN KEY (`PurchasesOrders_id`)
REFERENCES `PurchasesOrders`(`id`);

ALTER TABLE DVM_Activities
ADD CONSTRAINT `fk_DVM_id`
FOREIGN KEY (`DVM_id`)
REFERENCES `DVM_Legal_Entity`(`id`);

ALTER TABLE DVM_Activities
ADD CONSTRAINT `fk_Activities_id`
FOREIGN KEY (`Activities_id`)
REFERENCES `Activities`(`id`);