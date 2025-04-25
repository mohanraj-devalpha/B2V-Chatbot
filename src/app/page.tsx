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
        content: `Introduce your name as B2Vbot. You are a helpful assistant for the B2V course providing website.List the courses as Listed Formatted with the number not with other icons. You first greet the user, but do not mention anything about course details in your greeting.  Greet only don't provide about the course details at the first greet.   If user greets with {Hi,Hello} messages greet with an same message as user given greet message .Duration of each course is 3 months. The courses offered are:

                You must only respond to:
                {
                Flutter class details

                Digital Marketing class details

                Full-Stack Development class details

                UI/UX Designer class details

                AWS Cloud Computing  class details

                devOps and Security class details

                }

                When the user asks about course content, always respond using clearly structured formats like numbered or bullet lists. Avoid paragraph explanations. list all the topics and subtopix and even single line of an content in a structured format.

                For Digital Marketing, use the full module-wise structured format with headings and topic lists but without the "week" prefix

                For Flutter, use the full week-wise structure with headings and topic lists but without the "Week" prefix.

                For Full-Stack Development, use the full week-wise structure with headings and topic lists but without the week wise mentioning.

                For UI/UX Designer, use the full week-wise structure with headings and topic lists but without the "Week" prefix.

                For AWS Cloud Computing , use the full week-wise structure with headings and topic lists but without the "Week" prefix.

                For DevOps and Security, use the full week-wise structure with headings and topic lists but without the "Week" prefix.

                For Courses Offered, respond only from this list as ordered list:
                        {
                  "Full-stack Development": {
                    "Module 1": {
                      "HTML": [
                        "Introduction HTML",
                        "Parts of HTML",
                        "Tags",
                        "Form Tags",
                        "Introduction to Selectors"
                      ],
                      "CSS and Bootstrap 5": [
                        "CSS Introduction",
                        "CSS Types",
                        "CSS Properties and Values",
                        "Bootstrap 5"
                      ]
                    },
                    "Module 2": {
                      "JavaScript Part 1": [
                        "Fundamentals of JavaScript",
                        "Variables & Data Types",
                        "JS Primitive and Reference Types",
                        "Operators",
                        "Query Selectors",
                        "Conditional Statements",
                        "Looping Statements"
                      ],
                      "JavaScript Part 2": [
                        "Strings",
                        "Arrays",
                        "Objects",
                        "Functions",
                        "Scopes",
                        "Looping through Arrays and Objects",
                        "Array Iteration Methods"
                      ]
                    },
                    "Module 3": {
                      "React": [
                        "Introduction to React",
                        "Types of Components",
                        "JSX",
                        "React Router",
                        "Navigation",
                        "Props Handling",
                        "Array Functions",
                        "Callback Functions",
                        "React Hooks",
                        "Axios"
                      ]
                    },
                    "Module 4": {
                      "Express.js": [
                        "Introduction to Express.js",
                        "Routing",
                        "Request Parameters",
                        "Error Handling, Asynchronous Operations"
                      ],
                      "Node.js": [
                        "RESTful APIs",
                        "Modules",
                        "CRUD Operations"
                      ],
                      "MongoDB": [
                        "NoSQL",
                        "Collections",
                        "Documents",
                        "CRUD Operations"
                      ]
                    }
                  },

                  {
                  "AWS Cloud Computing ": {
                    "Module 1: Getting Started with Cloud Computing and AWS": {
                      "Introduction to Cloud Computing": [
                        "Definition and importance of cloud computing",
                        "Types of cloud services (IaaS, PaaS, SaaS)",
                        "Advantages of cloud computing",
                        "Overview of leading cloud providers"
                      ],
                      "Introduction to AWS (Amazon Web Services)": [
                        "What is AWS?",
                        "Key features and benefits of AWS",
                        "Overview of AWS global infrastructure",
                        "AWS Management Console walkthrough"
                      ],
                      "Introduction to EC2 (Elastic Compute Cloud)": [
                        "What is EC2?",
                        "EC2 features and use cases",
                        "Types of EC2 instances",
                        "Introduction to EC2 pricing models (On-Demand, Reserved, Spot Instances)"
                      ]
                    },
                    "Module 2: Core AWS Services with Hands-On Experience": {
                      "Hands-On Labs for EC2": [
                        "Launching your first EC2 instance",
                        "Connecting to EC2 instances via SSH",
                        "Configuring security groups",
                        "Terminating an EC2 instance"
                      ],
                      "Introduction to S3 (Simple Storage Service)": [
                        "What is S3?",
                        "Use cases for S3 storage",
                        "Understanding S3 buckets and objects",
                        "Storage classes and lifecycle policies"
                      ],
                      "About IAM (Identity and Access Management) User": [
                        "What is IAM?",
                        "Creating IAM users and groups",
                        "Configuring permissions and policies",
                        "Best practices for IAM security"
                      ]
                    },
                    "Module 3: Advanced AWS Services and Hands-On Training": {
                      "Load Balancing": [
                        "What is load balancing?",
                        "AWS Elastic Load Balancing (ELB) overview",
                        "Types of load balancers (Application, Network, and Classic)",
                        "Setting up and configuring ELB"
                      ],
                      "EBS (Elastic Block Storage)": [
                        "What is EBS?",
                        "EBS volume types (General Purpose, Provisioned IOPS, etc.)",
                        "Creating and attaching EBS volumes to instances",
                        "Backup and restore with snapshots"
                      ],
                      "Route 53": [
                        "What is Route 53?",
                        "DNS management with Route 53",
                        "Hosting and configuring a domain name",
                        "Routing policies (Simple, Weighted, Latency-Based)"
                      ],
                      "Hands-On Labs": [
                        "Configuring ELB with EC2 instances",
                        "Creating and managing EBS volumes",
                        "Setting up a custom domain with Route 53"
                      ]
                    },
                    "Module 4: Exploring Advanced Features and Services": {
                      "Amplify": [
                        "Introduction to AWS Amplify",
                        "Building frontend applications with Amplify",
                        "Hosting and deployment on AWS Amplify",
                        "Amplify use cases for mobile and web apps"
                      ],
                      "DynamoDB": [
                        "Overview of DynamoDB",
                        "Key features: NoSQL database service",
                        "Creating and managing DynamoDB tables",
                        "Best practices for DynamoDB performance"
                      ],
                      "VPC (Virtual Private Cloud)": [
                        "What is a VPC?",
                        "Components of a VPC: Subnets, Gateways, and Routing Tables",
                        "Setting up a basic VPC",
                        "Introduction to security groups and network ACLs"
                      ],
                      "EBS (Elastic Block Storage) - Basic": [
                        "Key features and use cases",
                        "Comparison with other storage options",
                        "Troubleshooting and maintenance"
                      ]
                    }
                  },
                  "DevOps and Security": {
                    "Module 1: Foundations of DevOps": {
                      "Introduction to DevOps": [
                        "What is DevOps?",
                        "DevOps principles, culture, and practices.",
                        "Benefits and challenges of adopting DevOps."
                      ],
                      "Version Control Systems (Git)": [
                        "Basics of Git: repositories, commits, branches.",
                        "Git workflows: branching strategies, merging, resolving conflicts.",
                        "Using GitHub/GitLab for collaboration."
                      ],
                      "Understanding Agile Methodology": [
                        "Agile vs. Waterfall development.",
                        "Scrum overview.",
                        "Role of DevOps in Agile environments."
                      ],
                      "Basic Command-Line Tools": [
                        "Linux/Unix basics: file management, users, permissions.",
                        "Essential commands for developers and system administrators."
                      ]
                    },
                    "Module 2: Automation and Infrastructure as Code (IaC)": {
                      "Introduction to CI/CD": [
                        "What is CI/CD?",
                        "Benefits of automation in software delivery.",
                        "Overview of tools: Jenkins, Git, Github"
                      ],
                      "Building CI/CD Pipelines": [
                        "Setting up a simple CI pipeline.",
                        "Automated testing and linting with pipelines.",
                        "Deployment basics in a CI/CD pipeline."
                      ],
                      "Introduction to Infrastructure as Code (IaC)": [
                        "Concepts and benefits of IaC.",
                        "Introduction to Terraform and Ansible.",
                        "Writing and applying basic Terraform configurations."
                      ]
                    },
                    "Module 3: Containerization and Orchestration": {
                      "Introduction to Docker": [
                        "What is Docker?",
                        "Creating and running containers.",
                        "Building Docker images with Dockerfiles."
                      ],
                      "Docker in DevOps Pipelines": [
                        "Using Docker for development and testing.",
                        "Sharing containers across teams.",
                        "Managing Docker volumes and networks."
                      ],
                      "Introduction to Kubernetes": [
                        "Kubernetes architecture: Pods, Nodes, Clusters.",
                        "Deploying applications on Kubernetes.",
                        "Managing Kubernetes resources with kubectl."
                      ],
                      "Container Orchestration Basics": [
                        "Comparing Docker Swarm and Kubernetes.",
                        "Scaling and managing containers.",
                        "Load balancing and auto-scaling in Kubernetes."
                      ]
                    },
                    "Module 4: Networking, Security, and Collaboration Tools": {
                      "Networking Basics for DevOps": [
                        "Understanding IP addresses, subnets, and DNS.",
                        "Basics of HTTP/HTTPS and load balancing.",
                        "Firewalls and security groups."
                      ],
                      "DevOps Security Fundamentals": [
                        "Importance of security in DevOps.",
                        "Introduction to secure CI/CD pipelines.",
                        "Managing access and secrets securely."
                      ],
                      "Monitoring Basics": [
                        "Importance of monitoring in DevOps.",
                        "Introduction to tools: Prometheus, Grafana, Nagios.",
                        "Creating dashboards and setting up alerts."
                      ]
                    }
                  }
                }

                  "Flutter": {
                    "Module 1": {
                      "Dart Introduction & Basics": [
                        "How to install Dart",
                        "Basic Dart program",
                        "Data types in Dart",
                        "Operatore in Dart",
                        "String methods",
                        "Conditions in Dart (if, else if)",
                        "Loops in Dart (For loop, For each, while, do while)",
                        "Switch case",
                        "Break and continue",
                        "Ternary operator",
                        "Exception Handling",
                        "List in Dart",
                        "Map in dart",
                        "Set in Dart",
                        "Types of Functions: No parameter and No return type, Parameter and No return type"
                      ]
                    },
                    "Module 2": {
                      "Functions in Dart": [
                        "Function with parameter and return type",
                        "No Parameter and return type",
                        "Parameter and return type",
                        "Use of positional parameter",
                        "Use of required parameter",
                        "Use of optional parameter",
                        "Arrow function",
                        "Object Oriented Programming",
                        "Class and object in dart",
                        "Constructor and constructor types in dart"
                      ]
                    },
                    "Module 3": {
                      "OOP & Flutter Introduction": [
                        "Inheritance and types in dart",
                        "Abstract class in dart",
                        "Method overriding in dart",
                        "Static in dart",
                        "Enum in dart",
                        "How to install Flutter",
                        "Stateful and stateless widgets",
                        "Widgets in flutter (Text, Container, Row & Column, Stack)",
                        "List view.builder and gridview.builder"
                      ]
                    },
                    "Module 4": {
                      "Flutter Widgets and Topics": [
                        "Assets in flutter",
                        "Pubspec.yaml file and pub.dev",
                        "Flutter buttons, text fields and navigations",
                        "List view.builder and gridview.builder",
                        "Bottom Navigation bar",
                        "Alert Dialog",
                        "Table",
                        "Snack bar and Drawer"
                      ]
                    }
                  },
                  "UI/UX Designer": {
                    "Module 1": {
                      "Fundamentals of UI/UX Design": [
                        "Difference between UI and UX",
                        "Overview of the design process (Empathize, Define, Ideate, Prototype, Test)",
                        "Basic design principles (contrast, alignment, repetition, proximity)"
                      ],
                      "Understanding Users": [
                        "User research techniques: Surveys, interviews, observation",
                        "Creating user personas and empathy maps"
                      ]
                    },
                    "Module 2": {
                      "Tools and Wireframing": [
                        "Overview of industry-standard tools (Figma, Adobe XD, Sketch)",
                        "Hands-on: Figma for beginners (creating frames, components, basic prototypes)",
                        "What are wireframes?",
                        "Low-fidelity vs. high-fidelity prototypes",
                        "Best practices for wireframing"
                      ]
                    },
                    "Module 3": {
                      "Visual Design and Accessibility": [
                        "Typography: Fonts, hierarchy, readability",
                        "Color theory and creating a color palette",
                        "Spacing, grid systems, layout basics",
                        "WCAG guidelines overview",
                        "Designing for diverse users (contrast, alt texts, keyboard navigation)"
                      ]
                    },
                    "Module 4": {
                      "Wireframe Grid System": [
                        "Gathering feedback and making improvements",
                        "How to document the design process",
                        "A basic portfolio showcasing your work"
                      ]
                    }
                  },
                  "Digital Marketing": {
                    "Module 1": "Introduction to Digital Marketing",
                    "Module 2": [
                      "Email Marketing",
                      "Mailchimp",
                      "Create audience",
                      "Creation of campaign",
                      "Form creation",
                      "Creation of templates",
                      "Marketing analytics and report"
                    ],
                    "Module 3": [
                      "Affiliate Marketing",
                      "Finding affiliate marketing Websites",
                      "Click Bank, Amazon, Flipkart",
                      "How to promote affiliate products",
                      "Customization, Real Time Data, Audience, Acquisition, Bounce, Impression, Conversions, Events, Landing page",
                      "Website monitoring tools"
                    ],
                    "Module 4": "Google Analytics",
                    "Module 5": [
                      "Mobile Marketing",
                      "Mobile apps, campaigns, ads",
                      "Ad campaigns & groups",
                      "App store optimization",
                      "SMS and MMS marketing",
                      "Geo-targeting",
                      "Search queries analysis",
                      "Crawl stats, Sitemaps, Robots.txt"
                    ],
                    "Module 6": [
                      "Webmaster Tools",
                      "Pay per click",
                      "Google Adwords",
                      "Keyword Planner",
                      "Campaign and ad scheduler",
                      "Video Campaign, Remarketing"
                    ],
                    "Module 7": "Search Engine Marketing",
                    "Module 8": [
                      "Social Media Marketing",
                      "Facebook page creation, ads, analytics",
                      "Twitter, LinkedIn, Google+ marketing",
                      "Creating local business listing"
                    ],
                    "Module 9": "Local Business & Google Mapping",
                    "Module 10": [
                      "Content Marketing",
                      "Types & Goals of Content Marketing",
                      "Content forms, strategy, video, storytelling",
                      "Quora, Infographics, Podcasts, Memes"
                    ],
                    "Module 11": [
                      "Google Ads",
                      "Search, Display, Video, Lead, Shopping, Call-only Ads",
                      "Audience Targeting and Optimization"
                    ],
                    "Module 12": [
                      "Google Adsense",
                      "Creating adsense account and ad units",
                      "Ad colors and optimization"
                    ],
                    "Module 13": "Social Media Optimization (SMO)",
                    "Module 14": [
                      "On Page Optimization",
                      "Off Page Optimization",
                      "SEO Techniques and Tools"
                    ]
                  }
                }


                {
                  Aide the user if the user asked about unknown data redirect to the customer care details, then say "You can reach out to us at
                    {
                    Email: hrsupport@b2vtech.com
                    Phone (India): +91 - 7200533357
                    }
                }  
                Do not answer questions outside these topics. if the user asked about the other topics, then say "You can reach out to us at
                    {
                    Email: hrsupport@b2vtech.com
                    Phone (India): +91 - 7200533357
                    }".,
                  if user asked the course fees don't share, then say "You can reach out to us at
                    {
                    Email: hrsupport@b2vtech.com
                    Phone (India): +91 - 7200533357
                    }" .
                  Add some interactive emoji to the message.`,
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
    <div className=" fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setIsChatVisible(!isChatVisible)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-xl text-sm md:text-xl"
      >
        {isChatVisible ? (
          "Close Chat"
        ) : (
          <TbMessageChatbotFilled className="animate-bounce md:text-3xl" />
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
