import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import InputField from "@/components/InputField";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/Oauth";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
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
        <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
        Join Our Pit Crew! 🏎️
          </Text>
      </View>
      <View className="bg-white p-5">
        <InputField
          label="Name"
          placeholder="Lightning McQueen? Is that you?"
          icon={require("../../assets/icons/person.png")}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
          error={errors.name}
        />
        <InputField
          label="Email"
          placeholder="speed.racer@fastlane.com"
          icon={require("../../assets/icons/email.png")}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          keyboardType="email-address"
          error={errors.email}
        />
        <InputField
          label="Password"
          placeholder="Make it vroomy good!"
          icon={require("../../assets/icons/lock.png")}
          value={form.password}
          onChangeText={(value) => setForm({ ...form, password: value })}
          secureTextEntry={!showPassword}
          error={errors.password}
          rightIcon={
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="pr-4"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#4c669f"
              />
            </TouchableOpacity>
          }
        />
        <InputField
          label="Confirm Password"
          placeholder="Once more, with feeling!"
          icon={require("../../assets/icons/lock.png")}
          value={form.confirmPassword}
          onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
          secureTextEntry={!showPassword}
          error={errors.confirmPassword}
        />
        <CustomButton
          title="Start Your Engines! 🏁"
          onPress={handleSignUp}
          className="mt-6 bg-blue-600"
        />
        {/* <OAuth /> */}
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600 text-base">
          Already in the race?
          </Text>
          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text className="text-blue-600 font-bold text-base ml-1">
            Zoom to Login!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
