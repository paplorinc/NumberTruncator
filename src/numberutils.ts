export let isValid = (num: string) => !isNaN(Number(num)) && isFinite(Number(num))

export let getScale = (num: string) => 1 + Math.trunc(Math.log10(Math.abs(Number(num))))

export let truncateNumber = (num: number, decimalCount: number) => {
    let pow10 = 10 ** decimalCount
    return Math.trunc(pow10 * num) / pow10
}
