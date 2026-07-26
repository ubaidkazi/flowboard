import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Code2,
  Columns3,
  Database,
  ExternalLink,
  Github,
  GitPullRequestArrow,
  Globe2,
  GripVertical,
  Layers3,
  LockKeyhole,
  Menu,
  MessageSquareMore,
  MoveRight,
  Network,
  Radio,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
  X,
  Zap,
  Layers,
  Twitter,
  Linkedin,
} from "lucide-react";
import {
  SiCssmodules,
  SiDocker,
  SiGithubactions,
  SiHibernate,
  SiJavascript,
  SiJsonwebtokens,
  SiMysql,
  SiNginx,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiUbuntu,
  SiVite,
} from "react-icons/si";
import { GrOracle } from "react-icons/gr";
import styles from "../styles/FlowBoardLandingPage.module.css";
import { Link } from "react-router-dom";

const DEFAULT_LINKS = {
  app: "https://flowboardapp.live",
  github: "https://github.com/ubaidkazi/flowboard",
};

const productFeatures = [
  {
    icon: Columns3,
    title: "Work stays visual",
    copy: "Projects, boards, columns, and cards turn changing priorities into a shared workspace that is easy to scan and act on.",
    number: "01",
  },
  {
    icon: Radio,
    title: "Changes appear live",
    copy: "Board-specific real-time updates keep collaborators aligned without refreshes, polling, or duplicated local actions.",
    number: "02",
  },
  {
    icon: GripVertical,
    title: "Movement is persistent",
    copy: "Drag-and-drop interactions are backed by ordered data, so the layout users create remains consistent after reloads.",
    number: "03",
  },
  {
    icon: ShieldCheck,
    title: "Access is protected",
    copy: "JWT authentication, BCrypt password hashing, and secured API routes protect user and project data.",
    number: "04",
  },
];

