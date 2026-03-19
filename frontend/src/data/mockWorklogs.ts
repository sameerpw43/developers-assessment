// Mock data layer simulating backend API responses for the WorkLog Payment Dashboard

const freelancers = [
    {
        id: "fr-001",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        hourly_rate: 75,
        avatar_url: null,
    },
    {
        id: "fr-002",
        name: "Bob Martinez",
        email: "bob.martinez@example.com",
        hourly_rate: 90,
        avatar_url: null,
    },
    {
        id: "fr-003",
        name: "Carla Nguyen",
        email: "carla.nguyen@example.com",
        hourly_rate: 110,
        avatar_url: null,
    },
    {
        id: "fr-004",
        name: "David Kim",
        email: "david.kim@example.com",
        hourly_rate: 85,
        avatar_url: null,
    },
]

const worklogs = [
    {
        id: "wl-001",
        task_name: "Homepage Redesign",
        description: "Complete redesign of the company homepage with new branding",
        freelancer_id: "fr-001",
        status: "pending",
        created_at: "2026-02-10T09:00:00.000Z",
        total_hours: 24.5,
        total_earnings: 1837.5,
    },
    {
        id: "wl-002",
        task_name: "API Integration - Stripe",
        description: "Integrate Stripe payment gateway with the checkout flow",
        freelancer_id: "fr-002",
        status: "pending",
        created_at: "2026-02-12T10:30:00.000Z",
        total_hours: 32,
        total_earnings: 2880,
    },
    {
        id: "wl-003",
        task_name: "Mobile App Bug Fixes",
        description: "Fix critical bugs reported in the iOS and Android apps",
        freelancer_id: "fr-003",
        status: "approved",
        created_at: "2026-02-15T08:00:00.000Z",
        total_hours: 18,
        total_earnings: 1980,
    },
    {
        id: "wl-004",
        task_name: "Database Migration",
        description: "Migrate from MySQL to PostgreSQL with data integrity checks",
        freelancer_id: "fr-004",
        status: "pending",
        created_at: "2026-02-18T11:00:00.000Z",
        total_hours: 40,
        total_earnings: 3400,
    },
    {
        id: "wl-005",
        task_name: "User Authentication Overhaul",
        description: "Implement OAuth2 and MFA for the admin panel",
        freelancer_id: "fr-001",
        status: "approved",
        created_at: "2026-03-01T09:00:00.000Z",
        total_hours: 28,
        total_earnings: 2100,
    },
    {
        id: "wl-006",
        task_name: "Dashboard Analytics Widget",
        description: "Build interactive analytics widgets for the admin dashboard",
        freelancer_id: "fr-002",
        status: "paid",
        created_at: "2026-01-20T14:00:00.000Z",
        total_hours: 15,
        total_earnings: 1350,
    },
    {
        id: "wl-007",
        task_name: "Email Notification System",
        description: "Design and implement transactional email notification system",
        freelancer_id: "fr-003",
        status: "pending",
        created_at: "2026-03-05T10:00:00.000Z",
        total_hours: 22,
        total_earnings: 2420,
    },
    {
        id: "wl-008",
        task_name: "Performance Optimization",
        description: "Optimize slow queries and implement caching layer",
        freelancer_id: "fr-004",
        status: "approved",
        created_at: "2026-03-10T08:30:00.000Z",
        total_hours: 35,
        total_earnings: 2975,
    },
]

