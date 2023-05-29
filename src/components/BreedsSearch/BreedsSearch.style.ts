import styled from "@emotion/styled";
import { mq } from "../../theme/mediaQuery";

export const SearchBox = styled.div`
    .ant-select {
        width: 100%;

        ${mq.up('lg')} {
            max-width: 360px;
        }
    }
`