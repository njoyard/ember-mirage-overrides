import Component from "@ember/component";
import { computed } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import layout from "../templates/components/mirage-overrides";

export default Component.extend({
  layout,
  tagName: "table",
  classNames: ["mirage-overrides"],

  store: service(),
  mirageOverrides: service(),

  ready: readOnly("mirageOverrides.ready"),
  overrides: computed("ready", function() {
    return this.ready ? this.store.findAll("route") : [];
  }),

  actions: {
    update() {
      this.mirageOverrides.exportOverrides();
    }
  }
});
