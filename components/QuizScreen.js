import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { QUESTION_BANK, SCALE_OPTIONS, calculateAnalysisFromAnswers } from '../utils/mockData';

export default function QuizScreen({ onComplete }) {
  const [answers, setAnswers] = useState(Array(QUESTION_BANK.length).fill(null));

  const answeredCount = useMemo(() => answers.filter((answer) => answer !== null).length, [answers]);
  const progressPercent = (answeredCount / QUESTION_BANK.length) * 100;
  const allAnswered = answeredCount === QUESTION_BANK.length;

  const updateAnswer = (index, value) => {
    setAnswers((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
  };

  const handleComplete = () => {
    if (!allAnswered) {
      return;
    }
    onComplete(calculateAnalysisFromAnswers(answers));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className="rounded-[28px] border border-white/70 bg-white px-5 py-5 shadow-soft">
        <View className="mb-4">
          <View className="mb-3 h-2 rounded-full bg-yesilayLight">
            <View className="h-2 rounded-full bg-yesilayGreen" style={{ width: `${progressPercent}%` }} />
          </View>
          <Text className="text-xs font-semibold uppercase tracking-[2px] text-yesilayGreen">
            {answeredCount}/{QUESTIONS.length} soru tamamlandı
          </Text>
        </View>

        {QUESTION_BANK.map((question, questionIndex) => (
          <View key={question.id} className="mb-4 rounded-3xl bg-surface p-4 border border-yesilayGreen/10">
            <Text className="text-base font-semibold leading-6 text-textMain">{question.prompt}</Text>
            <Text className="mt-2 text-xs leading-5 text-textMuted">{question.hint}</Text>

            <View className="mt-4 flex-row flex-wrap justify-between">
              {SCALE_OPTIONS.map((option) => {
                const selected = answers[questionIndex] === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => updateAnswer(questionIndex, option.value)}
                    className={`mb-2 min-w-[18%] flex-1 rounded-2xl border px-2 py-3 ${
                      selected ? 'border-yesilayGreen bg-yesilayGreen' : 'border-yesilayGreen/15 bg-white'
                    }`}
                  >
                    <Text className={`text-center text-sm font-bold ${selected ? 'text-white' : 'text-textMain'}`}>
                      {option.value}
                    </Text>
                    <Text className={`mt-1 text-center text-[10px] leading-3 ${selected ? 'text-white/90' : 'text-textMuted'}`}>
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        <Pressable
          onPress={handleComplete}
          disabled={!allAnswered}
          className={`mt-2 rounded-3xl px-5 py-4 ${allAnswered ? 'bg-yesilayGreen' : 'bg-yesilayGreen/35'}`}
        >
          <Text className="text-center text-base font-bold text-white">Analizi Tamamla ve Sonuçları Gör</Text>
        </Pressable>

        <Text className="mt-3 text-center text-xs leading-4 text-textMuted">
          Yanıtlarınız yalnızca anlık analiz için kullanılır. Bu uygulama klinik tanı yerine destekleyici farkındalık sağlar.
        </Text>
      </View>
    </ScrollView>
  );
}
