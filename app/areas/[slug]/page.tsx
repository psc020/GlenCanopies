import { redirect } from "next/navigation";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AreaPage({ params }: AreaPageProps) {
  await params;
  redirect("/developments");
}
