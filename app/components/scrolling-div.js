import Ember from 'ember';
import layout from '../templates/components/scrolling-div';

export default Ember.Component.extend({
  layout: layout,
  scheduleScrollIntoView: function() {
    Ember.run.scheduleOnce("afterRender", this, "scrollIntoView");
  }.observes("update-when.@each"),
  scrollIntoView: function() {
    this.$().scrollTop(this.$().prop("scrollHeight"));
  }
});
