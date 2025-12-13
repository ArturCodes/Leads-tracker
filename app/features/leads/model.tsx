export type LeadStatus = "new" | "contacted" | "won" | "lost";

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
};
