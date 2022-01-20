SELECT
    car.Model,
    car.Number,
    record.NumberPL,
    `worker`.`FIO`,
    gsm.Name,
    record.Liter,
    record.Kilo
FROM
    `sheet`
INNER JOIN `record` ON `record`.`IDsheet` = `sheet`.`ID`
INNER JOIN `car` ON `car`.`ID` = `record`.`IDcar`
INNER JOIN `gsm` ON `gsm`.`ID` = `record`.`IDgsm`
INNER JOIN `worker` ON worker.ID = record.IDdriver
WHERE
    sheet.ID = 2