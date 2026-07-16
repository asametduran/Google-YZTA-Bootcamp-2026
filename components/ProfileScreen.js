import React, { useMemo } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { buildParticipationSummary } from '../utils/mockData';

export default function ProfileScreen({
  profileName,
  onProfileNameChange,
  analysis,
  badges = [],
  streak = 0,
  journalEntries = [],
  sosCompletionCount = 0,
  latestJournalEntry,
  weeklyProgress = [],
  participationSummary,
}) {
  const summary = useMemo(
    () => participationSummary || buildParticipationSummary({ streak, journalEntries, sosCompletionCount }),
    [participationSummary, streak, journalEntries, sosCompletionCount],
  );

  const weeklyAverage = useMemo(() => {
    if (!weeklyProgress.length) {
      return 0;
    }
    return Math.round(weeklyProgress.reduce((sum, item) => sum + item.value, 0) / weeklyProgress.length);
  }, [weeklyProgress]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className="rounded-[30px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xs font-semibold uppercase tracking-[3px] text-yesilayGreen">Profil</Text>
        <Text className="mt-2 text-3xl font-bold text-textMain">Yeşilay Başarı Panosu</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Kişisel ilerleme, görev serileri ve rozetler burada gerçek aksiyonlara göre güncellenir.
        </Text>

        <View className="mt-5 rounded-[24px] bg-yesilayLight px-4 py-4">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">Adın</Text>
          <TextInput
            value={profileName}
            onChangeText={onProfileNameChange}
            placeholder="Adını yaz"
            placeholderTextColor="#7A8C84"
            className="mt-2 rounded-[20px] bg-white px-4 py-3 text-lg font-semibold text-textMain"
          />
        </View>

        <View className="mt-4 rounded-[24px] border border-yesilayGreen/10 bg-white px-4 py-4">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">Haftalık Katılım</Text>
          <Text className="mt-2 text-lg font-bold text-textMain">{summary}</Text>
          <Text className="mt-2 text-sm leading-6 text-textMuted">
            Son ruh hali: {latestJournalEntry?.mood || 'Henüz kayıt yok'}
          </Text>
        </View>

        <View className="mt-4 flex-row">
          <View className="mr-3 flex-1 rounded-[22px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-yesilayGreen">Streak</Text>
            <Text className="mt-2 text-2xl font-black text-textMain">{streak}</Text>
            <Text className="mt-1 text-xs leading-5 text-textMuted">Görev serisi güncelleniyor</Text>
          </View>
          <View className="flex-1 rounded-[22px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-yesilayGreen">Günlük</Text>
            <Text className="mt-2 text-2xl font-black text-textMain">{journalEntries.length}</Text>
            <Text className="mt-1 text-xs leading-5 text-textMuted">Kaydedilen duygu notları</Text>
          </View>
        </View>

        <View className="mt-4 flex-row">
          <View className="mr-3 flex-1 rounded-[22px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-yesilayGreen">SOS</Text>
            <Text className="mt-2 text-2xl font-black text-textMain">{sosCompletionCount}</Text>
            <Text className="mt-1 text-xs leading-5 text-textMuted">Tamamlanan destek modülü</Text>
          </View>
          <View className="flex-1 rounded-[22px] border border-yesilayGreen/10 bg-white px-4 py-4">
            <Text className="text-[11px] font-semibold uppercase tracking-[2px] text-yesilayGreen">Hafta</Text>
            <Text className="mt-2 text-2xl font-black text-textMain">{weeklyAverage}%</Text>
            <Text className="mt-1 text-xs leading-5 text-textMuted">Ortalama haftalık denge</Text>
          </View>
        </View>
      </View>

      <View className="mt-4 rounded-[30px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Yeşilay Başarı Rozetleri</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Rozetler, gerçek kullanım davranışlarına göre otomatik olarak kilitli veya açık görünür.
        </Text>

        <View className="mt-4">
          {badges.map((badge) => (
            <View
              key={badge.id}
              className={`mb-3 rounded-[24px] border px-4 py-4 ${badge.unlocked ? 'border-yesilayGreen bg-yesilayLight' : 'border-slate-200 bg-slate-50'}`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center pr-3">
                  <View className={`mr-3 h-12 w-12 items-center justify-center rounded-2xl ${badge.unlocked ? 'bg-yesilayGreen' : 'bg-slate-200'}`}>
                    <Text className="text-xl">{badge.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-bold text-textMain">{badge.title}</Text>
                    <Text className="mt-1 text-xs leading-5 text-textMuted">{badge.description}</Text>
                  </View>
                </View>
                <View className={`rounded-full px-3 py-2 ${badge.unlocked ? 'bg-yesilayGreen' : 'bg-slate-300'}`}>
                  <Text className="text-xs font-bold text-white">{badge.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-4 rounded-[30px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Aktif Durum Özeti</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Risk skoru: %{analysis?.riskScore ?? 0} • Dayanıklılık: %{analysis?.resilienceScore ?? 0}
        </Text>
        <View className="mt-4 rounded-[24px] bg-yesilayLight px-4 py-4">
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">Son Analiz Etiketi</Text>
          <Text className="mt-1 text-lg font-bold text-textMain">{analysis?.riskLevel || 'Henüz analiz yok'}</Text>
          <Text className="mt-2 text-sm leading-6 text-textMuted">
            {analysis?.label || 'Test yapıldığında bu alan otomatik güncellenir.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}