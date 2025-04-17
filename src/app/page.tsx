"use client"

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { TbMessageChatbotFilled } from "react-icons/tb";

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
    const userMessage: Message = { role: "user", content: input };
    setInput("");

    let updatedMessages: Message[] = [];

    if (messages.length === 0) {
      const systemMessage: Message = {
        role: "system",
        content: `introduce your name as b2vbot.

When the user asks about course content, always respond in a clearly structured format using ordered (numbered) or bullet lists. Avoid paragraphs.

Only respond to:
- Flutter class details
- Digital Marketing class details
- Courses offered (as per the list)
        {
  "Digital Marketing Syllabus": {
    "Module 1": "Introduction",
    "Module 2": {
      "title": "Email Marketing",
      "topics": [
        "Introduction to Marketing",
        "Mailchimp",
        "Create audience",
        "Creation of campaign",
        "Form creation",
        "Creation of templates",
        "Marketing analytics and report"
      ]
    },
    "Module 3": {
      "title": "Affiliate Marketing",
      "topics": [
        "Finding affiliate marketing Websites",
        "Click Bank",
        "Amazon",
        "Flipkart",
        "How to promote affiliate products"
      ]
    },
    "Module 4": {
      "title": "Google Analytics",
      "topics": [
        "Customization",
        "Real Time Data",
        "Audience",
        "Acquisition",
        "Bounce",
        "Impression",
        "Conversions",
        "Events",
        "Landing page",
        "Website monitoring tools"
      ]
    },
    "Module 5": {
      "title": "Mobile Marketing",
      "topics": [
        "Mobile apps",
        "Ways to do Mobile marketing",
        "Mobile campaigns",
        "Mobile ads",
        "Introduction to Ad campaigns & groups",
        "Mobile website design and development",
        "Mobile apps and app store optimization",
        "SMS and MMS marketing",
        "Mobile advertising"
      ]
    },
    "Module 6": {
      "title": "Webmaster Tools",
      "topics": [
        "Adding site in Google dashboard",
        "Setting Geo - target location",
        "Search queries analysis",
        "Filtering search queries",
        "External links report",
        "Crawl stats and errors",
        "Sitemaps",
        "Robots.txt and links removal",
        "HTML suggestion"
      ]
    },
    "Module 7": {
      "title": "Search Engine Marketing",
      "topics": [
        "Introduction to Pay per click",
        "Google Adwords",
        "Keyword Planner",
        "Search Network Campaign",
        "Daily budget and ad scheduler",
        "Ad extensions & customization",
        "Video Campaign",
        "Remarketing"
      ]
    },
    "Module 8": {
      "title": "Social Media Marketing",
      "topics": [
        "Introduction to Social Media",
        "Creating Facebook page for business",
        "Increasing fans and doing Marketing",
        "Facebook analytics",
        "Facebook ads and its types in detail",
        "Creating advertising campaigns",
        "Payment modes",
        "Introduction to Twitter",
        "Creating strong Profiles on Twitter",
        "Followers, Retweets, Clicks",
        "Conversions, Hashtags",
        "LinkedIn optimization",
        "What is LinkedIn?",
        "Individual profile vs Company profile",
        "Marketing on LinkedIn groups",
        "Google + tools and techniques",
        "Google + groups",
        "Google + for business"
      ]
    },
    "Module 9": {
      "title": "Local Business & Google Mapping",
      "topics": [
        "Creating local listing in Search Engine",
        "Google places setup (including images, Videos, map etc)",
        "Search Engine Visibility Reports",
        "Verification of listing",
        "Google Reviews"
      ]
    },
    "Module 10": {
      "title": "Content Marketing",
      "topics": [
        "What is Content Marketing?",
        "Types of Content Marketing",
        "Content Marketing Goals",
        "Using Different Forms of Content",
        "Creating Content Marketing Strategies",
        "Content Marketing for Social Media",
        "Important Metrics to Measure in Content Marketing",
        "Content Marketing with Video Content",
        "Storytelling",
        "Quora, Infographics, Niche Blogging",
        "Forum Marketing",
        "Memes, Carousels, and Podcasts"
      ]
    },
    "Module 11": {
      "title": "Google Ads Words",
      "topics": [
        "Introduction to Google Ads",
        "Working of Google Ads",
        "Types of Google Ads",
        "Running and Optimizing Search Ads",
        "Running and Optimizing Display Ads",
        "Remarketing With Google Ads",
        "Running App Install Ads",
        "Lead Generating Ads",
        "Video Ads",
        "Shopping Ads",
        "Call Only Ads",
        "Proper Audience Targeting",
        "In-depth Optimization of Ad Groups",
        "Conversion Ads"
      ]
    },
    "Module 12": {
      "title": "Google Adsense",
      "topics": [
        "How to create adsense account",
        "Creating of Ad units",
        "Placing of ads",
        "Ad colours",
        "Optimization of Ad units"
      ]
    },
    "Module 13": {
      "title": "Social Media Optimization",
      "topics": [
        "Facebook",
        "Google+",
        "Twitter",
        "LinkedIn",
        "Tumbler",
        "Pinterest",
        "Reditt"
      ]
    },
    "Module 14": {
      "title": "On Page Optimization",
      "topics": [
        "Domain selection",
        "Hosting selection",
        "Meta data optimization",
        "URL optimization",
        "301 redirection",
        "404 error pages",
        "H1, H2, H3 tags optimization",
        "Image optimization",
        "Landing page optimization",
        "Creating XML site map",
        "Robot.txt"
      ]
    },
    "Module 15": {
      "title": "Off Page Optimization",
      "topics": [
        "Link building tips and techniques",
        "Difference between white hat & black hat SEO",
        "Alexa Rank, Domain",
        "Link acquisition techniques",
        "Directory submission",
        "Social bookmarking submission",
        "Search engine submission",
        "Web 2.0 submission",
        "Article submission",
        "Image submission",
        "Video submission",
        "Forum submission",
        "PPt submission",
        "PDF submission",
        "Classified submission",
        "Citations",
        "Profile link creations",
        "Infographic submission"
      ]
    }
  }
}
        
        {
  "Flutter Lesson": {
    "Week 1": {
      "title": "Dart Programming",
      "topics": [
        "How to install Dart & Vs code",
        "Basic Dart program",
        "Data types in Dart",
        "Operators in Dart",
        "Properties of String",
        "questions for practice"
      ]
    },
    "Week 2": {
      "title": "Conditions in Dart",
      "topics": [
        "if condition",
        "if- else condition",
        "if- else - if condition",
        "Switch case",
        "questions for practice"
      ]
    },
    "Week 3": {
      "title": "Loops in Dart",
      "topics": [
        "For loop",
        "For each loop",
        "While loop",
        "Do while loop",
        "Break and Continue",
        "questions for practice"
      ]
    },
    "Week 4": {
      "title": "Collections in Dart",
      "topics": [
        "List in Dart",
        "Map in Dart",
        "Set in Dart",
        "Properties of List",
        "Properties of Map",
        "Where in Dart",
        "questions for practice"
      ]
    },
    "Week 5": {
      "title": "Functions in Dart",
      "topics": [
        "Function with no parameter and no return Type",
        "Function with parameter and no return Type",
        "Null Safety in Dart",
        "questions for practice"
      ]
    },
    "Week 6": {
      "title": "Functions in Dart (Continued)",
      "topics": [
        "Function with no parameter and return Type",
        "Function with parameter and return Type",
        "Future in Dart",
        "Stream in Dart",
        "questions for practice"
      ]
    },
    "Week 7": {
      "title": "Object Oriented Programming",
      "topics": [
        "Class in Dart",
        "Objects in Dart",
        "Constructor in Dart",
        "Types of Constructor in Dart",
        "questions for practice"
      ]
    },
    "Week 8": {
      "title": "Object Oriented Programming (Continued)",
      "topics": [
        "Inheritance in Dart",
        "Types of inheritance",
        "Static in Dart",
        "Abstract class in Dart",
        "Method Overriding",
        "Enum in Dart",
        "questions for practice"
      ]
    },
    "Week 9": {
      "title": "Flutter",
      "topics": [
        "How to install flutter & Android Studio",
        "Basic Flutter program",
        "widgets in Flutter",
        "Stateless Widget",
        "Statefull Widget",
        "questions for practice"
      ]
    },
    "Week 10": {
      "title": "Flutter Widgets",
      "topics": [
        "Row and Column",
        "Text",
        "Container",
        "Mediaquery",
        "Stack",
        "Ui Practice"
      ]
    },
    "Week 11": {
      "title": "Useful Widgets in Flutter",
      "topics": [
        "Listview.builder",
        "Gridview.builder",
        "Bottom navigation bar",
        "Alert dialog",
        "Snack bar",
        "Types of buttons",
        "Ui Practice"
      ]
    },
    "Week 12": {
      "title": "Assets in Flutter",
      "topics": [
        "Assets in flutter",
        "Pubspec.yaml file and pub.dev",
        "How to use packages",
        "Date and time picker",
        "Form validation",
        "Navigations in flutter"
      ]
    },
    "Week 13": {
      "title": "State Management & Local Storage",
      "topics": [
        "Shared Preference",
        "Set state",
        "Provider"
      ]
    },
    "Week 14": {
      "title": "Working with API in Flutter",
      "topics": [
        "Introduction to Api",
        "Fetch data from Rest Api",
        "Put data from Rest Api",
        "delete data from Rest Api"
      ]
    },
    "Week 15": {
      "title": "Project Week",
      "topics": [
        "Build Simple Apps for practice"
      ]
    }
  }
}

if user asked about the flutter class and Digital marketing class details and also and the general course which is offered as {{
  "courses_offered": [
    "Mobile App Development",
    "Web Development & E-Commerce Solutions",
    "Cloud Computing",
    "DevOps & Security",
    "Functional Testing & Test Automation",
    "Agile Methodologies & Project Management",
    "Digital Marketing & SEO Optimization",
    "UI/UX Design & User Experience Strategy"
  ]
}
}  Do not answer questions outside these topics. if the user asked about the other topics, then say "I am unable provide this info . Please ask about the courses offered by B2v or about the flutter and Digital marketing class details".,
  if the don't share about the course duration and the course fees, then say "I am not able to answer this question. Please ask about the courses offered by B2v or about the flutter and Digital marketing class details.
  Add sum interactive emoji to the message. 
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
          temperature: 1,
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
    <div className="  fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setIsChatVisible(!isChatVisible)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-xl text-sm md:text-xl"
      >
        {isChatVisible ? (
          "Close Chat"
        ) : (
          <TbMessageChatbotFilled className="md:text-3xl animate-bounce" />
        )}
      </button>

      {/* Chatbox */}
      {isChatVisible && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[90vw] max-w-md bg-white border rounded-lg shadow-2xl flex flex-col h-[70vh] sm:h-[32rem]">
          <div className="bg-blue-100 p-3 text-center font-semibold text-blue-700 rounded-t-lg">
            B2v Chatbot
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-white text-black">
          {messages
              .filter((msg) => msg.role !== "system")
              .map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-lg max-w-[80%] whitespace-pre-wrap text-sm ${
                      msg.role === "user"
                        ? "bg-blue-100 text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      // Format assistant response line-by-line
                      msg.content.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        const isBullet =
                          trimmed.startsWith("-") || /^\d+\./.test(trimmed);
                        return (
                          <div key={idx} className="text-left">
                            {isBullet ? trimmed : `• ${trimmed}`}
                          </div>
                        );
                      })
                    ) : (
                      // Leave user message as-is
                      msg.content
                    )}
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
