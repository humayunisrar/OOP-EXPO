import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useLocalSearchParams(); // local search params is used to get the search params from the server. search params is the data that is being searched by the user.
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch("job-details", { // it is used to fetch the data from the server and display it on the screen from useFetch.js
    job_id: params.id, // it is used to get the job id from the server. params is used to get the id from the server 
  });

  const [activeTab, setActiveTab] = useState(tabs[0]); // it is used to set the active tab to the first tab means the first tab will be active when the screen is loaded
  const [refreshing, setRefreshing] = useState(false); // it is used to set the refreshing to false means the screen is not refreshing

  const onRefresh = useCallback(() => { // it is used to refresh the screen. callback is used to call the function when the screen is refreshed
    setRefreshing(true); // it is used to set the refreshing to true means the screen is refreshing
    refetch() // it is used to refetch the data from the server 
    setRefreshing(false) // it is used to set the refreshing to false means the screen is not refreshing
  }, []);

  const displayTabContent = () => { // it is used to display the tab content on the screen tab content is the data that is being displayed on the screen
    switch (activeTab) { // it is used to switch the active tab. switch is used to switch the tab
      case "Qualifications":
        return (
          <Specifics // it is used to display the specific data on the screen according to the choice of the user
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title='Responsibilities'
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo} // it is used to get the employer logo from the server [0] is used to get the first logo from the server
                jobTitle={data[0].job_title} // it is used to get the job title from the server
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

      <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;