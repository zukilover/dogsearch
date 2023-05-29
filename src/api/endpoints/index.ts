import { AxiosRequestConfig } from "axios";

export const getDogBreeds = (): AxiosRequestConfig => {
    return {
        url: `/breeds`,
        method: 'GET',
    }
}

export type ListParams = { 
    breed_ids?: string, 
    limit?: number, 
    order?: 'ASC' | 'DESC',
    page?: number,
}

export const getImages = (params: ListParams): AxiosRequestConfig => {
    return {
        url: `/images/search`,
        method: 'GET',
        params,
    }
}