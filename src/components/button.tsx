import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';

export interface Props {
  title: string;
  onClick: () => any;
  style?: any;
  textStyle?: any;
}

export default function components(props: Props) {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#07877D',
        borderWidth: 1,
        borderColor: '#07877D',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        ...props.style,
      }}
      onPress={() => props.onClick()}
    >
      <Text style={{ fontSize: 16, color: '#FFFFFF', ...props.textStyle }}>{props.title}</Text>
    </TouchableOpacity>
  );
}
