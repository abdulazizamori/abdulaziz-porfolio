import CaseStudy, { caseMetadata, caseParams } from '../../../../components/CaseStudy';

export const dynamicParams = false;
export const generateStaticParams = caseParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return caseMetadata('ar', (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CaseStudy locale="ar" slug={(await params).slug}/>;
}
