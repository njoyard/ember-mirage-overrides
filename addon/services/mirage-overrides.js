import Service from "@ember/service";
import { inject as service } from "@ember/service";

const overrides = { "GET /foo": [], "POST /foo/bar": [] };
export { overrides };

export default Service.extend({
  store: service(),
  ready: false,

  init() {
    this._super(...arguments);
    this._importOverrides().then(() => this.set("ready", true));
  },

  async _importOverrides() {
    // Create missing routes based on mirage config
    for (let urlPattern in overrides) {
      try {
        await this.store.findRecord("route", urlPattern);
      } catch (e) {
        await this.store.createRecord("route", { id: urlPattern }).save();
      }
    }
  },

  exportOverrides() {}
});
