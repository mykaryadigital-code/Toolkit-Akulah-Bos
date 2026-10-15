import { 
  TeamMember, 
  Task, 
  InterviewForm, 
  OnboardingChecklist, 
  WorkRulesChecklist, 
  CoachingRecord, 
  ExplanationForm, 
  SeriousActionChecklist, 
  CapacityAudit 
} from '../types';

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'emp-1',
    name: 'Amirul Hakim',
    role: 'Lead Barista & Operasi Pagi',
    shift: 'Syif Pagi (07:30 - 15:30)',
    phone: '012-8923145',
    joinDate: '2024-03-15',
    status: 'aktif',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'emp-2',
    name: 'Siti Nur Aisyah',
    role: 'Krew Servis & Juruwang',
    shift: 'Syif Penuh (08:30 - 17:00)',
    phone: '017-4512980',
    joinDate: '2024-06-01',
    status: 'aktif',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'emp-3',
    name: 'Danial Firdaus',
    role: 'Krew Dapur & Penyediaan Bahan',
    shift: 'Syif Petang (14:00 - 22:30)',
    phone: '019-3387124',
    joinDate: '2024-09-10',
    status: 'percubaan',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'emp-4',
    name: 'Nurul Hani',
    role: 'Penyelia Operasi / Floor Lead',
    shift: 'Syif Fleksibel (10:00 - 18:30)',
    phone: '011-23098871',
    joinDate: '2023-11-20',
    status: 'aktif',
    avatarColor: 'bg-purple-600'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-1',
    title: 'Checklist Pembukaan (Opening SOP) & Panaskan Mesin',
    description: 'Buka suis utama, kalibrasi mesin espresso, sediakan 10kg ais kiub, semak kebersihan kaunter.',
    assignedToId: 'emp-1',
    assignedToName: 'Amirul Hakim',
    category: 'opening',
    priority: 'tinggi',
    status: 'completed',
    shift: 'Syif Pagi (07:30 - 15:30)',
    estimatedHours: 1.0,
    dueDate: '2026-10-12',
    isBottleneck: false,
    sopStandard: 'Sedia tepat jam 08:30 sebelum pintu dibuka kepada pelanggan pertama.'
  },
  {
    id: 'tsk-2',
    title: 'Prep Bahan Waktu Puncak Lunch (11:30 - 14:00)',
    description: 'Penyediaan stok susu berkrim, sos signature, dan pastry display siap berlabel tarikh.',
    assignedToId: 'emp-3',
    assignedToName: 'Danial Firdaus',
    category: 'peak_hour',
    priority: 'tinggi',
    status: 'in_progress',
    shift: 'Syif Pagi & Puncak',
    estimatedHours: 2.0,
    dueDate: '2026-10-12',
    isBottleneck: true,
    sopStandard: 'Elakkan kehabisan stok semasa giliran order melebihi 5 cawan serentak.'
  },
  {
    id: 'tsk-3',
    title: 'Imbangan Tunai Peti Wang (Float Cash & POS Audit)',
    description: 'Semak kiraan duit syiling permulaan RM200 dan sahkan terminal bayaran kad/QR online.',
    assignedToId: 'emp-2',
    assignedToName: 'Siti Nur Aisyah',
    category: 'operasi',
    priority: 'sederhana',
    status: 'completed',
    shift: 'Syif Penuh',
    estimatedHours: 0.5,
    dueDate: '2026-10-12',
    isBottleneck: false,
    sopStandard: 'Resit ujian cetak mesti disimpan dalam fail harian.'
  },
  {
    id: 'tsk-4',
    title: 'Kawalan Meja & Sanitasi Ruang Makan Semasa Peak Hour',
    description: 'Pembersihan meja dalam tempoh 90 saat selepas pelanggan beredar, lap dulang, kemas cutlery station.',
    assignedToId: 'emp-2',
    assignedToName: 'Siti Nur Aisyah',
    category: 'peak_hour',
    priority: 'tinggi',
    status: 'in_progress',
    shift: 'Syif Penuh',
    estimatedHours: 2.5,
    dueDate: '2026-10-12',
    isBottleneck: true,
    sopStandard: 'Pelanggan baharu tidak boleh duduk di meja yang masih ada sisa makanan.'
  },
  {
    id: 'tsk-5',
    title: 'Audit Suhu Chiller & Log Tarikh Luput Makanan',
    description: 'Catat suhu chiller minuman (< 4°C) dan freezer kek (-18°C) pada papan log dapur.',
    assignedToId: 'emp-4',
    assignedToName: 'Nurul Hani',
    category: 'kebersihan',
    priority: 'sederhana',
    status: 'todo',
    shift: 'Syif Fleksibel',
    estimatedHours: 0.75,
    dueDate: '2026-10-12',
    isBottleneck: false,
    sopStandard: 'Jika suhu melebihi 5°C, maklumkan boss serta-merta tanpa tunggu tamat syif.'
  },
  {
    id: 'tsk-6',
    title: 'Checklist Penutupan (Closing SOP) & Flush Paip Mesin Kopi',
    description: 'Backflush grup head dengan detergent kimia, buang sisa kopi, bersihkan perangkap minyak, kunci pintu.',
    assignedToId: 'emp-3',
    assignedToName: 'Danial Firdaus',
    category: 'closing',
    priority: 'tinggi',
    status: 'todo',
    shift: 'Syif Petang (14:00 - 22:30)',
    estimatedHours: 1.5,
    dueDate: '2026-10-12',
    isBottleneck: false,
    sopStandard: 'Semak double-lock sebelum kunci diserahkan ke kotak keselamatan.'
  }
];

