import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
  });

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => { // handleCardPress function with item as parameter item is the job
    router.push(`/job-details/${item.job_id}`); //router push kia jab card press ho to job details pe jaye based on job id
    setSelectedJob(item.job_id); //selectedJob ko item.job_id se set kia .“Selected job ID ko state mein update karta hai.”
  };
  return (
    
    <View style={styles.container}> 
      <View style={styles.header}> 
        <Text style={styles.headerTitle}>Popular jobs</Text> 
        <Pressable>
          <Text style={styles.headerBtn}>Show all</Text> 
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (      // if isLoading is true
          <ActivityIndicator size="large" color={COLORS.primary} /> // show ActivityIndicator
        ) : error ? ( // else if error is true
          <Text>Something went wrong</Text> // show text
        ) : ( // else
          <FlatList // show FlatList
            data={data} //data ko datavalue se set kia
            renderItem={({ item }) => ( //item render kia with item as parameter
              <PopularJobCard //PopularJobCard component
                item={item}  //item ko item se set kia
                selectedJob={selectedJob} //selectedJob ko selectedJob se set kia ta ke selectedJob ko pass karein
                handleCardPress={handleCardPress} //handleCardPress ko handleCardPress se set kia ta ke handleCardPress ko pass karein
              /> // handle card press ye krta ke job details pe jaye jab card press ho
             )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
