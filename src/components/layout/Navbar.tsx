import React, { useState } from 'react';
import { useApp, MainNavTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  TrendingUp, 
  FileText, 
  Users, 
  MessageSquareQuote,
  Plus, 
  RotateCcw, 
  Download, 
  Upload, 
  Printer,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenQuickTaskModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuickTaskModal }) => {
  const { 
    activeTab, 
    setActiveTab, 
    resetToDefaultData, 
    exportDataJson, 
    importDataJson 
  } = useApp();

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJson(content);
      if (success) {
        alert('Data berjaya diimport!');
      } else {
        alert('Ralat semasa mengimport data. Sila pastikan format JSON sah.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setShowSettingsMenu(false);
  };

  const navItems: { id: MainNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Papan Pemuka', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'tasks', label: 'Tugasan & SOP', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'productivity', label: 'Produktiviti', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'documents', label: '7 Dokumen Boss', icon: <FileText className="w-4 h-4" /> },
    { id: 'team', label: 'Pasukan', icon: <Users className="w-4 h-4" /> },
    { id: 'scripts', label: 'Ayat Siap Guna', icon: <MessageSquareQuote className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand title & philosophy */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="text-left flex items-center gap-2.5 focus:outline-hidden group"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-900 text-amber-400 font-extrabold flex items-center justify-center text-lg tracking-wider shadow-xs">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-neutral-900 leading-none group-hover:text-amber-600 transition-colors">
                  AKULAH BOS
                </span>
                <span className="text-[11px] font-medium text-neutral-500 tracking-wide mt-1">
                  Rules · Record · Response
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenQuickTaskModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs lg:text-sm font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Tugasan</span>
            </button>

            {/* Quick Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200 cursor-pointer"
                title="Pilihan Data & Sandaran"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-neutral-100">
                    <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      Urusan Data & Fail
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      exportDataJson();
                      setShowSettingsMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Eksport Data (JSON)</span>
                  </button>

                  <label className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Import Fail JSON</span>
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  <button
                    onClick={() => {
                      window.print();
                      setShowSettingsMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Cetak Halaman Ini</span>
                  </button>

                  <div className="border-t border-neutral-100 my-1"></div>

                  <button
                    onClick={() => {
                      resetToDefaultData();
                      setShowSettingsMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                    <span>Set Semula Data Contoh</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center overflow-x-auto py-2 gap-1 border-t border-neutral-100 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
