export type DocumentType = 
  | 'doc1_interview'
  | 'doc2_onboarding'
  | 'doc3_rules'
  | 'doc4_coaching'
  | 'doc5_explanation'
  | 'doc6_emergency'
  | 'doc8_capacity';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'tinggi' | 'sederhana' | 'rendah';
export type TaskCategory = 'opening' | 'peak_hour' | 'closing' | 'operasi' | 'kebersihan' | 'latihan';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  phone: string;
  joinDate: string;
  status: 'aktif' | 'percubaan' | 'rehat';
  avatarColor: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToId: string; // TeamMember id
  assignedToName: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  shift: string; // e.g. "Pagi 08:00 - 16:00"
  estimatedHours: number;
  completedAt?: string;
  dueDate: string;
  isBottleneck: boolean;
  notes?: string;
  sopStandard?: string;
}

// Dokumen #1: Borang Temuduga Ringkas Pekerja
export interface InterviewQuestion {
  id: number;
  question: string;
  candidateAnswer: string;
  bossNote: string;
  tip?: string;
}

export interface InterviewForm {
  id: string;
  createdAt: string;
  candidateName: string;
  phone: string;
  positionApplied: string;
  livingArea: string;
  transport: string;
  availableStartDate: string;
  previousWorkplace: string;
  previousPosition: string;
  durationWorked: string;
  reasonLeaving: string;
  questions: InterviewQuestion[];
  briefingChecklist: {
    waktuShift: boolean;
    hariBekerja: boolean;
    hariRehat: boolean;
    tugasUtama: boolean;
    kadarBayaran: boolean;
    kitaranBayaran: boolean;
    expectationKetepatanMasa: boolean;
    caraMaklumkanKetidakhadiran: boolean;
    caraMintaCuti: boolean;
    penggunaanTelefon: boolean;
    rulesPenting: boolean;
    bahagianKerjaMencabar: boolean;
  };
  lastQuestionAnswer: string;
  evaluation: {
    ketepatanMasa: 'baik' | 'belum_pasti' | 'meragukan';
    komunikasi: 'baik' | 'belum_pasti' | 'meragukan';
    kesesuaianJadual: 'baik' | 'belum_pasti' | 'meragukan';
    sikapArahan: 'baik' | 'belum_pasti' | 'meragukan';
    komitmen: 'baik' | 'belum_pasti' | 'meragukan';
  };
  additionalNotes: string;
  decision: 'pertimbangkan' | 'semakan_lanjut' | 'tidak_sesuai';
  decisionReason: string;
  interviewerName: string;
  interviewDate: string;
}

// Dokumen #2: Checklist Hari Pertama Pekerja
export interface OnboardingChecklist {
  id: string;
  createdAt: string;
  employeeName: string;
  position: string;
  startDate: string;
  briefedBy: string;
  waktuTempatKerja: {
    waktuMula: boolean;
    waktuTamat: boolean;
    shift: boolean;
    hariBekerja: boolean;
    hariRehat: boolean;
    waktuRehat: boolean;
    uniformPakaian: boolean;
    tempatSimpanBarang: boolean;
    siapaBeriArahan: boolean;
  };
  tugasUtama: Array<{
    name: string;
    sudahDitunjukkan: boolean;
    pekerjaSudahCuba: boolean;
  }>;
  standardKerja: {
    caraGunaPeralatan: boolean;
    standardKebersihan: boolean;
    layananCustomer: boolean;
    keselamatan: boolean;
    tahuBilaTakPasti: boolean;
  };
  kehadiran: {
    rekodKehadiran: boolean;
    maksudMulaKerja: boolean;
    buatBilaLambat: boolean;
    buatBilaTakBolehDatang: boolean;
    mintaCuti: boolean;
    siapaDihubungi: boolean;
  };
  telefon: {
    bilaBolehGuna: boolean;
    bilaPerluSimpan: boolean;
    urusanKecemasan: boolean;
    rulesKhusus: string;
  };
  gajiBayaran: {
    kadarBayaran: boolean;
    kitaranBayaran: boolean;
    kepentinganRekodKehadiran: boolean;
    slipGaji: boolean;
    siapaBolehDitanya: boolean;
  };
  bilaAdaMasalah: {
    takFahamArahan: boolean;
    tersilapBuatKerja: boolean;
    customerComplain: boolean;
    peralatanRosak: boolean;
    konflikPekerja: boolean;
    isuOperasi: boolean;
  };
  rulesPentingBisnes: string[];
  checkInHujungHari: {
    bahagianKurangJelas: string;
    waktuKerjaJelas: boolean;
    tugasUtamaJelas: boolean;
    rulesAsasJelas: boolean;
    caraRekodKehadiranJelas: boolean;
    siapaPerluDitanyaJelas: boolean;
  };
  confirmedByEmployee: boolean;
  confirmedByBoss: boolean;
}

