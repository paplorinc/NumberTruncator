import std = require("tstl")

class ScaleNames {
    private static map = new std.TreeMap<number, string>([
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

    public static getMap() {
        let notYetTruncated = () => ScaleNames.map.begin().second.length > 1
        if (notYetTruncated()) {
            let isUnique = (value: string, prefix: string) => {
                for (let it = ScaleNames.map.begin(); it != ScaleNames.map.end(); it = it.next())
                    if (it.second != value && it.second.startsWith(prefix))
                        return false
                return true
            }

            for (let it = ScaleNames.map.begin(); it != ScaleNames.map.end(); it = it.next())
                for (let i = 1; i < it.second.length; i++) {
                    let prefix = it.second.substr(0, i)
                    if (isUnique(it.second, prefix)) {
                        ScaleNames.map.set(it.first, prefix)
                        break
                    }
                }
        }
        return ScaleNames.map
    }
}

let isValid = (num: string) => !isNaN(Number(num)) && isFinite(Number(num))
let getScale = (num: string) => 1 + Math.floor(Math.log10(Math.abs(Number(num))))
let truncateNumber = (num: number, decimalCount: number) => {
    let pow10 = 10 ** decimalCount
    return Math.trunc(pow10 * num) / pow10;
}

export let truncate = (num: string) => {
    if (!isValid(num)) return num;
    else {
        let numScale = getScale(num)
        let truncatedScale = ScaleNames.getMap().lower_bound(numScale).prev().value
        if (truncatedScale == null) return num
        else {
            let decimal = Number(num) / (10 ** truncatedScale.first)
            let truncatedDecimal = truncateNumber(decimal, 1);
            return truncatedDecimal + truncatedScale.second
        }
    }
}