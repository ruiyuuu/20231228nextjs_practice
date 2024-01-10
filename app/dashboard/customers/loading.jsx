import { lusitana } from "@/app/ui/fonts";

export default function Loading() {
  return (
    <>
      <div className="w-full">
        <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
          Customers
        </h1>
        <p>...loading</p>
      </div>
    </>
  );
}
