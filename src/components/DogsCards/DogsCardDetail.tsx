import React, { PropsWithChildren, ReactElement, useState } from "react";
import Col from "antd/lib/col";
import Descriptions from "antd/lib/descriptions";
import Divider from "antd/lib/divider";
import Drawer from "antd/lib/drawer";
import Row from "antd/lib/row";
import Space from "antd/lib/space";
import Tag from "antd/lib/tag";
import { DogType } from "./index";
import LazyImage from "../LazyImage";

type DogsCardDetailPropsType = { item?: DogType }
const DogsCardDetail = ({ children, item }: PropsWithChildren<DogsCardDetailPropsType>) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {
                children
                    ? React.cloneElement((children as ReactElement), {
                        onClick: showDrawer,
                    })
                    : null
            }
            <Drawer width={window.innerWidth > 1200 ? 600 : 'auto'} placement="right" closable={true} onClose={onClose} open={open}>
                <LazyImage alt={item?.name} src={item?.url} size="full" />
                <Divider />
                <Row>
                    <Col span={24}>
                        <Descriptions column={1}>
                            <Descriptions.Item
                                label="Name"
                            >
                                {item?.name}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Height"
                            >
                                {`${item?.height?.metric} cm (${item?.height?.imperial} feet)`}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Life Span"
                            >
                                {`${item?.lifeSpan}`}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label="Temperament"
                            >
                                {`${item?.temperament}`}
                            </Descriptions.Item>
                        </Descriptions>
                        <Space>
                            {item?.bred_for ? <Tag>{item?.bred_for}</Tag> : null}
                            {item?.breed_group ? <Tag>{item?.breed_group}</Tag> : null}
                        </Space>
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};

export default DogsCardDetail;