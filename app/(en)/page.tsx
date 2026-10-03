import HomePage from '../components/HomePage';
import { getContent } from '../i18n/content';

export default function Page() {
  return <HomePage locale="en" content={getContent('en')}/>;
}
