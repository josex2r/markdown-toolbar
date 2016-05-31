'use babel';

export default function camelize(string) {
    string = string.replace(/(?:^|[-_])(\w)/g, (_, c) => {
        return c ? c.toUpperCase () : '';
    });

    return string.charAt(0).toLowerCase() + string.substr(1);
}
