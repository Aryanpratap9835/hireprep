export type InterviewCategory = "DSA" | "CS Fundamentals" | "Behavioral" | "Mixed";
export type InterviewDifficulty = "Easy" | "Medium" | "Hard";
export type TargetRole = "SDE Intern" | "Frontend Developer" | "Backend Developer" | "Full Stack Developer" | "DevOps Engineer" | "System Architect";

export interface InterviewQuestion {
    id: string;
    type: "CS_FUNDAMENTALS" | "BEHAVIORAL" | "DSA";
    category: string;
    subtopic: string;
    title: string;
    question: string;
    context?: string;
    difficulty: InterviewDifficulty;
    roles: TargetRole[];
    expectedPoints: string[];
    sampleAnswerFramework: string;
    hints: string[];
    dsaProblemId?: string;
}

export interface EvaluationResult {
    score: number; // 0 to 10
    verdict: "Strong Hire" | "Hire" | "Leaning Hire" | "Needs Improvement" | "Unsatisfactory";
    analysis: string;
    strengths: string[];
    missingPoints: string[];
    starBreakdown?: {
        situation: string;
        task: string;
        action: string;
        result: string;
    };
    idealAnswer: string;
    actionableTips: string[];
}

export const CS_FUNDAMENTALS_QUESTIONS: InterviewQuestion[] = [
    {
        id: "cs-os-1",
        type: "CS_FUNDAMENTALS",
        category: "Operating Systems",
        subtopic: "Processes & Threads",
        title: "Process vs Thread & Memory Layout",
        question: "Explain the fundamental differences between a process and a thread. How does the operating system handle context switching between threads of the same process versus context switching between different processes?",
        context: "Commonly asked in core engineering interviews to test understanding of OS scheduling, memory isolation, and concurrency overhead.",
        difficulty: "Easy",
        roles: ["SDE Intern", "Backend Developer", "Full Stack Developer"],
        expectedPoints: [
            "A process is an execution environment with its own dedicated virtual address space (code, data, heap, stack, file descriptors).",
            "A thread is the smallest unit of CPU scheduling that shares code, data, heap, and open files with other threads in the same process, but possesses its own stack, registers, and program counter.",
            "Context switching between processes requires invalidating TLB (Translation Lookaside Buffer) and changing memory page tables (CR3 register in x86), which is costly.",
            "Thread context switching within the same process retains the virtual memory mapping and TLB cache, making it significantly faster.",
        ],
        sampleAnswerFramework: "Define process vs thread -> Compare memory structure (shared heap vs private stack) -> Explain context switch mechanics (page table switch & TLB flush for process vs register/stack swap for thread) -> Discuss IPC vs shared-memory concurrency.",
        hints: [
            "Think about what happens to the MMU and TLB caches during context switches.",
            "Compare how threads communicate (shared memory) vs processes (IPC like pipes, sockets, shared memory segments).",
        ],
    },
    {
        id: "cs-os-2",
        type: "CS_FUNDAMENTALS",
        category: "Operating Systems",
        subtopic: "Deadlocks & Concurrency",
        title: "Deadlock Conditions & Prevention",
        question: "What are the 4 Coffman conditions required for a deadlock to occur? Describe at least two techniques operating systems or database engines use to prevent or resolve deadlocks.",
        context: "Essential for assessing concurrent systems design and race-condition prevention.",
        difficulty: "Medium",
        roles: ["Backend Developer", "Full Stack Developer", "SDE Intern", "System Architect"],
        expectedPoints: [
            "The 4 conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
            "Resource Ordering: Impose a global total order on all lock acquisitions to break the Circular Wait condition.",
            "Deadlock Detection & Recovery: Maintain a Wait-For Graph (WFG) and detect cycles; terminate or rollback one of the transactions/processes.",
            "Banker's Algorithm / Safe State verification for avoidance.",
            "Timeouts & Backoff mechanisms.",
        ],
        sampleAnswerFramework: "Enumerate the 4 Coffman conditions -> Explain breaking circular wait via lock ordering -> Describe detection algorithms (Wait-For-Graph cycle detection) -> Discuss recovery strategies (kill process vs transaction rollback).",
        hints: [
            "Remember that all 4 conditions must hold simultaneously for a deadlock.",
            "How does strict lock acquisition ordering eliminate circular wait?",
        ],
    },
    {
        id: "cs-os-3",
        type: "CS_FUNDAMENTALS",
        category: "Operating Systems",
        subtopic: "Virtual Memory",
        title: "Virtual Memory, Paging, and Thrashing",
        question: "How does virtual memory work using paging and page tables? What causes thrashing in an operating system, and how does the OS mitigate it?",
        context: "Tests depth of system architecture and memory management.",
        difficulty: "Hard",
        roles: ["Backend Developer", "System Architect", "DevOps Engineer"],
        expectedPoints: [
            "Virtual memory translates virtual addresses to physical addresses using Page Tables and MMU (Hardware Memory Management Unit).",
            "Page faults occur when a requested page is not in physical RAM (present bit = 0), triggering an OS disk I/O interrupt to swap the page in.",
            "Thrashing occurs when the total working set of active processes exceeds physical RAM, causing the OS to spend more time swapping pages to/from disk than executing instructions.",
            "Mitigation: Working Set Model, Local page replacement policies, and suspending low-priority processes.",
        ],
        sampleAnswerFramework: "Explain Virtual-to-Physical translation (MMU, Page Tables, TLB) -> Detail the Page Fault lifecycle -> Define Thrashing and Working Set size -> Outline solutions (Page fault frequency monitoring, suspension).",
        hints: [
            "Connect the concept of working set to the rate of page faults.",
        ],
    },
    {
        id: "cs-db-1",
        type: "CS_FUNDAMENTALS",
        category: "DBMS",
        subtopic: "Transactions & ACID",
        title: "ACID Properties & Transaction Isolation Levels",
        question: "Explain the ACID properties in relational databases. Then describe the 4 SQL isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) along with the concurrency phenomena they prevent (Dirty Read, Non-repeatable Read, Phantom Read).",
        context: "A universal question in backend engineering interviews regarding data consistency and high-throughput transactions.",
        difficulty: "Medium",
        roles: ["Backend Developer", "Full Stack Developer", "SDE Intern"],
        expectedPoints: [
            "Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent execution is safe), Durability (persisted after commit).",
            "Read Uncommitted: Prevents nothing; allows dirty reads.",
            "Read Committed: Prevents dirty reads (only reads committed data).",
            "Repeatable Read: Prevents dirty reads & non-repeatable reads (re-reading a row returns the same values, often using MVCC).",
            "Serializable: Prevents all anomalies including phantom reads (range locks or serializable snapshot isolation).",
        ],
        sampleAnswerFramework: "Define ACID -> Define the 3 anomalies (Dirty, Non-repeatable, Phantom Read) -> Map the 4 standard SQL isolation levels -> Explain how modern engines like Postgres use MVCC.",
        hints: [
            "Differentiate between non-repeatable read (updating existing row) and phantom read (inserting new matching rows).",
        ],
    },
    {
        id: "cs-db-2",
        type: "CS_FUNDAMENTALS",
        category: "DBMS",
        subtopic: "Indexing & Performance",
        title: "Database Indexing: B-Trees vs Hash Indexes & Optimization",
        question: "Why do relational databases commonly use B+ Trees instead of Hash Indexes or Binary Search Trees for indexes? How does composite indexing work, and what is the 'Leftmost Prefix Rule'?",
        context: "Tests real-world database query optimization and disk-aware data structure principles.",
        difficulty: "Medium",
        roles: ["Backend Developer", "Full Stack Developer", "System Architect"],
        expectedPoints: [
            "B+ Trees store all data pointers at leaf nodes linked sequentially, making range queries (BETWEEN, >, <) O(log N + k) fast.",
            "Hash indexes only support exact equality matches O(1) and cannot handle range queries or prefix searches.",
            "B+ Trees have high fanout (branching factor), minimizing disk I/O seek operations compared to deep Binary Trees.",
            "Composite Index (A, B, C): The leftmost prefix rule states that queries can use the index if they filter by (A), (A, B), or (A, B, C), but not (B, C) alone.",
        ],
        sampleAnswerFramework: "Explain disk block size and B+ Tree fanout -> Contrast range query efficiency in B+ Tree vs Hash -> Explain composite index order and the leftmost prefix principle.",
        hints: [
            "Think about how disk pages and cache lines impact node size.",
        ],
    },
    {
        id: "cs-net-1",
        type: "CS_FUNDAMENTALS",
        category: "Computer Networks",
        subtopic: "TCP/IP & Transport",
        title: "TCP 3-Way Handshake, Teardown, and TCP vs UDP",
        question: "Walk through the TCP 3-way handshake and 4-way termination process. Compare TCP and UDP in terms of reliability, ordering, flow control, and suitable use cases.",
        context: "Core networking concept evaluating client-server communication protocols.",
        difficulty: "Easy",
        roles: ["SDE Intern", "Backend Developer", "Full Stack Developer", "DevOps Engineer"],
        expectedPoints: [
            "3-Way Handshake: SYN -> SYN-ACK -> ACK (synchronizes initial sequence numbers ISN).",
            "4-Way Teardown: FIN -> ACK -> FIN -> ACK (with TIME_WAIT state to ensure duplicate segments drain).",
            "TCP is connection-oriented, reliable (ACKs, retransmissions), ordered, and implements Congestion & Flow Control (Sliding Window).",
            "UDP is connectionless, lightweight, low-latency, and unordered without retransmission.",
            "Use cases: TCP for Web/HTTP, file transfer; UDP for live streaming, VoIP, multiplayer gaming, DNS.",
        ],
        sampleAnswerFramework: "Diagram the SYN/SYN-ACK/ACK sequence -> Explain TIME_WAIT reason in teardown -> Table comparison of TCP vs UDP -> Practical application examples.",
        hints: [
            "Why is TIME_WAIT necessary on the initiating client side?",
        ],
    },
    {
        id: "cs-net-2",
        type: "CS_FUNDAMENTALS",
        category: "Computer Networks",
        subtopic: "Web Protocols & Security",
        title: "HTTPS, TLS Handshake, and Certificate Validation",
        question: "What happens from a security and network perspective when a browser connects to an HTTPS URL? Detail the TLS handshake and how asymmetric and symmetric encryption are combined.",
        context: "Evaluates web security fundamentals and cryptographic protocol knowledge.",
        difficulty: "Medium",
        roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer"],
        expectedPoints: [
            "Client Hello (cipher suites, client random) -> Server Hello (chosen cipher, server certificate, server random).",
            "Certificate verification against Root Certificate Authorities (CA) in browser trust store.",
            "Key Exchange: Diffie-Hellman / ECDHE or Pre-Master Secret encrypted with Server Public Key.",
            "Session Key derivation: Both parties derive symmetric session keys (AES) for fast data encryption.",
            "Finished / Finished messages encrypted with session key to verify handshake integrity.",
        ],
        sampleAnswerFramework: "Explain why hybrid encryption is used (asymmetric for key exchange, symmetric for payload) -> Step through TLS 1.3 handshake -> Discuss certificate chain validation.",
        hints: [
            "Why do we not use asymmetric RSA/ECC for encrypting the entire HTTP request body?",
        ],
    },
    {
        id: "cs-oop-1",
        type: "CS_FUNDAMENTALS",
        category: "System Design & OOP",
        subtopic: "SOLID Principles & Design Patterns",
        title: "SOLID Principles with Real-World Refactoring Example",
        question: "Explain the 5 SOLID principles. Pick two (such as Single Responsibility and Dependency Inversion) and explain how applying them improves a codebase's testability and extensibility.",
        context: "Checks software engineering craft, code maintainability, and architectural discipline.",
        difficulty: "Medium",
        roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "SDE Intern"],
        expectedPoints: [
            "S: Single Responsibility Principle (a class/module has only one reason to change).",
            "O: Open/Closed Principle (open for extension, closed for modification).",
            "L: Liskov Substitution Principle (subtypes must be substitutable for base types).",
            "I: Interface Segregation Principle (many client-specific interfaces rather than one general interface).",
            "D: Dependency Inversion Principle (depend upon abstractions, not concretions).",
            "DIP enables mock injection in unit testing and swapping database/payment drivers seamlessly.",
        ],
        sampleAnswerFramework: "Summarize S-O-L-I-D briefly -> Deep dive into SRP and DIP with a code scenario (e.g. UserService depending on UserRepository interface instead of raw SQL client) -> Explain unit testing benefits.",
        hints: [
            "Show how Dependency Inversion enables testing with mocks.",
        ],
    },
];

