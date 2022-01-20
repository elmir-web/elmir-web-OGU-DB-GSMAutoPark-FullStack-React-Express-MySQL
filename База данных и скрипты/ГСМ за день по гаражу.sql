SELECT `garage`.`Name`, `gsm`.`Name`,  SUM(record.Liter) as Liter, SUM(record.Kilo) as Kilo 
FROM `gsm` 
INNER JOIN `record` ON `gsm`.`ID` = `record`.`IDgsm`  
INNER JOIN `sheet` ON `sheet`.`ID` = `record`.`IDsheet`
INNER JOIN `garage` ON garage.`ID` = `sheet`.`IDgarage`
WHERE sheet.DateSheet = '2021-09-01'
  and garage.ID = 1
GROUP BY `garage`.`Name`, `gsm`.`Name`