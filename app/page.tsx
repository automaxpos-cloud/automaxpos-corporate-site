const platformModules = [
  {
    name: "AutoMax POS Client",
    description:
      "Fast counter sales, returns, inventory lookup, receipts, offline queueing, and staff accountability for daily retail operations.",
  },
  {
    name: "AutoMax Local Backend",
    description:
      "Main branch operations, multi-device sync, safe SQLite migrations, reports, licensing, AMMS, and business-day control.",
  },
  {
    name: "AutoMax Cloud Platform",
    description:
      "Business owner monitoring for sales, branches, inventory movement, operational status, AMMS, and synchronized branch health.",
  },
  {
    name: "AutoMax Branch Agent",
    description:
      "Mobile branch operations for remote sites with local selling, offline operation, settlement, business-day close, and cloud sync.",
  },
  {
    name: "AutoMax AMMS",
    description:
      "Cash accountability, payment holders, settlement summaries, allocation tracking, business-day closure, and operational timelines.",
  },
  {
    name: "JP Max Admin Control Center",
    description:
      "Integrated vendor administration console for licensing, customers, diagnostics, platform health, and operational support.",
  },
];

const featureGroups = [
  "Sales and returns",
  "Inventory and stock transfers",
  "Offline synchronization",
  "Receipts and PDF exports",
  "User roles and operational positions",
  "Duty status controls",
  "Daily settlement",
  "Enterprise licensing",
  "Multi-branch monitoring",
  "Cloud health reporting",
  "Business-day control",
  "Cash holder accountability",
];

const pricing = [
  {
    name: "Single Branch",
    price: "Contact sales",
    detail: "Single-site businesses moving from manual sales books to a controlled POS workflow.",
    items: ["POS Client", "Local Backend", "Inventory", "Receipts", "Basic reports"],
  },
  {
    name: "Multi-Branch",
    price: "Custom plan",
    detail: "Growing businesses that need branch monitoring, cloud sync, and accountability.",
    items: ["Cloud Monitor", "Branch Agent", "AMMS", "Stock transfers", "Branch reports"],
  },
  {
    name: "Enterprise",
    price: "Managed rollout",
    detail: "Distributed operations requiring licensing, support diagnostics, and structured deployment.",
    items: ["Enterprise licensing", "Vendor support", "Health monitoring", "Deployment guidance", "Priority support"],
  },
];

