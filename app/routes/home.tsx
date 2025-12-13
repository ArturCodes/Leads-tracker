import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leads Tracker" },
    { name: "description", content: "A small React Router + Vite app to track leads." },
  ];
}

export default function Home() {
  return (
    <div className="page">
      <div className="card">
        <div className="row">
          <h1>Leads Tracker</h1>
          <Link className="btn" to="/leads">Open Leads</Link>
        </div>

        <p>
          This project focuses on professional React fundamentals: controlled inputs, lifting state,
          routing, and reusable feature modules.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" to="/leads/new">Add a Lead</Link>
          <Link className="btn" to="/leads">View Leads</Link>
        </div>
      </div>
    </div>
  );
}
