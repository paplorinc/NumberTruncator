export const isValid = (num: string) => !isNaN(Number(num)) && isFinite(Number(num))

export const getScale = (num: string) => 1 + Math.trunc(Math.log10(Math.abs(Number(num))))

export const truncateNumber = (num: number, decimalCount: number) => {
    const shift = pow10(decimalCount)
    return Math.trunc(shift * num) / shift
}

export const pow10 = (num: number) => 10 ** num