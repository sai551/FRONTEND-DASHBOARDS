export default function OmEmployeeMovements() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Employee Movements</h1>
        <p className="text-muted-foreground mt-2">
          Track employee transfers, relocations, and organizational changes.
        </p>
      </div>
      
      <div className="kpi-card">
        <h2 className="text-xl font-semibold mb-4">Movement Management</h2>
        <p className="text-muted-foreground">
          This page will contain employee movement management features including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
          <li>Transfer request processing</li>
          <li>Location change tracking</li>
          <li>Department transfers</li>
          <li>Asset reassignment workflows</li>
          <li>Cost center updates</li>
          <li>Movement history and reporting</li>
        </ul>
      </div>
    </div>
  );
}