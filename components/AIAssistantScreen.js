import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

function buildResponse(message) {
  const normalized = message.toLowerCase();

  if (/oyun|game|oynama isteği|oynama isteg/i.test(normalized)) {
    return 'Bu dürtü geldiğinde ilk hedef onu bastırmak değil, 10 dakika ertelemek olsun. Telefonu ya da cihazı kısa süreliğine başka bir odaya koy, derin bir nefes al ve kendine şunu hatırlat: Bu his geçici. Sonra sadece tek bir küçük alternatif seç: su içmek, ayağa kalkmak ya da 20 adım yürümek.';
  }

  if (/sosyal medya|kaybolmuş|kayboldum|doomscroll|instagram|tiktok/i.test(normalized)) {
    return 'Sosyal medya içinde kaybolmuş hissetmen, zihnin fazla uyarana maruz kaldığını gösterir. Şimdi kısa bir BDT yaklaşımı deneyelim: Düşünceyi yakala, kanıtını sorgula ve davranışı küçült. Kendine "Şu anda gerçekten ihtiyacım olan şey içerik akışı mı, yoksa mola mı?" diye sor. Ardından uygulamayı kapatıp 3 dakika nefes ve esneme yap.';
  }

  if (/çok stres|stres|gergin|panik|kaygı|kaygılı/i.test(normalized)) {
    return 'Bedenin alarm vermiş olabilir. Önce 4 saniye al, 7 saniye tut, 8 saniye ver. Sonra şu cümleyi dene: "Şu an zorlanıyorum ama bu duygu beni tanımlamıyor." Ardından kontrol edebileceğin tek bir adım seç: ortamı sadeleştir, ekranı kapat veya güvenilir birine kısa mesaj at.';
  }

  if (/istemiyorum|yapamıyorum|başaramıyorum|bıktım|sıkıldım/i.test(normalized)) {
    return 'İsteksizlik, çoğu zaman yorgunluk ve aşırı yüklenme ile birlikte gelir. Bugünü tümden çözmek zorunda değilsin. Sadece bir davranış seçelim: 5 dakikalık mola, bir bardak su, kısa yürüyüş veya 1 sayfalık okuma. Küçük adım, zihnin direncini düşürür.';
  }

  return 'Sana sakin ve uygulanabilir bir çerçeve sunayım: Düşünceyi fark et, duyguyu adlandır, davranışı küçült. Şu an yaşadığın şeyi tek cümlede yaz ve ardından 1 küçük eylem seç. Örnek: telefon bildirimlerini kapat, 3 dakika nefes al, birine durumunu bildir.';
}

function buildFollowUps(message) {
  const normalized = message.toLowerCase();
  if (/oyun|game|oynama isteği/i.test(normalized)) {
    return [
      'Dürtü geldiğinde cihazı erişim dışına al.',
      '10 dakika erteleme kuralı uygula.',
      'Alternatif olarak su iç veya kısa yürüyüş yap.',
    ];
  }
  if (/sosyal medya|kaybolmuş|instagram|tiktok/i.test(normalized)) {
    return [
      'Ekran süresi yerine kısa mola hedefle.',
      'Bildirimleri 30 dakika kapat.',
      'Sana iyi gelen bir yüz yüze temas seç.',
    ];
  }
  return [
    'Düşünceyi yaz.',
    'Bir nefes döngüsü yap.',
    'Tek bir küçük eylem seç.',
  ];
}

export default function AIAssistantScreen() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Ben BDT temelli dijital denge asistanıyım. Dürtünü ya da zorlandığın düşünceyi yaz, birlikte sakin bir plan oluşturalım.',
    },
  ]);

  const suggestedPrompts = useMemo(
    () => ['Şu an çok oyun oynama isteğim var', 'Sosyal medyada kaybolmuş hissediyorum', 'Çok stresliyim'],
    [],
  );

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    const assistantText = buildResponse(trimmed);
    const followUps = buildFollowUps(trimmed);
    setConversation((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: 'user', text: trimmed },
      { id: `${Date.now()}-assistant`, role: 'assistant', text: assistantText, followUps },
    ]);
    setMessage('');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className="rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xs font-semibold uppercase tracking-[3px] text-yesilayGreen">BDT Akıllı Asistan</Text>
        <Text className="mt-2 text-2xl font-bold text-textMain">Sakin, yapılandırılmış destek</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Yazdığın cümleye göre düşünceyi yakala, kanıtı sorgula ve davranışı küçülten bir yanıt üretir.
        </Text>

        <View className="mt-4 rounded-[24px] bg-yesilayLight px-4 py-4">
          <Text className="text-sm font-semibold text-textMain">Hızlı başlangıç örnekleri</Text>
          <View className="mt-3">
            {suggestedPrompts.map((prompt) => (
              <Pressable key={prompt} onPress={() => setMessage(prompt)} className="mb-2 rounded-full bg-white px-4 py-3">
                <Text className="text-sm text-textMain">{prompt}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-4 rounded-[24px] border border-yesilayGreen/10 bg-surface px-4 py-4">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Düşünceni veya dürtünü yaz..."
            placeholderTextColor="#7A8C84"
            multiline
            className="min-h-[120px] text-base text-textMain"
          />
        </View>

        <Pressable onPress={handleSend} className="mt-4 rounded-3xl bg-yesilayGreen px-5 py-4 shadow-soft">
          <Text className="text-center text-base font-bold text-white">Yanıt Üret</Text>
        </Pressable>
      </View>

      <View className="mt-4 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Sohbet</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Asistan, BDT temelli sakinleştirici yönlendirmeler ve küçük davranış planları üretir.
        </Text>

        <View className="mt-4">
          {conversation.map((item) => (
            <View
              key={item.id}
              className={`mb-3 max-w-[92%] rounded-[24px] px-4 py-4 ${
                item.role === 'user' ? 'self-end bg-yesilayGreen' : 'self-start bg-yesilayLight'
              }`}
            >
              <Text className={`text-sm leading-6 ${item.role === 'user' ? 'text-white' : 'text-textMain'}`}>
                {item.text}
              </Text>
              {item.followUps ? (
                <View className="mt-3">
                  {item.followUps.map((followUp) => (
                    <View key={followUp} className="mb-2 rounded-2xl bg-white px-3 py-2">
                      <Text className="text-xs leading-5 text-textMuted">• {followUp}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
