export function longestWord(sentence) {
    var words = sentence.split(" ");
    var longest = "";
    var longestLength = 0;
    for (var i = 0; i < words.length; i++) {
        var cleanWord = words[i].replace(/[^\w\s]/g, "");
        if (cleanWord.length >= longestLength) {
            longest = cleanWord;
            longestLength = cleanWord.length;
        }
    }

    return longest;
}

export function shortestWord(sentence) {
    var words = sentence.split(" ");
    var shortest = "";
    var shortestLength = Infinity;
    for (var i = 0; i < words.length; i++) {
        var cleanWord = words[i].replace(/[^\w\s]/g, "");
        if (cleanWord.length <= shortestLength && cleanWord.length > 0) {
            shortest = cleanWord;
            shortestLength = cleanWord.length;
        }
    }

    return shortest;
}

export function wordLengths(sentence) {
    var words = sentence.split(" ");
    var sumLengths = 0;
    for (var i = 0; i < words.length; i++) {
        var cleanWord = words[i].replace(/[^\w\s]/g, "");
        sumLengths += cleanWord.length;
    }

    return sumLengths;
}