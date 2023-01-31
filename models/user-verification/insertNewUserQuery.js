const insertNewUserQuery = 'INSERT INTO users (googleid, display_name, first_name, last_name, image, created_at, email, verified) SELECT $1, $2, $3, $4, $5, $6, $7, $8 FROM (SELECT 1) sub WHERE NOT EXISTS (SELECT googleid FROM users WHERE googleid = $1)';

module.exports = insertNewUserQuery;