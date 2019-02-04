import Component from "@ember/component";
import { inject as service } from "@ember/service";
import layout from "../../templates/components/mirage-overrides/-route";

export default Component.extend({
  layout,
  tagName: "",

  store: service(),

  model: null,
  onChange: null,

  actions: {
    conditionChanged() {
      if (this.onChange) {
        this.onChange(this.model);
      }
    },

    routeChanged() {
      this.model.save().then(() => {
        if (this.onChange) {
          this.onChange(this.model);
        }
      });
    },

    addCondition() {
      this.store
        .createRecord("condition", {
          enabled: true,
          always: true,
          status: 400,
          queryParams: [],
          route: this.model
        })
        .save()
        .then(condition => {
          this.model.conditions.pushObject(condition);
          this.send("routeChanged");
        });
    },

    removeCondition(condition) {
      this.model.conditions.removeObject(condition);
      this.send("routeChanged");
    }
  }
});
