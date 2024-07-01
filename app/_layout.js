import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    useEffect(() => {
        const hideSplash = async () => {
            try {
                await SplashScreen.hideAsync();
            } catch (error) {
                console.warn('Failed to hide splash screen', error);
            }
        };
        hideSplash();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Stack />
        </View>
    );
};

export default Layout;
