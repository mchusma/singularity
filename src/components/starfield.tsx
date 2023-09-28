import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  LayoutChangeEvent,
  Easing,
} from "react-native";

interface Layout {
  width: number;
  height: number;
}

const Star = ({ layout }: { layout: Layout }) => {
  const top = Math.random() * layout.height;
  const left = Math.random() * layout.width;
  const size = Math.random() * 7.5; 
  const animation = useState(new Animated.ValueXY({ x: left, y: top }))[0];


  const endValue = {
    x: Math.random() * layout.width,
    y: Math.random() * layout.height,
  };

  useEffect(() => {
    const animationLoop = Animated.loop(
      Animated.timing(animation, {
        toValue: endValue,
        duration: Math.random() * 5000000 + 50000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      { resetBeforeIteration: true }
    );

    animationLoop.start();

    return () => animationLoop.stop();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.star,
        top: animation.y,
        left: animation.x,
        width: size, 
        height: size,
        borderRadius: size / 2, 
        opacity: animation.x.interpolate({
          inputRange: [0, layout.width / 2, layout.width],
          outputRange: [0, 1, 0],
        }),
        transform: [
          {
            scale: animation.x.interpolate({
              inputRange: [0, layout.width / 2, layout.width],
              outputRange: [0, 1, 0],
            }),
          },
        ],
      }}
    />
  );
};

const StarField = () => {
  const [layout, setLayout] = useState<Layout | null>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {layout && Array.from({ length: 900 }).map((_, i) => (
        <Star key={i} layout={layout} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  star: {
    position: "absolute",
    backgroundColor: "white",
  },
});

export default StarField;
