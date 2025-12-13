import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Lead, LeadStatus } from "./model";

const STORAGE_KEY = "leads-tracker.leads";

type LeadDraft = { name: string; email: string; status: LeadStatus };
type State = { leads: Lead[] };

type Action =
  | { type: "ADD"; payload: LeadDraft }
  | { type: "UPDATE"; id: string; payload: LeadDraft }
  | { type: "REMOVE"; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const id = crypto.randomUUID();
      return { leads: [...state.leads, { id, ...action.payload }] };
    }
    case "UPDATE": {
      return {
        leads: state.leads.map((l) =>
          l.id === action.id ? { ...l, ...action.payload } : l
        ),
      };
    }
    case "REMOVE": {
      return { leads: state.leads.filter((l) => l.id !== action.id) };
    }
    default:
      return state;
  }
}

function loadInitialState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { leads: [] };

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return { leads: [] };

    // If you want, we can add stricter validation later.
    return { leads: parsed as Lead[] };
  } catch {
    return { leads: [] };
  }
}

type LeadsContextValue = {
  leads: Lead[];
  addLead: (draft: LeadDraft) => void;
  updateLead: (id: string, draft: LeadDraft) => void;
  removeLead: (id: string) => void;
};

const LeadsContext = createContext<LeadsContextValue | null>(null);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  // Initialize once from localStorage:
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  // Persist whenever leads change:
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.leads));
  }, [state.leads]);

  const value = useMemo<LeadsContextValue>(() => {
    return {
      leads: state.leads,
      addLead: (draft) => dispatch({ type: "ADD", payload: draft }),
      updateLead: (id, draft) =>
        dispatch({ type: "UPDATE", id, payload: draft }),
      removeLead: (id) => dispatch({ type: "REMOVE", id }),
    };
  }, [state.leads]);

  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used within <LeadsProvider>.");
  return ctx;
}
