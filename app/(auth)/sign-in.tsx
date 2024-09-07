import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import InputField from "@/components/InputField";
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/Oauth';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const SignIn: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      console.log("Form is valid", form);
    } else {
      console.log("Form is invalid");
    }
  };

  return (
      <ScrollView className="flex-1 bg-white">
 <View className="relative w-full h-[250px]">
        <Image
          source={require("../../assets/images/signup-car.png")}
          className="z-0 w-full h-[250px]"
        />
        <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome Back, Road Warrior! 🚗💨</Text>
</View>
        <View className=" p-5">
          <InputField
            label="Email"
            placeholder="your.name@zoomzoom.com"
            icon={require("../../assets/icons/email.png")}
            value={form.email}
            onChangeText={(value) => setForm({...form, email: value})}
            keyboardType="email-address"
            error={errors.email}
          />
          
          <InputField
            label="Password"
            placeholder="Shh... it's a secret!"
            icon={require("../../assets/icons/lock.png")}
            value={form.password}
            onChangeText={(value) => setForm({...form, password: value})}
            secureTextEntry={!showPassword}
            error={errors.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pr-4">
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#4c669f" />
              </TouchableOpacity>
            }
          />
          
          <TouchableOpacity className="self-end mt-2 mb-4">
            <Text className="text-blue-600 text-sm">Forgot Password? (It happens to the best of us!)</Text>
          </TouchableOpacity>
          
          <CustomButton title='Let&apos;s Roll! 🚀' onPress={handleSignIn} className="bg-blue-600" />
          
          {/* <OAuth /> */}
          
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600 text-base">Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className="text-blue-600 font-bold text-base ml-1">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
};

export default SignIn;