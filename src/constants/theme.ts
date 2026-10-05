// OneScan Theme — Colors, Fonts, Sizes

export const COLORS = {
  // Brand colors
  primary: '#6C63FF',        // Purple 
  primaryDark: '#5A52D5',    // Pressed state
  secondary: '#FF6584',      // Pink accent

  // Backgrounds
  background: '#0F0F1E',     // Dark navy
  surface: '#1A1A2E',        // Card / button bg
  surfaceLight: '#252540',   // Lighter surface

  // Text
  text: '#FFFFFF',           // Primary text
  textMuted: '#B0B0C3',      // Secondary text
  textDim: '#6B6B85',        // Disabled / hint text

  // Borders & lines
  border: '#2A2A40',

  // Status
  success: '#4ADE80',
  error: '#F87171',

  // Overlay
  overlay: 'rgba(15, 15, 30, 0.85)',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 20,
  radiusFull: 999,

  // Font sizes
  fontSm: 12,
  fontMd: 14,
  fontLg: 18,
  fontXl: 22,
  fontXxl: 32,
  fontHuge: 42,
};

export const SHADOWS = {
  button: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};