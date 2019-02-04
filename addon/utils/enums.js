const queryParamModes = ["=", "present", "absent"];

const responseCodes = [
  { status: 400, label: "Bad request" },
  { status: 401, label: "Unauthorized" },
  { status: 403, label: "Forbidden" },
  { status: 404, label: "Not found" },
  { status: 405, label: "Method not allowed" },
  { status: 500, label: "Internal server error" },
  { status: 503, label: "Service unavailable" }
];

export { queryParamModes, responseCodes };
