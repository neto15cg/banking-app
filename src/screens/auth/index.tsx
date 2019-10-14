import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, BackHandler } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Animation from '../../components/Animations/Fade';
import Button from '../../components/button';
const Logo = require('../../../assets/logo.png');

export interface Props {
  navigation: NavigationScreenProp<NavigationState & NavigationParams>;
}

export default function Auth(props: Props) {
  const [step, setStep] = useState('initial');
  const [code, setCode] = useState([]);
  const [phone, setPhone] = useState(['+', '5', '5']);
  const [image, setImage] = useState(null);

  var backHandler: any;

  useEffect(() => {
    getPermissionAsync();
    backHandler = BackHandler.addEventListener('hardwareBackPress', backPress);
  }, [step]);

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  async function pickImage() {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  function addCodeNumber(n: number, type?: string) {
    setCode(code.length <= 3 ? [...code, n] : [...code]);
    if (type && type === 'accountCode') {
      if (code.length === 3) {
        setTimeout(() => {
          setStep('accountUpload');
          setCode([]);
        }, 100);
      }
    }
  }

  function removeCodeNumber() {
    let tempCode = code;
    if (tempCode.length > 0) {
      tempCode.pop();
      setCode([...tempCode]);
    }
  }

  function addPhoneNumber(n: number) {
    let nS = n.toString();
    setPhone(phone.length <= 13 ? [...phone, nS] : [...phone]);
  }

  function removePhoneNumber() {
    let tempPhone = phone;
    if (tempPhone.length > 1) {
      tempPhone.pop();
      setPhone([...tempPhone]);
    }
  }

  function backPress() {
    console.log(step);

    switch (step) {
      case 'accountUpload':
        setStep('accountCode');
        return true;
      case 'accountCode':
        setStep('accountPhone');
        return true;
      case 'accountPhone':
        setStep('accountData');
        return true;
      case 'accountData':
        setStep('accountInitial');
        return true;
      case 'accountInitial':
        setStep('initial');
        return true;
      case 'loginCode':
        setStep('loginEmail');
        return true;
      case 'loginEmail':
        setStep('initial');
        return true;
      default:
        break;
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[0] === 'number' ? code[0] : undefined}
                      </Text>
                    </Animation>
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[1] === 'number' ? code[1] : undefined}
                      </Text>
                    </Animation>
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[2] === 'number' ? code[2] : undefined}
                      </Text>
                    </Animation>
                  </View>
                  <View>
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
                      <Animation durantion={200}>
                        <Text style={{ fontSize: 40, color: '#352641' }}>
                          {typeof code[3] === 'number' ? code[3] : undefined}
                        </Text>
                      </Animation>
                    </View>
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
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(1)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(2)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(3)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>3</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(4)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(5)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(6)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>6</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(7)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(8)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(9)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>9</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <View>
                    <Text style={{ fontSize: 40, color: '#FFFFFF' }}>0</Text>
                  </View>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(0)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => removeCodeNumber()}>
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
            <TouchableOpacity onPress={() => backPress()}>
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
                <Button title="Next" onClick={() => setStep('accountPhone')} />
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
      {step === 'accountPhone' ? (
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
            <TouchableOpacity onPress={() => backPress()}>
              <AntDesign name="left" size={40} color="#000000"></AntDesign>
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>2/4</Text>
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
              <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#202426' }}>Phone Number</Text>
              </View>
              <View
                style={{
                  flex: 10,
                  padding: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ScrollView
                  horizontal={true}
                  style={{ width: '100%', borderBottomColor: '#D3DBDE', borderBottomWidth: 1 }}
                >
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                      width: '100%',
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingBottom: 30,
                    }}
                  >
                    {phone.map((item, index) => {
                      return (
                        <Animation key={index} durantion={200}>
                          <Text
                            style={{ fontSize: 28, color: '#202426', marginLeft: index === 3 || index === 5 ? 5 : 0 }}
                          >
                            {index === 9 ? '-' : ''}
                            {item}
                          </Text>
                        </Animation>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <View style={{ flex: 50 }}>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(1)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(2)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(3)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>3</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(4)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(5)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(6)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>6</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(7)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(8)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(9)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>9</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 40, color: '#FFFFFF' }}>0</Text>
                  </View>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addPhoneNumber(0)}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => removePhoneNumber()}>
                    <Ionicons name="ios-backspace" size={32} color="#9599B3"></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                <Button title="Verify" onClick={() => setStep('accountCode')} />
                <TouchableOpacity style={{ marginTop: 20 }}>
                  <Text style={{ color: '#07877D', fontSize: 16 }}>Need support?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animation>
        </View>
      ) : (
        undefined
      )}
      {step === 'accountCode' ? (
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
            <TouchableOpacity onPress={() => backPress()}>
              <AntDesign name="left" size={40} color="#000000"></AntDesign>
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>3/4</Text>
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[0] === 'number' ? code[0] : undefined}
                      </Text>
                    </Animation>
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[1] === 'number' ? code[1] : undefined}
                      </Text>
                    </Animation>
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
                    <Animation durantion={200}>
                      <Text style={{ fontSize: 40, color: '#352641' }}>
                        {typeof code[2] === 'number' ? code[2] : undefined}
                      </Text>
                    </Animation>
                  </View>
                  <View>
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
                      <Animation durantion={200}>
                        <Text style={{ fontSize: 40, color: '#352641' }}>
                          {typeof code[3] === 'number' ? code[3] : undefined}
                        </Text>
                      </Animation>
                    </View>
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
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(1, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(2, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>2</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(3, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>3</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(4, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>4</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(5, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>5</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(6, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>6</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(7, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>7</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(8, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>8</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(9, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>9</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ padding: 10, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
                >
                  <View>
                    <Text style={{ fontSize: 40, color: '#FFFFFF' }}>0</Text>
                  </View>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => addCodeNumber(0, 'accountCode')}>
                    <Text style={{ fontSize: 40, color: '#352641' }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => removeCodeNumber()}>
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
      {step === 'accountUpload' ? (
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
            <TouchableOpacity onPress={() => backPress()}>
              <AntDesign name="left" size={40} color="#000000"></AntDesign>
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>4/4</Text>
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
              {image ? (
                <TouchableOpacity style={{ flex: 90, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={{ uri: image }} resizeMode="cover" style={{ width: '100%', height: '100%' }}></Image>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ flex: 90 }} onPress={() => pickImage()}>
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#E3EBEE',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons
                      name="arrow-upward"
                      size={120}
                      color="#07877D"
                      style={{ marginBottom: 50 }}
                    ></MaterialIcons>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Upload your document</Text>
                  </View>
                </TouchableOpacity>
              )}
              <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  title="Verify"
                  onClick={() => console.log('OOOW')}
                  disabled={image ? false : true}
                  style={{ backgroundColor: image ? '#07877D' : '#D3DBDE', borderColor: image ? '#07877D' : '#D3DBDE' }}
                />
                <TouchableOpacity style={{ marginTop: 20 }}>
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
