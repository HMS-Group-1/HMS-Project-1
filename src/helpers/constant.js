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

const kategori = {
        1: "finance",
        2: "engineering",
        3: "poltics",
        4: "science",
        5: "physics",
        6: "games",
        7: "psychology",
        8: "data",
        9: "animals",
        10: "industry",
        11: "history",
        12: "oceanology",
        13: "geography",
        14: "construction",
        15: "sci-fi",
        16: "cartoon",
        17: "religion",
        18: "movies",
        19: "review",
        20: "analysis",
        21: "opinion",
        22: "stock market",
        23: "foreign exchange",
        24: "culture",
        25: "gadgets",
        26: "peripherals",
        27: "biology",
        28: "chemistry",
        29: "marriage",
        30: "marriage"
}

const rak = {
        1: "A",
        2: "B",
        3: "C",
        4: "D",
        5: "E",
        6: "F",
        7: "G",
        8: "H",
        9: "I",
        10: "J",
        11: "K",
        12: "L",
        13: "M",
        14: "N",
        15: "O",
        16: "P",
        17: "Q",
        18: "R",
        19: "S",
        20: "T",
        21: "U",
        22: "V",
        23: "W",
        24: "X",
        25: "Y",
        26: "Z",
}


export { truncateString, toBase64, kategori, rak};