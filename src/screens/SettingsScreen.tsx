import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  Alert,
} from 'react-native';
import { useAppStore } from '../store/appStore';
import { useI18n } from '../hooks/useI18n';
import { Language } from '../locales/i18n';
import { ScreenContainer } from '@/components/screen-container';

export default function SettingsScreen() {
  const { t, language } = useI18n();
  const appTheme = useAppStore((state) => state.theme);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setTheme = useAppStore((state) => state.setTheme);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setTheme(theme);
  };

  const SettingRow = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}
    >
      <Text style={{ fontSize: 16, color: '#11181c' }}>{label}</Text>
      {value && <Text style={{ fontSize: 14, color: '#687076' }}>{value}</Text>}
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#11181c' }}>
            {t('settings.title')}
          </Text>
        </View>

        {/* Language Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#687076', paddingHorizontal: 16, marginBottom: 8 }}>
            {t('settings.language')}
          </Text>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 8, marginHorizontal: 16, overflow: 'hidden' }}>
            <TouchableOpacity
              onPress={() => handleLanguageChange('en')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
              }}
            >
              <Text style={{ fontSize: 16, color: '#11181c' }}>{t('settings.english')}</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: language === 'en' ? '#0a7ea4' : '#e5e7eb',
                  backgroundColor: language === 'en' ? '#0a7ea4' : 'transparent',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleLanguageChange('ar')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ fontSize: 16, color: '#11181c' }}>{t('settings.arabic')}</Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: language === 'ar' ? '#0a7ea4' : '#e5e7eb',
                  backgroundColor: language === 'ar' ? '#0a7ea4' : 'transparent',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Theme Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#687076', paddingHorizontal: 16, marginBottom: 8 }}>
            {t('settings.theme')}
          </Text>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 8, marginHorizontal: 16, overflow: 'hidden' }}>
            {['light', 'dark', 'auto'].map((theme, index) => (
              <TouchableOpacity
                key={theme}
                onPress={() => handleThemeChange(theme as 'light' | 'dark' | 'auto')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderBottomWidth: index < 2 ? 1 : 0,
                  borderBottomColor: '#e5e7eb',
                }}
              >
                <Text style={{ fontSize: 16, color: '#11181c' }}>
                  {t(`settings.${theme}`)}
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: appTheme === theme ? '#0a7ea4' : '#e5e7eb',
                    backgroundColor: appTheme === theme ? '#0a7ea4' : 'transparent',
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#687076', paddingHorizontal: 16, marginBottom: 8 }}>
            {t('settings.about')}
          </Text>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 8, marginHorizontal: 16, overflow: 'hidden' }}>
            <SettingRow
              label={t('settings.version')}
              value="1.0.0"
            />
            <TouchableOpacity
              onPress={() => Alert.alert(t('settings.license'), 'MIT License\n\nCopyright © 2026 Amar Ali')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
              }}
            >
              <Text style={{ fontSize: 16, color: '#11181c' }}>{t('settings.license')}</Text>
              <Text style={{ fontSize: 14, color: '#0a7ea4' }}>ℹ️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert(t('settings.contact'), 'aammaarr925@gmail.com')}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ fontSize: 16, color: '#11181c' }}>{t('settings.contact')}</Text>
              <Text style={{ fontSize: 14, color: '#0a7ea4' }}>📧</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
          <Text style={{ fontSize: 12, color: '#687076', textAlign: 'center', lineHeight: 18 }}>
            Smart Paper Notebook v1.0.0{'\n'}
            © 2026 Amar Ali{'\n'}
            aammaarr925@gmail.com
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
