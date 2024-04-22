import { DataSource } from "typeorm";
import { Shortener } from "./shortener.entity";

export const shortenerProviders = [
    {
        provide: 'SHORTENER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Shortener),
        inject: ['DATA_SOURCE']
    }
]