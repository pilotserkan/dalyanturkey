export default function GoogleSettingsPage() {
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Google & Analytics</h1>
      <p className="text-gray-500 mb-8">Manage Google Search Console, Analytics, and AdSense integration.</p>

      <div className="space-y-6">
        {/* Google Search Console */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Google Search Console</h2>
              <p className="text-sm text-gray-500">Site verification and search performance</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${gscVerification ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {gscVerification ? '✓ Configured' : '⚠ Not Set'}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Verification Code</label>
            <code className="block text-sm font-mono bg-white p-3 rounded border border-gray-200 text-gray-700">
              {gscVerification || 'Not configured'}
            </code>
            <p className="text-xs text-gray-400 mt-2">
              Set <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code> in Vercel Environment Variables
            </p>
          </div>
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-bold text-blue-800 mb-2">Setup Instructions:</h3>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://search.google.com/search-console" target="_blank" className="underline">Google Search Console</a></li>
              <li>Add property: dalyanturkey.com</li>
              <li>Choose &quot;HTML tag&quot; verification method</li>
              <li>Copy the content value from the meta tag</li>
              <li>Add it as <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code> in Vercel</li>
              <li>Submit sitemap: <code className="bg-blue-100 px-1 rounded">https://dalyanturkey.com/sitemap.xml</code></li>
            </ol>
          </div>
        </div>

        {/* Google Analytics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Google Analytics (GA4)</h2>
              <p className="text-sm text-gray-500">Website traffic and visitor analytics</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${gaId ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {gaId ? '✓ Active' : '⚠ Not Set'}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Measurement ID</label>
            <code className="block text-sm font-mono bg-white p-3 rounded border border-gray-200 text-gray-700">
              {gaId || 'G-XXXXXXXXXX'}
            </code>
            <p className="text-xs text-gray-400 mt-2">
              Set <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_GA_ID</code> in Vercel Environment Variables
            </p>
          </div>
        </div>

        {/* Google AdSense */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Google AdSense</h2>
              <p className="text-sm text-gray-500">Monetization with display ads</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${adsenseId ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {adsenseId ? '✓ Active' : '⚠ Not Set'}
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Publisher ID</label>
            <code className="block text-sm font-mono bg-white p-3 rounded border border-gray-200 text-gray-700">
              {adsenseId || 'ca-pub-XXXXXXXXXX'}
            </code>
            <p className="text-xs text-gray-400 mt-2">
              Set <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_ADSENSE_ID</code> in Vercel Environment Variables
            </p>
          </div>
        </div>

        {/* SEO Checklist */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">SEO Checklist</h2>
          <div className="space-y-3">
            {[
              { label: 'sitemap.xml generated', done: true, url: '/sitemap.xml' },
              { label: 'robots.txt configured', done: true, url: '/robots.txt' },
              { label: 'Hreflang tags (10 languages)', done: true },
              { label: 'Canonical URLs set', done: true },
              { label: 'Open Graph meta tags', done: true },
              { label: 'Meta titles (29 pages)', done: true },
              { label: 'Meta descriptions (29 pages)', done: true },
              { label: 'Structured Data (Schema.org)', done: false },
              { label: 'Google Search Console', done: !!gscVerification },
              { label: 'Google Analytics', done: !!gaId },
              { label: 'Google AdSense', done: !!adsenseId },
              { label: 'Cloudflare DDoS protection', done: true },
              { label: 'SSL/HTTPS', done: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-2 border-b border-gray-50">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${item.done ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                  {item.done ? '✓' : '✗'}
                </span>
                <span className={`text-sm ${item.done ? 'text-gray-700' : 'text-red-600 font-medium'}`}>{item.label}</span>
                {'url' in item && item.url && (
                  <a href={item.url} target="_blank" className="ml-auto text-xs text-sky-600 hover:underline">View →</a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Environment Variables Summary */}
        <div className="bg-gray-900 rounded-xl p-6 text-white">
          <h2 className="text-lg font-bold mb-4">Vercel Environment Variables</h2>
          <p className="text-gray-400 text-sm mb-4">Add these to Vercel Dashboard → Settings → Environment Variables:</p>
          <div className="font-mono text-sm space-y-2 bg-black/30 rounded-lg p-4">
            <p><span className="text-emerald-400">ADMIN_PASSWORD</span>=<span className="text-amber-300">your_secure_password</span></p>
            <p><span className="text-emerald-400">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</span>=<span className="text-amber-300">your_verification_code</span></p>
            <p><span className="text-emerald-400">NEXT_PUBLIC_GA_ID</span>=<span className="text-amber-300">G-XXXXXXXXXX</span></p>
            <p><span className="text-emerald-400">NEXT_PUBLIC_ADSENSE_ID</span>=<span className="text-amber-300">ca-pub-XXXXXXXXXX</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
