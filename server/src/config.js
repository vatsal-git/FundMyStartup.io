const SECRET_KEY =
  "a5f06d7c3932a5c8e9b728db5a5d854c09aa57f8dc810f18363297653ef23e56";

const MONGODB_CONNECTION_STRING =
  "mongodb://127.0.0.1:27017/fund-my-startup-db";

const CORS_OPTIONS = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

module.exports = { SECRET_KEY, MONGODB_CONNECTION_STRING, CORS_OPTIONS };
