import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/button';
const Logo = require('../../../assets/logo.png');

export interface Props {
  navigation: NavigationScreenProp<NavigationState & NavigationParams>;
}

export default function Auth(props: Props) {
  return (
    <KeyboardAwareScrollView
      style={{ height: '100%', width: '100%' }}
      scrollEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={40}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#E3EBEE',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
      >
        <Image source={Logo} resizeMode="center" style={{}}></Image>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            width: '100%',
            height: '60%',
            bottom: 0,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            alignItems: 'center',
          }}
        >
          <ScrollView style={{ flex: 1, width: '100%' }}>
            <View style={{ flex: 1, width: '100%', padding: 30 }}>
              <View style={{ flex: 7, width: '100%' }}>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    marginTop: 50,
                    marginBottom: 50,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Email"
                    keyboardType="email-address"
                  ></TextInput>
                </View>
                <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#DDDDDD', marginBottom: 50 }}>
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Password"
                    keyboardType="default"
                    secureTextEntry={true}
                  ></TextInput>
                </View>
                <Button title="Login" onClick={() => console.log('Create account')} />
              </View>
              <View
                style={{
                  marginTop: 100,
                  flex: 3,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <TouchableOpacity>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Need support?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