// Dokumen #3: Checklist Peraturan Kerja
export interface WorkRulesChecklist {
  id: string;
  createdAt: string;
  companyName: string;
  businessType: string;
  waktuKehadiran: {
    waktuMulaJelas: boolean;
    waktuTamatJelas: boolean;
    shiftJelas: boolean;
    hariBekerjaJelas: boolean;
    hariRehatJelas: boolean;
    caraRekodKehadiranJelas: boolean;
    prosedurLambatJelas: boolean;
    prosedurTakHadirJelas: boolean;
    caraMintaCutiJelas: boolean;
    rulesKhusus: string;
  };
  penggunaanTelefon: {
    tidakGangguTugas: boolean;
    waktuPenggunaanDibenarkan: boolean;
    urusanKecemasan: boolean;
    mediaSosial: boolean;
    rulesKhusus: string;
  };
  tugasTanggungjawab: {
    tugasUtamaJelas: boolean;
    siapaBeriArahanJelas: boolean;
    standardKerjaDiterangkan: boolean;
    tahuBilaPerluTanya: boolean;
    prosedurTugasTakSiapJelas: boolean;
    rulesKhusus: string;
  };
  sikapKomunikasi: {
    komunikasiCustomer: boolean;
    komunikasiRakanSekerja: boolean;
    maklumkanMasalah: boolean;
    terimaArahanPembetulan: boolean;
    tiadaJeritanAtauSeranganPeribadi: boolean;
    rulesKhusus: string;
  };
  kebersihanKeselamatan: {
    standardKebersihan: boolean;
    prosedurKeselamatan: boolean;
    gunaPeralatan: boolean;
    kerosakanDimaklumkan: boolean;
    peralatanDijaga: boolean;
    rulesKhusus: string;
  };
  cutiLambat: {
    caraMintaCuti: boolean;
    notisDiharapkan: boolean;
    bilaKecemasan: boolean;
    bilaLambat: boolean;
    siapaDihubungi: boolean;
    rulesKhusus: string;
  };
  gajiBayaran: {
    kadarBayaran: boolean;
    kitaranBayaran: boolean;
    kepentinganRekodKehadiran: boolean;
    prosesPertanyaanGaji: boolean;
    rekodDalamSistem: boolean;
  };
  limaRulesKhusus: string[];
}

// Dokumen #4: Rekod Teguran & Perbincangan Pekerja
export interface CoachingRecord {
  id: string;
  createdAt: string;
  employeeName: string;
  position: string;
  discussionDate: string;
  discussionTime: string;
  location: string;
  supervisorName: string;
  issueTypes: string[]; // Kehadiran, Lewat, Ketidakhadiran, Tugas tidak siap, Tidak mengikut arahan, Telefon, Komunikasi, Customer complaint, Konflik pekerja, Prestasi kerja, Keselamatan
  whatHappenedFacts: string; // Tulis FAKTA. Elakkan label.
  relatedRecords: string[]; // RinggitKerja, Jadual kerja, WhatsApp, Rekod tugas, Aduan customer, Foto/dokumen
  recordNotes: string;
  whatWasDiscussed: string;
  operationalImpact: string;
  employeeExplanation: string; // Dengar dahulu
  whatNeedsToChange: string; // Expectation selepas perbincangan
  startsFromDate: string;
  followUpActions: string[]; // Jelaskan semula rules, Beri arahan, Latihan semula, Pantau, Semak jadual, Dapatkan maklumat, Follow-up
  followUpDate: string;
  followUpStatus: 'selesai' | 'bertambah_baik' | 'masih_dipantau' | 'berulang' | 'perlu_tindakan_lanjut';
  followUpNotes: string;
  acknowledgedByEmployee: boolean;
  acknowledgedBySupervisor: boolean;
}

