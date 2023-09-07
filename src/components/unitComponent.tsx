import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface UnitComponentProps {
  children: React.ReactNode;
  animateCounter: number;
  unitId: string;
}

const UnitComponent: React.FC<UnitComponentProps> = ({
  children,
  animateCounter,
  unitId}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const activeUnitId = useSelector((state: RootState) => state.settings.activeUnitId);

  const animateOverlay = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (unitId === activeUnitId) {
      animateOverlay();
    }
  }, [animateCounter, activeUnitId]);

  return (
    <LinearGradient
      colors={["rgba(54, 73, 85, 1)", "transparent", "transparent"]}
      locations={[0, 0.4, 1]}
      style={styles.unitWrapper}
    >
      {children}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(255, 255, 255, 1)",
          borderRadius: 10,
          borderWidth: 2,
          opacity: fadeAnim,
        }}
        pointerEvents="none"
      />
    </LinearGradient>
  );
};

export default UnitComponent;
