import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import { fetch } from 'expo/fetch';
import { COLORS, SIZES } from '../constants/theme';

import * as FileSystem from 'expo-file-system';

// Plate Recognizer API
const PLATE_RECOGNIZER_API =
  'https://api.platerecognizer.com/v1/plate-reader/';


const API_TOKEN = process.env.EXPO_PUBLIC_PLATE_RECOGNIZER_TOKEN || '';

export default function PlateScanScreen() {
  // Selected image ka URI
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // API call loading state
  const [isScanning, setIsScanning] = useState(false);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // ---- Open Gallery  ----
  const pickImage = async () => {

    //requestMediaLibraryPermissionsAsync -  phone she permission lena

    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (!permissionResult.granted) {
      alert('Gallery access permission');
      return;
    }
  
    //launchImageLibraryAsync - opne gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setError(null);
    }
  };


  const handleScan = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }
   

 

    if (!API_TOKEN) {
      setError('API token missing. Check .env file.');
      return;
    }
    setIsScanning(true);
    setError(null);

    

    try {
      
      const formData = new FormData();
      formData.append('upload', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'plate.jpg',
      } as any);

      // API call
      const response = await fetch(PLATE_RECOGNIZER_API, {
        method: 'POST',
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log('=== PLATE RECOGNIZER RESPONSE ===');
      console.log(JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Scan failed');
      }

   

      const result = data.results?.[0];

     
      router.push({
        pathname: '/plate-result',
        params: {
          plate: result?.plate || '',
          state: result?.region?.code || '',
          vehicleType: result?.vehicle?.type || '',
          imageUri: selectedImage,
        },
      });
    } catch (err: any) {
      console.log('=== SCAN ERROR ===');
      console.log(err);
      setError(err.message || 'Scan failed. Try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Number Plate</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Preview Area */}
        <View style={styles.previewWrapper}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholder}>
              <MaterialCommunityIcons
                name="image-outline"
                size={64}
                color={COLORS.textMuted}
              />
              <Text style={styles.placeholderText}>
                Select a number plate image
              </Text>
            </View>
          )}
        </View>

        {/* Select Image Button */}
        <Pressable
          style={({ pressed }) => [
            styles.selectButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={pickImage}
          disabled={isScanning}
        >
          <Ionicons name="images-outline" size={22} color={COLORS.text} />
          <Text style={styles.selectButtonText}>
            {selectedImage ? 'Change Image' : 'Select Image'}
          </Text>
        </Pressable>

        {/* Scan Button */}
        {selectedImage && (
          <Pressable
            style={({ pressed }) => [
              styles.scanButton,
              pressed && styles.buttonPressed,
              isScanning && styles.scanButtonDisabled,
            ]}
            onPress={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <ActivityIndicator size="small" color={COLORS.text} />
                <Text style={styles.scanButtonText}>Scanning...</Text>
              </>
            ) : (
              <>
                <Ionicons name="scan-outline" size={22} color={COLORS.text} />
                <Text style={styles.scanButtonText}>Scan Plate</Text>
              </>
            )}
          </Pressable>
        )}

        {/* Error Message */}
        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Hint */}
        <Text style={styles.hintText}>
          Select a clear image of a vehicle's number plate
        </Text>
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

  // ---- Content ----
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // ---- Image Preview ----
  previewWrapper: {
    marginTop: 20,
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },

  // ---- Buttons ----
  selectButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  scanButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.primary,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  scanButtonDisabled: {
    opacity: 0.7,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },

  // ---- Error ----
  errorBox: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: SIZES.radiusMd,
    width: '100%',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '600',
  },

  // ---- Hint ----
  hintText: {
    marginTop: 20,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});