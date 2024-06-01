const getStaticImagePath = (path) => {
    return new URL(`/src/assets${path}`, import.meta.url);
};

export default getStaticImagePath;
