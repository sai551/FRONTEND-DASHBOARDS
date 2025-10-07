import { KPICards } from "./widgets/KPICards";
import { ChartsSection } from "./widgets/ChartsSection";
import { SummaryWidgets } from "./widgets/SummaryWidgets";
import { TablesSection } from "./widgets/TablesSection";

export function DashboardMain() {
  return (
    <main className="flex-1 p-3 md:p-6 space-y-4 md:space-y-6  bg-[rgb(236,248,255)] overflow-x-hidden">
      <div className="fade-in">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">CEO Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Overview of your organization's performance and operations</p>
        </div>

        {/* KPI Cards */}
        <div className="slide-up">
          <KPICards />
        </div>

        {/* Charts Section */}
        <div className="scale-in">
          <ChartsSection />
        </div>

        {/* Summary Widgets */}
        <div className="fade-in">
          <SummaryWidgets />
        </div>

        {/* Tables Section */}
        <div className="slide-up">
          <TablesSection />
        </div>
      </div>
    </main>
  );
}