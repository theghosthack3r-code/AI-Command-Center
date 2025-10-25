import { Agent, Approval, AttentionItem, Integration, Run, Project } from './types';

export const MOCK_USER = { name: "Alex" };

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 'ai-mgmt-team', 
    name: 'AI Management Team', 
    icon: 'brain-circuit', 
    color: '#4da3ff',
    description: "A project to build a modern, multi-agent 'AI Management Team' web app that centralizes project oversight.",
    kpis: { activeAgents: 8, pendingApprovals: 1, runsToday: 25, deliverySuccessPct: 99.1 } 
  },
  { 
    id: 'project-one',    
    name: 'Project One',
    icon: 'smartphone', 
    color: '#22c55e',
    description: "Building an affordable, off-brand 5G smartphone with a clean, customizable Android experience.",
    kpis: { activeAgents: 6, pendingApprovals: 3, runsToday: 15,  deliverySuccessPct: 96.5 } 
  },
  { 
    id: 'anurex-business',     
    name: 'Anurex Business',
    icon: 'heart-pulse', 
    color: '#06b6d4',
    description: "Rebuild and scale Anurex into a modern, trusted consumer health brand with a multi-channel ecommerce stack.",
    kpis: { activeAgents: 7, pendingApprovals: 2, runsToday: 20, deliverySuccessPct: 98.0 } 
  },
];

export const MOCK_ATTENTION: AttentionItem[] = [
  { id:"appr-anurex-box", type:"approval", priority:"P1", title:"[Anurex] Finalize retail box PDF", hint:"Print-ready PDFs + proof approval needed", cta: "Review" },
  { id:"run-failed-p1-build", type:"run", priority:"P1", title:"[Project One] AOSP build failed", hint:"WSL2 Ubuntu, JDK, repo, ccache; clone and sync source", cta: "Open run" },
  { id:"spend-aimt", type:"spend", priority:"P2", title:"[AI Mgmt] API spend at 85% of budget", hint:"Cycle resets in 4 days", cta: "View usage" },
  { id:"inbound-anurex-b2b", type:"inbound", priority:"P2", title:"[Anurex] New wholesale inquiry", hint:"From 'BigBox Retail'", cta: "View message" }
];

export const MOCK_AGENTS: Agent[] = [
    // --- AI Management Team ---
    { id: 'agent-aimt-1', name: 'Chief of Staff', department: 'Executive', role: 'Greets, summarizes, routes', status: 'Online', description: 'Primary coordinator agent, summarizes status and routes tasks to specialized agents.', lastRun: '1m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-2', name: 'Project Ops', department: 'Operations', role: 'Schedules, dependencies, risk watch', status: 'Online', description: 'Monitors project schedules, dependencies, and risks, providing summaries.', lastRun: '5m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-3', name: 'Research & Insights', department: 'Analytics', role: 'Web/doc research, distillation', status: 'Online', description: 'Conducts research from web and documents, providing distilled briefs and citations.', lastRun: '30m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-4', name: 'Engineering Agent', department: 'Engineering', role: 'Spec drafting, code scaffolding', status: 'Online', description: 'Assists with engineering tasks like spec drafting, code scaffolding, and PR notes.', lastRun: '3m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-5', name: 'Design & UX Agent', department: 'Engineering', role: 'Layouts, components, accessibility', status: 'Warn', description: 'Proposes UI components, layouts, and performs accessibility checks. Warning: component library sync pending.', lastRun: '1h ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-6', name: 'Data & Integrations', department: 'Engineering', role: 'Connectors, transforms, ETL', status: 'Online', description: 'Manages data connectors, transforms, and ETL schemas.', lastRun: '15m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-7', name: 'Notifications & Comms', department: 'Communications', role: 'Templates, digests, alerts', status: 'Online', description: 'Handles communication templates, daily/weekly digests, and incident alerts.', lastRun: '2m ago', projectId: 'ai-mgmt-team' },
    { id: 'agent-aimt-8', name: 'Biz/CRM Agent', department: 'Marketing', role: 'Lead tracking, pipeline summaries', status: 'Offline', description: 'Handles lead tracking and pipeline summaries (Phase 2). Currently offline.', lastRun: '3d ago', projectId: 'ai-mgmt-team' },
    
    // --- Project One ---
    { id: 'agent-p1-1', name: 'Hardware Sourcer', department: 'Operations', role: 'Supplier discovery, spec comparison', status: 'Online', description: 'Builds supplier longlists, compares specs, and drafts RFQs.', lastRun: '10m ago', projectId: 'project-one' },
    // FIX: Changed agent status from 'Failed' to 'Warn' to align with the 'AgentStatus' type definition. 'Failed' is a 'RunStatus', not an 'AgentStatus'.
    { id: 'agent-p1-2', name: 'OS Build Engineer', department: 'Engineering', role: 'AOSP build scripts, patching', status: 'Warn', description: 'Manages AOSP build environment, drafts patch series, and handles CI configuration.', lastRun: '5m ago', projectId: 'project-one' },
    { id: 'agent-p1-3', name: 'Branding Assistant', department: 'Marketing', role: 'Logo/wordmark ideation, copy', status: 'Online', description: 'Generates branding ideas, messaging drafts, and landing page copy.', lastRun: '2h ago', projectId: 'project-one' },
    { id: 'agent-p1-4', name: 'Compliance Specialist', department: 'Support', role: 'Requirement matrices, test plans', status: 'Online', description: 'Creates compliance matrices (CE, FCC, etc.) and documentation checklists.', lastRun: '8h ago', projectId: 'project-one' },
    { id: 'agent-p1-5', name: 'Logistics Planner', department: 'Operations', role: 'Shipping, packaging specs', status: 'Warn', description: 'Drafts shipping plans, packaging specs, and warranty policies. Warning: incoterms need clarification.', lastRun: '45m ago', projectId: 'project-one' },
    { id: 'agent-p1-6', name: 'QA Test Runner', department: 'Engineering', role: 'Runs CTS/VTS, vendor blob integration', status: 'Offline', description: 'Automates security hardening and runs compatibility test suites.', lastRun: '1d ago', projectId: 'project-one' },

    // --- Anurex Business ---
    { id: 'agent-anrx-1', name: 'Program Coordinator', department: 'Executive', role: 'Program lead, creative direction', status: 'Online', description: 'Coordinates creative direction, vendor tasks, and overall program leadership.', lastRun: '15m ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-2', name: 'Ecommerce Integrator', department: 'Engineering', role: 'Amazon, Shopify, eBay sync', status: 'Online', description: 'Manages integrations with e-commerce platforms and optimizes ASINs.', lastRun: '25m ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-3', name: 'Inventory Manager', department: 'Operations', role: 'Lot tracking, packaging BOMs', status: 'Online', description: 'Handles inventory tracking, packaging Bill of Materials, and vendor rosters.', lastRun: '1h ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-4', name: 'Marketing Automation', department: 'Marketing', role: 'Email automations, explainer videos', status: 'Online', description: 'Manages blog/FAQ cadence, email automations, and testimonial cuts.', lastRun: '3h ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-5', name: 'Compliance Analyst', department: 'Support', role: 'Claims, instructions, GMP', status: 'Warn', description: 'Maintains the risk register and compliance checklist (claims, instructions, GMP adjacency). Warning: IFU needs review.', lastRun: '4h ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-6', name: 'Creative Ops', department: 'Marketing', role: 'Packaging dielines, Amazon A+ assets', status: 'Unknown', description: 'Generates creative assets like packaging dielines, Amazon A+ content, and videos.', lastRun: '9h ago', projectId: 'anurex-business' },
    { id: 'agent-anrx-7', name: 'Order Hub Overseer', department: 'Operations', role: 'Order ingest, SLA monitoring', status: 'Online', description: 'Manages the order hub dashboard, monitors SLAs, and oversees the returns/RMA workflow.', lastRun: '5m ago', projectId: 'anurex-business' },
];

