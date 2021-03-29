// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// SHORTEN STRING
function shorten(string) {

    // MAX CHARACTER LIMIT
    const max_length = 22;

    // string !== undefined && 

    // CHECK IF THE STRING LONGER THAN 22 CHARACTERS
    if (string.length > max_length) {

        // ALLOW THE FIRST 20 CHARACTERS AND TAG ON THE TRIPLEDOT
        string = string.substring(0, (max_length - 3));
        string += '...';
    }

    return string;
}

export {
    sleep,
    shorten
}