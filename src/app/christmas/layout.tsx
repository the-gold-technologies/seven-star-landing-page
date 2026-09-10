import type { Metadata } from "next";
import { generatePageMetadata, getPageSEO, RenderSchema } from "@/utils/seo";


/* export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(
    "christmas",
    "Christmas 2026 at Seven Stars | Marsh Baldon, Oxford",
    "Festive dining, Christmas parties and Christmas Day at The Seven Stars, a countryside gastro pub in Marsh Baldon, Oxford. Book your Christmas table on 01865 343337."
  );
}
*/

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await generatePageMetadata(
    "christmas",
    "Christmas 2026 at Seven Stars | Marsh Baldon, Oxford",
    "Festive dining, Christmas parties and Christmas Day at The Seven Stars, a countryside gastro pub in Marsh Baldon, Oxford. Book your Christmas table on 01865 343337."
  );

  return {
    ...metadata,
    alternates: {
      canonical: "https://sevenstarsatmb.co.uk/christmas2026",
    },
  };
}




export default async function ChristmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await getPageSEO("christmas2026");
  const schema = seo?.schema;

  return (
    <>
      {schema && <RenderSchema schema={schema} id="christmas-schema" />}
      {children}
    </>
  );
}
