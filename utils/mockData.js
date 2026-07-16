export const QUESTION_BANK = [
  {
    id: 'q1',
    prompt: 'Planladığımdan daha uzun süre ekran başında kalırım.',
    hint: 'Bu soru dijital kullanımın kontrolünü ölçer.',
    type: 'risk',
  },
  {
    id: 'q2',
    prompt: 'Stresli hissettiğimde sosyal medya veya video içeriklerine yönelirim.',
    hint: 'Dijital kaçınma eğilimini değerlendirir.',
    type: 'risk',
  },
  {
    id: 'q3',
    prompt: 'Gece geç saatlere kadar telefon/tablet kullanırım.',
    hint: 'Uyku ve ritim üzerindeki etkiyi gösterir.',
    type: 'risk',
  },
  {
    id: 'q4',
    prompt: 'Zorlandığımda güvendiğim birinden destek istemekte zorlanmam.',
    hint: 'Psikolojik dayanıklılığın önemli bir parçasıdır.',
    type: 'resilience',
  },
  {
    id: 'q5',
    prompt: 'Bildirimler dikkatimi bozsa bile telefonu kontrol etmeyi sürdürürüm.',
    hint: 'Dürtüsel kontrolü ve sınır koymayı test eder.',
    type: 'risk',
  },
];

export const SCALE_OPTIONS = [
  { value: 1, label: 'Hiç katılmıyorum' },
  { value: 2, label: 'Katılmıyorum' },
  { value: 3, label: 'Kararsızım' },
  { value: 4, label: 'Katılıyorum' },
  { value: 5, label: 'Tam katılıyorum' },
];

export const CATEGORY_COPY = {
  mental: {
    label: 'Zihinsel Dayanıklılık',
    description: 'Stres anında duygusal denge, destek arama ve sakin kalma becerilerini gösterir.',
  },
  behavioral: {
    label: 'Davranışsal Kontrol',
    description: 'Ekran süresi, dürtü yönetimi ve gece kullanım sınırlarını ölçer.',
  },
  environmental: {
    label: 'Çevresel Faktörler',
    description: 'Bildirimler, tetikleyiciler ve destek ağıyla kurulan dengeyi yansıtır.',
  },
};

export const RISK_ANALYTICS_TEMPLATES = {
  low: {
    riskLevel: 'Düşük Risk',
    colorKey: 'low',
    label: 'Koruyucu düzey',
    scoreRange: [0, 34],
    theme: {
      background: 'bg-emerald-50',
      accent: 'bg-green-500',
      border: 'border-green-200',
    },
    recommendations: [
      'Günlük ekran sürenizi koruyucu düzeyde tutmaya devam edin.',
      'Uyku öncesi 30 dakikalık ekran molasını alışkanlık haline getirin.',
      'Dijital kullanımınızı planlı aralıklarla kontrol etmeyi sürdürün.',
    ],
    smartTip: 'Bugün iyi giden düzeni koru; küçük molalar bu seviyeyi sabit tutar.',
    notification: 'Bugün ekran süreni 30 dk azaltarak harika bir adım attın! Görevini kontrol etmeyi unutma.',
    weights: {
      mental: 24,
      behavioral: 18,
      environmental: 28,
    },
  },
  medium: {
    riskLevel: 'Orta Risk',
    colorKey: 'medium',
    label: 'Dikkat edilmesi gereken düzey',
    scoreRange: [35, 64],
    theme: {
      background: 'bg-amber-50',
      accent: 'bg-amber-500',
      border: 'border-amber-200',
    },
    recommendations: [
      'Bildirimleri belirli saatlerde kapatıp odak blokları oluşturun.',
      'Akşam saatlerinde telefon kullanımını azaltacak bir rutin belirleyin.',
      'Stresli anlarda dijital içerik yerine kısa yürüyüş veya nefes egzersizi deneyin.',
    ],
    smartTip: 'Küçük sınırlar bugün en büyük kazanımın olabilir.',
    notification: 'Dijital denge için iyi gidiyorsun. Bir sonraki adım, akşam kullanımını biraz daha azaltmak.',
    weights: {
      mental: 56,
      behavioral: 49,
      environmental: 53,
    },
  },
  high: {
    riskLevel: 'Yüksek Risk',
    colorKey: 'high',
    label: 'Yakın destek önerilir',
    scoreRange: [65, 100],
    theme: {
      background: 'bg-red-50',
      accent: 'bg-red-500',
      border: 'border-red-200',
    },
    recommendations: [
      'Güvendiğiniz bir aile üyesi, öğretmen veya rehberlik uzmanı ile sonuçlarınızı paylaşın.',
      'Gece geç saat kullanımını sınırlamak için cihazı yatak alanından uzak tutun.',
      'Dijital kaçış yerine destek arama davranışını önceliklendirin ve planlı mola uygulayın.',
    ],
    smartTip: 'Bugün destek istemek güçlü bir adımdır; yalnız çözmeye çalışmak zorunda değilsin.',
    notification: 'Bugün kendin için güçlü bir karar al. Ekran molanı koru ve görev kontrolünü atlama.',
    weights: {
      mental: 82,
      behavioral: 87,
      environmental: 78,
    },
  },
};

