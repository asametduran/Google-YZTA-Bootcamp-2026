import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

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

export default function DashboardScreen({ analysis, onReset }) {
  const colorKey = analysis?.colorKey || 'low';
  const theme = THEME[colorKey];
  const recommendations = RECOMMENDATIONS[colorKey];
  const riskScore = analysis?.riskScore ?? 0;
  const resilienceScore = analysis?.resilienceScore ?? 0;

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className={`rounded-[28px] border ${theme.border} ${theme.background} px-5 py-5 shadow-soft`}>
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">
          Sonuç Paneli
        </Text>
        <Text className="mt-2 text-3xl font-bold text-textMain">{theme.title}</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">{theme.subtitle}</Text>

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

        <View className="mt-5 flex-row">
          <View className="mr-2 flex-1 rounded-[24px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-xs font-semibold uppercase tracking-[2px] text-textMuted">
              Dayanıklılık
            </Text>
            <Text className="mt-2 text-2xl font-bold text-yesilayGreen">%{resilienceScore}</Text>
          </View>
          <View className="ml-2 flex-1 rounded-[24px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-xs font-semibold uppercase tracking-[2px] text-textMuted">
              Risk Seviyesi
            </Text>
            <Text className="mt-2 text-2xl font-bold text-textMain">{analysis?.riskLevel || 'Düşük'}</Text>
          </View>
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
    </ScrollView>
  );
}
