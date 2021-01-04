
module.exports = {
  base_url: 'https://api.spotify.com',
  client_id: 'ba4482eda89f475d9242559c26edc64e',
  secret_id: '38b4481d14704c9bbab3d9dd9295e7a8',
  redirect_uri: 'http://localhost/api/auth-callback'
}


/* If Web API returns status code 429, it means that you have sent too many requests. When this happens, check the Retry-After header, where you will see a number displayed. This is the number of seconds that you need to wait, before you try your request again. */