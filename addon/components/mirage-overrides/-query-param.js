import Component from "@ember/component";
import { computed } from "@ember/object";
import layout from "../../templates/components/mirage-overrides/-query-param";
import { queryParamModes } from "../../utils/enums";

export default Component.extend({
  layout,
  classNames: ["mirage-overrides--queryparam"],

  model: null,
  onRemove: null,
  onChange: null,
  qpModes: computed(() => queryParamModes),

  actions: {
    remove() {
      if (this.onRemove) {
        this.onRemove(this.model);
      }
      this.model.destroyRecord();
    },

    queryParamChanged() {
      this.model.save().then(() => {
        if (this.onChange) {
          this.onChange(this.model);
        }
      });
    },

    changeMode() {
      this.model.set(
        "mode",
        this.element.querySelector(".mirage-overrides--queryparam--mode").value
      );
      this.send("queryParamChanged");
    }
  }
});
