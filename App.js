import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Pressable } from 'react-native';
import QuizScreen from './components/QuizScreen';
import DashboardScreen from './components/DashboardScreen';

const INITIAL_ANALYSIS = {
  riskScore: 0,
  resilienceScore: 0,
  riskLevel: 'Düşük',
  label: 'Başlamaya Hazır',
  colorKey: 'low',
  answers: [],
};

export default function App() {
  const [screen, setScreen] = useState('Quiz');
  const [analysis, setAnalysis] = useState(INITIAL_ANALYSIS);

  const handleComplete = (result) => {
    setAnalysis(result);
    setScreen('Dashboard');
  };

  const handleReset = () => {
    setAnalysis(INITIAL_ANALYSIS);
    setScreen('Quiz');
  };

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
        </View>

        <View className="flex-1">
          {screen === 'Quiz' ? (
            <QuizScreen onComplete={handleComplete} />
          ) : (
            <DashboardScreen analysis={analysis} onReset={handleReset} />
          )}
        </View>

        <View className="my-4 flex-row items-center justify-center">
          <Pressable
            onPress={() => setScreen('Quiz')}
            className={`mx-1 rounded-full border border-yesilayGreen/15 px-4 py-2 ${screen === 'Quiz' ? 'bg-yesilayGreen' : 'bg-white'}`}
          >
            <Text className={`text-sm font-semibold ${screen === 'Quiz' ? 'text-white' : 'text-yesilayGreen'}`}>
              Test
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreen('Dashboard')}
            className={`mx-1 rounded-full border border-yesilayGreen/15 px-4 py-2 ${screen === 'Dashboard' ? 'bg-yesilayGreen' : 'bg-white'}`}
          >
            <Text className={`text-sm font-semibold ${screen === 'Dashboard' ? 'text-white' : 'text-yesilayGreen'}`}>
              Sonuçlar
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
