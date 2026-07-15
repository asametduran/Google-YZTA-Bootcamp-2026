import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Modal, ScrollView, Text, Pressable, View } from 'react-native';

const THEME = {
  low: {
    background: 'bg-emerald-50',
    accent: 'bg-green-500',
    border: 'border-green-200',
    title: 'Düşük Risk',
    subtitle: 'Koruyucu alışkanlıklarınız güçlü görünüyor.',
  },
  medium: {
    background: 'bg-amber-50',
    accent: 'bg-amber-500',
    border: 'border-amber-200',
    title: 'Orta Risk',
    subtitle: 'Dijital dengeyi güçlendirmek faydalı olur.',
  },
  high: {
    background: 'bg-red-50',
    accent: 'bg-red-500',
    border: 'border-red-200',
    title: 'Yüksek Risk',
    subtitle: 'Yakın destek ve net sınırlar öncelik olmalı.',
  },
};

const RECOMMENDATIONS = {
  low: [
    'Günlük ekran sürenizi koruyucu düzeyde tutmaya devam edin.',
    'Uyku öncesi 30 dakikalık ekran molasını alışkanlık haline getirin.',
    'Dijital kullanımınızı planlı aralıklarla kontrol etmeyi sürdürün.',
  ],
  medium: [
    'Bildirimleri belirli saatlerde kapatıp odak blokları oluşturun.',
    'Akşam saatlerinde telefon kullanımını azaltacak bir rutin belirleyin.',
    'Stresli anlarda dijital içerik yerine kısa yürüyüş veya nefes egzersizi deneyin.',
  ],
  high: [
    'Güvendiğiniz bir aile üyesi, öğretmen veya rehberlik uzmanı ile sonuçlarınızı paylaşın.',
    'Gece geç saat kullanımını sınırlamak için cihazı yatak alanından uzak tutun.',
    'Dijital kaçış yerine destek arama davranışını önceliklendirin ve planlı mola uygulayın.',
  ],
};

const RESILIENCE_QUESTS = [
  'Bugün 30 dk telefondan uzaklaş',
  'Bir arkadaşınla yüz yüze konuş',
  '10 sayfa kitap oku',
];

const BREATHING_STEPS = [
  { label: 'Nefes Al', duration: 4, accent: 'bg-emerald-500', hint: '4 saniye boyunca yavaşça nefes al' },
  { label: 'Tut', duration: 7, accent: 'bg-amber-500', hint: '7 saniye boyunca nefesi sakince tut' },
  { label: 'Nefes Ver', duration: 8, accent: 'bg-sky-500', hint: '8 saniye boyunca kontrollü nefes ver' },
];