export const BEHAVIORAL_QUESTIONS: InterviewQuestion[] = [
    {
        id: "beh-1",
        type: "BEHAVIORAL",
        category: "Problem Solving & Deadlines",
        subtopic: "High-Pressure Delivery",
        title: "Handling Tight Deadlines & Critical Production Bugs",
        question: "Tell me about a time you encountered a severe technical bug or blocker under a tight project deadline. How did you identify the issue, prioritize fixes, and communicate with your team?",
        context: "Assesses resilience, debugging discipline, composure under pressure, and communication.",
        difficulty: "Medium",
        roles: ["SDE Intern", "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer"],
        expectedPoints: [
            "Clear STAR structure (Situation, Task, Action, Result).",
            "Identified root cause using systematic debugging (logs, metrics, isolation).",
            "Prioritized quick mitigation (rollback or hotfix) vs long-term root-cause fix.",
            "Communicated proactively with stakeholders/team members about progress and risk.",
            "Post-incident reflection, monitoring, or automated test addition to prevent recurrence.",
        ],
        sampleAnswerFramework: "Situation (Context, deadline, what broke) -> Task (Your specific role and goal) -> Action (Triage, systematic diagnosis, communication, implemented fix) -> Result (Delivered on time, metric improvement, post-mortem).",
        hints: [
            "Use the STAR method: Situation -> Task -> Action -> Result.",
            "Highlight your personal contributions ('I investigated...', 'I decided...') rather than just 'we'.",
        ],
    },
    {
        id: "beh-2",
        type: "BEHAVIORAL",
        category: "Teamwork & Conflict Resolution",
        subtopic: "Technical Disagreement",
        title: "Navigating Technical Disagreements in Code Reviews or Architecture",
        question: "Describe a situation where you had a significant technical disagreement with a peer or senior engineer regarding code architecture, tool selection, or implementation approach. How did you handle it, and what was the outcome?",
        context: "Measures emotional intelligence, humility, objective data-driven reasoning, and collaboration.",
        difficulty: "Medium",
        roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "System Architect"],
        expectedPoints: [
            "Remained professional and focused on project goals rather than ego.",
            "Gathered objective benchmarks, trade-off comparisons, or quick prototypes to evaluate approaches.",
            "Listened actively to understand the other person's constraints and viewpoint.",
            "Reached alignment or committed to the agreed decision wholeheartedly (Disagree and Commit).",
            "Positive outcome on codebase maintainability and team relationship.",
        ],
        sampleAnswerFramework: "Situation (What was being built) -> Task (The conflicting approaches) -> Action (Constructive conversation, benchmarks/PoC, listening to constraints) -> Result (Optimal solution reached, mutual respect strengthened).",
        hints: [
            "Demonstrate how you use evidence and trade-offs rather than opinions.",
        ],
    },
    {
        id: "beh-3",
        type: "BEHAVIORAL",
        category: "Growth & Ownership",
        subtopic: "Failure & Learning",
        title: "A Mistake, Failed Project, or Outage and What You Learned",
        question: "Tell me about a time you made a mistake or a project you worked on did not succeed as planned. What went wrong, how did you take ownership, and what did you learn?",
        context: "Tests accountability, self-awareness, learning velocity, and psychological safety.",
        difficulty: "Hard",
        roles: ["SDE Intern", "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer"],
        expectedPoints: [
            "Honest acknowledgement of the mistake without shifting blame to teammates or tools.",
            "Immediate steps taken to contain the issue and minimize user impact.",
            "Detailed root-cause analysis (5 Whys or post-mortem).",
            "Systemic fixes introduced (added CI tests, improved validation, better telemetry).",
            "Personal growth and enduring engineering mindset change.",
        ],
        sampleAnswerFramework: "Situation (Context of feature/deployment) -> Task (What failed and your responsibility) -> Action (Took accountability, contained damage, implemented permanent safeguards) -> Result (Lessons learned, system became more robust).",
        hints: [
            "Don't pick a trivial mistake like a typo; pick a genuine technical lesson and emphasize the systemic improvement.",
        ],
    },
    {
        id: "beh-4",
        type: "BEHAVIORAL",
        category: "Leadership & Proactivity",
        subtopic: "Initiative",
        title: "Taking Initiative to Improve Developer Experience or System Performance",
        question: "Give an example of when you went beyond your assigned tasks to improve a system's reliability, developer tooling, build time, or user experience. What motivated you and what impact did it have?",
        context: "Checks for proactive ownership, intrinsic motivation, and engineering excellence.",
        difficulty: "Easy",
        roles: ["SDE Intern", "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer"],
        expectedPoints: [
            "Identified a friction point or performance bottleneck unprompted.",
            "Proposed a feasible solution and aligned with the team.",
            "Executed the improvement with measurable results (e.g. reduced load time by 40%, cut build time in half).",
            "Documented the changes for the team.",
        ],
        sampleAnswerFramework: "Situation (Pain point noticed) -> Task (Self-initiated objective) -> Action (Built prototype, measured benchmarks, rolled out cleanly) -> Result (Quantifiable impact and positive team feedback).",
        hints: [
            "Quantify results where possible (percentage improvements, hours saved).",
        ],
    },
];

