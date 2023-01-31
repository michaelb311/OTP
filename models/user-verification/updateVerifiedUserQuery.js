//Find a way to add a condition to the query to check if the user is already verified. If they are, then don't send the email. If they aren't, then send the email. Also add a condition that sets verified to false after 24 hours.

const updateVerifiedQuery = 'UPDATE users SET verified = true WHERE googleid = $1';

module.exports = updateVerifiedQuery;