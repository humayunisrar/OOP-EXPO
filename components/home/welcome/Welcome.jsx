import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full Time", "Part Time", "Freelance"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full Time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hi Guys</Text>
        <Text style={styles.welcomeMessage}>Find a Job that suits you!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Look for Your Dream Job"
            placeholderTextColor="#000"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>

        <Pressable style={styles.searchBtn} onPress={handleClick}>
          <Image 
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </Pressable>
      </View> 

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <Pressable
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`); //router push kia jab tab press ho to search pe jaye based on job type
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item} // it is used to give a unique key to each item in the list 
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
 