function getStrengthTone(score) {
  if (score >= 75) {
    return { bar: 'bg-green-500', badge: 'bg-green-50 text-green-700', title: 'Güçlü' };
  }
  if (score >= 50) {
    return { bar: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700', title: 'Gelişiyor' };
  }
  return { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700', title: 'Destek gerekli' };
}

function getCategoryNarrative(label, score) {
  if (score >= 75) {
    return `${label} alanında güçlü bir profil görünüyor. Bu alan koruyucu bir kalkan oluşturuyor.`;
  }
  if (score >= 50) {
    return `${label} alanı dengeli ancak küçük rutinlerle daha da güçlenebilir.`;
  }
  return `${label} alanında kısa, tekrar edilebilir alışkanlıklar belirgin şekilde fayda sağlar.`;
}

function CategoryRow({ label, score, description }) {
  const tone = getStrengthTone(score);
  return (
    <View className="mb-4 rounded-[24px] border border-yesilayGreen/10 bg-white px-4 py-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-base font-bold text-textMain">{label}</Text>
          <Text className="mt-1 text-xs leading-5 text-textMuted">{description}</Text>
        </View>
        <View className={`rounded-full px-3 py-2 ${tone.badge}`}>
          <Text className="text-xs font-bold">%{score}</Text>
        </View>
      </View>
      <View className="mt-4 h-3 rounded-full bg-yesilayLight overflow-hidden">
        <View className={`h-3 rounded-full ${tone.bar}`} style={{ width: `${score}%` }} />
      </View>
      <Text className="mt-3 text-sm leading-6 text-textMuted">{getCategoryNarrative(label, score)}</Text>
    </View>
  );
}

function QuestItem({ label, completed, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-[22px] border px-4 py-4 ${
        completed ? 'border-yesilayGreen bg-yesilayLight' : 'border-yesilayGreen/10 bg-white'
      }`}
    >
      <View
        className={`mr-3 h-6 w-6 items-center justify-center rounded-full border ${
          completed ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/30 bg-white'
        }`}
      >
        <Text className={`text-xs font-black ${completed ? 'text-white' : 'text-transparent'}`}>✓</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold leading-6 text-textMain">{label}</Text>
        <Text className="mt-1 text-xs text-textMuted">{completed ? 'Tamamlandı' : 'Dokunarak işaretle'}</Text>
      </View>
    </Pressable>
  );
}

function ProgressRow({ label, value, accentClass }) {
  return (
    <View className="mb-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-textMain">{label}</Text>
        <Text className="text-sm font-bold text-textMain">%{value}</Text>
      </View>
      <View className="h-3 rounded-full bg-yesilayLight overflow-hidden">
        <View className={`h-3 rounded-full ${accentClass}`} style={{ width: `${value}%` }} />
      </View>
    </View>
  );
}

function RecommendationCard({ text, accentClass }) {
  return (
    <View className="mb-3 rounded-3xl border border-yesilayGreen/10 bg-white px-4 py-4 shadow-soft">
      <View className={`mb-3 h-2 w-16 rounded-full ${accentClass}`} />
      <Text className="text-sm leading-6 text-textMain">{text}</Text>
    </View>
  );
}

export default function DashboardScreen({ analysis, onReset, streak, questStates, onToggleQuest }) {
  const colorKey = analysis?.colorKey || 'low';
  const theme = THEME[colorKey];
  const recommendations = RECOMMENDATIONS[colorKey];
  const riskScore = analysis?.riskScore ?? 0;
  const resilienceScore = analysis?.resilienceScore ?? 0;
  const [supportVisible, setSupportVisible] = useState(false);
  const [breathingStepIndex, setBreathingStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(BREATHING_STEPS[0].duration);

  const categoryRows = useMemo(
    () => [
      {
        key: 'mental',
        label: 'Zihinsel Dayanıklılık',
        score: analysis?.categoryScores?.mental ?? 0,
        description: analysis?.categoryInsights?.mental ?? 'Stres yönetimi ve destek arama davranışlarını yansıtır.',
      },
      {
        key: 'behavioral',
        label: 'Davranışsal Kontrol',
        score: analysis?.categoryScores?.behavioral ?? 0,
        description: analysis?.categoryInsights?.behavioral ?? 'Ekran süresi ve dürtü yönetimi düzeyini gösterir.',
      },
      {
        key: 'environmental',
        label: 'Çevresel Faktörler',
        score: analysis?.categoryScores?.environmental ?? 0,
        description: analysis?.categoryInsights?.environmental ?? 'Tetikleyiciler ve destek ağı etkisini gösterir.',
      },
    ],
    [analysis],
  );

  useEffect(() => {
    if (!supportVisible) {
      return undefined;
    }

    setBreathingStepIndex(0);
    setSecondsLeft(BREATHING_STEPS[0].duration);

    const timer = setInterval(() => {
      setSecondsLeft((currentSeconds) => currentSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [supportVisible]);

  useEffect(() => {
    if (!supportVisible || secondsLeft > 0) {
      return;
    }

    setBreathingStepIndex((currentStep) => {
      const nextStep = (currentStep + 1) % BREATHING_STEPS.length;
      setSecondsLeft(BREATHING_STEPS[nextStep].duration);
      return nextStep;
    });
  }, [secondsLeft, supportVisible]);

  const currentBreathingStep = BREATHING_STEPS[breathingStepIndex];
  const currentProgress =
    currentBreathingStep.duration === 0
      ? 0
      : 1 - secondsLeft / currentBreathingStep.duration;

  const handleCallYedam = async () => {
    try {
      const canCall = await Linking.canOpenURL('tel:115');
      if (canCall) {
        await Linking.openURL('tel:115');
        return;
      }
      Alert.alert('YEDAM', 'Telefonun arama desteği sınırlı. YEDAM danışma hattı: 115');
    } catch (error) {
      Alert.alert('YEDAM', 'YEDAM danışma hattı: 115');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className={`rounded-[28px] border ${theme.border} ${theme.background} px-5 py-5 shadow-soft`}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">
              Sonuç Paneli
            </Text>
            <Text className="mt-2 text-3xl font-bold text-textMain">{theme.title}</Text>
          </View>
          <View className="items-end">
            <Text className="text-xs font-semibold uppercase tracking-[2px] text-textMuted">
              Günlük Seri
            </Text>
            <Text className="mt-1 text-2xl font-black text-yesilayGreen">{streak}</Text>
          </View>
        </View>
        <Text className="mt-2 text-sm leading-6 text-textMuted">{theme.subtitle}</Text>

        <Pressable onPress={() => setSupportVisible(true)} className="mt-5 rounded-[26px] bg-yesilayGreen px-5 py-4 shadow-soft">
          <Text className="text-center text-base font-bold text-white">Destek Lazım / Dürtü Geldi</Text>
        </Pressable>

        <View className="mt-5 rounded-[24px] bg-white px-4 py-4 border border-white/70">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-textMuted">Risk Skoru</Text>
              <Text className="mt-1 text-4xl font-extrabold text-textMain">%{riskScore}</Text>
            </View>
            <View className={`rounded-full px-4 py-2 ${theme.accent}`}>
              <Text className="text-sm font-bold text-white">{analysis?.riskLevel || 'Düşük Risk'}</Text>
            </View>
          </View>

          <ProgressRow label="Risk yoğunluğu" value={riskScore} accentClass={theme.accent} />
          <ProgressRow label="Psikolojik dayanıklılık" value={resilienceScore} accentClass="bg-yesilayGreen" />
        </View>

        <View className="mt-5 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
          <Text className="text-xl font-bold text-textMain">Detaylı Risk Kırılımı</Text>
          <Text className="mt-2 text-sm leading-6 text-textMuted">
            Skorunuz üç kritik boyutta ayrıştırıldı. Böylece gelişim alanları daha net görünür.
          </Text>

          <View className="mt-4">
            {categoryRows.map((row) => (
              <CategoryRow key={row.key} label={row.label} score={row.score} description={row.description} />
            ))}
          </View>
        </View>
      </View>

      <View className="mt-4 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Günlük Dayanıklılık Görevleri</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Bugünün küçük kazanımları, dijital dengeyi ve dayanıklılığı büyütür.
        </Text>
        <View className="mt-4 rounded-[22px] bg-yesilayLight px-4 py-4">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">Günlük Seri</Text>
          <Text className="mt-1 text-3xl font-black text-textMain">{streak}</Text>
        </View>
        <View className="mt-4">
          {RESILIENCE_QUESTS.map((quest, index) => (
            <QuestItem key={quest} label={quest} completed={Boolean(questStates?.[index])} onPress={() => onToggleQuest(index)} />
          ))}
        </View>
      </View>

      <View className="mt-4 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Yeşilay Önerileri</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Sonucunuza göre hazırlanmış kişiselleştirilmiş öneriler:
        </Text>

        <View className="mt-4">
          {recommendations.map((item) => (
            <RecommendationCard key={item} text={item} accentClass={theme.accent} />
          ))}
        </View>
      </View>

      <Pressable onPress={onReset} className="mt-4 rounded-3xl bg-yesilayGreen px-5 py-4 shadow-soft">
        <Text className="text-center text-base font-bold text-white">Yeniden Test Et</Text>
      </Pressable>

      <Modal visible={supportVisible} animationType="slide" transparent onRequestClose={() => setSupportVisible(false)}>
        <View className="flex-1 bg-black/55 px-4 py-10">
          <View className="flex-1 overflow-hidden rounded-[32px] bg-white px-5 py-5">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-[3px] text-yesilayGreen">Acil Destek</Text>
                <Text className="mt-2 text-2xl font-bold text-textMain">Sakinleşme Modülü</Text>
              </View>
              <Pressable onPress={() => setSupportVisible(false)} className="rounded-full bg-yesilayLight px-4 py-2">
                <Text className="text-sm font-bold text-yesilayGreen">Kapat</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="rounded-[28px] bg-yesilayLight px-5 py-5">
                <Text className="text-lg font-bold text-textMain">4-7-8 Nefes Egzersizi</Text>
                <Text className="mt-2 text-sm leading-6 text-textMuted">
                  Dürtü geldiğinde ritmi yavaşlatmak için bu döngüyü takip edin.
                </Text>

                <View className="mt-5 items-center justify-center">
                  <View
                    className={`h-44 w-44 items-center justify-center rounded-full border-8 border-white ${currentBreathingStep.accent}`}
                    style={{ transform: [{ scale: 1 + currentProgress * 0.08 }] }}
                  >
                    <View className="h-32 w-32 items-center justify-center rounded-full bg-white">
                      <Text className="text-sm font-semibold text-yesilayGreen">{currentBreathingStep.label}</Text>
                      <Text className="mt-2 text-4xl font-black text-textMain">{secondsLeft}</Text>
                      <Text className="mt-2 text-center text-xs leading-5 text-textMuted">{currentBreathingStep.hint}</Text>
                    </View>
                  </View>
                </View>

                <View className="mt-4 rounded-[24px] bg-white px-4 py-4">
                  <Text className="text-sm font-bold text-textMain">Aşama</Text>
                  <Text className="mt-1 text-base text-textMuted">{currentBreathingStep.label}</Text>
                </View>
              </View>

              <View className="mt-4 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5">
                <Text className="text-lg font-bold text-textMain">YEDAM Hızlı Erişim</Text>
                <Text className="mt-2 text-sm leading-6 text-textMuted">
                  Destek gerektiğinde danışma hattına ulaşın veya hızlı arama başlatın.
                </Text>
                <Pressable onPress={handleCallYedam} className="mt-4 rounded-3xl bg-yesilayGreen px-5 py-4">
                  <Text className="text-center text-base font-bold text-white">115'i Ara</Text>
                </Pressable>
                <View className="mt-4 rounded-[22px] bg-yesilayLight px-4 py-4">
                  <Text className="text-sm font-semibold text-textMain">YEDAM Danışma Hattı</Text>
                  <Text className="mt-1 text-sm leading-6 text-textMuted">115</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
