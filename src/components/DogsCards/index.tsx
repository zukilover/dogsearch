import { PropsWithChildren } from "react";
import LazyImage from "../LazyImage";
import Card from "antd/lib/card";
import List from "antd/lib/list";
import Space from "antd/lib/space";
import DogsCardDetail from "./DogsCardDetail";

export type DogType = {
    id?: string,
    url?: string,
    name?: string,
    lifeSpan?: string,
    lifeSpanCriteria?: string,
    height?: Record<string, string>,
    bred_for?: string,
    breed_group?: string,
    temperament?: string,
}

type DogsCardsPropsType = {
    data: DogType[]
}

const DogsCards = ({ data }: PropsWithChildren<DogsCardsPropsType>) => (
    <List
        grid={{ gutter: 16, xs: 1, lg: 4 }}
        dataSource={data}
        renderItem={(item: DogType) => (
            <List.Item key={item.id} data-testid="dogs-list__item">
                <DogsCardDetail item={item}>
                    <Card
                        hoverable
                        cover={<LazyImage alt={item.name} src={item.url} />}
                    >
                        <Space direction="vertical" size="large">
                            <Card.Meta title="Name" description={item.name} />
                            <Card.Meta title="Height" description={`${item.height?.metric} cm`} />
                            <Card.Meta title="Life Span" description={`${item.lifeSpan}`} />
                        </Space>
                    </Card>
                </DogsCardDetail>
            </List.Item>
        )}
    />
);

export default DogsCards;