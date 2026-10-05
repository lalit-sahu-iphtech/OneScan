import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { COLORS } from '../constants/theme';

export default function QrScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0);

  const baseZoom = useRef(0);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={64} color={COLORS.primary} />
        <Text style={styles.permissionTitle}>Camera Permission Needed</Text>
        <Text style={styles.permissionText}>
          OneScan needs camera access to scan QR codes.
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  // ---- Pinch Gesture ----
  const pinchGesture = Gesture.Pinch()
    .runOnJS(true)                    
    .onStart(() => {
      baseZoom.current = zoom;
    })
    .onUpdate((event) => {
      const delta = (event.scale - 1) * 0.5;
      const newZoom = baseZoom.current + delta;
      setZoom(Math.max(0, Math.min(newZoom, 1)));
    });

  // Scan handler
  const handleScan = async ({ data }: { data: string }) => {
    setScanned(true);

    const isLink =
      data.startsWith('http://') || data.startsWith('https://');

    if (isLink) {
      try {
        await Linking.openURL(data);
      } catch (error) {
        router.push({
          pathname: '/result',
          params: { data, type: 'qr' },
        });
      }
    } else {
      router.push({
        pathname: '/result',
        params: { data, type: 'qr' },
      });
    }

    setTimeout(() => setScanned(false), 1000);
  };

  return (
    <View style={styles.container}>
      {/* Camera — no gesture wrapper */}
      <CameraView
        style={styles.camera}
        facing="back"
        zoom={zoom}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* Overlay — visual only */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.darkSection} />
        <View style={styles.middleRow}>
          <View style={styles.darkSide} />
          <View style={styles.frame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <View style={styles.darkSide} />
        </View>
        <View style={styles.darkSection} />
        <Text style={styles.hintText}>Place QR code inside the box</Text>
      </View>

      {/* Gesture Layer — sirf frame ke around pinch */}
      <GestureDetector gesture={pinchGesture}>
        <View style={styles.gestureLayer} />
      </GestureDetector>

      {/* Zoom indicator */}
      <View style={styles.zoomIndicator}>
        <Text style={styles.zoomIndicatorText}>
          {Math.round(zoom * 100)}%
        </Text>
      </View>

      {/* Back button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={COLORS.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  camera: {
    flex: 1,
  },

  // ---- Permission ----
  permissionContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  permissionText: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionButton: {
    marginTop: 32,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  permissionButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },

  // ---- Overlay ----
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  darkSection: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  middleRow: {
    flexDirection: 'row',
    height: 250,
  },
  darkSide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  frame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: COLORS.primary,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  hintText: {
    position: 'absolute',
    bottom: 100,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    fontWeight: '600',
  },

  // ---- Gesture Layer ----
  gestureLayer: {
    position: 'absolute',
    top: '35%',             
    left: '10%',
    right: '10%',
    bottom: '35%',
    
  },

  // ---- Zoom Indicator ----
  zoomIndicator: {
    position: 'absolute',
    top: 60,
    right: 24,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  zoomIndicatorText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ---- Back ----
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 999,
    zIndex: 10,
  },
});