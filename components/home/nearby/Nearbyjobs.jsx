import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Pressable, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "Devops",
    num_pages: "1",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((job) => ( // data use fetch se retrive krwaya hai or map krwya 
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`} // key ko nearby-job-job_id se set kia. “Key ko unique banane ke liye job_id ka use kia.” nearby-job-job_id se set kia ta ke unique ho
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)} // handleNavigate ye krta ke job details pe jaye jab card press ho 
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
