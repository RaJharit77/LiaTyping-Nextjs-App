const wordList = [
    "le", "la", "de", "un", "une", "est", "son", "avec", "pour", "dans",
    "sur", "qui", "que", "mais", "comme", "tout", "faire", "dire",
    "pouvoir", "vouloir", "prendre", "donner", "aller", "venir",
    "voir", "savoir", "croire", "falloir", "devoir", "parler",
    "trouver", "demander", "passer", "rester", "entendre", "laisser",
    "porter", "montrer", "attendre", "reprendre", "commencer",
    "continuer", "devenir", "entrer", "sortir", "tenir", "vivre"
];

export function generateRandomWords(count: number): string[] {
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        result.push(wordList[randomIndex]);
    }
    return result;
}