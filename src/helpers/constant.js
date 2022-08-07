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

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function getInitials(string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

const diffInDays = (datePinjam) =>{
    const today = new Date();
    const pinjamDate = new Date(datePinjam);
    const diffDate = today - pinjamDate
    const res = Math.floor(diffDate / (1000 * 60 * 60 * 24));
    return res
}

export { truncateString, toBase64, toTitleCase, getInitials, diffInDays };