const truncateString = (str, num) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...'
    } else {
        return str
    }
};

function toBase64(img) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
        img.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
};


export { truncateString, toBase64};