import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

// Header letters ke colors
const HEADER_LETTERS = ['O', 'n', 'e', 'S', 'c', 'a', 'n'];
const HEADER_COLORS = [
  '#6C63FF',
  '#8B7FFF',
  '#A89BFF',
  '#FF6584',
  '#FF8FA3',
  '#FFB3C1',
  '#FFFFFF',
];

export default function HomeScreen() {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const plateAnim = useRef(new Animated.Value(0)).current;
  const footerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Title
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 2 buttons (QR + Bar)
    Animated.spring(buttonAnim, {
      toValue: 1,
      friction: 6,
      tension: 60,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Plate button
    Animated.spring(plateAnim, {
      toValue: 1,
      friction: 6,
      tension: 60,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Footer
    Animated.timing(footerAnim, {
      toValue: 1,
      duration: 800,
      delay: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top — App Name */}
      <View style={styles.header}>
        {HEADER_LETTERS.map((letter, index) => (
          <Text
            key={index}
            style={[
              styles.headerText,
              { color: HEADER_COLORS[index % HEADER_COLORS.length] },
            ]}
          >
            {letter}
          </Text>
        ))}
      </View>

      {/* Middle — Title + Buttons */}
      <View style={styles.content}>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleAnim,
              transform: [
                {
                  translateY: titleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Choose what you{'\n'}want to scan
        </Animated.Text>

        {/* Row 1: QR + Bar Code */}
        <Animated.View
          style={[
            styles.buttonRow,
            {
              opacity: buttonAnim,
              transform: [
                {
                  scale: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {/* QR Code */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.qrButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/qr-scan')}
          >
            <Ionicons name="qr-code" size={56} color={COLORS.text} />
            <Text style={styles.buttonText}>QR Code</Text>
          </Pressable>

          {/* Bar Code */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.barButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/barcode-scan')}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={56}
              color={COLORS.text}
            />
            <Text style={styles.buttonText}>Bar Code</Text>
          </Pressable>
        </Animated.View>

        {/* Row 2: Number Plate Recognition (Full width) */}
        <Animated.View
          style={[
            styles.plateButtonWrapper,
            {
              opacity: plateAnim,
              transform: [
                {
                  scale: plateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.plateButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/plate-scan')}
          >
            <MaterialCommunityIcons
              name="car"
              size={44}
              color={COLORS.text}
            />
            <View style={styles.plateButtonTextWrapper}>
              <Text style={styles.plateButtonText}>Number Plate Recognition</Text>
              <Text style={styles.plateButtonSubText}>
                Select Image
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={COLORS.textMuted}
            />
          </Pressable>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: footerAnim }]}>
        <Text style={styles.footerText}>Tap any option to start scanning</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 34,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 32,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  barButton: {
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  // ---- Plate Button (Full width) ----
  plateButtonWrapper: {
    marginTop: 66,
    width: '100%',
  },
  plateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
    // Subtle glow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  plateButtonTextWrapper: {
    flex: 1,
  },
  plateButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  plateButtonSubText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textMuted,
  },

  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 13,
    letterSpacing: 0.5,
  },
});