import { useEffect, useState } from "react";
import type { LeadStatus } from "@/features/leads/model";
import styles from "./LeadForm.module.scss";

type LeadDraft = { name: string; email: string; status: LeadStatus };
type Props = {
  mode: "create" | "edit";
  onSubmit: (draft: LeadDraft) => void;
  initialValue?: LeadDraft;
};

export function LeadForm({ mode, onSubmit, initialValue }: Props) {
  // Controlled inputs: React state is the source of truth for each input value.
  const [name, setName] = useState(initialValue?.name ?? "");
  const [email, setEmail] = useState(initialValue?.email ?? "");
  const [status, setStatus] = useState<LeadStatus>(
    initialValue?.status ?? "new"
  );
  const [error, setError] = useState<string | null>(null);

  // If initialValue changes (e.g., editing a different lead), sync state.
  useEffect(() => {
    if (!initialValue) return;
    setName(initialValue.name);
    setEmail(initialValue.email);
    setStatus(initialValue.status);
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Name is required.");
      return;
    }

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailOk) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    onSubmit({ name: trimmedName, email: trimmedEmail, status });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Name</label>
        <input
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. Sarah Johnson"
        />
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g. sarah@email.com"
        />
      </div>

      <div className={styles.field}>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as LeadStatus);
            if (error) setError(null);
          }}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {error && (
        <p style={{ margin: 0, color: "rgba(255,255,255,0.85)" }}>{error}</p>
      )}

      <button className="btn" type="submit">
        {mode === "create" ? "Create Lead" : "Save Changes"}
      </button>
    </form>
  );
}
