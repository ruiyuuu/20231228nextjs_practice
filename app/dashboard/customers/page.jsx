import React from "react";
import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Customers",
};

export default async function page({ searchParams }) {
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </main>
  );
}
