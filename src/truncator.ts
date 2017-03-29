import std = require("tstl")
import {getScale, isValid, pow10, truncateNumber} from "./numberutils";
import {getScaleSuffix} from "./numericscales";

export const truncate = (num: string) => {
    if (!isValid(num)) return num
    else {
        const scaleAndSuffix = getScaleSuffix(getScale(num))
        if (scaleAndSuffix == null) return num
        else return format(Number(num), scaleAndSuffix.first, scaleAndSuffix.second)
    }
}

const format = (num: number, scale: number, suffix: string) => {
    const decimal = num / pow10(scale)
    return truncateNumber(decimal, 1) + suffix
}