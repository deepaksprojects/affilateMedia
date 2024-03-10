import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import PagerView from "react-native-pager-view";
import Carousel from "react-native-reanimated-carousel";

const Carusel = ({ data = [] }) => {
  const width = Dimensions.get("window").width;
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        pagingEnabled
        renderItem={({ item, index }) => (
          <View
            style={{
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <ImageBackground
              source={{ uri: item }}
              style={{ width: "90%", aspectRatio: 16 / 9 }}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 0,
    height: 400,
    width: 100,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Carusel;
