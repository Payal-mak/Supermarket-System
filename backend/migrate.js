import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    const sqlPath = path.join(__dirname, '../database/04_auth_columns.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    
    console.log('Running migration...');
    await pool.query(sql);
    console.log('✅ Migration successful: Added auth columns to customers table.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  } finally {
    pool.end();
  }
}

runMigration();
