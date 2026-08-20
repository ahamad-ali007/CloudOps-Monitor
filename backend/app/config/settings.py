from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    APP_NAME: str
    APP_VERSION: str

    HOST: str
    PORT: int
    DEBUG: bool

    AWS_REGION: str

    EC2_INSTANCE_ID: str
    EC2_HOSTNAME: str
    EC2_DISK_DEVICE: str
    EC2_ROOT_PATH: str
    EC2_DEVICE: str
    EC2_FSTYPE: str
    EC2_NETWORK_INTERFACE: str

    DATABASE_URL: str

    AUTO_REFRESH_INTERVAL: int
    LOG_LEVEL: str

    # JWT
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()