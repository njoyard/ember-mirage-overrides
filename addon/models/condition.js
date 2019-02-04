import DS from "ember-data";

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  route: belongsTo("route"),
  queryParams: hasMany("queryparam"),
  enabled: attr(),
  always: attr(),
  statusCode: attr()
});