export const MOCK_RUNS: Run[] = [
  { id:"r-001", type:"Agent", name:"Chief of Staff", status:"Succeeded", started:"10:15 AM", duration:"3s", projectId: 'ai-mgmt-team' },
  { id:"r-002", type:"Agent", name:"OS Build Engineer", status:"Failed", started:"10:21 AM", duration:"45s", projectId: 'project-one' },
  { id:"r-003", type:"Agent", name:"Order Hub Overseer", status:"Succeeded", started:"12:03 PM", duration:"6s", projectId: 'anurex-business' },
  { id:"r-004", type:"Agent", name:"Hardware Sourcer", status:"Running", started:"12:15 PM", duration:"-", projectId: 'project-one' },
  { id:"r-005", type:"Agent", name:"Marketing Automation", status:"Succeeded", started:"12:18 PM", duration:"22s", projectId: 'anurex-business' },
  { id:"r-006", type:"Power-up", name:"Daily Brief", status:"Succeeded", started:"09:00 AM", duration:"8s", projectId: 'ai-mgmt-team' },
  { id:"r-007", type:"Agent", name:"Compliance Analyst", status:"Succeeded", started:"11:50 AM", duration:"31s", projectId: 'anurex-business' },
  { id:"r-008", type:"Agent", name:"Research & Insights", status:"Succeeded", started:"12:20 PM", duration:"1m 12s", projectId: 'ai-mgmt-team' },
];

export const MOCK_APPROVALS: Approval[] = [
  { id:"A-445", subject:"Finalize retail box PDF", action:"Approve print-ready assets", requested:"09:48 AM", status:"Pending", projectId: 'anurex-business' },
  { id:"A-446", subject:"Select final hardware vendor", action:"Negotiate payment terms, SLA", requested:"10:02 AM", status:"Pending", projectId: 'project-one' },
  { id:"A-447", subject:"Enable Biz/CRM Agent", action:"Deploy Agent (Phase 2)", requested:"11:30 AM", status:"Denied", projectId: 'ai-mgmt-team' },
  { id:"A-448", subject:"Confirm domain purchase: unityneo.com", action:"Purchase domain", requested:"Yesterday", status:"Approved", projectId: 'project-one' },
  { id:"A-449", subject:"Launch refreshed Amazon pages", action:"Push creative pack to Amazon US/CA", requested:"Yesterday", status:"Approved", projectId: 'anurex-business' },
  { id:"A-450", subject:"Final confirmation on company/product names", action:"Confirm trademark search", requested:"2d ago", status:"Pending", projectId: 'project-one' },
  { id:"A-451", subject:"Approve new UI component: Dashboard Card", action:"Merge PR #123", requested:"3h ago", status:"Pending", projectId: 'ai-mgmt-team' },
  { id:"A-452", subject:"Approve new SMS provider (Bird)", action:"Integration budget approval", requested:"1d ago", status:"Approved", projectId: 'anurex-business' },
];

export const MOCK_INTEGRATIONS: Integration[] = [
  { id:"bird", name:"Bird", status:"Connected", icon: "message-circle" },
  { id:"twilio", name:"Twilio", status:"Not configured", icon: "message-circle" },
  { id:"telegram", name:"Telegram", status:"Connected", icon: "send" },
  { id:"discord", name:"Discord", status:"Connected", icon: "discord" },
  { id:"sns", name:"SNS", status:"Not configured", icon: "cloud-lightning" }
];