export const RESILIENCE_QUESTS = [
  'Bugün 30 dk telefondan uzaklaş',
  'Bir arkadaşınla yüz yüze konuş',
  '10 sayfa kitap oku',
];

export const BREATHING_STEPS = [
  { label: 'Nefes Al', duration: 4, accent: 'bg-emerald-500', hint: '4 saniye boyunca yavaşça nefes al' },
  { label: 'Tut', duration: 7, accent: 'bg-amber-500', hint: '7 saniye boyunca nefesi sakince tut' },
  { label: 'Nefes Ver', duration: 8, accent: 'bg-sky-500', hint: '8 saniye boyunca kontrollü nefes ver' },
];

export const BADGE_DEFINITIONS = [
  {
    id: 'calm-force',
    icon: '🏆',
    title: 'Sakin Güç',
    description: 'SOS modalını 1 kez tamamlayanlar için',
    requirement: 'sosCompletionCount >= 1',
  },
  {
    id: 'stable-streak',
    icon: '⭐',
    title: 'İstikrarlı',
    description: '3 günlük görev streak\'ine ulaşanlar için',
    requirement: 'streak >= 3',
  },
  {
    id: 'awareness-keeper',
    icon: '🛡️',
    title: 'Farkındalık Sahibi',
    description: 'İlk duygu günlüğünü yazanlar için',
    requirement: 'journalEntries.length >= 1',
  },
];

