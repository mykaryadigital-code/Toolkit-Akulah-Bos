import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { BossDashboard } from './components/dashboard/BossDashboard';
import { TaskManager } from './components/tasks/TaskManager';
import { ProductivityTracker } from './components/productivity/ProductivityTracker';
import { DocumentsHub } from './components/documents/DocumentsHub';
import { TeamManager } from './components/team/TeamManager';
import { BossScriptsView } from './components/scripts/BossScriptsView';
import { QuickTaskModal } from './components/tasks/QuickTaskModal';
import { PrintDocumentView } from './components/documents/PrintDocumentView';

const MainLayout: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setActiveDocSubtab, 
    activePrintDoc, 
    setActivePrintDoc 
  } = useApp();

  const [showQuickTask, setShowQuickTask] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans w-full max-w-full overflow-x-hidden">
      
      {/* Desktop Sidebar (Requirement 3: Gunakan sidebar pada desktop) */}
      <div className="hidden md:flex">
        <Sidebar onOpenQuickTask={() => setShowQuickTask(true)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen bg-slate-50">
        
        {/* Mobile Header (Requirement 3) */}
        <MobileNav onOpenQuickTask={() => setShowQuickTask(true)} />

        {/* Viewport Content with padding for mobile bottom bar */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 pb-28 md:pb-12 min-w-0">
          {activeTab === 'dashboard' && (
            <BossDashboard 
              onOpenNewTask={() => setShowQuickTask(true)}
              onOpenDocument={(doc) => {
                setActiveDocSubtab(doc);
                setActiveTab('documents');
              }}
            />
          )}

          {activeTab === 'tasks' && (
            <TaskManager onOpenCreateModal={() => setShowQuickTask(true)} />
          )}

          {activeTab === 'productivity' && (
            <ProductivityTracker 
              onNavigateToDocument={(doc) => {
                setActiveDocSubtab(doc);
                setActiveTab('documents');
              }}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsHub />
          )}

          {activeTab === 'team' && (
            <TeamManager />
          )}

          {activeTab === 'scripts' && (
            <BossScriptsView />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-5 no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-500">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <span className="font-black text-slate-950">AKULAH BOS</span>
              <span aria-hidden="true">·</span>
              <span>Rules · Record · Response</span>
            </div>

            <div className="flex items-center gap-3 text-slate-500">
              <span>Fakta → Dengar → Expectation → Next Step</span>
              <span aria-hidden="true">·</span>
              <span>Sistem Operasi Pasukan</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Global Quick Task Modal */}
      <QuickTaskModal 
        isOpen={showQuickTask} 
        onClose={() => setShowQuickTask(false)} 
      />

      {/* Global Print Document Modal */}
      {activePrintDoc && (
        <PrintDocumentView 
          type={activePrintDoc.type} 
          data={activePrintDoc.data} 
          onClose={() => setActivePrintDoc(null)} 
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
