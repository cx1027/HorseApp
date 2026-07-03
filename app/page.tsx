import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">HorseApp</h1>
            <p className="text-xs text-slate-500">Horse Ownership & Investment Management</p>
          </div>
          <Link href="/auth/login" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700">
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Professional Horse Management<br />& Investment Platform
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            HorseApp provides unified horse information management, health tracking, ownership analysis, and investment reporting for owners, investors, and professionals.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/auth/login" className="rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-700">
              Get Started
            </Link>
            <a href="#features" className="rounded-lg border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50">
              Learn More
            </a>
          </div>
        </div>

        <div id="features" className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Horse Profile Management",
              desc: "Centralized management of complete profiles including health, feeding, weight, races, insurance and more",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "Ownership Tracking",
              desc: "Clear visualization of equity structure, owner information, and revenue distribution for each horse",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              title: "Investment Reports",
              desc: "Professional investment reports including benchmark data, forecast analysis, and latest updates",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
            },
            {
              title: "Health Records",
              desc: "Track and manage vaccination, medical checkups, injuries, and other health-related information",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
            },
            {
              title: "Document Storage",
              desc: "Securely store and manage certificates, insurance documents, race records, and more",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              ),
            },
            {
              title: "Real-time Notifications",
              desc: "Receive timely alerts for horse status updates, report releases, and other important notifications",
              icon: (
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-2xl border border-slate-200/60 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Designed for the Horse Industry</h3>
          <p className="mt-2 text-slate-600">
            Whether you are an individual owner, stable manager, or investment firm, HorseApp meets your needs
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 HorseApp. Horse Ownership & Investment Management Platform.
        </div>
      </footer>
    </div>
  );
}