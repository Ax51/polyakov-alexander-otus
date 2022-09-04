export default function assing(target, ...args) {
    for (var i = 1; i < args.length; i++) {
        var source = args[i];
        for (var key in source) {
            target[key] = source[key];
        }
    }
    return target;
}
