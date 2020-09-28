export function round(num: number, decimals: number) {
    const multiplier = Math.pow(10, decimals);
    const aux = Math.floor(num*multiplier);
    return aux/multiplier;
}