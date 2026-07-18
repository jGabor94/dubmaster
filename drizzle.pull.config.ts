import 'dotenv/config';
import { Config, defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './src/drizzle', // <- a gyökér, ahol a schema.ts/relations.ts-t akarod látni
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_PULL_URL!,
    },
    schemaFilter: ['public'],
}) satisfies Config;