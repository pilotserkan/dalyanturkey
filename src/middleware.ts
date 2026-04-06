import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|de|ru|nl|fr|es|it|tr|ar|zh)/:path*'],
};