// Dokumen #5: Borang Penjelasan Pekerja
export interface ExplanationForm {
  id: string;
  createdAt: string;
  employeeName: string;
  position: string;
  incidentDate: string;
  categories: string[]; // Tidak hadir, Lewat, Tinggalkan kerja, Arahan tak dibuat, Prestasi, dsb.
  bossFactSummary: string;
  employeeStatement: string; // Terangkan apa yang berlaku
  whyItHappened: string; // Kenapa perkara tersebut berlaku
  wasBossNotified: boolean;
  notificationDetails?: {
    who: string;
    when: string;
    how: string;
  };
  witnessesInvolved: boolean;
  witnessDetails?: {
    name: string;
    role: string;
    brief: string;
  };
  supportingRecords: string[];
  preventivePlan: string; // Apa yang boleh dibuat untuk mengelakkan perkara ini berulang
  additionalNotes: string;
  employeeSigned: boolean;
  bossNextAction: {
    maklumatCukup: boolean;
    semakSistem: boolean;
    semakMesej: boolean;
    semakJadual: boolean;
    bercakapPihakLain: boolean;
    perluFollowUp: boolean;
    perluReview: boolean;
    nextStepText: string;
  };
}

// Dokumen #6: Checklist Sebelum Tindakan Serius (Emergency Brake)
export interface SeriousActionChecklist {
  id: string;
  createdAt: string;
  caseName: string;
  employeeName: string;
  position: string;
  reviewDate: string;
  issue: string;
  step1_factsSupported: string;
  step1_assumptionsUnconfirmed: string;
  step2_expectationExplained: 'ya' | 'tidak' | 'tidak_pasti';
  step2_howExplained: string[];
  step2_notes: string;
  step3_recordsAvailable: string[];
  step3_whatRecordsShow: string;
  step4_givenChanceToExplain: 'ya' | 'tidak' | 'belum_diperlukan';
  step4_explanationSummary: string;
  step4_whatStillNeedsCheck: string;
  step5_frequency: 'pertama_kali' | 'pernah_berlaku' | 'berulang' | 'tidak_pasti';
  step5_previousIncidentDate?: string;
  step5_previousResponse?: string;
  step5_previousExpectation?: string;
  step5_hasChangeAfterThat?: string;
  step6_canBeFixedReasons: string[];
  step6_notes: string;
  step7_emotionCheckReasons: string[];
  step7_sameDecisionIfGoodMood: string;
  step8_preActionReview: {
    tahuFaktaUtama: boolean;
    asingkanFaktaAndaian: boolean;
    semakRekod: boolean;
    ruangPenjelasanDiberi: boolean;
    semakSejarahKes: boolean;
    expectationJelas: boolean;
    tidakSemataMataMarah: boolean;
    semakPolisiUndangUndang: boolean;
    dapatPandanganProfesional: boolean;
  };
  step9_nextStep: string;
  step9_reason: string;
  actionReviewDate: string;
}

// Dokumen #8: Betul-betul Perlu Tambah Pekerja? (Audit Kapasiti)
export interface CapacityAudit {
  id: string;
  createdAt: string;
  reasonsThoughtNeeded: string[]; // Boss terlalu banyak kerja, Customer menunggu lama, Kerja tak siap, dsb.
  mainProblemToSolve: string;
  audit7Days: {
    busiestDayTime: string;
    slowestDayTime: string;
    hoursLackingStaff: number;
    issueTiming: 'sepanjang_hari' | 'waktu_tertentu' | 'hari_tertentu' | 'hujung_minggu' | 'musim_tertentu' | 'belum_pasti';
    isBottleneckTwoHoursVsEightHours: boolean;
  };
  taskDelegation: {
    allKnowRolesDuringRush: 'ya' | 'tidak' | 'tidak_pasti';
    bottleneckTask: string;
    whoDoesItNow: string;
    twoPeopleDoingSameThing: boolean;
    whoResponsiblePeakHour: string;
  };
  bossDailyTasks: Array<{
    task: string;
    doneBy: 'BOSS' | 'PEKERJA' | 'SISTEM';
  }>;
  systemIssuesChecked: string[];
  overburdenSigns: string[];
  alternativeTrial: {
    testedActions: string[];
    whatWillBeTested: string;
    testPeriod: string;
    fromDate: string;
    toDate: string;
    reviewDate: string;
  };
  ifMustHire: {
    threeMainTasks: [string, string, string];
    daysNeeded: string;
    hoursNeeded: string;
    peakHour: string;
    needType: string;
    monthlyCommitmentRM: number;
    expectedOutcome: string;
  };
  fiveQuestions: {
    tahuMasalahSebenar: boolean;
    tahuTigaTugasUtama: boolean;
    tahuHariWaktuKekurangan: boolean;
    cubaKemaskanProses: boolean;
    bisnesMampuKomitmen: boolean;
  };
  decision: 'ya_perlu_pekerja' | 'mungkin_uji_sistem' | 'belum_perlu';
  decisionDetails: string;
}
