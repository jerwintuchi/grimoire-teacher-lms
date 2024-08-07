import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import TransactionsCard from "./_components/transactions";

const AnalyticsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DataCard value={totalSales} shouldFormat={false} label="Total Sales" />
        <DataCard value={totalRevenue} label="Total Revenue" />
      </div>
      <Chart data={data} />
      <TransactionsCard />
    </div>
  );
};

export default AnalyticsPage;
