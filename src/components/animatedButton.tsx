import React, { useState } from 'react';
import { Animated, Button, ButtonProps, TouchableWithoutFeedback } from 'react-native';

const AnimatedButton: React.FC<ButtonProps> = (props) => {
  const scaleValue = useState(new Animated.Value(1))[0];

  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 0.5, // decrease scale to make it more noticeable
      duration: 200, // increase duration for a slower animation
      useNativeDriver: true,
    }).start();
  };

  const endAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500, // increase duration for a slower animation
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
      }}
    >
      <TouchableWithoutFeedback
        onPressIn={startAnimation}
        onPressOut={endAnimation}
      >
        <Button {...props} />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default AnimatedButton;