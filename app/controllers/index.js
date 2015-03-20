import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.computed.alias('session.currentUser'),
  text: "",
  unauthenticated: Ember.computed.not('session.isAuthenticated'),
  placeholder: Ember.computed('session.isAuthenticated', function(){
    if(this.get('session.isAuthenticated')){
      return 'Message...';
    }else{
      return 'Sign in to chat';
    }
  }),
  username: Ember.computed.alias('currentUser.username'),
  actions: {
    sendMessage: function() {
      if(this.get('text')){
        var newMessage = this.store.createRecord('message', {
          username: this.get('username'),
          text: this.get('text')
        });
        this.set("text", null);
        newMessage.save();
      }
    }
  }
});
