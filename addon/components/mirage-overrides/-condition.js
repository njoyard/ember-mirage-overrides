import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import layout from "../../templates/components/mirage-overrides/-condition";
import { responseCodes } from "../../utils/enums";

export default Component.extend({
  layout,
  tagName: "tr",
  classNames: ["mirage-overrides--condition"],

  store: service(),

  model: null,
  onRemove: null,
  onChange: null,
  responseCodes: computed(() => responseCodes),

  actions: {
    conditionChanged() {
      this.model.save().then(() => {
        if (this.onChange) {
          this.onChange(this.model);
        }
      });
    },

    addQueryParam() {
      this.store
        .createRecord("queryparam", {
          param: "",
          mode: "present",
          value: "",
          condition: this.model
        })
        .save()
        .then(qp => {
          this.model.queryParams.pushObject(qp);
          this.send("conditionChanged");
        });
    },

    remove() {
      if (this.onRemove) {
        this.onRemove(this.model);
      }
      this.model.destroyRecord();
    },

    removeQueryParam(qp) {
      this.model.queryParams.removeObject(qp);
      this.send("conditionChanged");
    },

    changeStatus() {
      this.model.set(
        "statusCode",
        Number(
          this.element.querySelector(".mirage-overrides--condition--status")
            .value
        )
      );
      this.send("conditionChanged");
    },

    queryParamChanged() {}
  }
});