export const INITIAL_INTERVIEW_FORMS: InterviewForm[] = [
  {
    id: 'iv-001',
    createdAt: '2026-10-10',
    candidateName: 'Muhammad Izzat bin Kamaruzaman',
    phone: '013-7749012',
    positionApplied: 'Barista / Frontline Staff',
    livingArea: 'Seksyen 7, Shah Alam (5km dari kedai)',
    transport: 'Motosikal sendiri',
    availableStartDate: '2026-10-20',
    previousWorkplace: 'Kafe Kopi Kampung',
    previousPosition: 'Krew Servis',
    durationWorked: '8 bulan',
    reasonLeaving: 'Mahu belajar kemahiran mesin espresso komersial dan jadual syif lebih tersusun.',
    questions: [
      {
        id: 1,
        question: 'Kenapa anda nak kerja di sini?',
        candidateAnswer: 'Suka suasana kedai dan nampak ada SOP kerja yang jelas serta peluang belajar latte art.',
        bossNote: 'Jawapan spesifik, bukan sekadar "sebab nak gaji". Ada minat dalam bidang F&B.',
        tip: 'Dengar bagaimana calon bercerita tentang tempat kerja lama.'
      },
      {
        id: 2,
        question: 'Ada komitmen yang mungkin ganggu jadual kerja? (kelas, keluarga, kenderaan)',
        candidateAnswer: 'Tiada kelas, tinggal berdekatan, ada motor sendiri.',
        bossNote: 'Tiada halangan jadual hujung minggu.',
        tip: 'Pastikan komitmen peribadi tidak berlanggar dengan jadual operasi perniagaan.'
      },
      {
        id: 3,
        question: 'Kalau shift bermula pukul 9 pagi, pukul berapa anda akan sampai?',
        candidateAnswer: 'Pukul 8:45 pagi supaya sempat letak beg dan siap berdiri di kaunter pukul 9:00 pagi.',
        bossNote: 'Faham konsep "sampai sebelum waktu kerja mula" tanpa perlu diajar semula.',
        tip: 'Expectation: pekerja sudah bersedia bekerja tepat pukul 9:00 pagi.'
      },
      {
        id: 4,
        question: 'Kalau tiba-tiba anda tak boleh datang kerja, apa anda akan buat?',
        candidateAnswer: 'Hubungi boss sekurang-kurangnya 3 jam sebelum shift bermula dan berikan bukti mc/sebab.',
        bossNote: 'Memahami kesan ketidakhadiran mendadak terhadap rakan syif.',
        tip: 'Jangan tunggu shift dah bermula baru senyap!'
      },
      {
        id: 5,
        question: 'Kalau anda tak tahu cara buat sesuatu tugas, apa anda akan buat?',
        candidateAnswer: 'Saya akan tanya penyelia atau rujuk senarai semak, takkan buat sesuka hati.',
        bossNote: 'Sikap merendah diri dan sanggup bertanya.',
        tip: 'Kalau tak tahu, tanya. Jangan buat ikut andaian.'
      },
      {
        id: 6,
        question: 'Kalau boss tegur kerja anda, macam mana anda biasanya respond?',
        candidateAnswer: 'Dengar dulu teguran, perbaiki cara kerja dan elak buat kesilapan sama berulang.',
        bossNote: 'Respon matang, tidak mudah defensif.',
        tip: 'Uji keterbukaan calon menerima bimbingan operasi.'
      },
      {
        id: 7,
        question: 'Kalau semuanya berjalan baik, berapa lama anda merancang untuk bekerja?',
        candidateAnswer: 'Sekurang-kurangnya 1 tahun ke atas kerana mahu membina pengalaman kukuh.',
        bossNote: 'Komitmen munasabah untuk jawatan operasi.',
        tip: 'Cari kepastian kestabilan tenaga kerja.'
      }
    ],
    briefingChecklist: {
      waktuShift: true,
      hariBekerja: true,
      hariRehat: true,
      tugasUtama: true,
      kadarBayaran: true,
      kitaranBayaran: true,
      expectationKetepatanMasa: true,
      caraMaklumkanKetidakhadiran: true,
      caraMintaCuti: true,
      penggunaanTelefon: true,
      rulesPenting: true,
      bahagianKerjaMencabar: true
    },
    lastQuestionAnswer: 'Calon bertanya mengenai sistem elaun kedatangan dan pakaian seragam yang disediakan.',
    evaluation: {
      ketepatanMasa: 'baik',
      komunikasi: 'baik',
      kesesuaianJadual: 'baik',
      sikapArahan: 'baik',
      komitmen: 'baik'
    },
    additionalNotes: 'Calon ada asas barista, komunikasi tertib dan jelas. Sesuai untuk syif pembukaan.',
    decision: 'pertimbangkan',
    decisionReason: 'Menepati kriteria sikap, jarak dekat, dan kefahaman masa yang jelas.',
    interviewerName: 'Boss Azlan',
    interviewDate: '2026-10-10'
  }
];

