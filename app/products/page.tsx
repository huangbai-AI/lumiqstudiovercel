import type { Metadata } from "next";
import ProductsShowcase from "@/components/ProductsShowcase";

export const metadata: Metadata = {
  title: "Products — Lumiq Studio",
  description: "Three objects, one quiet universe — LumiqKobi, LumiqPrint and LumiqPal.",
};

export default function ProductsPage() {
  return <ProductsShowcase />;
}
