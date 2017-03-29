export let isValid = (num: string) => !isNaN(Number(num)) && isFinite(Number(num))

export let getScale = (num: string) => 1 + Math.trunc(Math.log10(Math.abs(Number(num))))

export let truncateNumber = (num: number, decimalCount: number) => {
    let shift = pow10(decimalCount)
    return Math.trunc(shift * num) / shift
}

export let pow10 = (num: number) => 10 ** num