export const INITIAL_ONBOARDING: OnboardingChecklist = {
  id: 'onb-001',
  createdAt: '2024-09-10',
  employeeName: 'Danial Firdaus',
  position: 'Krew Dapur & Penyediaan Bahan',
  startDate: '2024-09-10',
  briefedBy: 'Nurul Hani (Penyelia)',
  waktuTempatKerja: {
    waktuMula: true,
    waktuTamat: true,
    shift: true,
    hariBekerja: true,
    hariRehat: true,
    waktuRehat: true,
    uniformPakaian: true,
    tempatSimpanBarang: true,
    siapaBeriArahan: true
  },
  tugasUtama: [
    { name: 'Penyediaan Sambal Signature & Sos', sudahDitunjukkan: true, pekerjaSudahCuba: true },
    { name: 'Kawal Suhu Deep Fryer & Masa Menggoreng', sudahDitunjukkan: true, pekerjaSudahCuba: true },
    { name: 'Penyusunan Chiller & FIFO (First In First Out)', sudahDitunjukkan: true, pekerjaSudahCuba: true }
  ],
  standardKerja: {
    caraGunaPeralatan: true,
    standardKebersihan: true,
    layananCustomer: true,
    keselamatan: true,
    tahuBilaTakPasti: true
  },
  kehadiran: {
    rekodKehadiran: true,
    maksudMulaKerja: true,
    buatBilaLambat: true,
    buatBilaTakBolehDatang: true,
    mintaCuti: true,
    siapaDihubungi: true
  },
  telefon: {
    bilaBolehGuna: true,
    bilaPerluSimpan: true,
    urusanKecemasan: true,
    rulesKhusus: 'Telefon disimpan di dalam loker peribadi semasa bertugas di stesen dapur kecuali waktu rehat 45 minit.'
  },
  gajiBayaran: {
    kadarBayaran: true,
    kitaranBayaran: true,
    kepentinganRekodKehadiran: true,
    slipGaji: true,
    siapaBolehDitanya: true
  },
  bilaAdaMasalah: {
    takFahamArahan: true,
    tersilapBuatKerja: true,
    customerComplain: true,
    peralatanRosak: true,
    konflikPekerja: true,
    isuOperasi: true
  },
  rulesPentingBisnes: [
    'Kebersihan stesen kerja adalah keutamaan mutlak (Clean as you go).',
    'Ketepatan masa: Berdiri di stesen sedia bekerja tepat pada waktu syif bermula.',
    'Kalau tak tahu, tanya; kalau tersilap, terus mengaku supaya dapat dibetulkan segera.',
    'Telefon bimbit hanya untuk urusan kecemasan di luar stesen kerja.',
    'Hormat rakan sekerja — tiada jeritan atau tingkah laku toksik di ruang dapur.'
  ],
  checkInHujungHari: {
    bahagianKurangJelas: 'Cara log tarikh luput bahan sos yang disimpan dalam bekas kedap udara.',
    waktuKerjaJelas: true,
    tugasUtamaJelas: true,
    rulesAsasJelas: true,
    caraRekodKehadiranJelas: true,
    siapaPerluDitanyaJelas: true
  },
  confirmedByEmployee: true,
  confirmedByBoss: true
};

