import std = require("tstl");

import TreeMap = std.TreeMap;
class ScaleNames {
    private static map = new TreeMap<number, string>([
        std.make_pair(6, 'Million'),
        std.make_pair(9, 'Billion'),
        std.make_pair(12, 'Trillion'),
        std.make_pair(15, 'Quadrillion'),
        std.make_pair(18, 'Quintillion'),
        std.make_pair(21, 'Sextillion'),
        std.make_pair(24, 'Septillion'),
        std.make_pair(27, 'Octillion'),
        std.make_pair(30, 'Nonillion'),
        std.make_pair(33, 'Decillion'),
        std.make_pair(36, 'Undecillion'),
        std.make_pair(39, 'Duodecillion'),
        std.make_pair(42, 'Tredecillion'),
        std.make_pair(45, 'Quattuordecillion'),
        std.make_pair(48, 'Quinquadecillion'),
        std.make_pair(51, 'Sedecillion'),
        std.make_pair(54, 'Septendecillion'),
        std.make_pair(57, 'Octodecillion'),
        std.make_pair(60, 'Novendecillion'),
        std.make_pair(63, 'Vigintillion'),
        std.make_pair(66, 'Unvigintillion'),
        std.make_pair(69, 'Duovigintillion'),
        std.make_pair(72, 'Tresvigintillion'),
        std.make_pair(75, 'Quattuorvigintillion'),
        std.make_pair(78, 'Quinquavigintillion'),
        std.make_pair(81, 'Sesvigintillion'),
        std.make_pair(84, 'Septemvigintillion'),
        std.make_pair(87, 'Octovigintillion'),
        std.make_pair(90, 'Novemvigintillion'),
        std.make_pair(93, 'Trigintillion'),
        std.make_pair(96, 'Untrigintillion'),
        std.make_pair(99, 'Duotrigintillion'),
        std.make_pair(102, 'Trestrigintillion'),
        std.make_pair(105, 'Quattuortrigintillion'),
        std.make_pair(108, 'Quinquatrigintillion'),
        std.make_pair(111, 'Sestrigintillion'),
        std.make_pair(114, 'Septentrigintillion'),
        std.make_pair(117, 'Octotrigintillion'),
        std.make_pair(120, 'Noventrigintillion'),
        std.make_pair(123, 'Quadragintillion'),
        std.make_pair(153, 'Quinquagintillion'),
        std.make_pair(183, 'Sexagintillion'),
        std.make_pair(213, 'Septuagintillion'),
        std.make_pair(243, 'Octogintillion'),
        std.make_pair(273, 'Nonagintillion'),
        std.make_pair(303, 'Centillion'),
        std.make_pair(306, 'Uncentillion'),
        std.make_pair(309, 'Duocentillion')
    ])

    public static getMap() {
        let notYetTruncated = () => ScaleNames.map.begin().second.length > 1
        if (notYetTruncated()) {
            let isUnique = (prefix: string) => {
                for (let it = ScaleNames.map.begin(); it != ScaleNames.map.end(); it.next())
                    if (it.second.substr(0, prefix.length) == prefix)
                        return false
                return true
            }

            for (let it = ScaleNames.map.begin(); it != ScaleNames.map.end(); it.next()) {
                for (let i = 1; i < it.second.length; i++) {
                    let prefix = it.second.substr(0, i)
                    if (isUnique(prefix)) {
                        ScaleNames.map.set(it.first, prefix)
                        break
                    }
                }
            }
        }
        return ScaleNames.map
    }
}

export let truncate = (num: string) => {
    let originalScale = num.length;
    let truncatedScale = ScaleNames.getMap().lower_bound(originalScale).first // TODO less than million
    return Number(num) / (originalScale - truncatedScale)
}


// negative numbers
// smaller than million
// same abbreviation for Quadrillion, Quintillion (i.e. Long.MAX_VALUE (9223372036854775807L) is nine Quintillion, but 9.2Q could also mean Quadrillion)
// Double.MAX_VALUE (1.7 * 10^308) is greater than 1 Centillion, should it be displayed as e.g. 1100C?
// what should happen for gaps, e.g. 10^123 = 'Quadragintillion', 10^153 = 'Quinquagintillion'
