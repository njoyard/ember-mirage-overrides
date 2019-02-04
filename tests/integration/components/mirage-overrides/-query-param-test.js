import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | mirage-overrides/-query-param", function(
  hooks
) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    await render(hbs`{{mirage-overrides/-query-param}}`);
    assert.ok(true);
  });
});
