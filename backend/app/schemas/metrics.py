from pydantic import BaseModel
from typing import List


class ChartPoint(BaseModel):
    time: str
    value: float


class MetricsCards(BaseModel):
    cpu: float
    memory: float
    storage: float
    network: str


class NetworkMetrics(BaseModel):
    bytes_sent: float
    bytes_recv: float


class MetricsResponse(BaseModel):
    cards: MetricsCards
    cpu_chart: List[ChartPoint]
    memory_chart: List[ChartPoint]
    network_metrics: NetworkMetrics