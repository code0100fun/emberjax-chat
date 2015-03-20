import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Service.extend({
  availableIn: ['controllers', 'routes'],
  ref: new Firebase("https://emberjax-chat.firebaseio.com"),

  addFirebaseCallback: function() {
    var session = this;

    this.get("ref").onAuth(function(authData) {
      if (authData) {
        session.set("isAuthenticated", true);
      } else {
        session.set("isAuthenticated", false);
      }
    });
  }.on("init"),

  login: function() {
    return new Promise((resolve, reject) => {
      this.get("ref").authWithOAuthPopup("github", function(error, user) {
        if (user) {
          resolve(user[user.provider]);
        } else {
          reject(error);
        }
      });
    });
  },

  logout: function() {
    this.get("ref").unauth();
  },

  currentUser: function() {
    var auth = this.get("ref").getAuth();
    if(auth) {
      return auth[auth.provider];
    }
  }.property("isAuthenticated")
});
