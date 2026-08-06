from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str

    DEBUG: bool

    HOST: str
    PORT: int

    AWS_REGION: str

    AUTO_REFRESH_INTERVAL: int

    LOG_LEVEL: str

    class Config:
        env_file = ".env"


settings = Settings()