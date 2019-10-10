import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';

const FadeInView = (props: any) => {
  const [fadeAdmin] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAdmin, {
      toValue: 1,
      duration: props.durantion || 300,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAdmin,
        ...props.style,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
