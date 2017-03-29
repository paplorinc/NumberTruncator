import std = require("tstl")
import {forall, foreach} from "./maputils";

class Suffixes {
    private static suffixes = new std.TreeMap<number, string>([
        [6, 'Million'],
        [9, 'Billion'],
        [12, 'Trillion'],
        [15, 'Quadrillion'],
        [18, 'Quintillion'],
        [21, 'Sextillion'],
        [24, 'Septillion'],
        [27, 'Octillion'],
        [30, 'Nonillion'],
        [33, 'Decillion'],
        [36, 'Undecillion'],
        [39, 'Duodecillion'],
        [42, 'Tredecillion'],
        [45, 'Quattuordecillion'],
        [48, 'Quinquadecillion'],
        [51, 'Sedecillion'],
        [54, 'Septendecillion'],
        [57, 'Octodecillion'],
        [60, 'Novendecillion'],
        [63, 'Vigintillion'],
        [66, 'Unvigintillion'],
        [69, 'Duovigintillion'],
        [72, 'Tresvigintillion'],
        [75, 'Quattuorvigintillion'],
        [78, 'Quinquavigintillion'],
        [81, 'Sesvigintillion'],
        [84, 'Septemvigintillion'],
        [87, 'Octovigintillion'],
        [90, 'Novemvigintillion'],
        [93, 'Trigintillion'],
        [96, 'Untrigintillion'],
        [99, 'Duotrigintillion'],
        [102, 'Trestrigintillion'],
        [105, 'Quattuortrigintillion'],
        [108, 'Quinquatrigintillion'],
        [111, 'Sestrigintillion'],
        [114, 'Septentrigintillion'],
        [117, 'Octotrigintillion'],
        [120, 'Noventrigintillion'],
        [123, 'Quadragintillion'],
        [153, 'Quinquagintillion'],
        [183, 'Sexagintillion'],
        [213, 'Septuagintillion'],
        [243, 'Octogintillion'],
        [273, 'Nonagintillion'],
        [303, 'Centillion'],
        [306, 'Uncentillion']
    ])

    public static get() {
        if (this.notYetTruncated())
            this.truncateMapValues();
        return Suffixes.suffixes
    }

    private static notYetTruncated = () => Suffixes.suffixes.begin().second.length > 1

    private static truncateMapValues = () => foreach(Suffixes.suffixes, (k, v) => {
        for (let i = 1; i < v.length; i++) {
            let prefix = v.substr(0, i)
            if (Suffixes.isUnique(v, prefix))
                return Suffixes.suffixes.set(k, prefix)
        }
    })
    private static isUnique = (value: string, prefix: string) =>
        forall(Suffixes.suffixes, (_, v) => (v != value && v.startsWith(prefix)))
}

let isValid = (num: string) => !isNaN(Number(num)) && isFinite(Number(num))

let getScale = (num: string) => 1 + Math.trunc(Math.log10(Math.abs(Number(num))))

let truncateNumber = (num: number, decimalCount: number) => {
    let pow10 = 10 ** decimalCount
    return Math.trunc(pow10 * num) / pow10
}
let format = (num: number, scale: number, suffix: string) => {
    let decimal = num / (10 ** scale)
    return truncateNumber(decimal, 1) + suffix
}

let getScaleSuffix = (scale: number) => Suffixes.get().lower_bound(scale).prev().value

export let truncate = (num: string) => {
    if (!isValid(num)) return num
    else {
        let scaleAndSuffix = getScaleSuffix(getScale(num))
        if (scaleAndSuffix == null) return num
        else return format(Number(num), scaleAndSuffix.first, scaleAndSuffix.second)
    }
}