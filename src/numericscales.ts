export const getScaleSuffix = (scale: number) => getAbbreviatedSuffixes().find(([k, _], __) => k < scale)

const getAbbreviatedSuffixes = () => {
    if (notYetAbbreviated())
        abbreviateMapValues()
    return Array.from(suffixes.entries()).reverse()
}

const notYetAbbreviated = () => suffixes.get(6) != 'M'

const abbreviateMapValues = () => suffixes.forEach((v, k) => {
    for (let i = 1; i < v.length; i++) {
        const prefix = v.substr(0, i)
        if (isUnique(v, prefix))
            return suffixes.set(k, prefix)
    }
})
const isUnique = (value: string, prefix: string) =>
    Array.from(suffixes.values()).every(v => (v == value || !v.startsWith(prefix)))

const suffixes = new Map<number, string>([
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