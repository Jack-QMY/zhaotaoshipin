export function isFunction(fn) {
    return fn && Object.toString.call(fn) === '[object Function]';
}
