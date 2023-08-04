const string1 = "aabbcc";
const string2 = "aacccbbcc";


function countLetterOccurence(str) {
    // Hashmap that will store string1 letters and occurences of letter
    const stringDict = {};
    // Add letters from string1 to hashmap
    for (let i = 0; i < str.length; i++) {
        let letter = str[i];
        // If count doesn't exist, set to 0, if it exists, add 1
        stringDict[letter] = { count: (stringDict[letter]?.count || 0) + 1 };
    };
    return stringDict;
}

stringOneDict = countLetterOccurence(string1);
stringTwoDict = countLetterOccurence(string2);

// Compare both string hashmaps to find the addedLetter
const addedLetter = [];
for (let letter in stringTwoDict){
    if (!stringOneDict[letter]){
        addedLetter.push(letter);
    } else {
        if (stringTwoDict[letter].count > stringOneDict[letter].count){
            addedLetter.push(letter);
        };
    };
};

console.log(addedLetter);

