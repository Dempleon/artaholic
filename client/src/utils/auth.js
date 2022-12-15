import decode from "jwt-decode";

class AuthService {
  // login and store the token
  login(idToken) {
    localStorage.setItem("login_token", idToken);
  }

  // remove the login token from local storage and go to home page
  logout() {
    localStorage.removeItem("login_token");
    window.location.assign("/");
  }

  // retrieve token from local storage
  getToken() {
    return localStorage.getItem("login_token");
  }

  // check for a token and if it is expired
  checkToken() {
    const token = this.getToken();
    return !!token && !this.expiredToken(token);
  }

  // check to see if the token is expired
  expiredToken(token) {
    try {
      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // get the profile by decoding the token
  getProfile() {
    return decode(this.getToken());
  }
}

export default new AuthService();
