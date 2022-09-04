export default function assing<T>(target: T, ...args: T[]): T {
  for (var i = 1; i < args.length; i++) {
    var source = args[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target;
}
