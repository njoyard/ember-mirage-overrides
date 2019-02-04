import DS from "ember-data";

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  condition: belongsTo("condition"),
  param: attr(),
  mode: attr(), // present, absent, value
  value: attr()
});
