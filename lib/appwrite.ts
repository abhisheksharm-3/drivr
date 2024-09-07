import { Client } from 'react-native-appwrite';

export const appwriteClient = new Client()
  .setEndpoint('YOUR_APPWRITE_ENDPOINT')
  .setProject('YOUR_APPWRITE_PROJECT_ID');