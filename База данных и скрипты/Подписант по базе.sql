select worker.ID, worker.FIO
from worker
INNER JOIN base ON base.ID = worker.IDbase AND worker.Function = 2
where base.ID = 1