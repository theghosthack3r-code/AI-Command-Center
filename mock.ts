import { Agent, Approval, AttentionItem, Integration, Run, Project } from './types';

export const MOCK_USER = { name: "Alex" };

export const MOCK_PROJECTS: Project[] = [
  { id: 'moonlight', name: 'Project Moonlight', icon: 'moon', color: '#7c3aed',
    kpis: { activeAgents: 7, pendingApprovals: 2, runsToday: 18, deliverySuccessPct: 97.2 } },
  { id: 'aurora',    name: 'Aurora',           icon: 'sparkles', color: '#06b6d4',
    kpis: { activeAgents: 5, pendingApprovals: 1, runsToday: 9,  deliverySuccessPct: 95.1 } },
  { id: 'atlas',     name: 'Atlas',            icon: 'globe-2', color: '#22c55e',
    kpis: { activeAgents: 8, pendingApprovals: 0, runsToday: 21, deliverySuccessPct: 98.4 } },
];

export const MOCK_ATTENTION: AttentionItem[] = [
  { id:"appr-8721", type:"approval", priority:"P1", title:"Refund request #8721", hint:"$124.17 • Reason: damaged item", cta: "Review" },
  { id:"run-failed-oo-1203", type:"run", priority:"P1", title:"Run failed: OrderOps", hint:"12:03 PM • exit code 1", cta: "Open run" },
  { id:"spend-bird", type:"spend", priority:"P2", title:"SMS usage 82% of cap", hint:"Bird cycle resets in 3 days", cta: "View usage" },
  { id:"support-new", type:"inbound", priority:"P2", title:"3 new support messages", hint:"oldest: 27m ago", cta: "View messages" }
];

export const MOCK_AGENTS: Agent[] = [
    // --- Project Moonlight ---
    { id: 'agent-exec-1', name: 'Executive Assistant', department: 'Executive', role: 'Orchestrator', status: 'Online', description: 'Primary coordinator agent, manages high-level tasks and delegates to other departments.', lastRun: '2m ago', projectId: 'moonlight' },
    { id: 'agent-ops-1', name: 'Operations Manager', department: 'Operations', role: 'Monitors operational health', status: 'Online', description: 'Oversees all operational agents and reports anomalies.', lastRun: '5m ago', projectId: 'moonlight' },
    { id: 'agent-ops-2', name: 'OrderOps', department: 'Operations', role: 'Processes incoming orders', status: 'Warn', description: 'Handles order fulfillment from all channels. Warning: High queue length.', lastRun: '1m ago', projectId: 'moonlight' },
    { id: 'agent-support-1', name: 'Support Agent', department: 'Support', role: 'Handles customer queries', status: 'Online', description: 'Provides first-level automated support via chat and email.', lastRun: '15s ago', projectId: 'moonlight' },
    { id: 'agent-comms-1', name: 'Notification Router', department: 'Communications', role: 'Routes all system alerts', status: 'Online', description: 'Manages and routes notifications through integrations like Bird and Telegram.', lastRun: '5s ago', projectId: 'moonlight' },
    { id: 'agent-mktg-1', name: 'Social Agent', department: 'Marketing', role: 'Manages social media presence', status: 'Offline', description: 'Scheduled social media posting agent. Currently offline for maintenance.', lastRun: '2d ago', projectId: 'moonlight' },
    { id: 'agent-fin-1', name: 'Finance Agent', department: 'Finance', role: 'Monitors transactions and budgets', status: 'Online', description: 'Tracks expenses, handles invoicing, and alerts on budget deviations.', lastRun: '1h ago', projectId: 'moonlight' },
    
    // --- Project Aurora ---
    { id: 'agent-aurora-exec-1', name: 'Aurora Coordinator', department: 'Executive', role: 'Project Lead', status: 'Online', description: 'Coordinates all agents and tasks for the Aurora project.', lastRun: '10m ago', projectId: 'aurora' },
    { id: 'agent-aurora-eng-1', name: 'Data Pipeline Engineer', department: 'Engineering', role: 'Manages data ingestion', status: 'Online', description: 'Ensures smooth data flow from various sources for Project Aurora.', lastRun: '20m ago', projectId: 'aurora' },
    { id: 'agent-aurora-analytics-1', name: 'Insight Generator', department: 'Analytics', role: 'Finds data patterns', status: 'Warn', description: 'Analyzes data streams to produce actionable insights.', lastRun: '1m ago', projectId: 'aurora' },
    { id: 'agent-aurora-support-1', name: 'Feedback Collector', department: 'Support', role: 'Gathers user feedback', status: 'Online', description: 'Collects and categorizes user feedback for Aurora.', lastRun: '12m ago', projectId: 'aurora' },
    { id: 'agent-aurora-ops-1', name: 'Resource Allocator', department: 'Operations', role: 'Manages cloud resources', status: 'Online', description: 'Optimizes resource allocation for Aurora agents.', lastRun: '1h ago', projectId: 'aurora' },

    // --- Project Atlas ---
    { id: 'agent-atlas-exec-1', name: 'Atlas Strategist', department: 'Executive', role: 'Long-term Planner', status: 'Online', description: 'Sets the strategic direction for the Atlas initiative.', lastRun: '3h ago', projectId: 'atlas' },
    { id: 'agent-atlas-eng-1', name: 'Integrations Engineer', department: 'Engineering', role: 'Maintains API integrations', status: 'Online', description: 'Monitors health of third-party API connections for Atlas.', lastRun: '10m ago', projectId: 'atlas' },
    { id: 'agent-atlas-eng-2', name: 'QA/SRE Agent', department: 'Engineering', role: 'Performs automated testing', status: 'Warn', description: 'Runs continuous integration and system reliability tests. Warning: High latency detected.', lastRun: '25m ago', projectId: 'atlas' },
    { id: 'agent-atlas-analytics-1', name: 'Forecasting Agent', department: 'Analytics', role: 'Predicts market trends', status: 'Online', description: 'Uses historical data to forecast for Project Atlas.', lastRun: '2h ago', projectId: 'atlas' },
    { id: 'agent-atlas-mktg-1', name: 'Outreach/Sales Agent', department: 'Marketing', role: 'Manages outbound campaigns', status: 'Unknown', description: 'Handles lead generation and email outreach campaigns for Atlas.', lastRun: '8h ago', projectId: 'atlas' },
    { id: 'agent-atlas-fin-1', name: 'Cost Analyst', department: 'Finance', role: 'Analyzes project spend', status: 'Online', description: 'Monitors the budget and spending for Atlas.', lastRun: '45m ago', projectId: 'atlas' },
    { id: 'agent-atlas-ops-1', name: 'Logistics Coordinator', department: 'Operations', role: 'Manages supply chain', status: 'Online', description: 'Coordinates logistics for the Atlas project.', lastRun: '15m ago', projectId: 'atlas' },
    { id: 'agent-atlas-support-1', name: 'Escalation Handler', department: 'Support', role: 'Handles Tier 2 support', status: 'Offline', description: 'Manages escalated support tickets for Atlas.', lastRun: '1d ago', projectId: 'atlas' },
];

