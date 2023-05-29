import { PropsWithChildren } from "react";
import Input, { InputProps } from "antd/lib/input";
import { SearchBox } from "./BreedsSearch.style";
import debounce from "../../helpers/debounce";

type BreadSearchPropTypes = { onValue?: Function } & InputProps
const BreadSearch = ({ onValue, ...props } : PropsWithChildren<BreadSearchPropTypes>) => {
    return (
        <SearchBox>
            <Input
                placeholder="Search for a breed"
                onChange={debounce((evt: any) => {
                    onValue && onValue(evt?.target?.value)
                }, 1000)}
                {...props}
            />
        </SearchBox>
    )
}

export default BreadSearch;