const engineeringLayers = [
  {
    id: "experience",
    label: "Experience",
    eyebrow: "01 / Product experience",
    title: "A responsive workspace built around direct manipulation.",
    summary:
      "React powers a component-driven interface where users can create work, edit details, and reorganize boards without breaking their flow.",
    outcome: "Users experience fast, clear interactions that behave like a real collaborative product—not a collection of forms.",
    icon: Layers3,
    technologies: [
      { name: "React", role: "Component-driven UI", icon: SiReact },
      { name: "Vite", role: "Fast build tooling", icon: SiVite },
      { name: "JavaScript", role: "Client behavior", icon: SiJavascript },
      { name: "CSS Modules", role: "Scoped styling", icon: SiCssmodules },
    ],
    highlights: [
      "Reusable board, column, card, and modal components",
      "Persistent drag-and-drop ordering",
      "Responsive layouts and accessible interaction states",
      "Initiating clients ignore their own broadcasts",
    ],
    detailTitle: "Implementation notes",
    details: [
      "The UI updates immediately while the backend remains the durable source of truth.",
      "Board data is rendered in persisted position order rather than relying on accidental array order.",
      "Real-time events are applied selectively to avoid duplicate state changes on the client that initiated an action.",
    ],
    visual: "experience",
  },
  {
    id: "application",
    label: "Application",
    eyebrow: "02 / Application logic",
    title: "A secure API coordinates the rules behind every board action.",
    summary:
      "Spring Boot handles authentication, authorization, business logic, validation, and the REST operations that connect the interface to persistent state.",
    outcome: "The product stays predictable because permissions and workflow rules are enforced centrally rather than trusted to the browser.",
    icon: Code2,
    technologies: [
      { name: "Spring Boot", role: "Application platform", icon: SiSpringboot },
      { name: "JWT", role: "Stateless sessions", icon: SiJsonwebtokens },
      { name: "Spring Security", role: "Route protection", icon: LockKeyhole },
      { name: "REST API", role: "Client communication", icon: Workflow },
    ],
    highlights: [
      "JWT-based stateless authentication",
      "BCrypt password hashing",
      "Controller, service, and repository boundaries",
      "Protected project and board operations",
    ],
    detailTitle: "Implementation notes",
    details: [
      "Requests pass through a JWT filter before protected controller methods are reached.",
      "Business operations are kept in services so controllers remain focused on HTTP concerns.",
      "Authentication and domain operations use environment-based production configuration rather than embedded credentials.",
    ],
    visual: "application",
  },
  {
    id: "data",
    label: "Data",
    eyebrow: "03 / Data persistence",
    title: "Relational data preserves structure, ownership, and order.",
    summary:
      "MySQL stores users, projects, boards, columns, cards, and event records while JPA and Hibernate map the domain into transactional operations.",
    outcome: "A board remains exactly where the team left it—even after refreshes, deployments, or reconnecting from another device.",
    icon: Database,
    technologies: [
      { name: "MySQL", role: "Relational storage", icon: SiMysql },
      { name: "Hibernate", role: "Object mapping", icon: SiHibernate },
      { name: "Spring Data JPA", role: "Persistence layer", icon: Database },
      { name: "Transactions", role: "Consistent updates", icon: GitPullRequestArrow },
    ],
    highlights: [
      "Relational modeling for projects, boards, columns, and cards",
      "Durable position values for visual ordering",
      "Transaction boundaries for multi-step operations",
      "Production schema validation",
    ],
    detailTitle: "Implementation notes",
    details: [
      "Ordering is stored explicitly, allowing the backend to return a deterministic board state.",
      "Entity relationships model ownership and containment instead of duplicating data in the client.",
      "Outbox records are written alongside domain changes within the same database transaction.",
    ],
    visual: "data",
  },
  {
    id: "realtime",
    label: "Real-Time",
    eyebrow: "04 / Collaboration",
    title: "Every saved change becomes a focused board event.",
    summary:
      "Board-specific STOMP topics distribute updates to connected collaborators, while a transactional outbox coordinates durable state and event publication.",
    outcome: "People working on the same board see changes quickly without sacrificing confidence that the database reflects what they see.",
    icon: Radio,
    technologies: [
      { name: "WebSocket", role: "Persistent connection", icon: Radio },
      { name: "STOMP", role: "Topic messaging", icon: MessageSquareMore },
      { name: "Spring Messaging", role: "Event delivery", icon: Network },
      { name: "Outbox Pattern", role: "Reliable event record", icon: Blocks },
    ],
    highlights: [
      "A separate topic for each board",
      "Create, update, move, and delete events",
      "Transactional outbox for coordinated persistence",
      "Origin-aware event handling on the frontend",
    ],
    detailTitle: "Why use an outbox?",
    details: [
      "A domain change and its event record are committed together, reducing the gap between saved state and real-time notification.",
      "Publication can happen from recorded events instead of coupling WebSocket delivery directly to an in-flight database update.",
      "This design gives the collaboration layer a recoverable record rather than treating events as best-effort side effects.",
    ],
    visual: "realtime",
  },
  {
    id: "production",
    label: "Production",
    eyebrow: "05 / Infrastructure",
    title: "The project runs as a secured production system.",
    summary:
      "FlowBoard is deployed to an Ubuntu VPS in Oracle Cloud, served through Nginx over HTTPS, and packaged with Docker for repeatable backend deployment.",
    outcome: "Recruiters and users can evaluate a real application on a real domain—not a local demo or disconnected code sample.",
    icon: ServerCog,
    technologies: [
      { name: "Oracle Cloud", role: "VPS hosting", icon: GrOracle },
      { name: "Ubuntu", role: "Server OS", icon: SiUbuntu },
      { name: "Docker", role: "Backend packaging", icon: SiDocker },
      { name: "Nginx", role: "TLS + reverse proxy", icon: SiNginx },
    ],
    highlights: [
      "Nginx routes frontend, REST API, and WebSocket traffic",
      "HTTPS with a trusted SSL certificate",
      "Environment-based production secrets and configuration",
      "Repeatable deployment workflow on an Ubuntu server",
    ],
    detailTitle: "Production notes",
    details: [
      "Nginx is the public entry point and proxies application traffic to internal services.",
      "Only required ports are exposed publicly; backend and database access remain behind the server boundary.",
      "The deployment can be extended with GitHub Actions for automated build and release after the current repeatable workflow is fully standardized.",
    ],
    visual: "production",
  },
];

const challenges = [
  {
    icon: RefreshCw,
    title: "Reliable collaboration",
    problem: "A database update and a live notification should not drift apart.",
    solution:
      "FlowBoard records collaboration events through a transactional outbox, then publishes them to board-specific WebSocket topics.",
  },
  {
    icon: GripVertical,
    title: "Durable drag-and-drop",
    problem: "A visual reorder is meaningless if it disappears after refresh.",
    solution:
      "Column and card positions are persisted through dedicated backend operations and returned in deterministic order.",
  },
  {
    icon: Globe2,
    title: "Production delivery",
    problem: "A complete project needs more than working localhost services.",
    solution:
      "The application is deployed behind Nginx with HTTPS, domain routing, environment configuration, and containerized backend execution.",
  },
];










  