export const INITIAL_WORK_RULES: WorkRulesChecklist = {
  id: 'rules-001',
  createdAt: '2024-01-01',
  companyName: 'Kafe Rasa Warisan & Bakeri',
  businessType: 'F&B dan Perkhidmatan Makanan',
  waktuKehadiran: {
    waktuMulaJelas: true,
    waktuTamatJelas: true,
    shiftJelas: true,
    hariBekerjaJelas: true,
    hariRehatJelas: true,
    caraRekodKehadiranJelas: true,
    prosedurLambatJelas: true,
    prosedurTakHadirJelas: true,
    caraMintaCutiJelas: true,
    rulesKhusus: 'Kehadiran direkod melalui imbasan kod QR stesen kerja semasa mula dan tamat syif.'
  },
  penggunaanTelefon: {
    tidakGangguTugas: true,
    waktuPenggunaanDibenarkan: true,
    urusanKecemasan: true,
    mediaSosial: true,
    rulesKhusus: 'Dilarang merakam live media sosial peribadi di ruang dapur atau semasa melayan pelanggan.'
  },
  tugasTanggungjawab: {
    tugasUtamaJelas: true,
    siapaBeriArahanJelas: true,
    standardKerjaDiterangkan: true,
    tahuBilaPerluTanya: true,
    prosedurTugasTakSiapJelas: true,
    rulesKhusus: 'Arahan harian diselaraskan oleh Supervisor bertugas. Sebarang halangan dimaklumkan 30 minit sebelum tamat syif.'
  },
  sikapKomunikasi: {
    komunikasiCustomer: true,
    komunikasiRakanSekerja: true,
    maklumkanMasalah: true,
    terimaArahanPembetulan: true,
    tiadaJeritanAtauSeranganPeribadi: true,
    rulesKhusus: 'Sapa setiap pelanggan dengan senyuman dan nada mesra. Sebarang perselisihan faham dibawa ke bilik rehat secara tenang.'
  },
  kebersihanKeselamatan: {
    standardKebersihan: true,
    prosedurKeselamatan: true,
    gunaPeralatan: true,
    kerosakanDimaklumkan: true,
    peralatanDijaga: true,
    rulesKhusus: 'Pakai apron bersih, sarung kepala, dan kasut bertutup anti-slip sepanjang waktu bertugas.'
  },
  cutiLambat: {
    caraMintaCuti: true,
    notisDiharapkan: true,
    bilaKecemasan: true,
    bilaLambat: true,
    siapaDihubungi: true,
    rulesKhusus: 'Permohonan cuti rehat mesti dihantar sekurang-kurangnya 5 hari lebih awal melalui borang operasi.'
  },
  gajiBayaran: {
    kadarBayaran: true,
    kitaranBayaran: true,
    kepentinganRekodKehadiran: true,
    prosesPertanyaanGaji: true,
    rekodDalamSistem: true
  },
  limaRulesKhusus: [
    'Pukul 9:00 pagi bermaksud sudah bersedia di kaunter, bukan baru melangkah masuk pintu kedai.',
    'Kalau tak faham resepi atau sukatan, tanya penyelia — elakkan membazir bahan.',
    'Kebersihan meja dan stesen kerja dijaga setiap saat (Clean as you go).',
    'Telefon disimpan rapi dalam loker semasa waktu bekerja.',
    'Sebarang kerosakan mesin wajib dilaporkan serta-merta pada papan log penyelenggaraan.'
  ]
};

