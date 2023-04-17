/**
 * @desc 获取token
 */
export const getToken = (): string | null => {
    return window.localStorage.getItem('token');
}
/**
 * @desc 获取localStorage
 */
export const getLocalStorage = (key: string): any => {
    return JSON.parse(window.localStorage.getItem(key) || '');
}
/**
 * @desc 设置localStorage
 */
export const setLocalStorage = (key: string, value: any): void => {
    if (value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    } else {
        window.localStorage.removeItem(key);
    }
}