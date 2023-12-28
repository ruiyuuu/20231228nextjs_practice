import { sql } from "@vercel/postgres";
import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchRevenue() {
  noStore();
  try {
    const data = await sql`SELECT * FROM revenue`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => invoice);
    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch the latest invoices.");
  }
}

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

    console.log("-----" + data);

    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
  }
}
