import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { useAppStore, Notebook } from '../store/appStore';
import { useI18n } from '../hooks/useI18n';
import { createNotebook, sortNotebooksByDate, getPinnedNotebooks } from '../constants/models';
import { ScreenContainer } from '@/components/screen-container';

export default function BookshelfScreen() {
  const { t } = useI18n();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const notebooks = useAppStore((state) => state.notebooks);
  const addNotebook = useAppStore((state) => state.addNotebook);
  const deleteNotebook = useAppStore((state) => state.deleteNotebook);
  const togglePin = useAppStore((state) => state.togglePinNotebook);
  const setCurrentNotebook = useAppStore((state) => state.setCurrentNotebook);

  const pinnedNotebooks = useMemo(() => getPinnedNotebooks(notebooks), [notebooks]);
  const otherNotebooks = useMemo(
    () => sortNotebooksByDate(notebooks.filter((nb) => !nb.isPinned), 'desc'),
    [notebooks]
  );

  const filteredNotebooks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return otherNotebooks.filter(
      (nb) =>
        nb.name.toLowerCase().includes(query) ||
        nb.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [otherNotebooks, searchQuery]);

  const handleCreateNotebook = () => {
    if (!newNotebookName.trim()) {
      Alert.alert(t('common.error'), t('bookshelf.notebookName'));
      return;
    }

    const notebook = createNotebook(newNotebookName.trim(), 'General', []);
    addNotebook(notebook);
    setNewNotebookName('');
    setShowCreateDialog(false);
  };

  const handleDeleteNotebook = (id: string, name: string) => {
    Alert.alert(
      t('common.confirmDelete'),
      `${t('bookshelf.delete')} "${name}"?`,
      [
        { text: t('common.cancel'), onPress: () => {}, style: 'cancel' },
        {
          text: t('common.delete'),
          onPress: () => deleteNotebook(id),
          style: 'destructive',
        },
      ]
    );
  };

  const renderNotebookCard = (notebook: Notebook) => (
    <Pressable
      key={notebook.id}
      onPress={() => setCurrentNotebook(notebook.id)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#f0f0f0' : '#ffffff',
          borderRadius: 12,
          padding: 12,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: '#e5e7eb',
        },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#11181c', marginBottom: 4 }}>
            {notebook.name}
          </Text>
          <Text style={{ fontSize: 12, color: '#687076' }}>
            {notebook.pages.length} {t('canvas.pages')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => togglePin(notebook.id)}
          style={{ padding: 8 }}
        >
          <Text style={{ fontSize: 18 }}>{notebook.isPinned ? '📌' : '📍'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteNotebook(notebook.id, notebook.name)}
          style={{ padding: 8 }}
        >
          <Text style={{ fontSize: 18 }}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="bg-background">
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#11181c', marginBottom: 16 }}>
            {t('bookshelf.title')}
          </Text>

          {/* Search Bar */}
          <TextInput
            placeholder={t('bookshelf.search')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 14,
              color: '#11181c',
              marginBottom: 12,
            }}
            placeholderTextColor="#687076"
          />
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          {/* Pinned Notebooks */}
          {pinnedNotebooks.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#687076', marginBottom: 8 }}>
                {t('bookshelf.pinned')}
              </Text>
              {pinnedNotebooks.map(renderNotebookCard)}
            </View>
          )}

          {/* Other Notebooks */}
          {filteredNotebooks.length > 0 ? (
            <View>
              {filteredNotebooks.map(renderNotebookCard)}
            </View>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
              <Text style={{ fontSize: 16, color: '#687076', marginBottom: 8 }}>
                {t('bookshelf.noNotebooks')}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Create Dialog */}
        {showCreateDialog && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <View
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 12,
                padding: 20,
                width: '80%',
                maxWidth: 300,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#11181c', marginBottom: 16 }}>
                {t('bookshelf.createNotebook')}
              </Text>
              <TextInput
                placeholder={t('bookshelf.notebookName')}
                value={newNotebookName}
                onChangeText={setNewNotebookName}
                style={{
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: '#11181c',
                  marginBottom: 16,
                }}
                placeholderTextColor="#687076"
              />
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    setShowCreateDialog(false);
                    setNewNotebookName('');
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#11181c', fontWeight: '500' }}>
                    {t('common.cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreateNotebook}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: '#0a7ea4',
                  }}
                >
                  <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: '600' }}>
                    {t('bookshelf.create')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* FAB */}
        <TouchableOpacity
          onPress={() => setShowCreateDialog(true)}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#0a7ea4',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 28, color: '#ffffff' }}>+</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
