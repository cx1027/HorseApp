import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">HorseApp</h1>
            <p className="text-xs text-text-secondary">Horse Management Platform</p>
          </div>
          <Link href="/auth/login" className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-button transition-colors hover:bg-primary-600">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-medium text-text-primary sm:text-5xl">
            Professional Horse Management<br />& Investment Platform
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-text-secondary leading-relaxed">
            HorseApp provides unified horse information management, health tracking, ownership analysis, and investment reporting for owners, investors, and professionals.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Link href="/register" className="rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white shadow-button transition-colors hover:bg-primary-600">
              Get Started
            </Link>
            <a href="#features" className="rounded-full border-2 border-border bg-surface px-8 py-3.5 text-base font-medium text-text-primary transition-colors hover:bg-background-primary">
              Learn More
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-28 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Horse Profile Management",
              desc: "Centralized management of complete profiles including health, feeding, weight, races, insurance and more",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "Ownership Tracking",
              desc: "Clear visualization of equity structure, owner information, and revenue distribution for each horse",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72m8.162 0a9.094 9.094 0 013.741-.479 3 3 0 00-4.682-2.72m0 0a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m0 0a3 3 0 00-4.682-2.72m0 0a9.094 9.094 0 01-3.741-.479 3 3 0 004.682 2.72m0 0a3 3 0 004.682 2.72m0 0a3 3 0 004.681-2.72m0 0a3 3 0 004.682-2.72" />
                </svg>
              ),
            },
            {
              title: "Investment Reports",
              desc: "Professional investment reports including benchmark data, forecast analysis and latest updates",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
            },
            {
              title: "Health Records",
              desc: "Track and manage vaccination, medical checkups, injuries, and other health-related information",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              ),
            },
            {
              title: "Document Storage",
              desc: "Securely store and manage certificates, insurance documents, race records and more",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              ),
            },
            {
              title: "Real-time Notifications",
              desc: "Receive timely alerts for horse status updates, report releases, and other important notifications",
              icon: (
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-3xl bg-surface p-8 shadow-card transition-shadow hover:shadow-elevated">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-medium text-text-primary">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-28 rounded-3xl bg-surface p-10 text-center shadow-card">
          <h3 className="text-xl font-medium text-text-primary">Designed for the Horse Industry</h3>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Whether you are an individual owner, stable manager, or investment firm, HorseApp meets your needs
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-text-muted">
          © 2026 HorseApp. Horse Management & Investment Platform
        </div>
      </footer>
    </div>
  );
}
