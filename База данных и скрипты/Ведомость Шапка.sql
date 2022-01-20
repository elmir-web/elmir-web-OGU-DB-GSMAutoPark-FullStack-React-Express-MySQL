SELECT
    `base`.`Name`,
    `garage`.`Name`,
    `sheet`.`NumberSheet`,
    `sheet`.`DateSheet`,
    `worker`.`FIO`
FROM
    `sheet`
INNER JOIN `garage` ON `garage`.`ID` = `sheet`.`IDgarage`
INNER JOIN `base` ON `base`.`ID` = `garage`.`IDbase`    
INNER JOIN `worker` ON `base`.`ID` = `worker`.`IDbase` and worker.ID = sheet.IDsigner
where sheet.ID = 3