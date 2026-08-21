import { createLocalizedLegalPage } from '@/components/sections/legal/localized-legal-page';

const page = createLocalizedLegalPage('privacy-policy');

export const generateMetadata = page.generateMetadata;
export default page.Page;
