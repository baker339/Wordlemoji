import React, { useEffect, useState } from "react";
import EmojiThemes, { EmojiTheme } from "~/data/EmojiThemes";

export default function InputSwitcher() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [good, setGood] = useState("");
  const [maybe, setMaybe] = useState("");
  const [bad, setBad] = useState("");
  const [copyText, setCopyText] = useState("Copy to Clipboard");

  let themeInt = Math.floor(Math.random() * EmojiThemes.length);
  let randomTheme: EmojiTheme = EmojiThemes[themeInt];

  useEffect(() => {
    if (good === "" && maybe === "" && bad === "") {
      setGood(randomTheme.good ? randomTheme.good : "");
      setMaybe(randomTheme.maybe ? randomTheme.maybe : "");
      setBad(randomTheme.bad ? randomTheme.bad : "");
    }
    if (localStorage.getItem("good") !== null) {
      setGood(localStorage.getItem("good") as string);
    }
    if (localStorage.getItem("maybe") !== null) {
      setMaybe(localStorage.getItem("maybe") as string);
    }
    if (localStorage.getItem("bad") !== null) {
      setBad(localStorage.getItem("bad") as string);
    }

    // clear wordle input
    let wordleInput = document.getElementById("wordle-input");
    wordleInput?.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setInput("");
        setResult("");
      }
    });

    // clear good input
    let goodInput = document.getElementById("good-input");
    goodInput?.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        console.log("here");
        handleGood("");
      }
    });

    // clear maybe input
    let maybeInput = document.getElementById("maybe-input");
    maybeInput?.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setMaybe("");
      }
    });

    // clear bad input
    let badInput = document.getElementById("bad-input");
    badInput?.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setBad("");
      }
    });
  }, []);

  function replaceScore(inputText: string) {
    setCopyText("Copy to Clipboard");
    setInput(inputText);
    inputText = inputText.replaceAll("⬛", bad);
    inputText = inputText.replaceAll("⬜", bad);
    inputText = inputText.replaceAll("🟨", maybe);
    inputText = inputText.replaceAll("🟦", maybe);
    inputText = inputText.replaceAll("🟩", good);
    inputText = inputText.replaceAll("🟧", good);
    setResult(inputText);
  }

  function handleGood(value: string) {
    setGood(value);
    if (value !== "") localStorage.setItem("good", value);
  }

  function handleMaybe(value: string) {
    setMaybe(value);
    if (value !== "") localStorage.setItem("maybe", value);
  }

  function handleBad(value: string) {
    setBad(value);
    if (value !== "") localStorage.setItem("bad", value);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopyText("Copied");
  }

  function handleReload() {
    replaceScore(input);
  }

  return (
    <div className="container input-container">
      <div className="emoji-inputs">
        <table className="emoji-input-table">
          <tbody>
            <tr>
              <td className="emoji-input-table-label">Correct: </td>
              <td>
                <input
                  id="good-input"
                  type="text"
                  maxLength={2}
                  onChange={(e) => handleGood(e.target.value)}
                  className="emoji-pick"
                  value={good}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="emoji-input-table-label">Wrong Place: </td>
              <td>
                <input
                  id="maybe-input"
                  type="text"
                  maxLength={2}
                  onChange={(e) => handleMaybe(e.target.value)}
                  className="emoji-pick"
                  value={maybe}
                ></input>
              </td>
            </tr>
            <tr>
              <td className="emoji-input-table-label">Incorrect: </td>
              <td>
                <input
                  id="bad-input"
                  type="text"
                  maxLength={2}
                  onChange={(e) => handleBad(e.target.value)}
                  className="emoji-pick"
                  value={bad}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="input-area-container">
        <textarea
          id="wordle-input"
          value={input}
          className="input-area"
          placeholder="Paste wordle here"
          onChange={(e) => replaceScore(e.target.value)}
        />
      </div>
      <h1 className="display-result">{result}</h1>
      {input && (
        <div className="copy-button-container">
          <div className="copy-button" onClick={handleCopy}>
            {copyText}
          </div>
        </div>
      )}
      {input && (
        <div className="copy-button-container">
          <div className="copy-button" onClick={handleReload}>
            Reload Score
          </div>
        </div>
      )}
    </div>
  );
}
