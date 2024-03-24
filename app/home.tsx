import {
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { FontAwesome } from "@expo/vector-icons";
import Saprator from "@/components/ui/Saprator";
import { router } from "expo-router";
import { LANDING_URL } from "@/constants/Auth";
import Carusel from "@/components/Carousel";

const Home = () => {
  const [data, setData] = useState({
    banners: [],
    telegram: "",
    whatsapp: "",
    content:""
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(LANDING_URL, {
      method: "Get",
    });
    if (response.status === 200) {
      response.text().then((data: any) => {
        const jsonResponse = JSON.parse(data);
        setData(jsonResponse);
      });
    }
  };

  const onPresWhatsApp = () => {
  data?.whatsapp &&  Linking.openURL(data?.whatsapp ?? "");
  }; //
  const onPressTelegram = () => data?.telegram  && Linking.openURL(data?.telegram ?? "");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://www.affiliateadda.in/affiliateadda_logo.png" }}
        style={{ width: "90%", height: 100 }}
        resizeMode="contain"
      />

      {(data?.banners?.length ?? 0) > 0 && (
        <View>
          <Carusel data={data?.banners} />
        </View>
      )}
      <Button
        name="whatsapp"
        title="Chat on Whatsapp"
        color="green"
        onSubmit={onPresWhatsApp}
      />
      <Saprator />
      <Text style={{ color: "white" }}>{data?.content ?? ''}</Text>
      <Saprator />
      <Button
        name="telegram"
        title="Join Our Telegram Channel"
        color="#0088cc"
        onSubmit={onPressTelegram}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
