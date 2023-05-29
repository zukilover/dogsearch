import { InternalAxiosRequestConfig, AxiosResponse } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Append api key from https://thedogapi.com/
    config.headers!['x-api-key'] = process.env.REACT_APP_API_KEY
    return config;
}

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response
}