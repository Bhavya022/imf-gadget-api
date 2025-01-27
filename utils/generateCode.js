const generateCodeName = () => {
  const adjectives = ["Stealthy", "Mighty", "Silent", "Swift", "Brilliant"];
  const nouns = ["Nightingale", "Kraken", "Falcon", "Shadow", "Phantom"];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdjective} ${randomNoun}`;
};

const generateConfirmationCode = (length = 6) => {
  return Array.from({ length }, () =>
    Math.random().toString(36).charAt(2 + Math.floor(Math.random() * 24)).toUpperCase()
  ).join("");
};

module.exports = { generateCodeName, generateConfirmationCode };
