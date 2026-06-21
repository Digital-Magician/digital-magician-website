import { serviceCityParams, buildServiceMetadata, renderServiceCourse } from "@/lib/serviceCourse";

const SERVICE = "website-development";

export const dynamicParams = false;
export function generateStaticParams() {
  return serviceCityParams();
}
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return buildServiceMetadata(SERVICE, city);
}
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  return renderServiceCourse(SERVICE, city);
}
