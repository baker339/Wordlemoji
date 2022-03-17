export interface EmojiTheme {
  good: string;
  maybe: string;
  bad: string;
}

const EmojiThemes: EmojiTheme[] = [
  { good: "😁", maybe: "🫤", bad: "😖" },
  { good: "👍", maybe: "✊", bad: "👎" },
  { good: "🌕", maybe: "🌙", bad: "🌑" },
  { good: "🌸", maybe: "🌱", bad: "🪨" },
  { good: "🥇", maybe: "🥈", bad: "🥉" },
  { good: "💌", maybe: "📬", bad: "📪" },
  { good: "🐥", maybe: "🐣", bad: "🥚" },
  { good: "🟢", maybe: "🟡", bad: "🔴" },
];

export default EmojiThemes;
