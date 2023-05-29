import { PropsWithChildren } from "react";
import { Skeleton } from "antd/lib";

type LoadableProps = { loading?: Boolean }
const Loadable = (props: PropsWithChildren<LoadableProps>) => {
    const { loading = false, children = null } = props
    return loading
        // Show indicator when loading
        ? <Skeleton />
        // otherwise render the content
        : <>{children}</>
}

export default Loadable
