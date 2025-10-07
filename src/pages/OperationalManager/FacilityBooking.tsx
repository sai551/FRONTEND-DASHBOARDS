export default function OmFacilityBooking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Facility Booking</h1>
        <p className="text-muted-foreground mt-2">
          Manage meeting rooms, conference facilities, and workspace reservations.
        </p>
      </div>
      
      <div className="kpi-card">
        <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
        <p className="text-muted-foreground">
          This page will contain facility booking features including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
          <li>Room availability calendar</li>
          <li>Booking request forms</li>
          <li>Resource scheduling</li>
          <li>Conflict resolution</li>
          <li>Catering and setup requests</li>
          <li>Usage analytics and reporting</li>
        </ul>
      </div>
    </div>
  );
}