export const INITIAL_COACHING_RECORDS: CoachingRecord[] = [
  {
    id: 'coach-001',
    createdAt: '2026-10-08',
    employeeName: 'Danial Firdaus',
    position: 'Krew Dapur',
    discussionDate: '2026-10-08',
    discussionTime: '15:30',
    location: 'Bilik Perbincangan Pejabat Kafe',
    supervisorName: 'Boss Azlan',
    issueTypes: ['Lewat', 'Kehadiran', 'Prestasi kerja'],
    whatHappenedFacts: 'Pekerja dijadualkan masuk syif pagi jam 9:00 pagi, namun direkodkan tiba jam 9:42 pagi tanpa membuat makluman awal kepada penyelia bertugas. Kelewatan menyebabkan persediaan stesen menggoreng tertangguh sebanyak 40 minit.',
    relatedRecords: ['Rekod kehadiran imbasan QR', 'Mesej WhatsApp kumpulan operasi', 'Log pesanan dapur'],
    recordNotes: 'Tiada mesej kecemasan diterima sebelum jam 9:00 pagi.',
    whatWasDiscussed: 'Membincangkan kepentingan ketepatan masa pada pembukaan syif dan prosedur pemberitahuan awal jika berdepan masalah kenderaan atau hal kecemasan.',
    operationalImpact: 'Krew barista terpaksa meninggalkan stesen minuman untuk membantu persediaan dapur, menyebabkan giliran pesanan pelanggan lewat 15 minit.',
    employeeExplanation: 'Danial menerangkan tayar motosikal mengalami kebocoran di lebuhraya dan telefon kehabisan bateri untuk menghantar pesanan WhatsApp lebih awal.',
    whatNeedsToChange: 'Danial memahami keperluan memeriksa kenderaan lebih awal dan memastikan telefon sentiasa ada baki kuasa. Jika berlaku kecemasan, cari alternatif menghubungi kedai dalam masa 15 minit pertama.',
    startsFromDate: '2026-10-09',
    followUpActions: ['Jelaskan semula rules', 'Semak jadual / tugas', 'Pantau', 'Follow-up pada tarikh tertentu'],
    followUpDate: '2026-10-16',
    followUpStatus: 'masih_dipantau',
    followUpNotes: 'Dalam tempoh 4 hari pertama selepas perbincangan, Danial tiba jam 8:48 pagi (12 minit lebih awal) dengan stesen bersih.',
    acknowledgedByEmployee: true,
    acknowledgedBySupervisor: true
  }
];

export const INITIAL_EXPLANATION_FORMS: ExplanationForm[] = [
  {
    id: 'exp-001',
    createdAt: '2026-10-08',
    employeeName: 'Danial Firdaus',
    position: 'Krew Dapur',
    incidentDate: '2026-10-08',
    categories: ['Lewat'],
    bossFactSummary: 'Tiba di tempat kerja pada jam 9:42 pagi, lewat 42 minit daripada jadual syif 9:00 pagi tanpa mesej awal.',
    employeeStatement: 'Saya bertolak dari rumah pada jam 8:25 pagi. Di pertengahan jalan berhampiran jambatan, tayar motosikal belakang pancit terkena paku. Saya terpaksa menolak motor ke bengkel sejauh 1.5km yang baru dibuka jam 9:15 pagi.',
    whyItHappened: 'Insiden tayar pancit di luar jangkaan dan kebetulan telefon kehabisan bateri kerana terlupa cas semalaman.',
    wasBossNotified: true,
    notificationDetails: {
      who: 'Penyelia Nurul Hani',
      when: 'Jam 9:35 pagi sebaik sahaja meminjam pengecas di bengkel motor',
      how: 'Panggilan telefon terus'
    },
    witnessesInvolved: false,
    supportingRecords: ['Resit bayaran tampal tiub tayar bengkel Motor Ah Seng bernilai RM15 bertarikh 08/10/2026'],
    preventivePlan: 'Saya akan memastikan powerbank dibawa bersama, menyelenggara tayar motor secara berkala, dan bertolak 30 minit lebih awal untuk perjalanan syif pagi.',
    additionalNotes: 'Saya memohon maaf kepada seluruh pasukan atas kesulitan penyediaan bahan makanan pagi ini.',
    employeeSigned: true,
    bossNextAction: {
      maklumatCukup: true,
      semakSistem: true,
      semakMesej: true,
      semakJadual: false,
      bercakapPihakLain: false,
      perluFollowUp: true,
      perluReview: false,
      nextStepText: 'Terima penjelasan berasaskan resit bengkel. Teruskan pemantauan seminggu tanpa hukuman pemotongan berlebihan, namun catat rekod teguran rasmi.'
    }
  }
];

