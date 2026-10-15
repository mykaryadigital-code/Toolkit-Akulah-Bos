import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TeamMember, 
  Task, 
  InterviewForm, 
  OnboardingChecklist, 
  WorkRulesChecklist, 
  CoachingRecord, 
  ExplanationForm, 
  SeriousActionChecklist, 
  CapacityAudit,
  DocumentType,
  TaskStatus
} from '../types';
import {
  INITIAL_TEAM_MEMBERS,
  INITIAL_TASKS,
  INITIAL_INTERVIEW_FORMS,
  INITIAL_ONBOARDING,
  INITIAL_WORK_RULES,
  INITIAL_COACHING_RECORDS,
  INITIAL_EXPLANATION_FORMS,
  INITIAL_SERIOUS_ACTIONS,
  INITIAL_CAPACITY_AUDIT
} from '../data/initialData';

export type MainNavTab = 'dashboard' | 'tasks' | 'productivity' | 'documents' | 'team' | 'scripts';

interface AppContextType {
  activeTab: MainNavTab;
  setActiveTab: (tab: MainNavTab) => void;
  activeDocSubtab: DocumentType;
  setActiveDocSubtab: (subtab: DocumentType) => void;
  
  // Data
  teamMembers: TeamMember[];
  tasks: Task[];
  interviewForms: InterviewForm[];
  onboardingForms: OnboardingChecklist[];
  workRulesList: WorkRulesChecklist[];
  coachingRecords: CoachingRecord[];
  explanationForms: ExplanationForm[];
  seriousActions: SeriousActionChecklist[];
  capacityAudits: CapacityAudit[];

  // Task actions
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;

  // Team actions
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Document actions
  saveInterviewForm: (form: InterviewForm) => void;
  deleteInterviewForm: (id: string) => void;

  saveOnboardingForm: (form: OnboardingChecklist) => void;
  deleteOnboardingForm: (id: string) => void;

  saveWorkRules: (rules: WorkRulesChecklist) => void;
  deleteWorkRules: (id: string) => void;

  saveCoachingRecord: (record: CoachingRecord) => void;
  deleteCoachingRecord: (id: string) => void;

  saveExplanationForm: (form: ExplanationForm) => void;
  deleteExplanationForm: (id: string) => void;

  saveSeriousAction: (action: SeriousActionChecklist) => void;
  deleteSeriousAction: (id: string) => void;

  saveCapacityAudit: (audit: CapacityAudit) => void;
  deleteCapacityAudit: (id: string) => void;

  // Print & preview
  activePrintDoc: { type: DocumentType; data: any } | null;
  setActivePrintDoc: (doc: { type: DocumentType; data: any } | null) => void;

  // Reset & Export
  resetToDefaultData: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonString: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'akulah_bos_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MainNavTab>('dashboard');
  const [activeDocSubtab, setActiveDocSubtab] = useState<DocumentType>('doc4_coaching');
  const [activePrintDoc, setActivePrintDoc] = useState<{ type: DocumentType; data: any } | null>(null);