export const MOCK_RUNS: Run[] = [
  { id:"r-001", type:"Power-up", name:"Ship Now", status:"Succeeded", started:"10:15 AM", duration:"14s", projectId: 'moonlight' },
  { id:"r-002", type:"Agent",   name:"Executive Assistant", status:"Succeeded", started:"10:21 AM", duration:"4s", projectId: 'moonlight' },
  { id:"r-003", type:"Agent",   name:"OrderOps", status:"Failed", started:"12:03 PM", duration:"6s", projectId: 'moonlight' },
  { id:"r-004", type:"Agent",   name:"Support Agent", status:"Running", started:"12:15 PM", duration:"-", projectId: 'moonlight' },
  { id:"r-005", type:"Agent",   name:"Finance Agent", status:"Succeeded", started:"12:18 PM", duration:"22s", projectId: 'moonlight' },
  { id:"r-006", type:"Power-up", name:"Daily Brief", status:"Succeeded", started:"09:00 AM", duration:"8s", projectId: 'aurora' },
  { id:"r-007", type:"Agent", name:"QA/SRE Agent", status:"Failed", started:"11:50 AM", duration:"31s", projectId: 'atlas' },
  { id:"r-008", type:"Agent", name:"Insight Generator", status:"Succeeded", started:"12:20 PM", duration:"45s", projectId: 'aurora' },
];

export const MOCK_APPROVALS: Approval[] = [
  { id:"A-445", subject:"Refund #8721", action:"Approve refund", requested:"09:48 AM", status:"Pending", projectId: 'moonlight' },
  { id:"A-446", subject:"Bulk SMS to 10k users", action:"Send campaign", requested:"10:02 AM", status:"Pending", projectId: 'moonlight' },
  { id:"A-447", subject:"Deploy Integrations Engineer v2.3", action:"Deploy Agent", requested:"11:30 AM", status:"Approved", projectId: 'atlas' },
  { id:"A-448", subject:"Pause Social Agent for maintenance", action:"Pause Agent", requested:"Yesterday", status:"Approved", projectId: 'moonlight' },
  { id:"A-449", subject:"Increase budget for Operations", action:"Budget Change", requested:"Yesterday", status:"Denied", projectId: 'moonlight' },
  { id:"A-450", subject:"New data source for Aurora", action:"Approve Integration", requested:"10:15 AM", status:"Pending", projectId: 'aurora' },
];

export const MOCK_INTEGRATIONS: Integration[] = [
  { id:"bird", name:"Bird", status:"Connected", icon: "message-circle" },
  { id:"twilio", name:"Twilio", status:"Not configured", icon: "message-circle" },
  { id:"telegram", name:"Telegram", status:"Connected", icon: "send" },
  { id:"discord", name:"Discord", status:"Connected", icon: "discord" },
  { id:"sns", name:"SNS", status:"Not configured", icon: "cloud-lightning" }
];