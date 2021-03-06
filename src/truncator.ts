import {getScale, isValid, pow10, truncateNumber} from './numberutils'
import {getScaleSuffix} from './numericscales'

export const truncate = (num: string) => {
    if (isValid(num)) {
        const scaleAndSuffix = getScaleSuffix(getScale(num))
        if (scaleAndSuffix)
            return format(Number(num), scaleAndSuffix)
    }
    return num
}

const format = (num: number, [scale, suffix]: [number, string]) => {
    const decimal = num / pow10(scale)
    return truncateNumber(decimal, 1) + suffix
}