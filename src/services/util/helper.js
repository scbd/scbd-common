export const makeSmallUid = () => {
    const key = (S4() + S4()).toUpperCase();
    return 'uid-' + key;
}

export function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}