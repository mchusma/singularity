import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { BlurView } from "expo-blur";

interface UnitComponentProps {
  children: React.ReactNode;
  animateCounter: number;
  unitId: string;
  headerText: string;
  fadeOutDuration?: number;
  gradientColor?: string;
}

const UnitComponent: React.FC<UnitComponentProps> = ({
  children,
  animateCounter,
  unitId,
  headerText,
  fadeOutDuration = 200,
  gradientColor = "#3F51B5",
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const activeUnitId = useSelector(
    (state: RootState) => state.settings.activeUnitId
  );

  const animateOverlay = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeOutDuration,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (unitId === activeUnitId) {
      animateOverlay();
    }
  }, [animateCounter, activeUnitId]);

  const headerStyle: ViewStyle = {
    alignItems: "center" as "center",
    //backgroundColor: gradientColor,
    justifyContent: "center" as "center",
    padding: "3%",
  };

  const unitWrapperStyle = {
    borderColor: `rgba(${
      parseInt(gradientColor.slice(1, 3), 16) * 0.5 + 255 * 0.5
    }, ${parseInt(gradientColor.slice(3, 5), 16) * 0.5 + 255 * 0.5}, ${
      parseInt(gradientColor.slice(5, 7), 16) * 0.5 + 255 * 0.5
    }, 0.5)`,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    margin: "0%",
    padding: "0%",
  };

  return (
    <BlurView intensity={20} tint="dark">
      <LinearGradient
        colors={[
          gradientColor,
          "rgba(50, 50, 50, 0.1)",
          "rgba(255, 255, 255, 0.001)",
        ]}
        locations={[0, 0.15, 1]}
        style={unitWrapperStyle}
      >
        <View style={headerStyle}>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>
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
    </BlurView>
  );
};

export default UnitComponent;

const styles = StyleSheet.create({
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
