import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mongodb",
        url: process.env.DATABASE_URI,
        logging: true,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];