export const INITIAL_ANALYSIS = {
  riskScore: 0,
  resilienceScore: 0,
  riskLevel: 'Düşük Risk',
  label: 'Başlamaya Hazır',
  colorKey: 'low',
  categoryScores: {
    mental: 0,
    behavioral: 0,
    environmental: 0,
  },
  categoryInsights: {
    mental: CATEGORY_COPY.mental.description,
    behavioral: CATEGORY_COPY.behavioral.description,
    environmental: CATEGORY_COPY.environmental.description,
  },
  answers: [],
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toPercent(values) {
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return clamp(((average - 1) / 4) * 100, 0, 100);
}

export function classifyRisk(score) {
  if (score < 35) {
    return RISK_ANALYTICS_TEMPLATES.low;
  }
  if (score < 65) {
    return RISK_ANALYTICS_TEMPLATES.medium;
  }
  return RISK_ANALYTICS_TEMPLATES.high;
}

export function calculateAnalysisFromAnswers(answers = []) {
  const q1 = answers[0] ?? 1;
  const q2 = answers[1] ?? 1;
  const q3 = answers[2] ?? 1;
  const q4 = answers[3] ?? 1;
  const q5 = answers[4] ?? 1;

  const categoryScores = {
    mental: Number(toPercent([6 - q2, q4]).toFixed(0)),
    behavioral: Number(toPercent([6 - q1, 6 - q3, 6 - q5]).toFixed(0)),
    environmental: Number(toPercent([q4, 6 - q2, 6 - q5]).toFixed(0)),
  };

  const protectionAverage = (categoryScores.mental + categoryScores.behavioral + categoryScores.environmental) / 3;
  const riskScore = clamp(100 - protectionAverage, 0, 100);
  const resilienceScore = categoryScores.mental;
  const riskMeta = classifyRisk(riskScore);

  return {
    riskScore: Number(riskScore.toFixed(0)),
    resilienceScore: Number(resilienceScore.toFixed(0)),
    riskLevel: riskMeta.riskLevel,
    label: riskMeta.label,
    colorKey: riskMeta.colorKey,
    categoryScores,
    categoryInsights: {
      mental: CATEGORY_COPY.mental.description,
      behavioral: CATEGORY_COPY.behavioral.description,
      environmental: CATEGORY_COPY.environmental.description,
    },
    answers: QUESTION_BANK.map((question, index) => ({
      id: question.id,
      answer: answers[index] ?? 1,
      type: question.type,
    })),
  };
}

export function buildWeeklyProgressFromAnalysis(analysis, currentWeeklyProgress = []) {
  const fallback = [
    { day: 'Pzt', value: 40 },
    { day: 'Sal', value: 46 },
    { day: 'Çar', value: 50 },
    { day: 'Per', value: 56 },
    { day: 'Cum', value: 60 },
    { day: 'Cmt', value: 64 },
    { day: 'Paz', value: 68 },
  ];
  const weeklyValue = Math.round(
    ((analysis?.categoryScores?.mental ?? 0) + (analysis?.categoryScores?.behavioral ?? 0) + (analysis?.categoryScores?.environmental ?? 0)) / 3,
  );
  const source = currentWeeklyProgress.length >= 7 ? currentWeeklyProgress : fallback;
  return [...source.slice(1), { day: 'Bugün', value: weeklyValue }];
}

export function buildSmartRecommendation({ analysis, latestJournalEntry, streak = 0 }) {
  const template = classifyRisk(analysis?.riskScore ?? 0);
  const mood = latestJournalEntry?.mood;

  if (mood === 'Kaygılı') {
    return {
      title: 'Günün Akıllı Tavsiyesi',
      text: 'Kaygılı hissettiğin bugün, 4-7-8 nefes döngüsü ve ekranı kısa bir süre kenara bırakmak iyi bir başlangıç olur.',
      tag: 'Duygu Günlüğü Odaklı',
      accent: template.theme.accent,
    };
  }

  if (mood === 'Sakin' && streak >= 3) {
    return {
      title: 'Günün Akıllı Tavsiyesi',
      text: 'Sakin enerjini koruyorsun. Bugünkü küçük görevlerini tamamlayarak serini görünür şekilde büyüt.',
      tag: 'Seri Güçleniyor',
      accent: template.theme.accent,
    };
  }

  if ((analysis?.riskScore ?? 0) >= 65) {
    return {
      title: 'Günün Akıllı Tavsiyesi',
      text: 'Bugün destek istemek ve ekran kullanımına net bir sınır koymak seni hızla rahatlatabilir.',
      tag: template.riskLevel,
      accent: template.theme.accent,
    };
  }

  return {
    title: 'Günün Akıllı Tavsiyesi',
    text: template.smartTip,
    tag: template.riskLevel,
    accent: template.theme.accent,
  };
}

export function buildNotificationMessage({ analysis, latestJournalEntry }) {
  const template = classifyRisk(analysis?.riskScore ?? 0);
  const moodPart = latestJournalEntry?.mood ? ` Bugünkü ruh halin ${latestJournalEntry.mood}.` : '';
  return `Yeşilay Bildirimi: ${template.notification}${moodPart}`;
}

export function deriveBadgeStates({ sosCompletionCount = 0, streak = 0, journalEntries = [] }) {
  return BADGE_DEFINITIONS.map((badge) => {
    let unlocked = false;

    switch (badge.id) {
      case 'calm-force':
        unlocked = sosCompletionCount >= 1;
        break;
      case 'stable-streak':
        unlocked = streak >= 3;
        break;
      case 'awareness-keeper':
        unlocked = journalEntries.length >= 1;
        break;
      default:
        unlocked = false;
    }

    return {
      ...badge,
      unlocked,
      status: unlocked ? 'Açık' : 'Kilitli',
    };
  });
}

export function buildParticipationSummary({ streak = 0, journalEntries = [], sosCompletionCount = 0 }) {
  if (streak >= 3 && journalEntries.length >= 1 && sosCompletionCount >= 1) {
    return 'Haftalık katılım çok güçlü. Tüm ana alışkanlıkların aktif durumda.';
  }
  if (streak >= 3 || journalEntries.length >= 1 || sosCompletionCount >= 1) {
    return 'Haftalık katılım orta seviyede. Birkaç davranış düzenli olarak takip ediliyor.';
  }
  return 'Haftalık katılım başlatılmaya hazır. İlk görev ve günlük kaydıyla rozetler açılabilir.';
}

export const PYTHON_ANALYTICS_PAYLOAD_TEMPLATE = {
  generated_at: '2026-07-16T00:00:00+00:00',
  summary: {
    sample_size: 0,
    average_risk_score: 0,
    average_resilience_score: 0,
    risk_level_distribution: {
      Düşük: 0,
      Orta: 0,
      Yüksek: 0,
    },
    highest_risk_participant: {
      participant_id: 'YZTA-000',
      risk_score: 0,
      risk_level: 'Düşük',
    },
    highest_resilience_participant: {
      participant_id: 'YZTA-000',
      resilience_score: 0,
    },
    insights: [
      'Dijital kullanım arttıkça stresle baş etmede ek destek ihtiyacı belirginleşebilir.',
      'Düzenli uyku ve destek arama davranışı, risk puanını aşağı çeken güçlü koruyucu faktörlerdir.',
    ],
  },
  participants: [],
};
