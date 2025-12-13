import { Link } from "react-router";
import { useLeads } from "@/features/leads/store";
import { LeadsTable } from "@/features/leads/components/LeadsTable";

export default function LeadsIndexRoute() {
  const { leads } = useLeads();

  return (
    <div className="page">
      <div className="card">
        <div className="row">
          <h1>Leads</h1>
          <Link className="btn" to="/leads/new">Add Lead</Link>
        </div>

        {leads.length === 0 ? (
          <p>No leads yet. Create your first lead.</p>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </div>
    </div>
  );
}
