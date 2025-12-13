import { Link } from "react-router";
import type { Lead } from "@/features/leads/model";
import { useLeads } from "@/features/leads/store";
import styles from "./LeadsTable.module.scss";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const { removeLead } = useLeads();

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th style={{ width: 220 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                <Link to={`/leads/${lead.id}`}>{lead.name}</Link>
              </td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <div className={styles.actions}>
                  <Link className="btn" to={`/leads/${lead.id}`}>View</Link>
                  <Link className="btn" to={`/leads/edit/${lead.id}`}>Edit</Link>
                  <button className="btn" onClick={() => removeLead(lead.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
