export default function OmProjectResources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Project Resources</h1>
        <p className="text-muted-foreground mt-2">
          Allocate and manage resources across different projects and initiatives.
        </p>
      </div>
      
      <div className="kpi-card">
        <h2 className="text-xl font-semibold mb-4">Resource Management</h2>
        <p className="text-muted-foreground">
          This page will contain project resource management features including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
          <li>Resource allocation planning</li>
          <li>Team member assignments</li>
          <li>Equipment and tool reservations</li>
          <li>Budget allocation tracking</li>
          <li>Resource utilization analytics</li>
          <li>Capacity planning</li>
        </ul>
      </div>
    </div>
  );
}