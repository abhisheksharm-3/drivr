import React from 'react';
import { Alert, Image, Text, View } from "react-native";
import { router } from "expo-router";
import { Account } from 'react-native-appwrite';
import CustomButton from "@/components/CustomButton";

// Import your Appwrite client configuration
import { appwriteClient } from '@/lib/appwrite';

const OAuth = () => {
  const account = new Account(appwriteClient);

  const handleGoogleSignIn = async () => {
    try {
      // Start the OAuth flow
      const result = await account.createOAuth2Session(
        'google',
        'YOUR_SUCCESS_URL',
        'YOUR_FAILURE_URL'
      );

      if (result) {
        // If successful, the user will be redirected and this code may not run
        // You might want to handle the success in your success URL instead
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/(root)/(tabs)/home");
      }
    } catch (error) {
      console.error('OAuth error:', error);
      Alert.alert("Error", "Google sign in was unsuccessful");
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Sign In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={require("../assets/icons/google.png")}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;