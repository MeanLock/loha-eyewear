require('dotenv').config();
const { DataSource } = require('typeorm');

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'loha_user',
  password: process.env.DB_PASSWORD || 'loha_dev_2024',
  database: process.env.DB_DATABASE || 'loha_eyewear',
});

ds.initialize()
  .then(async () => {
    console.log("Connected to DB.");
    await ds.query('ALTER TABLE "product_attribute_values" DROP CONSTRAINT IF EXISTS "UQ_d2e88c5209783f87f0881d6dce4"');
    console.log("Constraint dropped (if existed).");
    await ds.query('DROP INDEX IF EXISTS "UQ_d2e88c5209783f87f0881d6dce4"');
    console.log("Index dropped (if existed).");
  })
  .catch(console.error)
  .finally(() => ds.destroy());
