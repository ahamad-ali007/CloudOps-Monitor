from pydantic import BaseModel
from typing import List


class Alert(BaseModel):
    id: int
    level: str
    message: str


class AlertsResponse(BaseModel):
    count: int
    last_updated: str
    alerts: List[Alert]