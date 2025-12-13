import { useNavigate } from "react-router";
import { LeadForm } from "@/features/leads/components/LeadForm";
import { useLeads } from "@/features/leads/store";

export default function NewLeadRoute() {
  const nav = useNavigate();
  const { addLead } = useLeads();

  return (
    <div className="page">
      <div className="card">
        <div className="row">
          <h1>Add Lead</h1>
          <button className="btn" onClick={() => nav("/leads")}>Back</button>
        </div>

        <LeadForm
          mode="create"
          onSubmit={(lead) => {
            addLead(lead);
            nav("/leads");
          }}
        />
      </div>
    </div>
  );
}
