import { API_URL_ANDROID, API_URL_IOS, API_URL as PROD_URL, STAGE } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/async-storage";

export const API_URL =
    STAGE === 'production'
        ? PROD_URL
        : Platform.OS === 'ios'
            ? API_URL_IOS
            : API_URL_ANDROID

const tesloAPI = axios.create({
    baseURL: 'http://172.17.64.1:3000/api/',
    headers: {
        "Content-Type": 'application/json'
    }
})

//interceptors
tesloAPI.interceptors.request.use(
    async (config) => {
        
        const token = await StorageAdapter.getItem('token');
        
        if (token && token !== null) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            config.headers['Authorization'] = `Bearer `;
        }

        return config;
    }
);

export {
    tesloAPI
}