export function getQuestionsForInterview(params: {
    type: InterviewCategory;
    role: TargetRole;
    difficulty: InterviewDifficulty;
    count?: number;
}): InterviewQuestion[] {
    const { type, role, difficulty, count = 3 } = params;

    if (type === "CS Fundamentals") {
        const filtered = CS_FUNDAMENTALS_QUESTIONS.filter(
            (q) => q.difficulty === difficulty || q.roles.includes(role)
        );
        return shuffleArray(filtered.length >= count ? filtered : CS_FUNDAMENTALS_QUESTIONS).slice(0, count);
    }

    if (type === "Behavioral") {
        const filtered = BEHAVIORAL_QUESTIONS.filter(
            (q) => q.roles.includes(role) || q.difficulty === difficulty
        );
        return shuffleArray(filtered.length >= count ? filtered : BEHAVIORAL_QUESTIONS).slice(0, count);
    }

    if (type === "Mixed") {
        const csQuestions = shuffleArray(CS_FUNDAMENTALS_QUESTIONS).slice(0, 1);
        const behQuestions = shuffleArray(BEHAVIORAL_QUESTIONS).slice(0, 1);
        const dsaFallback: InterviewQuestion = {
            id: "dsa-mixed-1",
            type: "DSA",
            category: "Data Structures & Algorithms",
            subtopic: "Arrays & Two Pointers",
            title: "Coding Challenge: Two Sum / Maximum Subarray",
            question: "Given an array of integers, write an optimal algorithm in your preferred language to solve the problem with O(N) time complexity. Discuss space-time trade-offs and edge cases.",
            difficulty: difficulty,
            roles: [role],
            expectedPoints: [
                "Clarify inputs, constraints, and negative number handling.",
                "Discuss brute force O(N^2) before proposing O(N) Hash Map or Kadane's algorithm.",
                "Write clean, modular code with descriptive variable names.",
                "Analyze time complexity O(N) and space complexity O(N) or O(1).",
            ],
            sampleAnswerFramework: "Problem analysis -> Brute force vs optimal approach -> Step-by-step code implementation -> Complexity analysis -> Test with edge cases.",
            hints: ["Consider using a Hash Map to store complements for O(1) lookups."],
            dsaProblemId: "two-sum",
        };

        return [...csQuestions, ...behQuestions, dsaFallback].slice(0, count);
    }

    // Default DSA
    return [];
}

function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
