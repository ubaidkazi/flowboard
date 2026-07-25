import { useEffect, useState } from "react";
import {
  ArrowRight,
  Blocks,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe2,
  KeyRound,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareMore,
  MoveRight,
  Radio,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import styles from "../styles/LandingPage2.module.css";

const NAV_ITEMS = [
  { label: "Product", href: "#product" },
  { label: "Engineering", href: "#engineering" },
  { label: "Architecture", href: "#architecture" },
  { label: "About", href: "#about" },
];

const FEATURES = [
  {
    number: "01",
    title: "Boards that stay in sync",
    copy: "Changes are broadcast to collaborators over board-specific WebSocket topics, so everyone sees the same state without refreshing.",
    icon: Radio,
  },
  {
    number: "02",
    title: "Interaction with consequence",
    copy: "Columns and cards can be reordered naturally, while every position change is persisted by the backend—not just painted on the screen.",
    icon: Blocks,
  },
  {
    number: "03",
    title: "Built around actual teams",
    copy: "Projects, boards, assignments, collaborators, priorities, dates, and status all live in one coherent workspace.",
    icon: MessageSquareMore,
  },
];

const ENGINEERING_POINTS = [
  "Spring Boot REST API with layered services and repositories",
  "JWT authentication with Spring Security and BCrypt",
  "STOMP WebSockets scoped to individual boards",
  "Transactional Outbox Pattern for reliable domain-event publishing",
  "MySQL persistence with ordered columns and cards",
  "Dockerized production deployment behind Nginx and HTTPS",
];

const STACK = [
  { name: "React", detail: "Product interface", icon: Code2 },
  { name: "Spring Boot", detail: "Application API", icon: ServerCog },
  { name: "MySQL", detail: "Persistent state", icon: Database },
  { name: "WebSockets", detail: "Live board events", icon: Radio },
  { name: "JWT", detail: "Stateless security", icon: KeyRound },
  { name: "Docker + Nginx", detail: "Production delivery", icon: Globe2 },
];

const FLOW_STEPS = [
  {
    title: "A user moves a card",
    copy: "The React client calculates the new ordered state and sends a focused update to the API.",
  },
  {
    title: "The API commits the change",
    copy: "Spring Boot validates the request, updates MySQL, and records the related outbox event in the same transaction.",
  },
  {
    title: "The event is published",
    copy: "The outbox publisher relays the event to the board-specific STOMP topic after the database change is durable.",
  },
  {
    title: "Collaborators update instantly",
    copy: "Connected clients apply the event while the initiating browser ignores its own broadcast to prevent duplicate work.",
  },
];

function FlowBoardMark() {
  return (
    <div className={styles.brandMark} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function BrowserPreview() {
  return (
    <div className={styles.browserFrame} aria-label="FlowBoard product preview">
      <div className={styles.browserTopbar}>
        <div className={styles.browserDots}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.browserAddress}>flowboardapp.live/boards/product-launch</div>
        <div className={styles.livePill}>
          <span /> Live
        </div>
      </div>

      <div className={styles.appShell}>
        <aside className={styles.previewSidebar}>
          <div className={styles.previewLogo}>
            <FlowBoardMark />
            <strong>FlowBoard</strong>
          </div>
          <div className={styles.previewWorkspace}>Workspace</div>
          <div className={styles.previewNavActive}>Product Launch</div>
          <div className={styles.previewNavItem}>Website Redesign</div>
          <div className={styles.previewNavItem}>Research</div>
          <div className={styles.previewMembers}>
            <span>UH</span>
            <span>AK</span>
            <span>MS</span>
            <button>+3</button>
          </div>
        </aside>

        <div className={styles.previewMain}>
          <div className={styles.previewHeader}>
            <div>
              <p>PROJECT / PRODUCT LAUNCH</p>
              <h3>Launch workspace</h3>
            </div>
            <div className={styles.syncBadge}>
              <Radio size={14} /> Synced now
            </div>
          </div>

          <div className={styles.boardGrid}>
            <PreviewColumn
              title="Next up"
              count="3"
              cards={[
                ["Finalize onboarding copy", "COPY", "Today"],
                ["Review mobile navigation", "UX", "Wed"],
              ]}
            />
            <PreviewColumn
              title="In progress"
              count="2"
              accent
              cards={[
                ["Ship activity timeline", "BACKEND", "High"],
                ["Polish release dashboard", "FRONTEND", "Fri"],
              ]}
            />
            <PreviewColumn
              title="Done"
              count="4"
              cards={[
                ["Configure HTTPS", "DEVOPS", "Done"],
                ["Persist card ordering", "API", "Done"],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewColumn({ title, count, cards, accent = false }) {
  return (
    <div className={`${styles.previewColumn} ${accent ? styles.previewColumnAccent : ""}`}>
      <div className={styles.previewColumnHeader}>
        <span>{title}</span>
        <small>{count}</small>
      </div>
      {cards.map(([titleText, tag, meta]) => (
        <div className={styles.previewCard} key={titleText}>
          <span className={styles.previewTag}>{tag}</span>
          <strong>{titleText}</strong>
          <div>
            <span className={styles.tinyAvatar}>UH</span>
            <small>{meta}</small>
          </div>
        </div>
      ))}
      <button className={styles.addCardButton}>+ Add card</button>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className={styles.architectureCanvas}>
      <div className={`${styles.archNode} ${styles.archClient}`}>
        <Globe2 size={20} />
        <span>Browser</span>
        <small>React client</small>
      </div>

      <div className={`${styles.archLine} ${styles.archLineOne}`}>
        <span>HTTPS</span>
      </div>

      <div className={`${styles.archNode} ${styles.archGateway}`}>
        <ShieldCheck size={20} />
        <span>Nginx</span>
        <small>TLS + reverse proxy</small>
      </div>

      <div className={`${styles.archLine} ${styles.archLineTwo}`}>
        <span>REST / WS</span>
      </div>

      <div className={`${styles.archNode} ${styles.archApi}`}>
        <ServerCog size={20} />
        <span>Spring Boot API</span>
        <small>Security + business logic</small>
      </div>

      <div className={`${styles.archLine} ${styles.archLineThree}`}>
        <span>JPA</span>
      </div>

      <div className={`${styles.archNode} ${styles.archDb}`}>
        <Database size={20} />
        <span>MySQL</span>
        <small>Application + outbox data</small>
      </div>

      <div className={`${styles.archLine} ${styles.archLineFour}`}>
        <span>domain events</span>
      </div>

      <div className={`${styles.archNode} ${styles.archEvents}`}>
        <Radio size={20} />
        <span>Board topics</span>
        <small>STOMP over WebSockets</small>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.page}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <FlowBoardMark />
          <span>FlowBoard</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <a
            className={styles.githubLink}
            href="https://github.com/YOUR_USERNAME/flowboard"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> GitHub
          </a>
          <a className={styles.primaryButtonSmall} href="https://flowboardapp.live">
            Open app <ArrowRight size={16} />
          </a>
        </div>

        <button
          className={styles.menuButton}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            <a href="https://github.com/YOUR_USERNAME/flowboard" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://flowboardapp.live" onClick={closeMenu}>
              Open FlowBoard
            </a>
          </div>
        )}
      </header>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroTexture} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <CircleDot size={15} /> Independently designed, engineered, and deployed
            </div>
            <h1>
              A shared workspace
              <span>with a real system behind it.</span>
            </h1>
            <p className={styles.heroCopy}>
              FlowBoard is a real-time collaborative Kanban application built to explore the full path from product interaction to reliable backend event delivery.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="https://flowboardapp.live">
                Explore the live app <ArrowRight size={18} />
              </a>
              <a className={styles.secondaryButton} href="#engineering">
                Read the engineering story <MoveRight size={18} />
              </a>
            </div>
            <div className={styles.heroMeta}>
              <div>
                <strong>React</strong>
                <span>interface</span>
              </div>
              <div>
                <strong>Spring Boot</strong>
                <span>API</span>
              </div>
              <div>
                <strong>WebSockets</strong>
                <span>live collaboration</span>
              </div>
              <div>
                <strong>MySQL</strong>
                <span>persistent state</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.floatingNoteTop}>
              <Zap size={16} /> Event delivered to 3 collaborators
            </div>
            <BrowserPreview />
            <div className={styles.floatingNoteBottom}>
              <LockKeyhole size={16} /> JWT-secured API
            </div>
          </div>
        </section>

        <section className={styles.statementStrip} aria-label="Project statement">
          <p>
            Not a concept screen. Not a template. A deployed full-stack application with authenticated users, persistent data, live board events, and production infrastructure.
          </p>
        </section>

        <section className={styles.productSection} id="product">
          <div className={styles.sectionIntro}>
            <span className={styles.sectionKicker}>The product</span>
            <h2>Simple on the surface. Deliberate underneath.</h2>
            <p>
              The interface is intentionally quiet so teams can focus on work. The complexity lives where it should: data consistency, ordering, authentication, event delivery, and deployment.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {FEATURES.map(({ number, title, copy, icon: Icon }) => (
              <article className={styles.featureCard} key={number}>
                <div className={styles.featureTopline}>
                  <span>{number}</span>
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.engineeringSection} id="engineering">
          <div className={styles.engineeringLayout}>
            <div className={styles.engineeringStory}>
              <span className={styles.sectionKickerDark}>The engineering</span>
              <h2>Built as a system, not a collection of screens.</h2>
              <p>
                FlowBoard was developed as an end-to-end software engineering project: product design, client state, backend modeling, security, real-time messaging, reliability patterns, containerization, and production deployment.
              </p>

              <div className={styles.engineeringList}>
                {ENGINEERING_POINTS.map((point) => (
                  <div key={point}>
                    <span><Check size={15} /></span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>

              <a className={styles.textLinkLight} href="#architecture">
                Follow one event through the system <ArrowRight size={17} />
              </a>
            </div>

            <div className={styles.codePanel}>
              <div className={styles.codePanelHeader}>
                <span>column-moved.event</span>
                <span className={styles.codeStatus}>committed</span>
              </div>
              <pre>
                <code>{`{
  "type": "COLUMN_MOVED",
  "boardId": 42,
  "columnId": 108,
  "position": 2,
  "actorId": 7,
  "publishedVia": "transactional-outbox"
}`}</code>
              </pre>
              <div className={styles.codeFooter}>
                <div>
                  <Database size={16} /> durable first
                </div>
                <ChevronRight size={16} />
                <div>
                  <Radio size={16} /> broadcast second
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.architectureSection} id="architecture">
          <div className={styles.sectionIntroRow}>
            <div>
              <span className={styles.sectionKicker}>Architecture</span>
              <h2>One request, from browser to broadcast.</h2>
            </div>
            <p>
              The production path is intentionally straightforward: HTTPS terminates at Nginx, application traffic reaches Spring Boot, state is committed to MySQL, and collaborative updates return over WebSockets.
            </p>
          </div>

          <ArchitectureDiagram />

          <div className={styles.flowGrid}>
            {FLOW_STEPS.map((step, index) => (
              <article className={styles.flowStep} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.stackSection}>
          <div className={styles.stackHeading}>
            <span className={styles.sectionKicker}>Technology choices</span>
            <h2>A practical stack selected for clear responsibilities.</h2>
          </div>
          <div className={styles.stackGrid}>
            {STACK.map(({ name, detail, icon: Icon }) => (
              <div className={styles.stackItem} key={name}>
                <Icon size={22} />
                <div>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.caseStudySection} id="about">
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyLabel}>
              <Sparkles size={16} /> Portfolio case study
            </div>
            <div className={styles.caseStudyGrid}>
              <div>
                <h2>What this project demonstrates.</h2>
              </div>
              <div className={styles.caseStudyCopy}>
                <p>
                  FlowBoard is evidence of full-stack ownership: taking a product from initial interaction design through API development, real-time synchronization, reliability work, and a secured public deployment.
                </p>
                <p>
                  It also documents the tradeoffs behind the implementation—why ordering is persisted, why events are scoped per board, and why publishing follows the database transaction instead of racing it.
                </p>
              </div>
            </div>
            <div className={styles.caseStudyFooter}>
              <div>
                <span>Designed and built by</span>
                <strong>Ubaid Hashmi</strong>
              </div>
              <div className={styles.caseStudyActions}>
                <a href="https://github.com/YOUR_USERNAME/flowboard" target="_blank" rel="noreferrer">
                  <Github size={17} /> View source
                </a>
                <a href="https://flowboardapp.live">
                  Launch application <ExternalLink size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaIcon}>
            <Workflow size={28} />
          </div>
          <h2>See the system by using the product.</h2>
          <p>Create a workspace, move a card, and watch FlowBoard keep the board consistent across connected clients.</p>
          <div className={styles.finalCtaActions}>
            <a className={styles.primaryButton} href="https://flowboardapp.live">
              Open FlowBoard <ArrowRight size={18} />
            </a>
            <a className={styles.secondaryButton} href="https://github.com/YOUR_USERNAME/flowboard" target="_blank" rel="noreferrer">
              <Github size={18} /> Browse GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="#top" className={styles.brand}>
          <FlowBoardMark />
          <span>FlowBoard</span>
        </a>
        <p>Real-time collaborative task management, designed and engineered by Ubaid Hashmi.</p>
        <div>
          <a href="https://flowboardapp.live">Live app</a>
          <a href="https://github.com/YOUR_USERNAME/flowboard" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
