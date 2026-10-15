import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
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
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <Navbar onOpenQuickTaskModal={() => setShowQuickTask(true)} />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
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

      {/* Clean Editorial Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-neutral-900">AKULAH BOS™</span>
            <span aria-hidden="true">·</span>
            <span>Rules · Record · Response</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-500">
            <span>Fakta → Penjelasan → Rekod → Keputusan</span>
            <span aria-hidden="true">·</span>
            <span>Hak Cipta Terpelihara Operasi SME</span>
          </div>
        </div>
      </footer>

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
