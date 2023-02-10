//Add a condition that sets verified to false after 24 hours.

const verifyUserQuery = 'UPDATE users SET verified = true WHERE googleid = $1';

const unverifyUserQuery = 'UPDATE users SET verified = false WHERE googleid = $1';

module.exports = {verifyUserQuery, unverifyUserQuery};