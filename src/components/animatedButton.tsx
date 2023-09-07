import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Animated, TouchableOpacity, Text, View } from "react-native";
import { styles } from "./styles";
import { setActiveUnitId } from "../store/settingSlice"; // import your action creator

interface AnimatedButtonProps {
  onPress: () => void;
  disabled: boolean;
  buttonText: string;
  description?: string;
  unitId?: string; // add unitId prop
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  disabled,
  buttonText,
  description,
  unitId, // destructure unitId from props
}) => {
  const dispatch = useDispatch();
  const buttonState = disabled ? styles.disabledButton : styles.button;
  const bounceValue = useState(new Animated.Value(1))[0];

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.03,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = async () => {
    startAnimation();
    await onPress();
    if (unitId) {
      dispatch(setActiveUnitId(unitId)); // dispatch action if unitId is provided
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: bounceValue }],
      }}
    >
      <TouchableOpacity
        style={[buttonState, { margin: 10 }]}
        onPress={handlePress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
        {description && (
          <Text style={styles.buttonSecondaryText}>{description}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
export default AnimatedButton;
