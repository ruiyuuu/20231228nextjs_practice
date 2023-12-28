import { sql } from "@vercel/postgres";
import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchCardData() {
  noStore();
  try {
    const invoiceCountPromise = await sql`SELECT COUNT(*) FROM revenue`;
    const customerCountPromise = await sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = await sql`SELECT 
    SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS 'paid',
    SUM(CASE WHEN status ='pending' THEN amount ELSE 0 END) AS 'pending' FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
    
    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    console.log("----------" + numberOfInvoices);
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const totalPaidInovices = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInovices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
  }
}
