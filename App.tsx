import React, { useState, useEffect, useMemo } from 'react';
import { type Page, type Agent, type Approval, type ApprovalStatus, type Project, ProjectBranding, ProjectAppearance } from './types';
import { MOCK_APPROVALS, MOCK_PROJECTS } from './mock';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewScreen } from './components/DashboardScreen';
import { AgentsScreen, AgentDetailScreen } from './components/AgentsScreen';
import { ActivityScreen } from './components/WorkflowsScreen';
import { ContentGridScreen } from './components/NotificationsScreen';
import { LogsScreen } from './components/LogsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ProjectSettingsModal } from './components/ProjectSettingsModal';
import { motion, AnimatePresence } from 'framer-motion';
import { deepMerge } from './utils';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('Overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [approvals, setApprovals] = useState<Approval[]>(MOCK_APPROVALS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => localStorage.getItem('selected_project') || 'ai-mgmt-team');
  const [projectSettings, setProjectSettings] = useState<Record<string, { branding?: ProjectBranding, appearance?: ProjectAppearance }>>(() => {
    const allSettings: Record<string, any> = {};
    for (const project of MOCK_PROJECTS) {
      const saved = localStorage.getItem(`project_settings::${project.id}`);
      if (saved) {
        try {
          allSettings[project.id] = JSON.parse(saved);
        } catch (e) {
          console.error(`Failed to parse settings for project ${project.id}`, e);
        }
      }
    }
    return allSettings;
  });
  const [isProjectSettingsModalOpen, setProjectSettingsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('selected_project', selectedProjectId);
  }, [selectedProjectId]);
  
  const computedProjects = useMemo(() => {
    return MOCK_PROJECTS.map(p => {
        const settings = projectSettings[p.id] || {};
        return deepMerge({}, p, settings) as Project;
    });
  }, [projectSettings]);
  
  const selectedProject = useMemo(() => {
    return computedProjects.find(p => p.id === selectedProjectId) || computedProjects[0];
  }, [selectedProjectId, computedProjects]);

  const handleSaveProjectSettings = (updates: { branding?: ProjectBranding; appearance?: ProjectAppearance }) => {
    const newSettings = { ...projectSettings };
    newSettings[selectedProjectId] = deepMerge({}, newSettings[selectedProjectId] || {}, updates);
    setProjectSettings(newSettings);
    localStorage.setItem(`project_settings::${selectedProjectId}`, JSON.stringify(newSettings[selectedProjectId]));
  };

  const projectApprovals = approvals.filter(a => a.projectId === selectedProjectId);
  const pendingApprovalsCount = projectApprovals.filter(a => a.status === 'Pending').length;

  const handleApprovalAction = (id: string, newStatus: ApprovalStatus) => {
    setApprovals(currentApprovals =>
      currentApprovals.map(a => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    if (page !== 'Agents' || activeAgent) {
      setActiveAgent(null);
    }
  }, [page]);
  
  const renderPage = () => {
    if (activeAgent) {
      return <AgentDetailScreen agent={activeAgent} onBack={() => setActiveAgent(null)} />;
    }

    switch (page) {
      case 'Overview':
        return <OverviewScreen approvals={projectApprovals} handleApprovalAction={handleApprovalAction} setPage={setPage} project={selectedProject} />;
      case 'Agents':
        return <AgentsScreen setActiveAgent={setActiveAgent} selectedProjectId={selectedProjectId} />;
      case 'Power-ups':
      case 'Integrations':
        return <ContentGridScreen page={page} />;
      case 'Runs':
      case 'Approvals':
        return <ActivityScreen page={page} approvals={projectApprovals} handleApprovalAction={handleApprovalAction} selectedProjectId={selectedProjectId} />;
      case 'Logs':
        return <LogsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <OverviewScreen approvals={projectApprovals} handleApprovalAction={handleApprovalAction} setPage={setPage} project={selectedProject} />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans text-sm text-foreground">
      <Sidebar 
        currentPage={page} 
        setPage={setPage} 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setActiveAgent={setActiveAgent}
        pendingApprovalsCount={pendingApprovalsCount}
        selectedProjectId={selectedProjectId}
      />
      <div className="flex flex-1 flex-col">
        <Header 
          setSidebarOpen={setSidebarOpen} 
          pendingApprovalsCount={pendingApprovalsCount}
          project={selectedProject}
          projects={computedProjects}
          onProjectChange={setSelectedProjectId}
          onOpenProjectSettings={() => setProjectSettingsModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAgent ? activeAgent.id : `${page}-${selectedProjectId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
       <ProjectSettingsModal
        isOpen={isProjectSettingsModalOpen}
        onClose={() => setProjectSettingsModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProjectSettings}
      />
    </div>
  );
};

export default App;