  // Load from localStorage or fallback to initialData
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_members`);
      return saved ? JSON.parse(saved) : INITIAL_TEAM_MEMBERS;
    } catch {
      return INITIAL_TEAM_MEMBERS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [interviewForms, setInterviewForms] = useState<InterviewForm[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_interviews`);
      return saved ? JSON.parse(saved) : INITIAL_INTERVIEW_FORMS;
    } catch {
      return INITIAL_INTERVIEW_FORMS;
    }
  });

  const [onboardingForms, setOnboardingForms] = useState<OnboardingChecklist[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_onboarding`);
      return saved ? JSON.parse(saved) : [INITIAL_ONBOARDING];
    } catch {
      return [INITIAL_ONBOARDING];
    }
  });

  const [workRulesList, setWorkRulesList] = useState<WorkRulesChecklist[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_workrules`);
      return saved ? JSON.parse(saved) : [INITIAL_WORK_RULES];
    } catch {
      return [INITIAL_WORK_RULES];
    }
  });

  const [coachingRecords, setCoachingRecords] = useState<CoachingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_coaching`);
      return saved ? JSON.parse(saved) : INITIAL_COACHING_RECORDS;
    } catch {
      return INITIAL_COACHING_RECORDS;
    }
  });

  const [explanationForms, setExplanationForms] = useState<ExplanationForm[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_explanations`);
      return saved ? JSON.parse(saved) : INITIAL_EXPLANATION_FORMS;
    } catch {
      return INITIAL_EXPLANATION_FORMS;
    }
  });

  const [seriousActions, setSeriousActions] = useState<SeriousActionChecklist[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_serious`);
      return saved ? JSON.parse(saved) : INITIAL_SERIOUS_ACTIONS;
    } catch {
      return INITIAL_SERIOUS_ACTIONS;
    }
  });

  const [capacityAudits, setCapacityAudits] = useState<CapacityAudit[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_capacity`);
      return saved ? JSON.parse(saved) : [INITIAL_CAPACITY_AUDIT];
    } catch {
      return [INITIAL_CAPACITY_AUDIT];
    }
  });

  // Sync back to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_members`, JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_interviews`, JSON.stringify(interviewForms));
  }, [interviewForms]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_onboarding`, JSON.stringify(onboardingForms));
  }, [onboardingForms]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_workrules`, JSON.stringify(workRulesList));
  }, [workRulesList]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_coaching`, JSON.stringify(coachingRecords));
  }, [coachingRecords]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_explanations`, JSON.stringify(explanationForms));
  }, [explanationForms]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_serious`, JSON.stringify(seriousActions));
  }, [seriousActions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_capacity`, JSON.stringify(capacityAudits));
  }, [capacityAudits]);

  // Task Handlers
  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `tsk-${Date.now()}`
    };
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const setTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          completedAt: status === 'completed' ? new Date().toISOString() : undefined
        };
      }
      return t;
    }));
  };

  // Team Handlers
  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600', 'bg-rose-600', 'bg-indigo-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newMember: TeamMember = {
      ...member,
      id: `emp-${Date.now()}`,
      avatarColor: member.avatarColor || randomColor
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    // Also sync task assignedToName if name changed
    if (updates.name) {
      setTasks(prev => prev.map(t => t.assignedToId === id ? { ...t, assignedToName: updates.name! } : t));
    }
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  // Documents
  const saveInterviewForm = (form: InterviewForm) => {
    setInterviewForms(prev => {
      const idx = prev.findIndex(f => f.id === form.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = form;
        return next;
      }
      return [form, ...prev];
    });
  };

  const deleteInterviewForm = (id: string) => {
    setInterviewForms(prev => prev.filter(f => f.id !== id));
  };

  const saveOnboardingForm = (form: OnboardingChecklist) => {
    setOnboardingForms(prev => {
      const idx = prev.findIndex(f => f.id === form.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = form;
        return next;
      }
      return [form, ...prev];
    });
  };

  const deleteOnboardingForm = (id: string) => {
    setOnboardingForms(prev => prev.filter(f => f.id !== id));
  };

  const saveWorkRules = (rules: WorkRulesChecklist) => {
    setWorkRulesList(prev => {
      const idx = prev.findIndex(r => r.id === rules.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = rules;
        return next;
      }
      return [rules, ...prev];
    });
  };

  const deleteWorkRules = (id: string) => {
    setWorkRulesList(prev => prev.filter(r => r.id !== id));
  };

  const saveCoachingRecord = (record: CoachingRecord) => {
    setCoachingRecords(prev => {
      const idx = prev.findIndex(r => r.id === record.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = record;
        return next;
      }
      return [record, ...prev];
    });
  };

  const deleteCoachingRecord = (id: string) => {
    setCoachingRecords(prev => prev.filter(r => r.id !== id));
  };

  const saveExplanationForm = (form: ExplanationForm) => {
    setExplanationForms(prev => {
      const idx = prev.findIndex(f => f.id === form.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = form;
        return next;
      }
      return [form, ...prev];
    });
  };

  const deleteExplanationForm = (id: string) => {
    setExplanationForms(prev => prev.filter(f => f.id !== id));
  };

  const saveSeriousAction = (action: SeriousActionChecklist) => {
    setSeriousActions(prev => {
      const idx = prev.findIndex(a => a.id === action.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = action;
        return next;
      }
      return [action, ...prev];
    });
  };

  const deleteSeriousAction = (id: string) => {
    setSeriousActions(prev => prev.filter(a => a.id !== id));
  };

  const saveCapacityAudit = (audit: CapacityAudit) => {
    setCapacityAudits(prev => {
      const idx = prev.findIndex(a => a.id === audit.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = audit;
        return next;
      }
      return [audit, ...prev];
    });
  };

  const deleteCapacityAudit = (id: string) => {
    setCapacityAudits(prev => prev.filter(a => a.id !== id));
  };

  // Reset to default sample
  const resetToDefaultData = () => {
    if (window.confirm('Adakah anda pasti mahu set semula ke data contoh asal? Sebarang perubahan terkini akan digantikan.')) {
      setTeamMembers(INITIAL_TEAM_MEMBERS);
      setTasks(INITIAL_TASKS);
      setInterviewForms(INITIAL_INTERVIEW_FORMS);
      setOnboardingForms([INITIAL_ONBOARDING]);
      setWorkRulesList([INITIAL_WORK_RULES]);
      setCoachingRecords(INITIAL_COACHING_RECORDS);
      setExplanationForms(INITIAL_EXPLANATION_FORMS);
      setSeriousActions(INITIAL_SERIOUS_ACTIONS);
      setCapacityAudits([INITIAL_CAPACITY_AUDIT]);
    }
  };

  // Export JSON
  const exportDataJson = () => {
    const data = {
      teamMembers,
      tasks,
      interviewForms,
      onboardingForms,
      workRulesList,
      coachingRecords,
      explanationForms,
      seriousActions,
      capacityAudits,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akulah-bos-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON
  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.teamMembers) setTeamMembers(parsed.teamMembers);
      if (parsed.tasks) setTasks(parsed.tasks);
      if (parsed.interviewForms) setInterviewForms(parsed.interviewForms);
      if (parsed.onboardingForms) setOnboardingForms(parsed.onboardingForms);
      if (parsed.workRulesList) setWorkRulesList(parsed.workRulesList);
      if (parsed.coachingRecords) setCoachingRecords(parsed.coachingRecords);
      if (parsed.explanationForms) setExplanationForms(parsed.explanationForms);
      if (parsed.seriousActions) setSeriousActions(parsed.seriousActions);
      if (parsed.capacityAudits) setCapacityAudits(parsed.capacityAudits);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeDocSubtab,
        setActiveDocSubtab,
        teamMembers,
        tasks,
        interviewForms,
        onboardingForms,
        workRulesList,
        coachingRecords,
        explanationForms,
        seriousActions,
        capacityAudits,
        addTask,
        updateTask,
        deleteTask,
        setTaskStatus,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        saveInterviewForm,
        deleteInterviewForm,
        saveOnboardingForm,
        deleteOnboardingForm,
        saveWorkRules,
        deleteWorkRules,
        saveCoachingRecord,
        deleteCoachingRecord,
        saveExplanationForm,
        deleteExplanationForm,
        saveSeriousAction,
        deleteSeriousAction,
        saveCapacityAudit,
        deleteCapacityAudit,
        activePrintDoc,
        setActivePrintDoc,
        resetToDefaultData,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
