import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Pressable } from 'react-native';
import QuizScreen from './components/QuizScreen';
import DashboardScreen from './components/DashboardScreen';
import JournalScreen from './components/JournalScreen';
import AIAssistantScreen from './components/AIAssistantScreen';

const INITIAL_ANALYSIS = {
  riskScore: 0,
  resilienceScore: 0,
  riskLevel: 'Düşük',
  label: 'Başlamaya Hazır',
  colorKey: 'low',
  categoryScores: {
    mental: 0,
    behavioral: 0,
    environmental: 0,
  },
  answers: [],
};

export default function App() {
  const [screen, setScreen] = useState('Quiz');
  const [analysis, setAnalysis] = useState(INITIAL_ANALYSIS);
  const [questStates, setQuestStates] = useState([false, false, false]);
  const [streak, setStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: 'Pzt', value: 40 },
    { day: 'Sal', value: 46 },
    { day: 'Çar', value: 50 },
    { day: 'Per', value: 56 },
    { day: 'Cum', value: 60 },
    { day: 'Cmt', value: 64 },
    { day: 'Paz', value: 68 },
  ]);

  const handleComplete = (result) => {
    setAnalysis(result);
    const weeklyValue = Math.round(
      ((result.categoryScores.mental + result.categoryScores.behavioral + result.categoryScores.environmental) / 3),
    );
    setWeeklyProgress((current) => [...current.slice(1), { day: 'Bugün', value: weeklyValue }]);
    setScreen('Dashboard');
  };

  const handleToggleQuest = (questIndex) => {
    setQuestStates((currentStates) => {
      const nextStates = [...currentStates];
      const nextValue = !nextStates[questIndex];
      nextStates[questIndex] = nextValue;
      setStreak((currentStreak) => Math.max(0, currentStreak + (nextValue ? 1 : -1)));
      return nextStates;
    });
  };

  const handleReset = () => {
    setAnalysis(INITIAL_ANALYSIS);
    setScreen('Quiz');
  };

  const activeTabLabel = useMemo(() => {
    switch (screen) {
      case 'Quiz':
        return 'Test';
      case 'Dashboard':
        return 'Dashboard';
      case 'Journal':
        return 'Günlük';
      case 'AI':
        return 'AI Asistanı';
      default:
        return 'Test';
    }
  }, [screen]);

  return (
    <SafeAreaView className="flex-1 bg-yesilayLight">
      <StatusBar barStyle="dark-content" backgroundColor="#E8F7EF" />
      <View className="absolute inset-0 bg-yesilayLight" />
      <View className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-yesilayGreen/10" />
      <View className="absolute bottom-8 -left-20 h-64 w-64 rounded-full bg-yesilayGreen/10" />

      <View className="flex-1 px-5 pt-3">
        <View className="mb-4 rounded-[28px] border border-yesilayGreen/10 bg-white/85 px-5 py-4 shadow-soft">
          <Text className="text-xs font-semibold uppercase tracking-[3px] text-yesilayGreen">
            Yeşilay Dijital Denge
          </Text>
          <Text className="mt-2 text-2xl font-bold text-textMain">Bağımlılıkla Mücadele Analizi</Text>
          <Text className="mt-2 text-sm leading-5 text-textMuted">
            Dijital alışkanlıklarınızı ve psikolojik dayanıklılığınızı hızlıca ölçün, size özel önerileri görün.
          </Text>
          <Text className="mt-3 text-xs font-semibold uppercase tracking-[2px] text-textMuted">
            Aktif sekme: {activeTabLabel}
          </Text>
        </View>

        <View className="flex-1">
          {screen === 'Quiz' ? (
            <QuizScreen onComplete={handleComplete} />
          ) : null}

          {screen === 'Dashboard' ? (
            <DashboardScreen
              analysis={analysis}
              onReset={handleReset}
              streak={streak}
              questStates={questStates}
              onToggleQuest={handleToggleQuest}
              weeklyProgress={weeklyProgress}
            />
          ) : null}

          {screen === 'Journal' ? <JournalScreen /> : null}

          {screen === 'AI' ? <AIAssistantScreen /> : null}
        </View>

        <View className="my-4 flex-row items-center justify-between rounded-[28px] border border-yesilayGreen/10 bg-white/95 px-3 py-3 shadow-soft">
          <Pressable
            onPress={() => setScreen('Quiz')}
            className={`flex-1 mx-1 rounded-2xl border px-3 py-3 ${screen === 'Quiz' ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/10 bg-yesilayLight'}`}
          >
            <Text className={`text-center text-xs font-bold ${screen === 'Quiz' ? 'text-white' : 'text-yesilayGreen'}`}>
              Test
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreen('Dashboard')}
            className={`flex-1 mx-1 rounded-2xl border px-3 py-3 ${screen === 'Dashboard' ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/10 bg-yesilayLight'}`}
          >
            <Text className={`text-center text-xs font-bold ${screen === 'Dashboard' ? 'text-white' : 'text-yesilayGreen'}`}>
              Sonuçlar
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreen('Journal')}
            className={`flex-1 mx-1 rounded-2xl border px-3 py-3 ${screen === 'Journal' ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/10 bg-yesilayLight'}`}
          >
            <Text className={`text-center text-xs font-bold ${screen === 'Journal' ? 'text-white' : 'text-yesilayGreen'}`}>
              Günlük
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreen('AI')}
            className={`flex-1 mx-1 rounded-2xl border px-3 py-3 ${screen === 'AI' ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/10 bg-yesilayLight'}`}
          >
            <Text className={`text-center text-[11px] font-bold ${screen === 'AI' ? 'text-white' : 'text-yesilayGreen'}`}>
              AI Asistanı
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
