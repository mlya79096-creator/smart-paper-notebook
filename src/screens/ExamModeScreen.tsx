import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import { useAppStore } from '../store/appStore';
import { useI18n } from '../hooks/useI18n';
import { DRAWING_TOOLS, TOOL_DEFAULTS } from '../constants/canvas';
import { ScreenContainer } from '@/components/screen-container';

export default function ExamModeScreen() {
  const { t } = useI18n();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const notebooks = useAppStore((state) => state.notebooks);
  const currentNotebookId = useAppStore((state) => state.currentNotebookId);
  const currentPageId = useAppStore((state) => state.currentPageId);
  const isExamMode = useAppStore((state) => state.isExamMode);
  const examDuration = useAppStore((state) => state.examDuration);
  const examStartTime = useAppStore((state) => state.examStartTime);
  const currentTool = useAppStore((state) => state.currentTool);
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);
  const endExamMode = useAppStore((state) => state.endExamMode);
  const undo = useAppStore((state) => state.undo);
  const redo = useAppStore((state) => state.redo);

  const currentNotebook = notebooks.find((nb) => nb.id === currentNotebookId);
  const currentPage = currentNotebook?.pages.find((p) => p.id === currentPageId);

  // Timer logic
  useEffect(() => {
    if (!isExamMode || !examStartTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - examStartTime) / 1000);
      const remaining = Math.max(0, examDuration - elapsed);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        setIsRunning(false);
        Alert.alert(
          t('exam.title'),
          t('exam.endExam'),
          [{ text: t('common.ok'), onPress: () => handleExitExam() }]
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamMode, examStartTime, examDuration]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExitExam = () => {
    Alert.alert(
      t('exam.confirmExit'),
      '',
      [
        { text: t('exam.no'), onPress: () => {}, style: 'cancel' },
        {
          text: t('exam.yes'),
          onPress: () => endExamMode(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleToolSelect = (toolType: string) => {
    const defaults = TOOL_DEFAULTS[toolType as keyof typeof TOOL_DEFAULTS];
    setCurrentTool({
      type: toolType as any,
      color: defaults.color,
      size: defaults.size,
      opacity: defaults.opacity,
    });
  };

  if (!isExamMode || !currentNotebook || !currentPage) {
    return (
      <ScreenContainer className="bg-background items-center justify-center">
        <Text style={{ fontSize: 16, color: '#687076' }}>
          {t('common.noData')}
        </Text>
      </ScreenContainer>
    );
  }

  // Exam mode tools (limited set)
  const examTools = ['pencil', 'pen', 'eraser'];

  return (
    <ScreenContainer
      className="bg-background"
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={{ flex: 1 }}>
        {/* Exam Header */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#EF4444',
            borderBottomWidth: 2,
            borderBottomColor: '#DC2626',
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 4 }}>
                {t('exam.title')}
              </Text>
              <Text style={{ fontSize: 12, color: '#ffffff' }}>
                {currentNotebook.name}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#ffffff' }}>
                {formatTime(timeRemaining)}
              </Text>
              <Text style={{ fontSize: 10, color: '#ffffff', marginTop: 2 }}>
                {t('exam.timer')}
              </Text>
            </View>
          </View>
        </View>

        {/* Canvas Area */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            margin: 8,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, color: '#687076' }}>
              {t('canvas.title')} - {t('canvas.pageNumber', { number: currentPage.pageNumber })}
            </Text>
          </View>
        </View>

        {/* Exam Tool Panel */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            backgroundColor: '#f5f5f5',
          }}
        >
          {/* Limited Tools */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            {examTools.map((toolType) => (
              <TouchableOpacity
                key={toolType}
                onPress={() => handleToolSelect(toolType)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: currentTool.type === toolType ? '#0a7ea4' : '#ffffff',
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500',
                    color: currentTool.type === toolType ? '#ffffff' : '#11181c',
                  }}
                >
                  {t(`canvas.${toolType}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Undo/Redo and Exit */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={undo}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 14 }}>↶</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={redo}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 14 }}>↷</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleExitExam}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: '#EF4444',
                borderWidth: 1,
                borderColor: '#DC2626',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#ffffff',
                }}
              >
                {t('exam.endExam')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Warning Message */}
          <Text style={{ fontSize: 11, color: '#EF4444', marginTop: 8, textAlign: 'center', fontWeight: '500' }}>
            {t('exam.limitedTools')}
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
