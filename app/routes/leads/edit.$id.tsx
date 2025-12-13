import { useNavigate, useParams } from "react-router";
import { LeadForm } from "@/features/leads/components/LeadForm";
import { useLeads } from "@/features/leads/store";

export default function EditLeadRoute() {
  const nav = useNavigate();
  const { id } = useParams();
  const { leads, updateLead } = useLeads();
  const lead = leads.find((l) => l.id === id);

  if (!id) {
    return (
      <div className="page">
        <div className="card"><p>Missing lead id.</p></div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="page">
        <div className="card">
          <p>Lead not found.</p>
          <button className="btn" onClick={() => nav("/leads")}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <div className="row">
          <h1>Edit Lead</h1>
          <button className="btn" onClick={() => nav(`/leads/${id}`)}>Cancel</button>
        </div>

        <LeadForm
          mode="edit"
          initialValue={{ name: lead.name, email: lead.email, status: lead.status }}
          onSubmit={(next) => {
            updateLead(id, next);
            nav(`/leads/${id}`);
          }}
        />
      </div>
    </div>
  );
}
