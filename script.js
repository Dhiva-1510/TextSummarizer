const summarizeBtn = document.getElementById("summarize-button");
const inputText = document.getElementById("text");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const summaryBox = document.getElementById("summary-box");

function summarizeText(text) {
  const sentences = text.match(/[^.!?]+[.!?]/g) || [];
  const words = text.toLowerCase().match(/\w+/g) || [];

  const freq = {};
  words.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });

  const sentenceScores = sentences.map(sentence => {
    const sentenceWords = sentence.toLowerCase().match(/\w+/g) || [];
    const score = sentenceWords.reduce((a, w) => a + (freq[w] || 0), 0);
    return { sentence, score };
  });

  sentenceScores.sort((a, b) => b.score - a.score);
  const topSentences = sentenceScores.slice(0, 3).map(s => s.sentence).join(" ");
  return topSentences;
}

summarizeBtn.addEventListener("click", () => {
  const text = inputText.value.trim();
  const title = titleInput.value.trim() || "Untitled";
  const author = authorInput.value.trim() || "Anonymous";

  if (!text) {
    alert("Please enter text to summarize!");
    return;
  }

  const summary = summarizeText(text);
  summaryBox.innerText = `Title: ${title}\nAuthor: ${author}\n${summary}`;

});
