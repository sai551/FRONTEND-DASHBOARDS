export default function OmExpenses() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
        <p className="text-muted-foreground mt-2">
          Track and manage operational expenses across all departments and projects.
        </p>
      </div>
      
      <div className="kpi-card">
        <h2 className="text-xl font-semibold mb-4">Expense Management</h2>
        <p className="text-muted-foreground">
          This page will contain expense management features including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
          <li>Expense report submission</li>
          <li>Receipt scanning and storage</li>
          <li>Budget tracking and alerts</li>
          <li>Expense categorization</li>
          <li>Approval workflows</li>
          <li>Financial reporting and analytics</li>
        </ul>
      </div>
    </div>
  );
}