const timeEntries = [
    // wl-001: Homepage Redesign (Alice, 24.5h)
    { id: "te-001", worklog_id: "wl-001", description: "Wireframe creation and stakeholder review", start_time: "2026-02-10T09:00:00.000Z", end_time: "2026-02-10T17:00:00.000Z", hours: 8, date: "2026-02-10T00:00:00.000Z" },
    { id: "te-002", worklog_id: "wl-001", description: "High-fidelity mockups in Figma", start_time: "2026-02-11T09:00:00.000Z", end_time: "2026-02-11T17:30:00.000Z", hours: 8.5, date: "2026-02-11T00:00:00.000Z" },
    { id: "te-003", worklog_id: "wl-001", description: "Frontend implementation with responsive layout", start_time: "2026-02-12T10:00:00.000Z", end_time: "2026-02-12T18:00:00.000Z", hours: 8, date: "2026-02-12T00:00:00.000Z" },

    // wl-002: API Integration - Stripe (Bob, 32h)
    { id: "te-004", worklog_id: "wl-002", description: "Stripe SDK setup and sandbox configuration", start_time: "2026-02-12T10:30:00.000Z", end_time: "2026-02-12T18:30:00.000Z", hours: 8, date: "2026-02-12T00:00:00.000Z" },
    { id: "te-005", worklog_id: "wl-002", description: "Payment intent flow implementation", start_time: "2026-02-13T09:00:00.000Z", end_time: "2026-02-13T19:00:00.000Z", hours: 10, date: "2026-02-13T00:00:00.000Z" },
    { id: "te-006", worklog_id: "wl-002", description: "Webhook handler for payment confirmations", start_time: "2026-02-14T09:00:00.000Z", end_time: "2026-02-14T15:00:00.000Z", hours: 6, date: "2026-02-14T00:00:00.000Z" },
    { id: "te-007", worklog_id: "wl-002", description: "Error handling and retry logic", start_time: "2026-02-15T10:00:00.000Z", end_time: "2026-02-15T18:00:00.000Z", hours: 8, date: "2026-02-15T00:00:00.000Z" },

    // wl-003: Mobile App Bug Fixes (Carla, 18h)
    { id: "te-008", worklog_id: "wl-003", description: "iOS crash on login - stack trace analysis", start_time: "2026-02-15T08:00:00.000Z", end_time: "2026-02-15T14:00:00.000Z", hours: 6, date: "2026-02-15T00:00:00.000Z" },
    { id: "te-009", worklog_id: "wl-003", description: "Android memory leak fix in image gallery", start_time: "2026-02-16T09:00:00.000Z", end_time: "2026-02-16T16:00:00.000Z", hours: 7, date: "2026-02-16T00:00:00.000Z" },
    { id: "te-010", worklog_id: "wl-003", description: "Cross-platform regression testing", start_time: "2026-02-17T10:00:00.000Z", end_time: "2026-02-17T15:00:00.000Z", hours: 5, date: "2026-02-17T00:00:00.000Z" },

    // wl-004: Database Migration (David, 40h)
    { id: "te-011", worklog_id: "wl-004", description: "Schema analysis and migration plan", start_time: "2026-02-18T11:00:00.000Z", end_time: "2026-02-18T19:00:00.000Z", hours: 8, date: "2026-02-18T00:00:00.000Z" },
    { id: "te-012", worklog_id: "wl-004", description: "Data export and transformation scripts", start_time: "2026-02-19T09:00:00.000Z", end_time: "2026-02-19T19:00:00.000Z", hours: 10, date: "2026-02-19T00:00:00.000Z" },
    { id: "te-013", worklog_id: "wl-004", description: "PostgreSQL schema creation and import", start_time: "2026-02-20T09:00:00.000Z", end_time: "2026-02-20T21:00:00.000Z", hours: 12, date: "2026-02-20T00:00:00.000Z" },
    { id: "te-014", worklog_id: "wl-004", description: "Data integrity validation and rollback plan", start_time: "2026-02-21T09:00:00.000Z", end_time: "2026-02-21T19:00:00.000Z", hours: 10, date: "2026-02-21T00:00:00.000Z" },

    // wl-005: User Authentication Overhaul (Alice, 28h)
    { id: "te-015", worklog_id: "wl-005", description: "OAuth2 provider configuration (Google, GitHub)", start_time: "2026-03-01T09:00:00.000Z", end_time: "2026-03-01T19:00:00.000Z", hours: 10, date: "2026-03-01T00:00:00.000Z" },
    { id: "te-016", worklog_id: "wl-005", description: "MFA implementation with TOTP", start_time: "2026-03-02T09:00:00.000Z", end_time: "2026-03-02T18:00:00.000Z", hours: 9, date: "2026-03-02T00:00:00.000Z" },
    { id: "te-017", worklog_id: "wl-005", description: "Session management and token refresh", start_time: "2026-03-03T10:00:00.000Z", end_time: "2026-03-03T19:00:00.000Z", hours: 9, date: "2026-03-03T00:00:00.000Z" },

    // wl-006: Dashboard Analytics Widget (Bob, 15h)
    { id: "te-018", worklog_id: "wl-006", description: "Chart library evaluation and setup", start_time: "2026-01-20T14:00:00.000Z", end_time: "2026-01-20T19:00:00.000Z", hours: 5, date: "2026-01-20T00:00:00.000Z" },
    { id: "te-019", worklog_id: "wl-006", description: "Revenue and user growth widgets", start_time: "2026-01-21T09:00:00.000Z", end_time: "2026-01-21T19:00:00.000Z", hours: 10, date: "2026-01-21T00:00:00.000Z" },

    // wl-007: Email Notification System (Carla, 22h)
    { id: "te-020", worklog_id: "wl-007", description: "Email template design and HTML/CSS coding", start_time: "2026-03-05T10:00:00.000Z", end_time: "2026-03-05T18:00:00.000Z", hours: 8, date: "2026-03-05T00:00:00.000Z" },
    { id: "te-021", worklog_id: "wl-007", description: "SendGrid integration and queue system", start_time: "2026-03-06T09:00:00.000Z", end_time: "2026-03-06T17:00:00.000Z", hours: 8, date: "2026-03-06T00:00:00.000Z" },
    { id: "te-022", worklog_id: "wl-007", description: "Event-driven triggers and delivery tracking", start_time: "2026-03-07T10:00:00.000Z", end_time: "2026-03-07T16:00:00.000Z", hours: 6, date: "2026-03-07T00:00:00.000Z" },

    // wl-008: Performance Optimization (David, 35h)
    { id: "te-023", worklog_id: "wl-008", description: "Database query profiling and index optimization", start_time: "2026-03-10T08:30:00.000Z", end_time: "2026-03-10T18:30:00.000Z", hours: 10, date: "2026-03-10T00:00:00.000Z" },
    { id: "te-024", worklog_id: "wl-008", description: "Redis caching layer implementation", start_time: "2026-03-11T09:00:00.000Z", end_time: "2026-03-11T22:00:00.000Z", hours: 13, date: "2026-03-11T00:00:00.000Z" },
    { id: "te-025", worklog_id: "wl-008", description: "Load testing and performance benchmarks", start_time: "2026-03-12T09:00:00.000Z", end_time: "2026-03-12T21:00:00.000Z", hours: 12, date: "2026-03-12T00:00:00.000Z" },
]

// Simulate async API calls — all return Promise<any> per AGENTS.md
export async function getWorklogs(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return worklogs.map((wl) => {
        const freelancer = freelancers.find((f) => f.id === wl.freelancer_id)
        return { ...wl, freelancer_name: freelancer?.name ?? "Unknown" }
    })
}

export async function getWorklogById(id: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const worklog = worklogs.find((wl) => wl.id === id)
    if (!worklog) return null
    const freelancer = freelancers.find((f) => f.id === worklog.freelancer_id)
    const entries = timeEntries.filter((te) => te.worklog_id === id)
    return { ...worklog, freelancer, time_entries: entries }
}

export async function getTimeEntries(worklogId: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return timeEntries.filter((te) => te.worklog_id === worklogId)
}

export async function getFreelancer(id: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return freelancers.find((f) => f.id === id) ?? null
}

export async function getFreelancers(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return freelancers
}

export async function getWorklogsByIds(ids: string[]): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return worklogs
        .filter((wl) => ids.includes(wl.id))
        .map((wl) => {
            const freelancer = freelancers.find((f) => f.id === wl.freelancer_id)
            const entries = timeEntries.filter((te) => te.worklog_id === wl.id)
            return { ...wl, freelancer, time_entries: entries }
        })
}