export const INITIAL_SERIOUS_ACTIONS: SeriousActionChecklist[] = [
  {
    id: 'act-001',
    createdAt: '2026-10-05',
    caseName: 'Semakan Isu Ketidakhadiran Berulang (Staf Percubaan)',
    employeeName: 'Kamarul Ariffin',
    position: 'Pembantu Servis',
    reviewDate: '2026-10-05',
    issue: 'Ketidakhadiran tanpa makluman (No Show / MIA) pada 2 syif hujung minggu berturut-turut.',
    step1_factsSupported: 'Rekod sistem menunjukkan ketiadaan imbasan kehadiran pada Sabtu 28/09 dan Ahad 29/09. Panggilan penyelia sebanyak 4 kali tidak dijawab.',
    step1_assumptionsUnconfirmed: 'Tiada bukti fizikal sakit atau kemalangan dikemukakan sehingga tarikh semakan.',
    step2_expectationExplained: 'ya',
    step2_howExplained: ['Hari pertama', 'Rules kerja', 'Perbincangan terdahulu'],
    step2_notes: 'Pekerja telah menandatangani Checklist Hari Pertama yang menyatakan wajib maklum 3 jam sebelum syif.',
    step3_recordsAvailable: ['Rekod kehadiran', 'Rekod teguran / perbincangan', 'WhatsApp / mesej'],
    step3_whatRecordsShow: 'Rekod WhatsApp menunjukkan mesej tidak berbalas semasa syif berlangsung.',
    step4_givenChanceToExplain: 'ya',
    step4_explanationSummary: 'Pekerja menyatakan mempunyai urusan peribadi mendesak tetapi mengakui tidak menghubungi penyelia kerana takut dimarahi.',
    step4_whatStillNeedsCheck: 'Pengesahan surat sokongan rasmi jika ada.',
    step5_frequency: 'berulang',
    step5_previousIncidentDate: '15/09/2026',
    step5_previousResponse: 'Pemberian teguran lisan pertama dan bimbingan cara permohonan cuti kecemasan.',
    step5_previousExpectation: 'Wajib hubungi supervisor serta-merta tanpa mengira situasi.',
    step5_hasChangeAfterThat: 'Tiada perubahan; kesalahan yang sama berulang 2 minggu kemudian.',
    step6_canBeFixedReasons: ['Isu nampak serius', 'Masalah berulang walaupun sudah dibincang'],
    step6_notes: 'Menjejaskan operasi rakan sepasukan yang terpaksa bekerja overtime tanpa persediaan.',
    step7_emotionCheckReasons: [
      'Berdasarkan fakta',
      'Berdasarkan rekod',
      'Masalah berulang',
      'Memberi kesan kepada operasi'
    ],
    step7_sameDecisionIfGoodMood: 'Ya, keputusan kekal sama kerana impak operasi berulang dan rekod fakta jelas tanpa berat sebelah.',
    step8_preActionReview: {
      tahuFaktaUtama: true,
      asingkanFaktaAndaian: true,
      semakRekod: true,
      ruangPenjelasanDiberi: true,
      semakSejarahKes: true,
      expectationJelas: true,
      tidakSemataMataMarah: true,
      semakPolisiUndangUndang: true,
      dapatPandanganProfesional: true
    },
    step9_nextStep: 'Keluarkan Surat Amaran Bertulis Rasmi (Written Warning) dengan tempoh percubaan pemantauan 14 hari sebelum tindakan penamatan kontrak percubaan.',
    step9_reason: 'Prosedur undang-undang memerlukan amaran bertulis sebelum tindakan penamatan sah diambil.',
    actionReviewDate: '2026-10-19'
  }
];

