export interface DatabaseConfig {
  host: string;
  port: number;
  uri: string;
}

export const database_config = () => ({
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    uri: process.env.DATABASE_URI,
  },
});
