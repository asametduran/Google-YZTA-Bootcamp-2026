import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

const QUESTIONS = [
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

const SCALE = [
  { value: 1, label: 'Hiç katılmıyorum' },
  { value: 2, label: 'Katılmıyorum' },
  { value: 3, label: 'Kararsızım' },
  { value: 4, label: 'Katılıyorum' },
  { value: 5, label: 'Tam katılıyorum' },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function classifyRisk(score) {
  if (score < 35) {
    return { riskLevel: 'Düşük Risk', colorKey: 'low', label: 'Koruyucu düzey' };
  }
  if (score < 65) {
    return { riskLevel: 'Orta Risk', colorKey: 'medium', label: 'Dikkat edilmesi gereken düzey' };
  }
  return { riskLevel: 'Yüksek Risk', colorKey: 'high', label: 'Yakın destek önerilir' };
}

function calculateAnalysis(answers) {
  const normalizedRiskScores = QUESTIONS.map((question, index) => {
    const answer = answers[index] ?? 1;
    return question.type === 'risk' ? answer : 6 - answer;
  });

  const resilienceAnswers = QUESTIONS.reduce((result, question, index) => {
    if (question.type === 'resilience') {
      result.push(answers[index] ?? 1);
    }
    return result;
  }, []);

  const rawRisk = normalizedRiskScores.reduce((sum, value) => sum + value, 0) / normalizedRiskScores.length;
  const riskScore = clamp((rawRisk / 5) * 100, 0, 100);
  const resilienceScore = resilienceAnswers.length
    ? clamp((resilienceAnswers.reduce((sum, value) => sum + value, 0) / resilienceAnswers.length / 5) * 100, 0, 100)
    : 0;
  const riskMeta = classifyRisk(riskScore);

  return {
    riskScore: Number(riskScore.toFixed(0)),
    resilienceScore: Number(resilienceScore.toFixed(0)),
    riskLevel: riskMeta.riskLevel,
    label: riskMeta.label,
    colorKey: riskMeta.colorKey,
    answers: QUESTIONS.map((question, index) => ({
      id: question.id,
      answer: answers[index] ?? 1,
      type: question.type,
    })),
  };
}

export default function QuizScreen({ onComplete }) {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));

  const answeredCount = useMemo(() => answers.filter((answer) => answer !== null).length, [answers]);
  const progressPercent = (answeredCount / QUESTIONS.length) * 100;
  const allAnswered = answeredCount === QUESTIONS.length;

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
    onComplete(calculateAnalysis(answers));
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

        {QUESTIONS.map((question, questionIndex) => (
          <View key={question.id} className="mb-4 rounded-3xl bg-surface p-4 border border-yesilayGreen/10">
            <Text className="text-base font-semibold leading-6 text-textMain">{question.prompt}</Text>
            <Text className="mt-2 text-xs leading-5 text-textMuted">{question.hint}</Text>

            <View className="mt-4 flex-row flex-wrap justify-between">
              {SCALE.map((option) => {
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
