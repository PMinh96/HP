

export interface DatabaseConfig {
  user_name: string;
  password: string;
  name: string;
  host: string;
  port: string;
  synchronize: boolean;
}

export default () => ({
  PORT: process.env.PORT || 6969,
  DB: {
    USER_NAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    TYPE: process.env.DB_TYPE,
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
  },
});
