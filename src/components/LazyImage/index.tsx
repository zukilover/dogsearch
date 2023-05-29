import { useCallback, useEffect, useState } from "react";
import Spin from "antd/lib/spin";
import errorImg from "../../assets/icons/error.png";
import { AutoImage, ImageLoader } from "./LazyImage.style";

const LazyImage = ({ src = '', ...props }) => {
    const [imgSrc, setSrc] = useState(src);
    const [loaded, setLoaded] = useState(false)

    const onLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const onError = useCallback(() => {
        setSrc(errorImg);
        setLoaded(true);
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = src as string;
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
        return () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError]);

    return loaded
        // Custom image style to handle dynamic sizes
        ? <AutoImage data-testid="lazy-image__render" {...props} alt={imgSrc} src={imgSrc} />
        // Brownie points #2: Show loading indicator for the images as they being downloaded.
        : (
            <ImageLoader data-testid="lazy-image__loader">
                <Spin />
            </ImageLoader>
        )
};

export default LazyImage