import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { ListParams, getImages, getDogBreeds } from "../../api/endpoints";
import { DogType } from "../../components/DogsCards";
import { rangeAverage } from "../../helpers/string";

const dogsListQueryKey = ({ breed_ids = '', page = 0 }) => ['get-content-type-list', breed_ids, page]

export const useDogsListQuery = ({ breed_ids = '', page = 0 }: ListParams) => {
    const { isFetching, data } = useQuery(
        dogsListQueryKey({ breed_ids, page }),
        () => axios(
            // retrieve data based on type
            getImages({ breed_ids, limit: 25, order: 'ASC', page })
        ),
        {
            onError: ({ response }) => {
                console.error(response?.data?.error?.message)
            },
            select: ({ data, headers }) => {
                // Plugins have a slightly different data schema;
                // they are not wrapped within a 'data' property
                return {
                    data: data.map((dog: DogType & { breeds: any[] }) => {
                        const [breed] = dog?.breeds || []
                        return {
                            // record id
                            id: dog.id,
                            // image URL
                            url: dog.url,
                            // dog's breed name
                            name: breed?.name,
                            // dog's life span
                            lifeSpan: breed?.life_span,
                            // average life span as the sorter criteria for list sorter
                            lifeSpanCriteria: rangeAverage(breed?.life_span),
                            // average dog's height as the sorter criteria for list sorter
                            heightCriteria: rangeAverage(breed?.height?.metric),
                            ...breed,
                        }
                    }),
                    headers,
                }
            }
        }
    );
    return {
        list: data?.data || [],
        meta: data?.headers || {},
        loading: isFetching,
    }
}

export const useDogsBreedsQuery = () => {
    const { isFetching, data } = useQuery(
        ['breeds'],
        () => axios(
            // retrieve data based on type
            getDogBreeds()
        ),
        {
            onError: ({ response }) => {
                console.error(response?.data?.error?.message)
            },
            select: (response) => {
                const { data } = response
                // Plugins have a slightly different data schema;
                // they are not wrapped within a 'data' property
                return data
            }
        }
    );
    return {
        rawBreeds: data || [],
        loadingBreeds: isFetching,
    }
}