import { createLocalizedLegalPage } from '@/components/sections/legal/localized-legal-page';

const page = createLocalizedLegalPage('terms-and-conditions');

export const generateMetadata = page.generateMetadata;
export default page.Page;
