import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

type LogoProps = {
  size?: number;
  showName?: boolean;
  showTagline?: boolean;
  showTopAccent?: boolean;      
  showBottomBadge?: boolean;    
};

// Har letter ka color
const LETTER_COLORS = [
  '#6C63FF',
  '#8B7FFF',
  '#A89BFF',
  '#FF6584',
  '#FF8FA3',
  '#FFB3C1',
  '#FFFFFF',
];

const APP_NAME = 'OneScan';

export default function Logo({
  size = 120,
  showName = true,
  showTagline = false,
  showTopAccent = false,
  showBottomBadge = false,
}: LogoProps) {
  return (
    <View style={styles.container}>
      {/* ---- Top Accent Line ---- */}
      {showTopAccent && (
        <View style={styles.topAccent}>
          <View style={styles.accentLine} />
          <View style={styles.accentDot} />
        </View>
      )}

      {/* ---- Image with Corner Brackets ---- */}
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.imageWrapper,
            {
              width: size + 20,
              height: size + 20,
              borderRadius: (size + 20) / 2.8,
              shadowColor: COLORS.primary,
            },
          ]}
        >
          <Image
            source={require('../../assets/logo.jpg')}
            style={{
              width: size,
              height: size,
              borderRadius: size / 3,
            }}
            resizeMode="cover"
          />
        </View>

        {/* 4 Corner Brackets */}
        <View style={[styles.bracket, styles.bracketTL]} />
        <View style={[styles.bracket, styles.bracketTR]} />
        <View style={[styles.bracket, styles.bracketBL]} />
        <View style={[styles.bracket, styles.bracketBR]} />
      </View>

      {/* ---- App Name ---- */}
      {showName && (
        <View style={styles.nameRow}>
          {APP_NAME.split('').map((letter, index) => (
            <Text
              key={index}
              style={[
                styles.letter,
                { color: LETTER_COLORS[index % LETTER_COLORS.length] },
              ]}
            >
              {letter}
            </Text>
          ))}
        </View>
      )}

      {/* ---- Tagline ---- */}
      {showTagline && (
        <View style={styles.taglineWrapper}>
          <Text style={styles.tagline}>Scan once. Know more.</Text>
          <Text style={styles.subTagline}>
            Instant details from every code.
          </Text>
        </View>
      )}

      {/* ---- Underline ---- */}
      {showName && <View style={styles.underline} />}

      {/* ---- Bottom Badge ---- */}
      {showBottomBadge && (
        <View style={styles.bottomBadge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>v1.0</Text>
          <View style={styles.badgeSeparator} />
          <Text style={styles.badgeText}>MADE IN INDIA</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ---- Top Accent ----
  topAccent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  accentLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.6,
    borderRadius: 2,
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },

  // ---- Image ----
  imageContainer: {
    position: 'relative',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 12,
  },

  // ---- Corner Brackets ----
  bracket: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: COLORS.primary,
  },
  bracketTL: {
    top: -6,
    left: -6,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  bracketTR: {
    top: -6,
    right: -6,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  bracketBL: {
    bottom: -6,
    left: -6,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  bracketBR: {
    bottom: -6,
    right: -6,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },

  // ---- App Name ----
  nameRow: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'flex-end',
  },
  letter: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // ---- Tagline ----
  taglineWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  subTagline: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },

  // ---- Underline ----
  underline: {
    marginTop: 14,
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },

  // ---- Bottom Badge ----
  bottomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  badgeSeparator: {
    width: 1,
    height: 10,
    backgroundColor: COLORS.border,
  },
});