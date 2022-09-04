import assign from "./assign";
import defaultConverter from "./converter";
import { Attributes, Converter, getCookie, setCookie, Cookies } from "../types";

function init(converter: Converter, defaultAttributes: Attributes): Cookies {
  // function set(name: string, value: string, attributes: Attributes) {
  // function set(name, value, attributes) {
  const set: setCookie = (name, value, attributes) => {
    if (typeof document === "undefined") {
      return;
    }

    attributes = assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === "number") {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires instanceof Date) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = "";
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue;
      }

      stringifiedAttributes += "; " + attributeName;

      if (attributes[attributeName] === true) {
        continue;
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += "=" + attributes[attributeName].toString().split(";")[0];
    }

    return (document.cookie =
      name + "=" + converter.write(value) + stringifiedAttributes);
  };

  const get: getCookie = (name: string) => {
    if (typeof document === "undefined" || (arguments.length && !name)) {
      return;
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar: { [key: string]: string } = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");

      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value);

        if (name === found) {
          break;
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar;
  };

  return Object.create(
    {
      set: set,
      get: get,
      remove: function (name: string, attributes: Attributes) {
        set(
          name,
          "",
          assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (
        this: { converter: Converter; attributes: Attributes },
        attributes: Attributes
      ) {
        return init(this.converter, assign({}, this.attributes, attributes));
      },
      withConverter: function (
        this: { converter: Converter; attributes: Attributes },
        converter: Converter
      ) {
        return init(assign({} as Converter, this.converter, converter), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  );
}

export default init(defaultConverter, { path: "/" });
