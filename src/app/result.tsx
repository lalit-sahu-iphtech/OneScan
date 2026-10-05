import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { COLORS, SIZES } from '../constants/theme';

export default function ResultScreen() {

  const { data, type } = useLocalSearchParams<{
    data: string;
    type: string;
  }>();


  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(data || '');
    setCopied(true);

   
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanAgain = () => {
    router.back();   
  };

  const isQr = type === 'qr';
  const iconName = isQr ? 'qr-code' : 'barcode-outline';
  const typeLabel = isQr ? 'QR Code' : 'Bar Code';

  return (
    <View style={styles.container}>
      {/* ---- Header ---- */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Result</Text>
       
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Success Icon ---- */}
        <View style={styles.successIconWrapper}>
          <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
        </View>

        {/* ---- Success Title ---- */}
        <Text style={styles.successTitle}>Scan Successful!</Text>
        <Text style={styles.successSubtitle}>
          Here is the scanned {typeLabel.toLowerCase()}
        </Text>

        {/* ---- Details Card ---- */}
        <View style={styles.card}>
          {/* Type row */}
          <View style={styles.cardRow}>
            <Ionicons name={iconName as any} size={22} color={COLORS.primary} />
            <View style={styles.cardRowText}>
              <Text style={styles.cardLabel}>Type</Text>
              <Text style={styles.cardValue}>{typeLabel}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Data row */}
          <View style={styles.dataSection}>
            <Text style={styles.cardLabel}>Scanned Data</Text>
            <Text style={styles.dataText} selectable>
              {data || 'No data'}
            </Text>
          </View>
        </View>

        {/* ---- Action Buttons ---- */}
        <View style={styles.actionsRow}>
          {/* Copy Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.copyButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleCopy}
          >
            <Ionicons
              name={copied ? 'checkmark' : 'copy-outline'}
              size={20}
              color={COLORS.text}
            />
            <Text style={styles.actionButtonText}>
              {copied ? 'Copied!' : 'Copy'}
            </Text>
          </Pressable>

          {/* Scan Again Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.scanAgainButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleScanAgain}
          >
            <Ionicons name="scan-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionButtonText}>Scan Again</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ---- Header ----
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.5,
  },

  // ---- Scroll content ----
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // ---- Success Icon ----
  successIconWrapper: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  successTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
  },
  successSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },

  // ---- Details Card ----
  card: {
    marginTop: 32,
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardRowText: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  dataSection: {
    width: '100%',
  },
  dataText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text,
    fontWeight: '500',
  },

  // ---- Action Buttons ----
  actionsRow: {
    flexDirection: 'row',
    marginTop: 28,
    width: '100%',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    gap: 8,
  },
  copyButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scanAgainButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  actionButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },
});