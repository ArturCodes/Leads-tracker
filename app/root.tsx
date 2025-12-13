import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { LeadsProvider } from "@/features/leads/store";
import "./app.css";

/**
 * Layout is the document shell. React Router will render your route content into <Outlet />.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <LeadsProvider>{children}</LeadsProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * App is the root route component. It must render <Outlet /> so nested routes can appear.
 */
export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  // Keep this simple; you can improve later.
  return (
    <div className="page">
      <h1>Something went wrong</h1>
      <p>Check the browser console and the dev server terminal for details.</p>
    </div>
  );
}
