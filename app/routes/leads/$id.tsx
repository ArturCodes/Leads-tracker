import { Link, useParams } from "react-router";
import { useLeads } from "@/features/leads/store";

export default function LeadDetailRoute() {
  const { id } = useParams();
  const { leads } = useLeads();
  const lead = leads.find((l) => l.id === id);

  return (
    <div className="page">
      <div className="card">
        <div className="row">
          <h1>Lead Details</h1>
          <div style={{ display: "flex", gap: 10 }}>
            <Link className="btn" to="/leads">Back</Link>
            {id && <Link className="btn" to={`/leads/edit/${id}`}>Edit</Link>}
          </div>
        </div>

        {!lead ? (
          <p>Lead not found.</p>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <div><strong>Name:</strong> {lead.name}</div>
            <div><strong>Email:</strong> {lead.email}</div>
            <div><strong>Status:</strong> {lead.status}</div>
          </div>
        )}
      </div>
    </div>
  );
}
