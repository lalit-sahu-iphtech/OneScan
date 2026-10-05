import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
  } from 'react-native';
  import { router, useLocalSearchParams } from 'expo-router';
  import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
  import { COLORS, SIZES } from '../constants/theme';
  
  // State code to name mapping
  const STATE_NAMES: Record<string, string> = {
    UP: 'Uttar Pradesh',
    MH: 'Maharashtra',
    DL: 'Delhi',
    KA: 'Karnataka',
    TN: 'Tamil Nadu',
    GJ: 'Gujarat',
    RJ: 'Rajasthan',
    WB: 'West Bengal',
    MP: 'Madhya Pradesh',
    AP: 'Andhra Pradesh',
    TS: 'Telangana',
    KL: 'Kerala',
    PB: 'Punjab',
    HR: 'Haryana',
    BR: 'Bihar',
    OR: 'Odisha',
    JH: 'Jharkhand',
    AS: 'Assam',
    CH: 'Chandigarh',
    UK: 'Uttarakhand',
    HP: 'Himachal Pradesh',
    GA: 'Goa',
    CG: 'Chhattisgarh',
  };
  
  export default function PlateResultScreen() {
    const { plate, vehicleType } = useLocalSearchParams<{
      plate: string;
      vehicleType: string;
    }>();
  
 
    const extractState = (plateNum: string): string => {
        if (!plateNum || plateNum.length < 2) return '';
      
        const upper = plateNum.toUpperCase();
      
 
        if (upper.includes('BH')) {
          return 'Bharat Series (All India)';
        }
      
     
        const code = upper.substring(0, 2);
      
        
        if (/^\d+$/.test(code)) {
          return '';
        }
      
        return STATE_NAMES[code] || code;
      };
    const stateName = extractState(plate);
  
    // Helper — empty/unknown → "Not Available"
    const showValue = (value: string | undefined) => {
      if (
        !value ||
        value.trim() === '' ||
        value.toLowerCase() === 'unknown'
      ) {
        return 'Not Available';
      }
      return value;
    };
  
    const isScanFailed = !plate;
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={COLORS.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Plate Result</Text>
          <View style={{ width: 40 }} />
        </View>
  
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {isScanFailed ? (
            <View style={styles.failedWrapper}>
              <Ionicons name="close-circle" size={80} color={COLORS.error} />
              <Text style={styles.failedTitle}>Scan Failed</Text>
              <Text style={styles.failedSubtitle}>
                Number plate could not be detected. Please try again with a
                clearer image.
              </Text>
            </View>
          ) : (
            <>
              {/* Success Icon */}
              <View style={styles.successIconWrapper}>
                <Ionicons
                  name="checkmark-circle"
                  size={80}
                  color={COLORS.success}
                />
              </View>
  
              <Text style={styles.successTitle}>Plate Detected</Text>
  
              {/* Details Card */}
              <View style={styles.card}>
                {/* Plate Number */}
                <View style={styles.cardRow}>
                  <MaterialCommunityIcons
                    name="car"
                    size={22}
                    color={COLORS.primary}
                  />
                  <View style={styles.cardRowText}>
                    <Text style={styles.cardLabel}>Plate Number</Text>
                    <Text style={styles.cardValue}>
                      {showValue(plate?.toUpperCase())}
                    </Text>
                  </View>
                </View>
  
                <View style={styles.divider} />
  
                {/* State */}
                <View style={styles.cardRow}>
                  <Ionicons
                    name="location-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                  <View style={styles.cardRowText}>
                    <Text style={styles.cardLabel}>State</Text>
                    <Text style={styles.cardValue}>
                      {showValue(stateName)}
                    </Text>
                  </View>
                </View>
  
                <View style={styles.divider} />
  
                {/* Vehicle Type */}
                <View style={styles.cardRow}>
                  <MaterialCommunityIcons
                    name="truck-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                  <View style={styles.cardRowText}>
                    <Text style={styles.cardLabel}>Vehicle Type</Text>
                    <Text style={styles.cardValue}>
                      {showValue(vehicleType)}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
  
          {/* Scan Again */}
          <Pressable
            style={({ pressed }) => [
              styles.scanAgainButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Ionicons name="scan-outline" size={20} color={COLORS.text} />
            <Text style={styles.scanAgainText}>Scan Another Plate</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
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
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      alignItems: 'center',
      paddingTop: 40,
    },
  
    // ---- Success ----
    successIconWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    successTitle: {
      marginTop: 16,
      fontSize: 24,
      fontWeight: '900',
      color: COLORS.text,
      textAlign: 'center',
    },
  
    // ---- Failed ----
    failedWrapper: {
      marginTop: 40,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    failedTitle: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: '900',
      color: COLORS.error,
      textAlign: 'center',
    },
    failedSubtitle: {
      marginTop: 12,
      fontSize: 14,
      color: COLORS.textMuted,
      textAlign: 'center',
      lineHeight: 22,
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
      marginVertical: 18,
    },
  
    // ---- Scan Again ----
    scanAgainButton: {
      marginTop: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 16,
      borderRadius: SIZES.md,
      backgroundColor: COLORS.primary,
      gap: 8,
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
    scanAgainText: {
      fontSize: 16,
      fontWeight: '800',
      color: COLORS.text,
      letterSpacing: 0.3,
    },
  });