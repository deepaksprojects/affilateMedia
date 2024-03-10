import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";

const Input = ({placeholder,onChangeText,...rest}:any) => {

  return <TextInput
  
  placeholder={placeholder} onChangeText={onChangeText} {...rest} />;
};

export default Input;
