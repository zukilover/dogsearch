import styled from "@emotion/styled";
import Layout from "antd/lib/layout";
import { ReactComponent as Logo } from "../../assets/logo/logo-dog.svg";
import { mq } from "../../theme/mediaQuery";

export const Sidebar = styled(Layout.Sider)`
    && {
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
    }
`

export const ContentLayout = styled(Layout)`
    ${mq.up('lg')} {
        margin-left: 200px;
    }
`

export const Header = styled(Layout.Header)`
    padding-inline: 24px;
    background: #002345;
`

export const ContentRow = styled.div`
    padding: 24px;
`

export const AppLogo = styled(Logo)`
    max-width: calc(100% - 48px);
    height: auto;
    margin: 24px;
`