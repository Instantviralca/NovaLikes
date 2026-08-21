import { createLocalizedLegalPage } from '@/components/sections/legal/localized-legal-page';

const page = createLocalizedLegalPage('cookie-policy');

export const generateMetadata = page.generateMetadata;
export default page.Page;
