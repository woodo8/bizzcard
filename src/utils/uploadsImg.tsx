export function uploadsImg(image: string) {
    return `${process.env.REACT_APP_BASE_URL}uploads/${image}`
}