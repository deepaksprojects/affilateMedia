import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import Saprator from "@/components/ui/Saprator";
import Input from "@/components/ui/input";
import { SIGNUP_URL } from "@/constants/Auth";
import { router } from "expo-router";
import { useState } from "react";
import { storage } from "../_layout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TabTwoScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const onChangeMN = (text: string) => {
    setMobile(text);
  };

  const onChangeName = (text: string) => {
    setName(text);
  };

  const onChangePS = (text: string) => {
    setPassword(text);
  };

  const routeToLogin = () => {
    router.push("/(auth)/");
  };

  const onSubmit = async () => {
    if (!name || !mobile || !password) Alert.alert("Invalid details");

    if (mobile?.length < 10) {
      Alert.alert("invalid mobile number");
    }

    const checkResponse = (res: any) => {
      res.text().then((data: any) => {
              const jsonRes = JSON.parse(data);

        if (jsonRes?.success) {
          storage.set("userToken", "true");
          return router.replace("/home");
        } else {
          Alert.alert("Wrong Password or Mobile Number");
        }
      });
    };

    const body = {
      name: name,
      mobilenumber: mobile,
      password: password,
    };
    const response = await fetch(
      `${SIGNUP_URL}?name=${name}&mobile=${mobile}&password=${password}`,
      {
        method: "GET",
      }
    );
    switch (response?.status) {
      case 200:
        return checkResponse(response);
      case 404:
        return Alert.alert("Something went wrong");
      case 500:
        return Alert.alert("Server Error");
      default:
        Alert.alert("Try after sometime");
    }
  };

  return (
      <View style={styles.container}>
        <Input
          placeholder="Name"
          onChangeText={onChangeName}
          value={name}
          style={styles.input}
        />
        <Saprator />
        <Input
          placeholder="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={onChangeMN}
          value={mobile}
          style={styles.input}
        />
        <Saprator />
        <Input
          placeholder="Passsword"
          onChangeText={onChangePS}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Saprator />

        <Button title="Submit" onSubmit={onSubmit} />
        <Saprator />

        <Text style={{ color: "white" }} onPress={routeToLogin}>
          <Text>Already have account?</Text>
          Login
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
  input: {
    backgroundColor: "#FFD700",
    width: "80%",
    height: 50,
    padding: 10,
  },
});
