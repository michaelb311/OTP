module.exports = function(profile) {

    googleid = profile.id,
    display_name = profile.displayName,
    first_name = profile.name.givenName,
    last_name = profile.name.familyName,
    image = profile.photos[0].value,
    created_at = new Date(),
    email = profile.email,
    verified = false
    
    return [googleid, display_name, first_name, last_name, image, created_at, email, verified];
};