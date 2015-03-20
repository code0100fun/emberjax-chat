import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.computed.alias('session.currentUser'),
  actions: {
    login: function() {
      var store = this.store;
      this.get('session').login().then(function(user) {
        var session = store.createRecord('session', {
          displayName: user.displayName,
          username: user.username
        });
        session.save();
      }, function() {
        alert('Failed to login');
      });
    },
    logout: function() {
      this.get('session').logout();
    }
  }
});
