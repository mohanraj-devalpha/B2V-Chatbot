"use client"

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import { RiCloseCircleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";



interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);


  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage: Message = {
      role: "user",
      content: input
    };
    setInput("");
    let updatedMessages: Message[] = [];
    if (messages.length === 0) {
      const systemMessage: Message = {
        role: "system",
        content: `Introduce yourself as BeeTalk when the user greets.
         You are a helpful assistant for the B2V course providing website.
         List the courses as Listed Formatted with the  number not with other icons.
         You first greet the user, but do not mention anything about course details in your greeting.
         Greet only don't provide about the course details at the first greet.
         If user greets with {Hi,Hello} messages greet with an same message as user given greet message .
         if the user asks about the courses, then provide the Title of courses in a numbered format.
         provide the course modules only when the user asks about the specific courses dont provide the modoule subtopics proivde the response as "visit our website course details page".
         Dont provide the outside topics and dont answer the questions outside the topics strictly.
        The courses are:  
            "AI/ML Course":{
                  "Module 1": "Introduction to AI and Machine Learning",
                  "Module 2": "Mathematics for Machine Learning",
                  "Module 3": "Programming Essentials",
                  "Module 4":  "Machine Learning Fundamentals",
                  "Module 5": "Deep Learning Basics",
                  "Module 6": "Advanced Topics",
                  "Module 7": "Model Deployment",
                  "Module 8": "Capstone Project"
                  },
                  "Flutter": {
                  "Module 1":"Dart Introduction & Basics",
                  "Module 2": "Functions in Dart",
                  "Module 3": "OOP & Flutter Introduction",
                  "Module 4": "Flutter Widgets and Topics"
                  },
                  "Full-stack Development": {
                    "Module 1": {"HTML","CSS and Bootstrap 5"},
                    "Module 2": {"JavaScript Part 1","JavaScript Part 2"},
                    "Module 3": "React",
                    "Module 4": {"Express.js","Node.js","MongoDB"}
                  },
                  {
                  "AWS Cloud Computing ": {
                    "Module 1: Getting Started with Cloud Computing and AWS",
                    "Module 2: Core AWS Services with Hands-On Experience",
                    "Module 3: Advanced AWS Services and Hands-On Training",
                    "Module 4: Exploring Advanced Features and Services"
                    },
                  "DevOps and Security": {
                    "Module 1: Foundations of DevOps",
                    "Module 2: Automation and Infrastructure as Code (IaC)",
                    "Module 3: Containerization and Orchestration",
                    "Module 4: Networking, Security, and Collaboration Tools"
                  },
                  "Digital Marketing": {
                    "Module 1": "Introduction to Digital Marketing",
                    "Module 2": "Email Marketing",
                    "Module 3": "Affiliate Marketing",
                    "Module 4": "Google Analytics",
                    "Module 5": "Mobile Marketing",
                    "Module 6": "Webmaster Tools",
                    "Module 7": "Search Engine Marketing",
                    "Module 8": "Social Media Marketing",
                    "Module 9": "Local Business & Google Mapping",
                    "Module 10": "Content Marketing",
                    "Module 11": "Google Ads Words",
                    "Module 12": "Google Adsense",
                    "Module 13": "Social Media Optimization (SMO)",
                    "Module 14": ["On Page Optimization","Off Page Optimization"]
                  },
                  "UI/UX Designer": {
                    "Module 1": "Fundamentals of UI/UX Design",,
                    "Module 2": "Tools and Wireframing",
                    "Module 3": "Visual Design and Accessibility",
                    "Module 4": "Wireframe Grid System"
                  }
                  is the user asked about the this type of questions or related to that and get only the user asked question dont add the unwanted questions and answers, then answer as the answer given in the below .
                  questions: How do I enroll in a course? answer as "Visit our website and navigate to the course page. "
                  What are the admission requirements? asnwer as "there is no admission requirements for the courses. " 
                  Is there an application deadline? answer as "No, there is no application deadline. "
                  Are classes available online or in-person? answer as "Classes are available both online and in-person. "
                  Do you offer weekend or evening classes? answer as "yes, we offer weekend and evening classes. "
                  What is the duration of the courses? answer as "The duration of each course is 3 months. "
                  Will I receive a certificate upon completion? answer as "Yes, you will receive a certificate upon completion
                  Is the certification recognized in the industry? answer as "Yes, the certification is recognized in the industry. "
                  Do you provide job placement assistance? answer as "Yes, we provide job placement assistance but based on the performance of the candidate. "
                  What career paths can I pursue after completing a course? shout out the email and phone number as "You can reach out to us at"
                  What is the fee structure for the courses? shout out the email and phone number as "You can reach out to us at"
                  Do you offer installment payment options? answer as "Yes, we offer installment payment options. "
                  What are the system requirements for online classes? answer as "You will need a computer or mobile device with internet access. "
                  Can I access course materials on my mobile device? answer as "Yes, course materials are accessible on mobile devices. "
                  Do you provide technical support during the course? answer as "Yes, we provide technical support during the course. "
                  Which learning platform do you use? answer as "We use a Gmeet as our learning platform. "
                  What are your customer service hours? answer as "Our customer service hours are from 9 AM to 6 PM IST. "
                  in the above questions or related questions if the user asked, then answer as the answer given in the above.
                  
                Do not answer questions outside these topics. if the user asked about the other topics, then say 
                    "You can reach out to us at
                    Email: b2vtechnology@gmail.com
                    Phone (India): +91 - 7200533357
                    ",
                  the customer service hours are 9:00 AM to 6:00 PM IST.
                     Duration of each course is 3 months.
                   Add interactive emojis to the response.  
                     
              `,
      };
      updatedMessages = [systemMessage, userMessage];
    } else {
      updatedMessages = [...messages, userMessage];
    }
    setMessages(updatedMessages);
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: updatedMessages,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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",
          },
        }
      );
      const reply: Message = response.data.choices[0].message;
      setMessages([...updatedMessages, reply]);
    } catch (error) {
      console.error("Send error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`fixed bottom-10 right-10 z-50 ${!isChatVisible ? 'animate-bounce' : ''
        }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsChatVisible(!isChatVisible)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-xl transition-all duration-200 flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
      >
        {isChatVisible ? (
          <IoMdClose className="text-2xl" />
        ) : (
          <Image
            src={'/lobo.png'}
            alt="lobo"
            width={20}
            height={20}
            className="object-contain"
          />
        )}
      </button>
      {/* Chatbox */}
      {isChatVisible && (
        <div className="fixed bottom-0 right-7 sm:right-6 w-[90vw] max-w-md bg-white border rounded-lg shadow-2xl flex flex-col h-[70vh] sm:h-[32rem]">
          <div className="bg-blue-100 flex justify-between p-3 text-center font-semibold text-blue-700 rounded-t-lg">
            BeeTalk
            <button onClick={() => setIsChatVisible(false)} className="text-blue-700 hover:text-blue-900">
              <IoMdClose className="text-2xl" />
            </button>

          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white text-black">
            <span className="block text-sm text-gray-500 text-center">  Today {new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </span>
            {messages
              .filter((msg) => msg.role !== "system")
              .map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg max-w-[80%] whitespace-pre-wrap text-sm ${msg.role === "user"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-100 text-left"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            {loading && <div className="text-gray-400">Typing...</div>}
            <div ref={bottomRef} />
          </div>
          <div className="flex p-3 border-t gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none text-black"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbot;