const downloads = [
  ["POS Client", "Windows counter sales application"],
  ["Local Backend", "Main branch server and service installer"],
  ["Branch Agent", "Android branch operations APK"],
  ["Cloud Monitor", "Browser dashboard for business owners"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="AutoMax POS home">
          <span className="brand-mark">A</span>
          <span>
            <strong>AutoMax POS</strong>
            <small>JP Max Technologies</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#downloads">Downloads</a>
          <a href="#support">Support</a>
        </nav>
        <a className="header-action" href="https://cloud.automaxpos.com">
          Business Cloud
        </a>
      </header>

      <section className="hero">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="dashboard-window window-sales">
            <div className="window-top">
              <span />
              <span />
              <span />
            </div>
            <div className="window-title">Business Monitor</div>
            <div className="metric-row">
              <b>ZMW 18,420</b>
              <b>7 branches</b>
              <b>96% synced</b>
            </div>
            <div className="chart-bars">
              <span className="bar-a" />
              <span className="bar-b" />
              <span className="bar-c" />
              <span className="bar-d" />
              <span className="bar-e" />
            </div>
          </div>
          <div className="dashboard-window window-pos">
            <div className="receipt-lines">
              <span />
              <span />
              <span />
              <strong>ZMW 475.00</strong>
            </div>
          </div>
          <div className="dashboard-window window-amms">
            <p>Settlement</p>
            <strong>COMPLETED</strong>
            <small>Outstanding ZMW 0.00</small>
          </div>
        </div>

        <div className="hero-content">
          <p className="eyebrow">Retail POS, branch control, cloud monitoring</p>
          <h1>AutoMax POS</h1>
          <p className="hero-copy">
            A production-ready point of sale platform for Zambian retail businesses that need counter sales,
            inventory, offline operation, cash accountability, branch monitoring, and enterprise licensing in one system.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button primary">
              Contact Sales
            </a>
            <a href="#platform" className="button secondary">
              View Platform
            </a>
          </div>
          <dl className="hero-stats" aria-label="Platform highlights">
            <div>
              <dt>3.1.0</dt>
              <dd>Production release</dd>
            </div>
            <div>
              <dt>Offline</dt>
              <dd>Sales and branch operation</dd>
            </div>
            <div>
              <dt>AMMS</dt>
              <dd>Cash settlement control</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section intro-band" id="platform">
        <div className="section-heading">
          <p className="eyebrow">Platform</p>
          <h2>One commercial system for sales, branches, and accountability.</h2>
          <p>
            AutoMax POS connects the point of sale, local branch operations, mobile branches,
            cloud monitoring, and vendor administration under one release lifecycle.
          </p>
        </div>
        <div className="module-grid">
          {platformModules.map((module) => (
            <article className="module-card" key={module.name}>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-strip" id="features">
        <div className="section-heading compact">
          <p className="eyebrow">Core Features</p>
          <h2>Built for the daily workflow from sale to settlement.</h2>
        </div>
        <div className="feature-wall">
          {featureGroups.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Cloud Dashboard</p>
          <h2>Business owners see what matters without waiting for branch reports.</h2>
          <p>
            The Business Cloud monitors sales, branch status, AMMS settlement status, current cash holder,
            outstanding cash, stock transfers, product activity, licensing state, and operational health.
          </p>
        </div>
        <div className="screen-panel">
          <div className="screen-header">AutoMax POS Business Monitor</div>
          <div className="screen-metrics">
            <span>Today&apos;s Sales<br /><b>25,740.00</b></span>
            <span>Outstanding<br /><b>0.00</b></span>
            <span>Closed<br /><b>6</b></span>
          </div>
          <div className="screen-table">
            <span>Branch</span><span>Status</span><span>Cash</span>
            <strong>Main</strong><strong>Closed</strong><strong>0.00</strong>
            <strong>Chongwe</strong><strong>Closed</strong><strong>0.00</strong>
            <strong>Kafue</strong><strong>Open</strong><strong>320.00</strong>
          </div>
        </div>
      </section>

      <section className="section split-section reverse">
        <div>
          <p className="eyebrow">Branch Agent</p>
          <h2>Remote branches keep selling and settling even with unreliable connectivity.</h2>
          <p>
            The Android Branch Agent supports local sales, returns, offline synchronization, AMMS settlement,
            payment holders, business-day close, and operational identity using the same accountability model as the main branch.
          </p>
        </div>
        <div className="phone-panel">
          <div className="phone-speaker" />
          <h3>Daily Settlement</h3>
          <dl>
            <div><dt>Gross Sales</dt><dd>ZMW 475.00</dd></div>
            <div><dt>Allocated</dt><dd>ZMW 475.00</dd></div>
            <div><dt>Outstanding</dt><dd>ZMW 0.00</dd></div>
            <div><dt>Status</dt><dd>COMPLETED</dd></div>
          </dl>
          <button type="button">Close Business Day</button>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-heading compact">
          <p className="eyebrow">Pricing</p>
          <h2>Plans are matched to branch count, support needs, and deployment scope.</h2>
        </div>
        <div className="pricing-grid">
          {pricing.map((plan) => (
            <article className="price-card" key={plan.name}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.detail}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section download-section" id="downloads">
        <div>
          <p className="eyebrow">Downloads</p>
          <h2>Installers and APKs are distributed through the AutoMax release channel.</h2>
          <p>
            Production customers receive the correct installer, APK, license, and cloud access for their registered business.
          </p>
        </div>
        <div className="download-list">
          {downloads.map(([name, description]) => (
            <article key={name}>
              <span>{name}</span>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section support-section" id="support">
        <div className="section-heading">
          <p className="eyebrow">Support Center</p>
          <h2>Deployment, licensing, training, and operational support from JP Max Technologies.</h2>
          <p>
            Customers can request licensing assistance, onboarding support, branch setup, troubleshooting,
            cloud access help, password resets, and enterprise rollout guidance.
          </p>
        </div>
        <div className="support-grid">
          <a href="mailto:support@automaxpos.com">support@automaxpos.com</a>
          <a href="mailto:sales@automaxpos.com">sales@automaxpos.com</a>
          <a href="mailto:licenses@automaxpos.com">licenses@automaxpos.com</a>
          <a href="https://cloud.automaxpos.com">cloud.automaxpos.com</a>
          <a href="https://admin.automaxpos.com">admin.automaxpos.com</a>
          <a href="mailto:admin@automaxpos.com">admin@automaxpos.com</a>
        </div>
      </section>

      <section className="section about-section" id="contact">
        <div>
          <p className="eyebrow">Company</p>
          <h2>JP Max Technologies builds AutoMax POS as a complete platform, not a collection of disconnected tools.</h2>
        </div>
        <div>
          <p>
            JP Max Technologies provides the AutoMax POS product, Business Cloud, Branch Agent,
            Local Backend, AMMS, enterprise synchronization services, and JP Max Admin Control Center
            as one integrated platform with shared release lifecycle and production support.
          </p>
          <a className="button primary" href="mailto:ceo@automaxpos.com">
            Contact JP Max Technologies
          </a>
        </div>
      </section>
    </main>
  );
}
