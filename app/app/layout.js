import DashboardShell from "../../components/dashboard/shell";

export const metadata = { title: { default: "Dashboard", template: "%s — XOXO" } };

export default function AppLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
