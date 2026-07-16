import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const MOODS = ['Mutlu', 'Kaygılı', 'Dürtüsel', 'Kararsız', 'Sakin'];
const STORAGE_KEY = 'yesilay_journal_entries_v1';

const memoryFallback = {
  entries: [],
};

let asyncStorageModule = null;
let asyncStorageStatus = 'unknown';

async function getAsyncStorage() {
  if (asyncStorageStatus !== 'unknown') {
    return asyncStorageModule;
  }

  try {
    // Keep the code ready for AsyncStorage even when the package is not installed.
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    asyncStorageModule = require('@react-native-async-storage/async-storage').default;
    asyncStorageStatus = 'available';
  } catch (error) {
    asyncStorageModule = null;
    asyncStorageStatus = 'fallback';
  }

  return asyncStorageModule;
}

async function loadEntries() {
  const storage = await getAsyncStorage();
  if (storage) {
    const raw = await storage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  return memoryFallback.entries;
}

async function saveEntries(entries) {
  const storage = await getAsyncStorage();
  if (storage) {
    await storage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return;
  }
  memoryFallback.entries = entries;
}

function createEntry(mood, note) {
  const now = new Date();
  return {
    id: `${now.getTime()}-${Math.random().toString(16).slice(2)}`,
    mood,
    note,
    createdAt: now.toISOString(),
  };
}

export default function JournalScreen({ onEntryAdded, onEntriesLoaded }) {
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadEntries()
      .then((storedEntries) => {
        if (mounted) {
          setEntries(storedEntries);
          onEntriesLoaded?.(storedEntries);
        }
      })
      .catch(() => {
        if (mounted) {
          setEntries([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setReady(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const sortedEntries = useMemo(
    () => [...entries].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
    [entries],
  );

  const handleSave = async () => {
    const trimmedNote = note.trim();
    if (!trimmedNote) {
      Alert.alert('Günlük', 'Kısa bir not yazın.');
      return;
    }

    const nextEntry = createEntry(selectedMood, trimmedNote);
    const nextEntries = [nextEntry, ...entries];
    setEntries(nextEntries);
    setNote('');
    await saveEntries(nextEntries);
    onEntryAdded?.(nextEntry, nextEntries);
    Alert.alert('Günlük', 'Kayıt başarıyla eklendi.');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      <View className="rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xs font-semibold uppercase tracking-[3px] text-yesilayGreen">Duygu Günlüğü</Text>
        <Text className="mt-2 text-2xl font-bold text-textMain">Bugünün duygu durumunu kaydet</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Bu kayıtlar cihazda saklanır. AsyncStorage yüklü değilse, uygulama içi hafıza ile geçici olarak tutulur.
        </Text>

        <View className="mt-5 flex-row flex-wrap">
          {MOODS.map((mood) => {
            const selected = selectedMood === mood;
            return (
              <Pressable
                key={mood}
                onPress={() => setSelectedMood(mood)}
                className={`mb-3 mr-3 rounded-full px-4 py-3 ${
                  selected ? 'bg-yesilayGreen' : 'bg-yesilayLight'
                }`}
              >
                <Text className={`text-sm font-bold ${selected ? 'text-white' : 'text-yesilayGreen'}`}>{mood}</Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-2 rounded-[24px] border border-yesilayGreen/10 bg-yesilayLight px-4 py-4">
          <Text className="text-sm font-semibold text-textMain">Kısa not</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Bugün nasıl hissediyorsun?"
            placeholderTextColor="#7A8C84"
            multiline
            className="mt-2 min-h-[110px] rounded-[20px] bg-white px-4 py-4 text-base text-textMain"
          />
        </View>

        <Pressable onPress={handleSave} className="mt-4 rounded-3xl bg-yesilayGreen px-5 py-4 shadow-soft">
          <Text className="text-center text-base font-bold text-white">Günlüğe Kaydet</Text>
        </Pressable>

        <View className="mt-4 rounded-[22px] bg-yesilayLight px-4 py-4">
          <Text className="text-sm font-semibold uppercase tracking-[2px] text-yesilayGreen">Depolama Durumu</Text>
          <Text className="mt-1 text-sm text-textMuted">
            {ready ? (asyncStorageStatus === 'available' ? 'AsyncStorage aktif' : 'Bellek içi geçici kayıt modu') : 'Yükleniyor...'}
          </Text>
        </View>
      </View>

      <View className="mt-4 rounded-[28px] border border-yesilayGreen/10 bg-white px-5 py-5 shadow-soft">
        <Text className="text-xl font-bold text-textMain">Geçmiş Kayıtlar</Text>
        <Text className="mt-2 text-sm leading-6 text-textMuted">
          Önceki duygu notlarını kronolojik olarak inceleyebilirsin.
        </Text>

        <View className="mt-4">
          {sortedEntries.length === 0 ? (
            <View className="rounded-[22px] bg-yesilayLight px-4 py-4">
              <Text className="text-sm text-textMuted">Henüz kayıt yok.</Text>
            </View>
          ) : (
            sortedEntries.map((entry) => (
              <View key={entry.id} className="mb-3 rounded-[24px] border border-yesilayGreen/10 bg-surface px-4 py-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-textMain">{entry.mood}</Text>
                  <Text className="text-xs font-semibold text-textMuted">
                    {new Date(entry.createdAt).toLocaleDateString('tr-TR')}
                  </Text>
                </View>
                <Text className="mt-2 text-sm leading-6 text-textMuted">{entry.note}</Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
