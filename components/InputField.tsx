import React from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageSourcePropType,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle = "",
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  error,
  rightIcon,
  placeholder,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex-row items-center bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <View className="pl-4 pr-2 py-3">
                <Image source={icon} className={`w-5 h-5 ${iconStyle}`} />
              </View>
            )}
            <TextInput
              className={`flex-1 py-3 px-2 font-JakartaSemiBold text-[15px] ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              {...props}
            />
            {rightIcon && (
              <View className="pr-4 py-3">
                {rightIcon}
              </View>
            )}
          </View>
          {error && (
            <Text className="text-red-500 text-sm mt-1">{error}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;