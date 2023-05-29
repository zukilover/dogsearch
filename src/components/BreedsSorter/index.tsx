import Segmented, { SegmentedValue } from "antd/lib/segmented";
import Space from "antd/lib/space";
import { ColumnHeightOutlined, HeartOutlined, IdcardOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { SorterColumn, SorterLabel, SorterWrapper } from "./BreedsSorter.styled";
import { PropsWithChildren, useEffect, useState } from "react";

type BreedsSorterPropsType = {
    onChange: (obj: Record<string, SegmentedValue>) => void,
}
const BreedsSorter = ({ onChange }: PropsWithChildren<BreedsSorterPropsType>) => {
    const [sortBy, setSortBy] = useState<SegmentedValue>('name')
    const [sortOrder, setSortOrder] = useState<SegmentedValue>('asc')
    const handleOnSortBy = (value: SegmentedValue) => {
        // update sort by value
        setSortBy(value)
    }
    const handleOnSortOrder = (value: SegmentedValue) => {
        // update sort order value
        setSortOrder(value)
    }
    useEffect(() => {
        // pass the sorter configuration to the parent component
        onChange && onChange({
            sortBy,
            sortOrder,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, sortOrder])
    return (
        <SorterWrapper>
            <Space size="large" wrap>
                <SorterColumn>
                    <SorterLabel>Sort by:</SorterLabel>
                    <Segmented
                        defaultValue={sortBy}
                        onChange={handleOnSortBy}
                        options={[
                            {
                                label: 'Name',
                                value: 'name',
                                icon: <IdcardOutlined />,
                            },
                            {
                                label: 'Height',
                                value: 'heightCriteria',
                                icon: <ColumnHeightOutlined />,
                            },
                            {
                                label: 'Lifespan',
                                value: 'lifeSpanCriteria',
                                icon: <HeartOutlined />,
                            },
                        ]}
                    />
                </SorterColumn>
                <SorterColumn>
                    <SorterLabel>Sort order:</SorterLabel>
                    <Segmented
                        defaultValue={sortOrder}
                        onChange={handleOnSortOrder}
                        options={[
                            {
                                label: 'ASC',
                                value: 'asc',
                                icon: <SortAscendingOutlined />,
                            },
                            {
                                label: 'DESC',
                                value: 'desc',
                                icon: <SortDescendingOutlined />,
                            },
                        ]}
                    />
                </SorterColumn>
            </Space>
        </SorterWrapper>
    )
}

export default BreedsSorter