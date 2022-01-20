select garage.ID, garage.Name
from garage
INNER JOIN base ON base.ID = garage.IDbase
where base.ID = 1