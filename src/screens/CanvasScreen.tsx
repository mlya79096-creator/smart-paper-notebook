import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,
  Dimensions,
} from 'react-native';
import { useAppStore } from '../store/appStore';
import { useI18n } from '../hooks/useI18n';
import { DRAWING_TOOLS, TOOL_DEFAULTS, COLORS } from '../constants/canvas';
import { ScreenContainer } from '@/components/screen-container';

const CANVAS_WIDTH = Dimensions.get('window').width - 80;
const CANVAS_HEIGHT = Dimensions.get('window').height - 200;

export default function CanvasScreen() {
  const { t } = useI18n();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToolPanel, setShowToolPanel] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const notebooks = useAppStore((state) => state.notebooks);
  const currentNotebookId = useAppStore((state) => state.currentNotebookId);
  const currentPageId = useAppStore((state) => state.currentPageId);
  const currentTool = useAppStore((state) => state.currentTool);
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);
  const undo = useAppStore((state) => state.undo);
  const redo = useAppStore((state) => state.redo);
  const undoStack = useAppStore((state) => state.undoStack);
  const redoStack = useAppStore((state) => state.redoStack);
  const updatePage = useAppStore((state) => state.updatePage);

  const currentNotebook = notebooks.find((nb) => nb.id === currentNotebookId);
  const currentPage = currentNotebook?.pages.find((p) => p.id === currentPageId);

  const handleToolSelect = (toolType: string) => {
    const defaults = TOOL_DEFAULTS[toolType as keyof typeof TOOL_DEFAULTS];
    setCurrentTool({
      type: toolType as any,
      color: defaults.color,
      size: defaults.size,
      opacity: defaults.opacity,
    });
  };

  const handleColorSelect = (color: string) => {
    setCurrentTool({
      ...currentTool,
      color,
    });
    setShowColorPicker(false);
  };

  const handleSizeChange = (direction: 'increase' | 'decrease') => {
    const newSize = direction === 'increase' ? currentTool.size + 1 : Math.max(1, currentTool.size - 1);
    setCurrentTool({
      ...currentTool,
      size: newSize,
    });
  };

  if (!currentNotebook || !currentPage) {
    return (
      <ScreenContainer className="bg-background items-center justify-center">
        <Text style={{ fontSize: 16, color: '#687076' }}>
          {t('common.noData')}
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      className="bg-background"
      edges={isFullscreen ? ['top', 'bottom', 'left', 'right'] : ['top', 'left', 'right']}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        {!isFullscreen && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#11181c' }}>
                {currentNotebook.name}
              </Text>
              <TouchableOpacity
                onPress={() => setIsFullscreen(true)}
                style={{ padding: 8 }}
              >
                <Text style={{ fontSize: 18 }}>⛶</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Canvas Area */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: isFullscreen ? 0 : 12,
            margin: isFullscreen ? 0 : 8,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontSize: 14, color: '#687076' }}>
              {t('canvas.title')} - {t('canvas.pageNumber', { number: currentPage.pageNumber })}
            </Text>
          </View>
        </View>

        {/* Tool Panel */}
        {showToolPanel && !isFullscreen && (
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderTopWidth: 1,
              borderTopColor: '#e5e7eb',
              backgroundColor: '#f5f5f5',
            }}
          >
            {/* Tool Buttons */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {Object.entries(DRAWING_TOOLS).map(([key, toolType]) => (
                <TouchableOpacity
                  key={toolType}
                  onPress={() => handleToolSelect(toolType)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    marginRight: 8,
                    backgroundColor: currentTool.type === toolType ? '#0a7ea4' : '#ffffff',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: currentTool.type === toolType ? '#ffffff' : '#11181c',
                    }}
                  >
                    {t(`canvas.${toolType}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Size and Color Controls */}
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              {/* Size Control */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => handleSizeChange('decrease')}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>−</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, color: '#11181c', minWidth: 30, textAlign: 'center' }}>
                  {currentTool.size}
                </Text>
                <TouchableOpacity
                  onPress={() => handleSizeChange('increase')}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>+</Text>
                </TouchableOpacity>
              </View>

              {/* Color Picker */}
              <TouchableOpacity
                onPress={() => setShowColorPicker(!showColorPicker)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: currentTool.color,
                  borderWidth: 2,
                  borderColor: '#e5e7eb',
                }}
              />

              {/* Undo/Redo */}
              <TouchableOpacity
                onPress={undo}
                disabled={undoStack.length === 0}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  backgroundColor: undoStack.length === 0 ? '#f5f5f5' : '#ffffff',
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16 }}>↶</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={redo}
                disabled={redoStack.length === 0}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  backgroundColor: redoStack.length === 0 ? '#f5f5f5' : '#ffffff',
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16 }}>↷</Text>
              </TouchableOpacity>
            </View>

            {/* Color Picker Panel */}
            {showColorPicker && (
              <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {Object.values(COLORS).map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => handleColorSelect(color)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: color,
                      borderWidth: currentTool.color === color ? 3 : 1,
                      borderColor: currentTool.color === color ? '#0a7ea4' : '#e5e7eb',
                    }}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Fullscreen Exit Button */}
        {isFullscreen && (
          <TouchableOpacity
            onPress={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
            }}
          >
            <Text style={{ fontSize: 20, color: '#ffffff' }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
}
