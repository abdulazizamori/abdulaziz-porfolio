import '../globals.css';
import RootDocument, { rootMetadata } from '../components/RootDocument';

export { viewport } from '../components/RootDocument';
export const metadata = rootMetadata('ar');

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="ar">{children}</RootDocument>;
}
