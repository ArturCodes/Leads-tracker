import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),

  // Leads
  route("/leads", "routes/leads/index.tsx"),
  route("/leads/new", "routes/leads/new.tsx"),

  // Detail + edit
  route("/leads/:id", "routes/leads/$id.tsx"),
  // Using your existing filename convention: edit.$id.tsx => /leads/edit/:id
  route("/leads/edit/:id", "routes/leads/edit.$id.tsx"),
] satisfies RouteConfig;
