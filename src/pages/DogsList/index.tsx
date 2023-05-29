import { useMemo, useState } from "react";
import Col from "antd/lib/col";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Pagination from "antd/lib/pagination";
import Row from "antd/lib/row";
import Loadable from "../../components/Loadable";
import DogsCards from "../../components/DogsCards";
import BreadSearch from "../../components/BreedsSearch";
import { useDogsListQuery, useDogsBreedsQuery } from "./DogsList.state";
import { AppLogo, ContentLayout, ContentRow, Header, Sidebar } from "./DogsList.style";
import BreedsSorter from "../../components/BreedsSorter";
import { SegmentedValue } from "antd/lib/segmented";
import { SortOrderType, sortByKey } from "../../helpers/array";

const DogsList = () => {
    const [sorter, setSorter] = useState<Record<string, SegmentedValue>>({
        sortBy: 'name',
        sortOrder: 'asc',
    })
    const [params, setParams] = useState({
        breed_ids: '',
        page: 0,
    })
    const { rawBreeds, loadingBreeds } = useDogsBreedsQuery()
    const { list = [], meta = {}, loading } = useDogsListQuery(params)
    const onSelectBreed = (value: string) => {
        const selectedBreed = value === ''
            // When search value is cleared, search for all breeds (id = '')
            ? { id: '' }
            // Otherwise find by search value
            : rawBreeds.find((b: Record<string, string>) => (b.name || '').toLowerCase().includes(value.toLowerCase()))
        
        setParams({
            // breed_ids = -1 means that the keyword does not match any breeds in the list
            // it will return an empty array (list not found)
            breed_ids: selectedBreed ? selectedBreed.id : '-1',
            // reset pagination
            page: 0,
        })
    }
    const paginationObj = useMemo(() => {
        // Pagination-Page - the current page: uses 0-based index
        const currentPage = (meta['pagination-page'] ? Number(meta['pagination-page']) : 0) + 1
        // Pagination-Count - the total amount of results matching your search
        const count = (meta['pagination-count'] ? Number(meta['pagination-count']) : 0)
        // Pagination-Limit - amount of results being returned per page        
        const limit = (meta['pagination-limit'] ? Number(meta['pagination-limit']) : 0)
        const total = Math.ceil(count / limit)
        return {
            currentPage,
            total,
        }
    }, [meta])
    const dogsList = useMemo(() => {
        const sortList = sortByKey(list, sorter?.sortBy as string)
        return sortList(sorter?.sortOrder as SortOrderType)
        // use params as the effect dependency so that it keeps
        // respecting the sort configuration when navigating through pages
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, sorter, params])
    return (
        <Layout>
            <Sidebar
                breakpoint="lg"
                collapsedWidth="0"
            >
                <AppLogo />
                <Menu
                    theme="dark"
                    mode="inline"
                    items={rawBreeds.map(
                        (b: Record<string, string>) => ({
                            key: b.id,
                            label: b.name,
                        }),
                    )}
                    onClick={({ key }) => setParams({
                        breed_ids: key,
                        page: 0,
                    })}
                />
            </Sidebar>
            <ContentLayout>
                <Header>
                    <BreadSearch onValue={onSelectBreed} />
                </Header>
                <Layout.Content>
                    <BreedsSorter onChange={(value) => setSorter(value) } />
                    <ContentRow>
                        <Row gutter={20}>
                            <Col span={24}>
                                <Loadable loading={loading || loadingBreeds}>
                                    <DogsCards data={dogsList} />
                                    {
                                        // Show pagination if it contains more than 1 page
                                        paginationObj?.total > 1
                                            ? (
                                                <Pagination
                                                    defaultCurrent={paginationObj?.currentPage}
                                                    total={paginationObj?.total}
                                                    showSizeChanger={false}
                                                    onChange={p => setParams({
                                                        ...params,
                                                        page: p - 1,
                                                    })}
                                                />
                                            )
                                            : null
                                    }
                                </Loadable>
                            </Col>
                        </Row>
                    </ContentRow>
                </Layout.Content>
            </ContentLayout>
        </Layout>
    )
}

export default DogsList