function LogoMark() {
  return (
    <span className={styles.logoMark} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function TechnologyIcon({ icon: Icon }) {
  return <Icon aria-hidden="true" />;
}

function ProductBoardMock() {
  const columns = [
    {
      title: "Backlog",
      count: 3,
      cards: [
        ["Create onboarding checklist", "Product", "Aug 12"],
        ["Review empty states", "Design", "Aug 14"],
      ],
    },
    {
      title: "In progress",
      count: 2,
      cards: [
        ["Board activity events", "Backend", "Today"],
        ["Responsive board header", "Frontend", "Aug 11"],
      ],
    },
    {
      title: "Complete",
      count: 2,
      cards: [
        ["Secure production domain", "Infra", "Done"],
        ["Persistent card ordering", "Full stack", "Done"],
      ],
    },
  ];


 

  return (
    <div className={styles.boardMock} aria-hidden="true">
      <div className={styles.mockSidebar}>
        <LogoMark />
        <span className={styles.mockSideActive} />
        <span />
        <span />
        <span />
        <span className={styles.mockSideBottom} />
      </div>
      <div className={styles.mockMain}>
        <div className={styles.mockTopbar}>
          <div>
            <span className={styles.mockBreadcrumb}>Acme Studio /</span>
            <strong>Product launch</strong>
          </div>
          <div className={styles.mockPeople}>
            <span>UH</span>
            <span>AK</span>
            <span>+3</span>
          </div>
        </div>
        <div className={styles.mockBoardHeader}>
          <div>
            <small>BOARD</small>
            <h3>Q3 Launch Plan</h3>
          </div>
          <button type="button">Share</button>
        </div>
        <div className={styles.mockColumns}>
          {columns.map((column) => (
            <div className={styles.mockColumn} key={column.title}>
              <div className={styles.mockColumnHeader}>
                <strong>{column.title}</strong>
                <span>{column.count}</span>
              </div>
              {column.cards.map(([title, tag, date]) => (
                <div className={styles.mockCard} key={title}>
                  <span className={styles.mockCardGrip} />
                  <strong>{title}</strong>
                  <div className={styles.mockCardMeta}>
                    <span>{tag}</span>
                    <small>{date}</small>
                  </div>
                </div>
              ))}
              <div className={styles.mockAdd}>+ Add task</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroScreenshot({ src }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={styles.heroVisualShell}>
        
      <div className={styles.heroVisualBar}>
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.addressBar}>flowboardapp.live/board</span>
        <span className={styles.livePill}><CircleDot size={12} /> Live</span>
      </div>
      <div className={styles.heroScreenshotFrame}>
        {!failed ? (
          <img
            src={src}
            alt="FlowBoard collaborative Kanban board interface"
            className={styles.heroScreenshot}
            onError={() => setFailed(true)}
          />
        ) : (
          <ProductBoardMock />
        
        )}
      </div>
      <div className={styles.heroVisualCaption}>
        <span><Radio size={14} /> Board updates synchronize in real time</span>
        {/* <span>Deployed on flowboardapp.live</span> */}
      </div>
    </div>
  );
}

function EngineeringVisual({ type }) {
  if (type === "realtime") {
    return (
      <div className={styles.flowVisual}>
        {["User action", "REST request", "Database + outbox", "WebSocket topic", "Collaborators"].map((item, index) => (
          <div className={styles.flowStep} key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
            {index < 4 && <ArrowDown aria-hidden="true" />}
          </div>
        ))}
      </div>
    );
  }

  if (type === "production") {
    return (
      <div className={styles.infrastructureVisual}>
        <div className={styles.infraNode}><Globe2 /><span>Browser</span><small>HTTPS</small></div>
        <MoveRight />
        <div className={`${styles.infraNode} ${styles.infraPrimary}`}><SiNginx /><span>Nginx</span><small>Public entry point</small></div>
        <div className={styles.infraBranches}>
          <div><ArrowDown /><div className={styles.infraNode}><SiReact /><span>React</span><small>Frontend</small></div></div>
          <div><ArrowDown /><div className={styles.infraNode}><SiSpringboot /><span>Spring Boot</span><small>Docker container</small></div></div>
          <div><ArrowDown /><div className={styles.infraNode}><SiMysql /><span>MySQL</span><small>Persistent data</small></div></div>
        </div>
        <div className={styles.infraFooter}><GrOracle /> Oracle Cloud · Ubuntu VPS</div>
      </div>
    );
  }

  if (type === "data") {
    return (
      <div className={styles.dataVisual}>
        <div className={styles.schemaTable}>
          <strong>project</strong><span>id</span><span>owner_id</span><span>name</span>
        </div>
        <div className={styles.schemaLine} />
        <div className={styles.schemaTable}>
          <strong>board</strong><span>id</span><span>project_id</span><span>position</span>
        </div>
        <div className={styles.schemaLine} />
        <div className={styles.schemaGrid}>
          <div className={styles.schemaTable}><strong>column</strong><span>board_id</span><span>position</span></div>
          <div className={styles.schemaTable}><strong>card</strong><span>column_id</span><span>position</span></div>
          <div className={`${styles.schemaTable} ${styles.schemaOutbox}`}><strong>outbox_event</strong><span>aggregate_id</span><span>event_type</span></div>
        </div>
      </div>
    );
  }

  if (type === "application") {
    return (
      <div className={styles.layerVisual}>
        {["JWT filter", "Controllers", "Services", "Repositories", "Domain"].map((item, index) => (
          <div key={item} style={{ "--layer-index": index }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
            <small>{["Authenticate request", "HTTP boundary", "Business rules", "Data access", "Core entities"][index]}</small>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.experienceVisual}>
      <div className={styles.experienceToolbar}>
        <span /> <span /> <span />
        <div>Board workspace</div>
      </div>
      <div className={styles.experienceBody}>
        <div className={styles.experienceSidebar}><LogoMark /><span /><span /><span /></div>
        <div className={styles.experienceCanvas}>
          {[0, 1, 2].map((column) => (
            <div className={styles.experienceColumn} key={column}>
              <div className={styles.experienceColumnTitle}><span /><small>{column + 2}</small></div>
              {[0, 1, 2].slice(0, column === 2 ? 2 : 3).map((card) => (
                <div className={styles.experienceCard} key={card}>
                  <span /><strong /><small />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cursorNote}><Zap size={13} /> optimistic update</div>
    </div>
  );
}

function EngineeringSection() {
  const [activeId, setActiveId] = useState("experience");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const active = useMemo(
    () => engineeringLayers.find((layer) => layer.id === activeId) ?? engineeringLayers[0],
    [activeId],
  );

  useEffect(() => setDetailsOpen(false), [activeId]);

  return (
    <section className={styles.engineeringSection} id="engineering">
      <div className={styles.sectionInner}>
        <div className={styles.engineeringIntro}>
          <div>
            <span className={styles.sectionKicker}>FROM INTERFACE TO INFRASTRUCTURE</span>
            <h2>What feels simple on the surface is supported by a complete system underneath.</h2>
          </div>
          <p>
            Explore FlowBoard one layer at a time. Each layer connects a user-facing outcome to the engineering decisions that make it possible.
          </p>
        </div>

        <div className={styles.layerRail} role="tablist" aria-label="FlowBoard engineering layers">
          {engineeringLayers.map((layer, index) => {
            const Icon = layer.icon;
            const selected = activeId === layer.id;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="engineering-panel"
                className={selected ? styles.layerTabActive : styles.layerTab}
                onClick={() => setActiveId(layer.id)}
                key={layer.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <strong>{layer.label}</strong>
              </button>
            );
          })}
        </div>

        <div className={styles.engineeringPanel} id="engineering-panel" role="tabpanel">
          <div className={styles.engineeringContent}>
            <span className={styles.panelEyebrow}>{active.eyebrow}</span>
            <h3>{active.title}</h3>
            <p className={styles.panelSummary}>{active.summary}</p>
            <div className={styles.outcomeBox}>
              <Sparkles size={17} />
              <div><small>PRODUCT OUTCOME</small><p>{active.outcome}</p></div>
            </div>

            <div className={styles.techGrid}>
              {active.technologies.map((technology) => (
                <div className={styles.techItem} key={technology.name}>
                  <span className={styles.techIcon}><TechnologyIcon icon={technology.icon} /></span>
                  <div><strong>{technology.name}</strong><small>{technology.role}</small></div>
                </div>
              ))}
            </div>

            <ul className={styles.highlightList}>
              {active.highlights.map((highlight) => (
                <li key={highlight}><Check size={15} />{highlight}</li>
              ))}
            </ul>

            <button
              type="button"
              className={styles.detailToggle}
              aria-expanded={detailsOpen}
              onClick={() => setDetailsOpen((current) => !current)}
            >
              {active.detailTitle}
              <ChevronDown className={detailsOpen ? styles.chevronOpen : ""} />
            </button>

            <div className={`${styles.detailDrawer} ${detailsOpen ? styles.detailDrawerOpen : ""}`}>
              <div>
                {active.details.map((detail, index) => (
                  <p key={detail}><span>{String(index + 1).padStart(2, "0")}</span>{detail}</p>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.engineeringVisualWrap}>
            <EngineeringVisual type={active.visual} />
            <span className={styles.visualLabel}>FLOWBOARD / {active.label.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FlowBoardLandingPage({
  appUrl = DEFAULT_LINKS.app,
  githubUrl = DEFAULT_LINKS.github,
  heroImageSrc = "src/assets/demo-board-blue.png",
}) {

  const navigate =useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);



  const  demoLogin = async() => {
        
    
        try {
          const response = await fetch(`${API_BASE_URL}/auth/demoLogin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
    
          if (response.ok) {

            const data = await response.json();

            //Save token to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", Number(data.userId));
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("userEmail", data.email);
            proceedFromLogin();
            //alert("Login successful!");
            
          } else {
            const error = await response.text();
            
            alert("Login failed: " + error);
          }
        } catch (error) {
            console.error(error);
        }
      };



 const handleDemoLogin = ()=>
  {
    demoLogin();
    console.log("handle demo login")
  }


   const proceedFromLogin = () => {
    setTimeout(() => {
          navigate("/dashboard");
            }, 300);
    }



  return (
    <div className={styles.page}>

      <header className={styles.header}>

        <div>
            
        </div>


        
        <div className={styles.headerInner}>

            




          <a className={styles.brand} href="#top" aria-label="FlowBoard home">
            {/* <LogoMark /> */}
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>FlowBoard</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Primary navigation">
            <a href="#product">Product</a>
            <a href="#engineering">Engineering</a>
            <a href="#challenges">Challenges</a>
            <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
          </nav>

          <div className={styles.headerActions}>
            <Link className={styles.signInLink} to="/login" >Sign in</Link>
            <Link className={styles.headerCta} to="/dashboard" rel="noreferrer">
              Open app <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            className={styles.mobileMenuButton}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`} ref={mobileMenuRef} aria-hidden={!mobileOpen}>
        <div className={styles.mobileMenuHeader}>
          <a className={styles.brand} href="#top" onClick={closeMobile}><LogoMark /><span>FlowBoard</span></a>
          <button type="button" aria-label="Close navigation" onClick={closeMobile}><X /></button>
        </div>
        <nav>
          <a href="#product" onClick={closeMobile}>Product <ArrowRight /></a>
          <a href="#engineering" onClick={closeMobile}>Engineering <ArrowRight /></a>
          <a href="#challenges" onClick={closeMobile}>Challenges <ArrowRight /></a>
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
        </nav>
        <a className={styles.mobileCta} href={appUrl} target="_blank" rel="noreferrer">Open live application <ArrowUpRight /></a>
      </div>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.heroStatus}><span /><strong>LIVE NOW</strong>
              {/* <span>FLOWBOARDAPP.LIVE</span> */}  
              </div>
              <h1>Plan the work.<br /><span>See every change.</span></h1>
              <p className={styles.heroLead}>
                A real-time collaborative Kanban application designed, engineered, and deployed across the full stack.
              </p>
              <div className={styles.heroActions}>
                <div className={styles.primaryButton} onClick={() => {handleDemoLogin()}} rel="noreferrer">
                  FlowBoard Demo <ArrowUpRight size={17} />
                </div>
                <a className={styles.secondaryButton} href={githubUrl} target="_blank" rel="noreferrer">
                  <Github size={17} /> View source
                </a>
              </div>
              <div className={styles.heroProof}>
                <div><strong>React + Spring Boot</strong><span>Full-stack application</span></div>
                <div><strong>WebSocket + STOMP</strong><span>Board-level live updates</span></div>
                <div><strong>Docker + Nginx</strong><span>Production deployment</span></div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <HeroScreenshot src={heroImageSrc} />
            </div>
          </div>
          <a className={styles.heroScroll} href="#product"><ArrowDown size={14} /> Explore the product</a>
        </section>

        <section className={styles.productSection} id="product">
          <div className={styles.sectionInner}>
            <div className={styles.productIntro}>
              <span className={styles.sectionKicker}>THE PRODUCT</span>
              <h2>A focused workspace for planning work together.</h2>
              <p>
                FlowBoard brings projects, boards, tasks, priorities, and collaborators into one interface while keeping the underlying workflow durable and synchronized.
              </p>
            </div>

            <div className={styles.productFeatureGrid}>
              {productFeatures.map(({ icon: Icon, title, copy, number }) => (
                <article className={styles.productFeature} key={title}>
                  <div className={styles.featureTop}><span>{number}</span><Icon aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>

            <div className={styles.productStory}>
              <div className={styles.productStoryVisual}>
                <ProductBoardMock />
              </div>
              <div className={styles.productStoryCopy}>
                <span className={styles.sectionKicker}>ONE BOARD, SHARED STATE</span>
                <h2>Designed around the way work actually moves.</h2>
                <p>
                  Users can create projects, organize boards, edit task details, reorder work, and see collaborators’ changes without leaving the page.
                </p>
                <div className={styles.storySteps}>
                  <div><span>01</span><p><strong>Organize</strong> projects into boards and flexible workflow columns.</p></div>
                  <div><span>02</span><p><strong>Move</strong> cards naturally while FlowBoard saves their exact order.</p></div>
                  <div><span>03</span><p><strong>Collaborate</strong> through focused events delivered only to the relevant board.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.transitionSection}>
          <div className={styles.sectionInner}>
            <div className={styles.transitionLine} />
            <div className={styles.transitionContent}>
              <span>PRODUCT ABOVE</span>
              <Network />
              <strong>The interface is only the visible layer.</strong>
              <p>Below it sits authentication, domain logic, relational persistence, reliable events, and production infrastructure.</p>
              <span>ENGINEERING BELOW</span>
            </div>
          </div>
        </section>

        <EngineeringSection />

        <section className={styles.challengesSection} id="challenges">
          <div className={styles.sectionInner}>
            <div className={styles.challengesHeading}>
              <span className={styles.sectionKicker}>ENGINEERING CHALLENGES</span>
              <h2>The important work was not choosing technologies. It was making them cooperate.</h2>
            </div>
            <div className={styles.challengeGrid}>
              {challenges.map(({ icon: Icon, title, problem, solution }, index) => (
                <article className={styles.challengeCard} key={title}>
                  <div className={styles.challengeCardTop}><span>0{index + 1}</span><Icon /></div>
                  <h3>{title}</h3>
                  <div className={styles.challengePart}><small>THE PROBLEM</small><p>{problem}</p></div>
                  <div className={styles.challengePart}><small>THE RESPONSE</small><p>{solution}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.sectionInner}>
            <div className={styles.aboutGrid}>
              <div>
                <span className={styles.sectionKicker}>WHY I BUILT IT</span>
                <h2>A portfolio project taken through the entire engineering lifecycle.</h2>
              </div>
              <div className={styles.aboutCopy}>
                <p>
                  I built FlowBoard to go beyond a static CRUD demonstration. The goal was to design a usable product, model its domain, secure its API, synchronize concurrent clients, preserve reliable state, and operate the result in production.
                </p>
                <p>
                  The live application demonstrates the product. The source repository documents the implementation, architecture, setup, and decisions behind it.
                </p>
                <a href={githubUrl} target="_blank" rel="noreferrer">Review the engineering on GitHub <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCtaSection}>
          <div className={styles.sectionInner}>
            <div className={styles.finalCta}>
              <div>
                <span className={styles.sectionKicker}>FLOWBOARD IS LIVE</span>
                <h2>See the product. Then inspect how it was built.</h2>
              </div>
              <div className={styles.finalActions}>
                <a className={styles.finalPrimary} href={appUrl} target="_blank" rel="noreferrer">Open FlowBoard <ArrowUpRight /></a>
                <a className={styles.finalSecondary} href={githubUrl} target="_blank" rel="noreferrer"><Github /> View repository</a>
              </div>
              <div className={styles.finalMeta}>
                <span><CircleDot size={13} /> Live at flowboardapp.live</span>
                <span>Designed and built by Ubaid</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a className={styles.brand} href="#top"><Layers /><span>FlowBoard</span></a>
          <p>Real-time collaborative project management.</p>
          <div><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={appUrl} target="_blank" rel="noreferrer">Live app</a><a href="#top">Back to top <ArrowUpRight size={12} /></a></div>
        </div>
      </footer> */}


      {/* Footer */}
      <footer className="border-t border-border bg-white   py-12 pb-40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
                <Layers className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">FlowBoard</span>
            </div>

            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Built with care by the FlowBoard Team</p>
          </div> */}
        </div>
      </footer>

    </div>
  );
}