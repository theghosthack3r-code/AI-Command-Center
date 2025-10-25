export type Page =
  | 'Overview'
  | 'Agents'
  | 'Power-ups'
  | 'Runs'
  | 'Approvals'
  | 'Integrations'
  | 'Logs'
  | 'Settings';

export type Department = 'Executive' | 'Operations' | 'Support' | 'Communications' | 'Marketing' | 'Finance' | 'Engineering' | 'Analytics';

export type AgentStatus = 'Online' | 'Warn' | 'Offline' | 'Unknown';

export interface ProjectAppearance {
  icon?: string;
  color?: string;
  bgImage?: string;
  theme?: 'dark' | 'light' | 'system';
  density?: 'comfortable' | 'compact';
  modules?: {
    showIntegrations?: boolean;
    showApprovals?: boolean;
    showRecentRuns?: boolean;
    showAttention?: boolean;
  };
}

export interface ProjectBranding {
  displayName?: string;
  tagline?: string;
}

export interface Project {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  description?: string;
  kpis?: { activeAgents: number; pendingApprovals: number; runsToday: number; deliverySuccessPct: number };
  appearance?: ProjectAppearance;
  branding?: ProjectBranding;
}

export interface Agent {
  id: string;
  name: string;
  department: Department;
  role: string;
  status: AgentStatus;
  description: string;
  lastRun: string;
  projectId?: string;
}

export type RunStatus = 'Succeeded' | 'Failed' | 'Running' | 'Pending';

export interface Run {
    id: string;
    type: 'Agent' | 'Power-up';
    name: string;
    status: RunStatus;
    duration: string;
    started: string;
    projectId?: string;
}

export type ApprovalStatus = 'Pending' | 'Approved' | 'Denied';

export interface Approval {
    id: string;
    subject: string;
    action: string;
    requested: string;
    status: ApprovalStatus;
    projectId?: string;
}

export interface Integration {
    id: 'bird' | 'twilio' | 'telegram' | 'discord' | 'sns';
    name: 'Bird' | 'Twilio' | 'Telegram' | 'Discord' | 'SNS';
    status: 'Connected' | 'Not configured';
    icon: string;
}

export interface AttentionItem {
    id: string;
    type: 'approval' | 'run' | 'spend' | 'inbound';
    priority: 'P1' | 'P2';
    title: string;
    hint: string;
    cta: string;
}