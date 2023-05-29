import styled from "@emotion/styled";
import { mq } from "../../theme/mediaQuery";

export const AutoImage = styled('img', {
    shouldForwardProp: prop => prop !== 'size'
})(props => `
    object-fit: cover;
    height: ${'size' in props && props.size === 'full' ? '100%' : '200px'};
    max-height: 200px;
    width: auto;
    object-position: top;

    ${mq.up('lg')} {
        max-height: 400px;
    }
`);

export const ImageLoader = styled.div`
    && {
        height: 200px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`