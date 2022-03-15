-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 15, 2022 at 05:36 PM
-- Server version: 5.5.62
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gsm`
--

-- --------------------------------------------------------

--
-- Table structure for table `base`
--

CREATE TABLE `base` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `base`
--

INSERT INTO `base` (`ID`, `Name`) VALUES
(1, 'База №1'),
(2, 'База №2');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Model` varchar(50) COLLATE utf8_bin NOT NULL,
  `Number` varchar(10) COLLATE utf8_bin NOT NULL,
  `IDgarage` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`ID`, `Model`, `Number`, `IDgarage`) VALUES
(1, 'ВАЗ', 'АА111А', 1),
(2, 'ГАЗ', 'ББ222Б', 2),
(3, 'КАМАЗ', 'ВВ333В', 3),
(4, 'ЗИЛ', 'ГГ444Г', 2);

-- --------------------------------------------------------

--
-- Table structure for table `garage`
--

CREATE TABLE `garage` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `IDbase` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `garage`
--

INSERT INTO `garage` (`ID`, `Name`, `IDbase`) VALUES
(1, 'Гараж №1', 1),
(2, 'Гараж №2', 1),
(3, 'Гараж №3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `gsm`
--

CREATE TABLE `gsm` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `ForKilo` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `gsm`
--

INSERT INTO `gsm` (`ID`, `Name`, `ForKilo`) VALUES
(1, 'Бензин', '0.750'),
(2, 'Дизтопливо', '0.850'),
(3, 'Масло', '0.900');

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE `record` (
  `ID` int(10) UNSIGNED NOT NULL,
  `IDsheet` int(10) UNSIGNED NOT NULL,
  `IDcar` int(10) UNSIGNED NOT NULL,
  `IDdriver` int(10) UNSIGNED NOT NULL,
  `NumberPL` varchar(10) COLLATE utf8_bin NOT NULL,
  `IDgsm` int(10) UNSIGNED NOT NULL,
  `Liter` decimal(10,3) NOT NULL,
  `Kilo` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`ID`, `IDsheet`, `IDcar`, `IDdriver`, `NumberPL`, `IDgsm`, `Liter`, `Kilo`) VALUES
(1, 1, 1, 1, '1', 1, '1.000', '0.750'),
(2, 1, 1, 1, '2', 3, '1.000', '0.900'),
(3, 2, 2, 2, '3', 1, '10.000', '7.500'),
(4, 2, 4, 2, '4', 3, '10.000', '9.000'),
(5, 3, 3, 3, '5', 2, '100.000', '85.000'),
(6, 3, 3, 3, '6', 2, '10.000', '8.500');

-- --------------------------------------------------------

--
-- Table structure for table `sheet`
--

CREATE TABLE `sheet` (
  `ID` int(10) UNSIGNED NOT NULL,
  `NumberSheet` varchar(10) COLLATE utf8_bin NOT NULL,
  `DateSheet` date NOT NULL,
  `IDgarage` int(10) UNSIGNED NOT NULL,
  `IDsigner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sheet`
--

INSERT INTO `sheet` (`ID`, `NumberSheet`, `DateSheet`, `IDgarage`, `IDsigner`) VALUES
(1, '111', '2021-09-01', 1, 4),
(2, '222', '2021-09-01', 2, 4),
(3, '333', '2021-09-01', 3, 5),
(4, '333', '2019-09-01', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `worker`
--

CREATE TABLE `worker` (
  `ID` int(10) UNSIGNED NOT NULL,
  `FIO` varchar(50) COLLATE utf8_bin NOT NULL,
  `loginUser` varchar(20) COLLATE utf8_bin NOT NULL,
  `passwordUser` varchar(30) COLLATE utf8_bin NOT NULL,
  `Function` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `IDbase` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `worker`
--

INSERT INTO `worker` (`ID`, `FIO`, `loginUser`, `passwordUser`, `Function`, `IDbase`) VALUES
(1, 'Иванов А.С.', 'ivanov_test', 'ivanov__test', 1, 1),
(2, 'Петров В.М.', 'petrov_test', 'petrov__test', 1, 1),
(3, 'Сидоров В.М.', 'sidorov_test', 'sidorov__test', 1, 2),
(4, 'Кузнецов А.Б.', 'kuznecov_test', 'kuznecov__test', 2, 1),
(5, 'Васильев С.К.', 'vasiliev_test', 'vasiliev__test', 2, 2),
(12, 'ELMIR.WEB', 'admin', 'admin1', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `base`
--
ALTER TABLE `base`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDgarage` (`IDgarage`);

--
-- Indexes for table `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDbase` (`IDbase`);

--
-- Indexes for table `gsm`
--
ALTER TABLE `gsm`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDsheet` (`IDsheet`),
  ADD KEY `IDcar` (`IDcar`),
  ADD KEY `IDgsm` (`IDgsm`),
  ADD KEY `IDdriver` (`IDdriver`);

--
-- Indexes for table `sheet`
--
ALTER TABLE `sheet`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDgarage` (`IDgarage`),
  ADD KEY `IDsigner` (`IDsigner`);

--
-- Indexes for table `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDbase` (`IDbase`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `base`
--
ALTER TABLE `base`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `garage`
--
ALTER TABLE `garage`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `gsm`
--
ALTER TABLE `gsm`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `record`
--
ALTER TABLE `record`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sheet`
--
ALTER TABLE `sheet`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `worker`
--
ALTER TABLE `worker`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`IDgarage`) REFERENCES `garage` (`ID`);

--
-- Constraints for table `garage`
--
ALTER TABLE `garage`
  ADD CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`IDbase`) REFERENCES `base` (`ID`);

--
-- Constraints for table `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`IDsheet`) REFERENCES `sheet` (`ID`),
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`IDcar`) REFERENCES `car` (`ID`),
  ADD CONSTRAINT `record_ibfk_3` FOREIGN KEY (`IDgsm`) REFERENCES `gsm` (`ID`),
  ADD CONSTRAINT `record_ibfk_4` FOREIGN KEY (`IDdriver`) REFERENCES `worker` (`ID`);

--
-- Constraints for table `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`IDgarage`) REFERENCES `garage` (`ID`),
  ADD CONSTRAINT `sheet_ibfk_2` FOREIGN KEY (`IDsigner`) REFERENCES `worker` (`ID`);

--
-- Constraints for table `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`IDbase`) REFERENCES `base` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
