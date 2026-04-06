import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { HUBS } from '@/lib/navigation';

// ---------------------------------------------------------------------------
// Slug -> camelCase nav key mapping (same as Header)
// ---------------------------------------------------------------------------
const SLUG_TO_NAV_KEY: Record<string, string> = {
  tarih: 'tarih',
  doga: 'doga',
  wellness: 'wellness',
  turlar: 'turlar',
  'yeme-icme': 'yemeIcme',
  pratik: 'pratik',
  harita: 'harita',
  'hakkinda/dalyan-nerede': 'hakkinda',
  'kaunos-antik-kenti': 'kaunos',
  'kaya-mezarlari': 'kayaMezarlari',
  'iztuzu-plaji': 'iztuzu',
  'caretta-caretta': 'caretta',
  'koycegiz-golu': 'koycegiz',
  'dalyan-deltasi': 'delta',
  'mavi-yengec': 'maviYengec',
  'kus-gozlemciligi': 'kusGozlem',
  yuvarlakcay: 'yuvarlakcay',
  'sigla-ormani': 'sigla',
  'gun-batimi-noktalari': 'gunBatimi',
  'sultaniye-kaplicalari': 'sultaniye',
  'camur-banyosu': 'camurBanyosu',
  'dalyan-tekne-turu': 'tekneTuru',
  'kaunos-kultur-turu': 'kaunosKultur',
  'iztuzu-su-taksi': 'suTaksi',
  'caretta-izleme-turu': 'carettaTuru',
  'wellness-turu': 'wellnessTuru',
  'jeep-safari': 'jeepSafari',
  'ekincik-mavi-magara': 'ekincik',
  'saklikent-tlos-turu': 'saklikent',
  'gunubirlik-geziler': 'gunubirlik',
  'dalyan-mutfagi': 'mutfak',
  'dalaman-havalimanindan-dalyan': 'havalimani',
  'ne-zaman-gidilir': 'neZaman',
  'koycegiz-pazari': 'pazar',
  'sik-sorulan-sorular': 'sss',
  'surdurulebilir-turizm': 'surdurulebilir',
};

function navKey(slug: string): string {
  return SLUG_TO_NAV_KEY[slug] ?? slug;
}

// ---------------------------------------------------------------------------
// Social icons (self-contained SVGs)
// ---------------------------------------------------------------------------
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

// ---------------------------------------------------------------------------
// Footer component (server-compatible via useTranslations in next-intl)
// ---------------------------------------------------------------------------
export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();

  // Column 2: History & Nature
  const col2Hubs = [HUBS.tarih, HUBS.doga];
  // Column 3: Wellness, Tours, Food
  const col3Hubs = [HUBS.wellness, HUBS.turlar, HUBS['yeme-icme']];
  // Column 4: Practical
  const col4Hub = HUBS.pratik;

  return (
    <footer className="bg-sky-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ---- Column 1: Brand ---- */}
          <div>
            <Link href={`/${locale}`} className="text-2xl font-bold text-white mb-4 block">
              Dalyan<span className="text-amber-400">Turkey</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <span
                  key={social}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-500 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label={social}
                >
                  <SocialIcon name={social} />
                </span>
              ))}
            </div>
          </div>

          {/* ---- Column 2: History & Nature ---- */}
          <div>
            {col2Hubs.map((hub) => (
              <div key={hub.slug} className="mb-6 last:mb-0">
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  <Link
                    href={`/${locale}/${hub.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {nav(navKey(hub.slug))}
                  </Link>
                </h3>
                <ul className="space-y-1.5">
                  {hub.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/${locale}/${hub.slug}/${child.slug}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                      >
                        {nav(navKey(child.slug))}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---- Column 3: Wellness, Tours, Food ---- */}
          <div>
            {col3Hubs.map((hub) => (
              <div key={hub.slug} className="mb-6 last:mb-0">
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  <Link
                    href={`/${locale}/${hub.slug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {nav(navKey(hub.slug))}
                  </Link>
                </h3>
                <ul className="space-y-1.5">
                  {hub.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/${locale}/${hub.slug}/${child.slug}`}
                        className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                      >
                        {nav(navKey(child.slug))}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---- Column 4: Practical Info & Contact ---- */}
          <div>
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                <Link
                  href={`/${locale}/${col4Hub.slug}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {nav(navKey(col4Hub.slug))}
                </Link>
              </h3>
              <ul className="space-y-1.5">
                {col4Hub.children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`/${locale}/${col4Hub.slug}/${child.slug}`}
                      className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {nav(navKey(child.slug))}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {t('contact')}
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 mt-0.5 text-amber-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Dalyan, Ortaca, Mugla, Turkey
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 mt-0.5 text-amber-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@dalyanturkey.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>{t('copyright')}</p>
          <p>{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
