-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 07 2021 г., 23:20
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `gsm`
--

-- --------------------------------------------------------

--
-- Структура таблицы `base`
--

CREATE TABLE `base` (
  `ID` int UNSIGNED NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `base`
--

INSERT INTO `base` (`ID`, `Name`) VALUES
(1, 'База №1'),
(2, 'База №2');

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `ID` int UNSIGNED NOT NULL,
  `Model` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Number` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IDgarage` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`ID`, `Model`, `Number`, `IDgarage`) VALUES
(1, 'ВАЗ', 'АА111А', 1),
(2, 'ГАЗ', 'ББ222Б', 2),
(3, 'КАМАЗ', 'ВВ333В', 3),
(4, 'ЗИЛ', 'ГГ444Г', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `garage`
--

CREATE TABLE `garage` (
  `ID` int UNSIGNED NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IDbase` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `garage`
--

INSERT INTO `garage` (`ID`, `Name`, `IDbase`) VALUES
(1, 'Гараж №1', 1),
(2, 'Гараж №2', 1),
(3, 'Гараж №3', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `gsm`
--

CREATE TABLE `gsm` (
  `ID` int UNSIGNED NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ForKilo` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `gsm`
--

INSERT INTO `gsm` (`ID`, `Name`, `ForKilo`) VALUES
(1, 'Бензин', '0.750'),
(2, 'Дизтопливо', '0.850'),
(3, 'Масло', '0.900');

-- --------------------------------------------------------

--
-- Структура таблицы `record`
--

CREATE TABLE `record` (
  `ID` int UNSIGNED NOT NULL,
  `IDsheet` int UNSIGNED NOT NULL,
  `IDcar` int UNSIGNED NOT NULL,
  `IDdriver` int UNSIGNED NOT NULL,
  `NumberPL` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `IDgsm` int UNSIGNED NOT NULL,
  `Liter` decimal(10,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `record`
--

INSERT INTO `record` (`ID`, `IDsheet`, `IDcar`, `IDdriver`, `NumberPL`, `IDgsm`, `Liter`) VALUES
(1, 1, 1, 1, '1', 1, '1.000'),
(2, 1, 1, 1, '2', 3, '1.000'),
(3, 2, 2, 2, '3', 1, '10.000'),
(4, 2, 4, 2, '4', 3, '10.000'),
(5, 3, 3, 3, '5', 2, '100.000'),
(6, 3, 3, 3, '6', 2, '10.000');

-- --------------------------------------------------------

--
-- Структура таблицы `sheet`
--

CREATE TABLE `sheet` (
  `ID` int UNSIGNED NOT NULL,
  `NumberSheet` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `DateSheet` date NOT NULL,
  `IDgarage` int UNSIGNED NOT NULL,
  `IDsigner` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `sheet`
--

INSERT INTO `sheet` (`ID`, `NumberSheet`, `DateSheet`, `IDgarage`, `IDsigner`) VALUES
(1, '111', '2021-09-01', 1, 4),
(2, '222', '2021-09-01', 2, 4),
(3, '333', '2021-09-01', 3, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `worker`
--

CREATE TABLE `worker` (
  `ID` int UNSIGNED NOT NULL,
  `FIO` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `Function` int UNSIGNED NOT NULL DEFAULT '1',
  `IDbase` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `worker`
--

INSERT INTO `worker` (`ID`, `FIO`, `Function`, `IDbase`) VALUES
(1, 'Иванов А.С.', 1, 1),
(2, 'Петров В.М.', 1, 1),
(3, 'Сидоров В.М.', 1, 2),
(4, 'Кузнецов А.Б.', 2, 1),
(5, 'Васильев С.К.', 2, 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `base`
--
ALTER TABLE `base`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDgarage` (`IDgarage`);

--
-- Индексы таблицы `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDbase` (`IDbase`);

--
-- Индексы таблицы `gsm`
--
ALTER TABLE `gsm`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDsheet` (`IDsheet`),
  ADD KEY `IDcar` (`IDcar`),
  ADD KEY `IDgsm` (`IDgsm`),
  ADD KEY `IDdriver` (`IDdriver`);

--
-- Индексы таблицы `sheet`
--
ALTER TABLE `sheet`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDgarage` (`IDgarage`),
  ADD KEY `IDsigner` (`IDsigner`);

--
-- Индексы таблицы `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDbase` (`IDbase`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `base`
--
ALTER TABLE `base`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `garage`
--
ALTER TABLE `garage`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `gsm`
--
ALTER TABLE `gsm`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `record`
--
ALTER TABLE `record`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `sheet`
--
ALTER TABLE `sheet`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `worker`
--
ALTER TABLE `worker`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`IDgarage`) REFERENCES `garage` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `garage`
--
ALTER TABLE `garage`
  ADD CONSTRAINT `garage_ibfk_1` FOREIGN KEY (`IDbase`) REFERENCES `base` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`IDsheet`) REFERENCES `sheet` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`IDcar`) REFERENCES `car` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `record_ibfk_3` FOREIGN KEY (`IDgsm`) REFERENCES `gsm` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `record_ibfk_4` FOREIGN KEY (`IDdriver`) REFERENCES `worker` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `sheet`
--
ALTER TABLE `sheet`
  ADD CONSTRAINT `sheet_ibfk_1` FOREIGN KEY (`IDgarage`) REFERENCES `garage` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `sheet_ibfk_2` FOREIGN KEY (`IDsigner`) REFERENCES `worker` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`IDbase`) REFERENCES `base` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
