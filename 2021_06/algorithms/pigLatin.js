/* 
If a word begins with a consonant, take the first consonant or consonant cluster, move it to the end of the word, and add ay to it.

If a word begins with a vowel, just add way at the end.

*/

function translatePigLatin(str) {
    let isConsonant, isVowel, arr, consonantCluster = [];

    isConsonant = new RegExp(/^[B-DF-HJ-NP-TV-Zb-df-hj-np-tv-z]*/,'g');
    isVowel = new RegExp(/^[AaEeIiOoUu]/,'g');

    while((arr = isConsonant.exec(str)) !== null){
        if(arr[0] == ''){
            break;
        }
        consonantCluster.push(arr[0]);
    }
    if(consonantCluster.length > 0){
        str = str.slice(consonantCluster[0].length ) + consonantCluster[0] + 'ay';
    }else if(isVowel.exec(str) != null){
        str = str + 'way';
    }

    return str;
  }

//   translatePigLatin("glove");
//   translatePigLatin("consonant");
//   translatePigLatin("paragraphs");
  translatePigLatin("algorithm");