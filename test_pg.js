const { Client } = require('pg');

const client = new Client({
  host: 'ap-southeast-1.d6c078bb-4775-4287-8b0c-cc45c43d527c.aws.yugabytecloud',
  port: 5433,
  user: 'admin',
  password: 'F6vIsWWOXWPiRIomfvfEcF8biVcL9F',
  database: 'yugabyte',
  ssl: { rejectUnauthorized: false }
});

client.connect(err => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
  } else {
    console.log('✅ Connected to Yugabyte!');
    client.end();
  }
});