export const INITIAL_CAPACITY_AUDIT: CapacityAudit = {
  id: 'cap-001',
  createdAt: '2026-10-07',
  reasonsThoughtNeeded: [
    'Boss terlalu banyak kerja',
    'Customer menunggu lama',
    'Pekerja sedia ada terlalu sibuk',
    'Boss terlalu penat'
  ],
  mainProblemToSolve: 'Pesanan minuman dan makanan sangkut (bottleneck) antara jam 12:00 tengah hari hingga 2:00 petang.',
  audit7Days: {
    busiestDayTime: 'Rabu & Jumaat (12:00 - 14:00)',
    slowestDayTime: 'Isnin & Selasa (15:00 - 17:00)',
    hoursLackingStaff: 2,
    issueTiming: 'waktu_tertentu',
    isBottleneckTwoHoursVsEightHours: true
  },
  taskDelegation: {
    allKnowRolesDuringRush: 'tidak',
    bottleneckTask: 'Mengambil pesanan di kaunter serentak membungkus makanan untuk penghantaran (delivery riders).',
    whoDoesItNow: 'Juruwang seorang diri sambil boss terpaksa turun padang membantu.',
    twoPeopleDoingSameThing: true,
    whoResponsiblePeakHour: 'Semua orang buat semua... tiada zon yang ditetapkan.'
  },
  bossDailyTasks: [
    { task: 'Bancuh kopi semasa peak hour', doneBy: 'BOSS' },
    { task: 'Kira stok harian dan beli bahan di pasar', doneBy: 'BOSS' },
    { task: 'Jawab WhatsApp tempahan meja', doneBy: 'BOSS' },
    { task: 'Semak kehadiran staf dan jadual syif', doneBy: 'BOSS' },
    { task: 'Pembersihan kaunter dan basuh cawan', doneBy: 'PEKERJA' },
    { task: 'Penyediaan makanan panas', doneBy: 'PEKERJA' }
  ],
  systemIssuesChecked: [
    'Attendance masih dicari dalam WhatsApp',
    'Kiraan sama dibuat berulang kali',
    'Boss perlu mengingati terlalu banyak benda',
    'Slip gaji dibuat manual'
  ],
  overburdenSigns: [
    'Customer konsisten menunggu lama',
    'Team bekerja melebihi kapasiti secara berterusan pada waktu lunch'
  ],
  alternativeTrial: {
    testedActions: [
      'Ubah shift ikut peak hour',
      'Kemaskan pembahagian tugas',
      'Buat opening checklist',
      'Jelaskan siapa bertanggungjawab untuk apa',
      'Kurangkan proses manual'
    ],
    whatWillBeTested: 'Tetapkan stesen khusus: Siti fokus 100% kaunter & pembayaran, Danial sediakan bungkusan delivery, Amirul fokus minuman. Uji jadual syif part-time 3 jam peak hour jika perlu.',
    testPeriod: '10 hari ujian operasi',
    fromDate: '2026-10-09',
    toDate: '2026-10-19',
    reviewDate: '2026-10-20'
  },
  ifMustHire: {
    threeMainTasks: [
      'Pembungkusan & dispatch pesanan online / riders',
      'Penyediaan cawan dan ais berterusan',
      'Pembersihan meja segera'
    ],
    daysNeeded: 'Rabu hingga Ahad',
    hoursNeeded: '11:30 pagi hingga 2:30 petang (3 jam sehari)',
    peakHour: '12:00 - 14:00',
    needType: 'Bantuan sambilan (part-time) waktu peak hour sahaja, bukan pekerja penuh 8 jam',
    monthlyCommitmentRM: 650,
    expectedOutcome: 'Masa menunggu pelanggan berkurang dari 18 minit kepada bawah 7 minit.'
  },
  fiveQuestions: {
    tahuMasalahSebenar: true,
    tahuTigaTugasUtama: true,
    tahuHariWaktuKekurangan: true,
    cubaKemaskanProses: true,
    bisnesMampuKomitmen: true
  },
  decision: 'mungkin_uji_sistem',
  decisionDetails: 'Jangan terus beli 8 jam tenaga kerja untuk selesaikan masalah 2 jam! Kemaskan SOP agihan peranan dahulu selama 10 hari sebelum membuat keputusan pengambilan pekerja baharu.'
};

