import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Answer from "../../components/Answer/Answer";
import Question from "../../components/Question/Question";
import Form from "react-bootstrap/Form";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import axios from "axios";

interface MessageIntf {
  question: string;
  answer: string;
}
const apiKey = "AIzaSyCTofCTX4Vvfk28TTqUPYYCul6kZJDxD78"; // Moved outside
const genAI = new GoogleGenerativeAI(apiKey); // Reused throughout

const Home = () => {
  const [temperature, setTemperature] = useState<number>(0.7);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [systemInstruction, setSystemInstruction] = useState<string>("");
  const [messages, setMessages] = useState<MessageIntf[] | []>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // For loading state

  const resetChat = () => {
    setMessages([]);
  };

  const setCharacter = (type: string) => {
    // Debug log
    switch (type) {
      case "Default":
        setSystemInstruction(
          "You are an assistant that helps me by answering my queries."
        );
        return; // Early return for clarity

      case "Friendly":
        setSystemInstruction(
          "You are a friendly assistant who answers questions in a warm manner."
        );
        return;

      case "Formal":
        setSystemInstruction(
          "You are a formal assistant that provides detailed and structured responses."
        );
        return;

      case "Concise":
        setSystemInstruction(
          "You are a concise assistant that gives short and to-the-point answers."
        );
        return;

      case "Story teller":
        setSystemInstruction(
          "You are a story telling assistant that provides a new story idea and builds upon it."
        );
        break;

      case "Movie suggester":
        setSystemInstruction(
          "You are a movie assistant that provides a list of movies based on the user's input."
        );
        break;

      default:
        setSystemInstruction(
          "You are an assistant that helps me by answering my queries."
        );
        return;
    }
  };
  // Memoize handleQuestionChange to prevent unnecessary re-renders
  const handleQuestionChange = useCallback((value: string) => {
    setNewQuestion(value);
  }, []);

  // Memoize the model creation to avoid recreation on every render
  const model = useMemo(() => {
    return genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction, // Make sure this is included
      generationConfig: {
        temperature: temperature,
      },
    });
  }, [temperature, systemInstruction]);

  const generateAnswer = async () => {
    if (!newQuestion.trim() || loading) return; // Prevent empty submissions or multiple clicks
    setLoading(true); // Start loading
    try {
      const history = messages.flatMap((message: MessageIntf) => [
        {
          role: "user",
          parts: [{ text: message.question }],
        },
        {
          role: "model",
          parts: [{ text: message.answer }],
        },
      ]);

      const chat = model.startChat({
        history: history,
      });

      const res = await chat.sendMessage(newQuestion);

      setMessages((prevMessages: MessageIntf[] | []) => [
        ...prevMessages,
        { question: newQuestion, answer: res.response.text() },
      ]);
      setNewQuestion(""); // Clear input after submitting
    } catch (error) {
      console.error("Error generating content:", error);
      // Optionally add error feedback here
    } finally {
      setLoading(false); // End loading
    }
  };

  // UseEffect for enabling/disabling the send button
  useEffect(() => {
    setDisabled(newQuestion.trim() === "");
  }, [newQuestion]);

  return (
    <div className="d-flex flex-column h-100 w-100 justify-content-between">
      <Navbar
        temperature={temperature}
        setTemperature={setTemperature}
        resetChat={resetChat}
        setCharacter={setCharacter}
      />
      <div className={styles.homeDiv}>
        <div className="h-75 w-100 justify-content-start align-items-start d-flex flex-column">
          {messages.map((message: MessageIntf, index: number) => (
            <div
              key={index}
              className="d-flex flex-column justify-content-between w-100"
            >
              <Question question={message.question} />
              <Answer answer={message.answer} />
            </div>
          ))}
        </div>
        <div className="h-25 w-100 justify-content-between d-flex flex-row justify-content-center align-items-center">
          <input
            type="text"
            placeholder="Start a conversation"
            onChange={(e) => handleQuestionChange(e.target.value)}
            value={newQuestion}
            className={
              "ms-5 w-100 h-75 ps-5 pe-5  border-primary-subtle rounded border-opacity-75 text-primary text-start text-wrap " +
              styles.customRoundedInput
            }
            maxLength={2000}
          ></input>
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
              transform: "translateX(-100%)",
            }}
          >
            <IconButton
              aria-label="delete"
              color="primary"
              size="large"
              onClick={generateAnswer}
              className="p-1"
              disabled={disabled}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) {
                  generateAnswer(); // Trigger answer generation when Enter is pressed
                }
              }}
            >
              <ArrowCircleRightIcon />
            </IconButton>
            <p
              className="text-primary p-1"
              style={{
                fontSize: "0.8rem",
              }}
            >
              {newQuestion.length} / 2000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
