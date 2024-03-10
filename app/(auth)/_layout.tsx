import { Redirect, Stack } from "expo-router";
import React from "react";
import { storage } from "../_layout";

export default function TabLayout() {
  console.log('storage.getString("userToken")', storage.getString("userToken"))
    if(storage.getString("userToken")) {return <Redirect href={'/home'} />}
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
    </Stack>
  );
}