export const BOSS_GOLDEN_SCRIPTS = [
  {
    id: 'script-1',
    category: 'Ketepatan Masa & Waktu Mula',
    context: 'Apabila staf menganggap datang tepat pukul 9:00 bermaksud baru tiba di pintu kedai.',
    script: '“Kalau shift bermula pukul 9, expectation kita ialah pukul 9 anda sudah bersedia untuk mula bekerja.”',
    source: 'Dokumen #2 (Checklist Hari Pertama Pekerja)'
  },
  {
    id: 'script-2',
    category: 'Standard Kerja & Bertanya',
    context: 'Apabila pekerja membuat andaian sendiri atau takut bertanya apabila tidak pasti.',
    script: '“Kalau tak tahu, tanya. Jangan buat ikut andaian kalau anda tak pasti.”',
    source: 'Dokumen #2 (Checklist Hari Pertama Pekerja)'
  },
  {
    id: 'script-3',
    category: 'Kehadiran & Notis Awal',
    context: 'Mendidik pekerja supaya tidak senyap atau memaklumkan lambat apabila ada hal kecemasan.',
    script: '“Kalau ada masalah nak datang kerja, maklumkan awal supaya kami boleh susun operasi. Jangan tunggu shift dah bermula baru senyap.”',
    source: 'Dokumen #2 (Checklist Hari Pertama Pekerja)'
  },
  {
    id: 'script-4',
    category: 'Bila Tersilap Buat Kerja',
    context: 'Menggalakkan ketelusan dan membuang budaya menyembunyikan kesilapan di tempat kerja.',
    script: '“Kalau tak tahu, tanya. Kalau tersilap, beritahu. Lagi cepat kita tahu, lagi cepat kita boleh betulkan.”',
    source: 'Dokumen #2 & #3 (Rules & Onboarding)'
  },
  {
    id: 'script-5',
    category: 'Mulakan Sesi Teguran',
    context: 'Cara profesional memulakan perbincangan tanpa menuduh, berasaskan rekod fakta.',
    script: '“Aku nak bincang tentang apa yang berlaku. Aku akan terangkan apa yang aku nampak dalam rekod, kemudian aku nak dengar penjelasan daripada anda.”',
    source: 'Dokumen #4 (Rekod Teguran & Perbincangan Pekerja)'
  },
  {
    id: 'script-6',
    category: 'Bila Pekerja Defensif',
    context: 'Menenangkan situasi apabila staf mula meninggikan suara atau memberi pelbagai alasan emosi.',
    script: '“Aku belum buat kesimpulan. Sekarang aku nak faham apa yang berlaku dan dengar daripada pihak anda.”',
    source: 'Dokumen #4 (Rekod Teguran & Perbincangan Pekerja)'
  },
  {
    id: 'script-7',
    category: 'Bila Perbualan Lari Topik',
    context: 'Menarik balik fokus perbincangan kepada fakta utama kejadian tanpa terperangkap dalam aduan lain.',
    script: '“Kita fokus pada kejadian ini dulu. Selepas itu kalau ada perkara lain yang perlu dibincangkan, kita boleh lihat satu per satu.”',
    source: 'Dokumen #4 (Rekod Teguran & Perbincangan Pekerja)'
  },
  {
    id: 'script-8',
    category: 'Refleksi Diri Boss (Emotion Check)',
    context: 'Soalan brek kecemasan sebelum boss menjatuhkan sebarang hukuman berat.',
    script: '“Kalau kejadian yang sama berlaku tetapi aku tengah mood baik, adakah keputusan aku sama?”',
    source: 'Dokumen #6 (Checklist Sebelum Tindakan Serius)'
  },
  {
    id: 'script-9',
    category: 'Prinsip Ketegasan Boss Sebenar',
    context: 'Minda pengurusan yang membezakan kepimpinan matang dengan kepimpinan beremosi.',
    script: '“Boss yang tegas bukan boss yang paling cepat menghukum. Boss yang tegas ialah boss yang jelas, konsisten dan sanggup bertindak berdasarkan fakta.”',
    source: 'Dokumen #6 (Checklist Sebelum Tindakan Serius)'
  },
  {
    id: 'script-10',
    category: 'Prinsip Pengambilan Pekerja (Hiring)',
    context: 'Peringatan ketika boss rasa penat dan mahu terus mengambil pekerja tanpa audit.',
    script: '“Jangan terus membeli lapan jam tenaga kerja untuk menyelesaikan masalah dua jam. Penat ≠ Automatik tak cukup pekerja.”',
    source: 'Dokumen #8 (Betul-betul Perlu Tambah Pekerja?)'
  }
];
