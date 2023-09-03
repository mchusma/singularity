import React, { useState } from "react";
import { Animated, TouchableOpacity, Text, View } from "react-native";
import { styles } from "./styles";

interface AnimatedButtonProps {
  onPress: () => void;
  disabled: boolean;
  buttonText: string;
  description?: string;
}
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  disabled,
  buttonText,
  description,
}) => {
  const buttonState = disabled ? styles.disabledButton : styles.button;
  const bounceValue = useState(new Animated.Value(1))[0];

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 1.07,
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
        {description && <Text style={styles.buttonSecondaryText}>{description}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};
export default AnimatedButton;
