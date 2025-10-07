export default function OmVendors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendors</h1>
        <p className="text-muted-foreground mt-2">
          Manage vendor relationships, contracts, and procurement processes.
        </p>
      </div>
      
      <div className="kpi-card">
        <h2 className="text-xl font-semibold mb-4">Vendor Management</h2>
        <p className="text-muted-foreground">
          This page will contain vendor management features including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
          <li>Vendor database and profiles</li>
          <li>Contract management</li>
          <li>Performance tracking</li>
          <li>Purchase order management</li>
          <li>Payment processing</li>
          <li>Vendor evaluation and ratings</li>
        </ul>
      </div>
    </div>
  );
}