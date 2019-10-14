import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animation from '../../components/Animations/Fade';
import Button from '../../components/button';
const Logo = require('../../../assets/logo.png');

export interface Props {
  navigation: NavigationScreenProp<NavigationState & NavigationParams>;
}

export default function Auth(props: Props) {
  const [step, setStep] = useState('initial');
  const [code, setCode] = useState([]);

  function handleNumber(n: number) {
    setCode(code.length <= 3 ? [...code, n] : [...code]);
  }

  function removeNumber() {
    let tempCode = code;
    if (tempCode.length > 0) {
      tempCode.pop();
      setCode([...tempCode]);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ height: '100%', width: '100%' }}
      scrollEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={40}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      {step === 'initial' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3EBEE',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Image source={Logo} style={{ width: 47, height: 62, margin: 40 }}></Image>
          <Animation
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: '30%',
              bottom: 0,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              padding: 30,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            durantion={800}
          >
            <Button title="Create account" onClick={() => setStep('accountInitial')} />
            <Button
              style={{ backgroundColor: '#FFFFFF' }}
              textStyle={{ color: '#07877D' }}
              title="Sign In"
              onClick={() => setStep('loginEmail')}
            />
          </Animation>
        </View>
      ) : (
        undefined
      )}
      {step === 'loginEmail' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3EBEE',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <Image source={Logo} style={{ width: 47, height: 62, margin: 40 }}></Image>

          <Animation
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: '40%',
              bottom: 0,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              padding: 30,
            }}
            durantion={800}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 6, justifyContent: 'space-evenly' }}>
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
                <Button title="Resend code" onClick={() => setStep('loginCode')} />
              </View>
              <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Need support?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animation>
        </View>
      ) : (
        undefined
      )}
      {step === 'loginCode' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3EBEE',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <Image source={Logo} style={{ width: 47, height: 62, margin: 40 }}></Image>

          <Animation
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: '80%',
              bottom: 0,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              padding: 30,
            }}
            durantion={800}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#202426' }}>Verification Code</Text>
              </View>
              <View
                style={{
                  padding: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                >
                  <View
                    style={{
                      height: 81,
                      width: 57,
                      backgroundColor: '#E3EBEE',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 40, color: '#352641' }}>{typeof code[0] === 'number' ? code[0] : ''}</Text>
                  </View>
                  <View
                    style={{
                      height: 81,
                      width: 57,
                      backgroundColor: '#E3EBEE',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 40, color: '#352641' }}>{typeof code[1] === 'number' ? code[1] : ''}</Text>
                  </View>
                  <View
                    style={{
                      height: 81,
                      width: 57,
                      backgroundColor: '#E3EBEE',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 40, color: '#352641' }}>{typeof code[2] === 'number' ? code[2] : ''}</Text>
                  </View>
                  <View
                    style={{
                      height: 81,
                      width: 57,
                      backgroundColor: '#E3EBEE',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 40, color: '#352641' }}>{typeof code[3] === 'number' ? code[3] : ''}</Text>
                  </View>
                </View>

                <TouchableOpacity style={{ marginTop: '5%' }}>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Resend code</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 70 }}>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(1)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(2)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(3)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>3</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(4)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(5)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(6)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>6</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(7)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(8)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(9)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>9</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <View>
                    <Text style={{ fontSize: 40, color: '#FFFFFF' }}>0</Text>
                  </View>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => handleNumber(0)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => removeNumber()}>
                    <Ionicons name="ios-backspace" size={40} color="#9599B3"></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animation>
        </View>
      ) : (
        undefined
      )}

      {step === 'accountInitial' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3EBEE',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <Image source={Logo} style={{ width: 47, height: 62, margin: 40 }}></Image>

          <Animation
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: '60%',
              bottom: 0,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              padding: 30,
            }}
            durantion={800}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 6, justifyContent: 'space-evenly' }}>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    marginTop: 50,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Email"
                    keyboardType="email-address"
                  ></TextInput>
                </View>
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
                    placeholder="Password"
                    secureTextEntry={true}
                  ></TextInput>
                </View>
                <Button title="Create account" onClick={() => setStep('accountData')} />
              </View>
              <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Need support?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animation>
        </View>
      ) : (
        undefined
      )}

      {step === 'accountData' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E3EBEE',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          }}
        >
          <View
            style={{
              height: '20%',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 23,
              paddingLeft: 23,
            }}
          >
            <TouchableOpacity>
              <AntDesign name="left" size={40} color="#000000"></AntDesign>
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>1/4</Text>
            <Image source={Logo} style={{ width: 47, height: 62 }}></Image>
          </View>

          <Animation
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              height: '80%',
              bottom: 0,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              padding: 30,
            }}
            durantion={800}
          >
            <View style={{ flex: 1 }}>
              <View style={{ flex: 2, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create account</Text>
              </View>
              <View style={{ flex: 5, justifyContent: 'space-evenly' }}>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                  }}
                >
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Full Name"
                  ></TextInput>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Country"
                  ></TextInput>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    marginTop: 20,
                  }}
                >
                  <TextInput style={{ width: '100%', color: '#707070', fontSize: 16 }} placeholder="City"></TextInput>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                    marginTop: 20,
                    marginBottom: 50,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', color: '#707070', fontSize: 16 }}
                    placeholder="Address"
                  ></TextInput>
                </View>
                <Button title="Next" onClick={() => setStep('loginCode')} />
              </View>
              <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
                <TouchableOpacity>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Need support?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animation>
        </View>
      ) : (
        undefined
      )}
    </KeyboardAwareScrollView>
  );
}
