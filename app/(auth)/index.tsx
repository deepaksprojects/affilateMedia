import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Saprator from "@/components/ui/Saprator";
import Input from "@/components/ui/input";
import { LOGIN_URL } from "@/constants/Auth";
import { router } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { storage } from "../_layout";
export default function LoginScreen() {
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");

  const onChangeMN = (text: string) => {
    setMobileNum(text);
  };

  const onChangePS = (text: string) => {
    setPassword(text);
  };


  const checkResponse = (res:any) => {
    res.text().then((data:any) => {
      const jsonRes = JSON.parse(data);
      if (jsonRes?.success) {
        storage.set("userToken", "true");
        return router.replace("/home");
      } else {
        Alert.alert("Wrong Password or Mobile Number");
      }
    })
  } ;
  const onSubmit = async () => {
    if (mobileNum?.length < 10) {
      Alert.alert("invalid mobile number");
      return
    }

    const body = {
      mobileNumber: mobileNum,
      password: password,
    };
    const response = await fetch(
      `${LOGIN_URL}?mobile=${mobileNum}&password=${password}`,
      {
        method: "GET",
      }
    );
    switch (response?.status) {
      case 200:
        return checkResponse(response)

      case 404:
        return Alert.alert("Something went wrong");
      case 500:
        return Alert.alert("Server Error");
      default:
        Alert.alert("Try after sometime");
    }
  };

  const routeToSignup = () => {
    router.push("/(auth)/signUp");
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Mobile Number"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={onChangeMN}
        value={mobileNum}
        style={{
          backgroundColor: "#FFD700",
          width: "80%",
          height: 50,
          padding: 10,
        }}
      />
      <Saprator />
      <Input
        placeholder="Passsword"
        onChangeText={onChangePS}
        value={password}
        secureTextEntry
        style={{
          backgroundColor: "#FFD700",
          width: "80%",
          height: 50,
          padding: 10,
        }}
      />
      <Saprator />

      <Button title="Submit" onSubmit={onSubmit} />
      <Saprator />

      <Text
      style={{color:'white'}}
      onPress={routeToSignup}>
        <Text>New User?</Text>
        Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
