const makeIterator = require("./iterator");

function parse(tokens) {
    const call = {
        command: tokens.shift().value,
        arguments: [],
        options: []
    };
    const iterator = makeIterator(tokens);

    while (iterator.next()) {
        if (iterator.current.type === "flag") {
            const option = {
                name: iterator.current.value,
                value: undefined
            };

            if (iterator.hasMore) {
                if (iterator.peek().type === "symbol") {
                    iterator.next();
                    option.value = getValue(iterator.peek());
                }
            }

            call.options.push(option);
        } else {
            call.arguments.push(getValue(iterator.current));
        }
    }

    return call;
}

function getValue(token) {
    switch (token.type) {
        case "number":
            return Number(token.value);
        case "boolean":
            return Boolean(token.value);
        default:
            return token.value;
    }
}

module.exports = parse;