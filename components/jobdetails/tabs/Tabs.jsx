import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SIZES } from "../../../constants";
import styles from "./tabs.style";

const TabButton = ({ name, activeTab, onHandleSearchType }) => { 
  return (
    <Pressable
      style={styles.btn(name, activeTab)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </Pressable>
  );
};

const Tabs = ({ tabs, activeTab, setActiveTab }) => { 
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingHorizontal: SIZES.small }}
      />
    </View>
  );
};

export default Tabs;
