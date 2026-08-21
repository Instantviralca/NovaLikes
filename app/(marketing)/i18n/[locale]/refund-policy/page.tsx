import { createLocalizedLegalPage } from '@/components/sections/legal/localized-legal-page';

const page = createLocalizedLegalPage('refund-policy');

export const generateMetadata = page.generateMetadata;
export default page.Page;
