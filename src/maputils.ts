import std = require("tstl")

export const forall = <K, V>(map: std.TreeMap<K, V>, callbackfn: (key: K, value: V) => boolean) => {
    for (let it = map.begin(); it != map.end(); it = it.next())
        if (callbackfn(it.first, it.second))
            return false
    return true
}
export const foreach = <K, V>(map: std.TreeMap<K, V>, callbackfn: (key: K, value: V) => void) => {
    for (let it = map.begin(); it != map.end(); it = it.next())
        callbackfn(it.first, it.second);
}