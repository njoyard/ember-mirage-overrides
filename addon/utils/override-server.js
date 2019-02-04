import { overrides } from "ember-mirage-overrides/services/mirage-overrides";

const methods = ["get", "post", "put", "delete", "patch", "options", "head"];

function checkCondition(condition, _, { queryParams }) {
  if (!condition.enabled) {
    return false;
  }

  for (let qp of condition.queryParams) {
    if (qp.mode === "present" && !(qp.param in queryParams)) {
      return false;
    } else if (qp.mode === "absent" && qp.param in queryParams) {
      return false;
    } else if (queryParams[qp.param] != qp.value) {
      return false;
    }
  }

  return true;
}

function overrideMethod(server, method) {
  return function(url, handler) {
    let route = `${method.toUpperCase} ${url}`;
    overrides[route] = [];

    return server[method](url, function() {
      for (let condition of overrides[route]) {
        if (checkCondition(condition, ...arguments)) {
          // eslint-disable-next-line no-console
          console.log(`[mirage-overrides] response overriden for ${route}`);
          return new Response(condition.statusCode);
        }
      }

      return handler(...arguments);
    });
  };
}

export default function overrideServer(server) {
  let overriden = Object.create(server);
  for (let method of methods) {
    overriden[method] = overrideMethod(server, method);
  }
  return server;
}
