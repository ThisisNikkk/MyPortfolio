export interface CaseStudySection {
  title: string;
  description: string;
  points: {
    title: string;
    text: string;
  }[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
  mockupImage?: string;
  caseStudy?: {
    overview: string;
    sections: CaseStudySection[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "GlobalPay",
    description: "A complete overhaul of the merchant payment experience and transaction gateway architecture",
    category: "Product Designs",
    color: "from-zinc-800 to-zinc-900",
    caseStudy: {
      overview: "GlobalPay is a merchant payment experience and transaction gateway architecture designed to simplify high-volume transactions for global businesses.",
      sections: [
        {
          title: "Problem",
          description: "Merchants faced high transaction failure rates, slow onboarding processing times, and complex settlement reconciliations, leading to significant churn.",
          points: [
            {
              title: "High Churn Rates",
              text: "Confusing payment workflows led to cart abandonment and merchant frustration."
            },
            {
              title: "Integration Latency",
              text: "Onboarding a new merchant took up to 14 business days due to legacy KYC document processing."
            }
          ]
        },
        {
          title: "Research",
          description: "I combined qualitative and quantitative methods to understand the gap between the existing system and merchant needs.",
          points: [
            {
              title: "Online Merchant Surveys",
              text: "I gathered direct feedback from business owners to identify specific pain points in their daily payment processing workflows."
            },
            {
              title: "Stakeholder Documentation Analysis",
              text: "I analyzed internal performance reports to pinpoint technical bottlenecks and architectural failures in the previous application."
            },
            {
              title: "Competitive Benchmarking",
              text: "I conducted a UX and visual design analysis of competing payment apps to identify industry strengths and opportunities for differentiation."
            },
            {
              title: "User Consensus",
              text: "Research confirmed that while automation was necessary for scale, merchants would only adopt it if the experience felt natural and aligned with their specific brand voice."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed a scalable payment gateway that prioritizes technical reliability and user autonomy through a high-performance, modular interface.",
          points: [
            {
              title: "Progressive Disclosure Activation",
              text: "I implemented a step-by-step activation flow to prevent cognitive overload, ensuring a fast and intuitive onboarding process for new merchants."
            },
            {
              title: "Error Visibility and Navigation",
              text: "The interface provides clear feedback on user errors and simplified navigation, allowing merchants to troubleshoot and manage transactions with minimal friction."
            },
            {
              title: "Data-Driven Revenue Insights",
              text: "I integrated clear, understandable revenue graphs that provide businesses with immediate visibility into their financial performance and global reach."
            },
            {
              title: "Minimal Interaction Cost",
              text: "The redesign reduces the number of clicks required to achieve key goals, streamlining the daily operations for high-volume teams."
            },
            {
              title: "Scalable Design System",
              text: "I built the product using a modular design system in Figma, ensuring that new features can be plugged in seamlessly without requiring a complete redesign."
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Nova Dashboard",
    description: "Modern SaaS admin panel with comprehensive data visualization and user management.",
    category: "Product Designs",
    color: "from-zinc-900 to-zinc-800",
    caseStudy: {
      overview: "Nova Dashboard provides clean, real-time metrics and analytics tracking for modern SaaS operations, optimizing data density without sacrificing readability.",
      sections: [
        {
          title: "Problem",
          description: "SaaS administrators were overwhelmed by cluttered charts and poorly categorized alert metrics, leading to critical server events being missed.",
          points: [
            {
              title: "Cognitive Overhead",
              text: "Too many dashboard widgets displayed at once without clear semantic grouping."
            },
            {
              title: "Slow Alerting Response",
              text: "Crucial system threshold alerts were buried under routine monitoring events."
            }
          ]
        },
        {
          title: "Research",
          description: "Analyzing user behavior on dashboards revealed that cognitive overload was the main barrier to effective data monitoring.",
          points: [
            {
              title: "Heatmap Analytics",
              text: "Using usage heatmaps, I tracked where administrators spent most of their time and identified visual clutter that delayed decision-making."
            },
            {
              title: "User Interviews",
              text: "Conducted interviews with SaaS administrators to understand their daily monitoring routines and critical alert priorities."
            }
          ]
        },
        {
          title: "Solution",
          description: "An elegant, grid-based dashboard layout focusing on clean charts, consistent spacing, and progressive disclosure.",
          points: [
            {
              title: "Bento Grid Layout",
              text: "Structured information hierarchy using a modern bento-style card design to segment different metrics cleanly."
            },
            {
              title: "Accessible Data Visualization",
              text: "Designed customized charts using a restricted color palette to meet contrast criteria while keeping visual noise low."
            }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Webflow Portfolio",
    description: "High-performance creative portfolio with smooth WebGL scroll interactions.",
    category: "Web Designs",
    color: "from-zinc-800 to-zinc-950",
    caseStudy: {
      overview: "A premium, creative portfolio focusing on fluid performance and seamless transition effects built for modern web design agencies.",
      sections: [
        {
          title: "Problem",
          description: "Creative websites often compromise on initial page loads and performance metrics when incorporating complex scrolling animation designs.",
          points: [
            {
              title: "High Bounce Rates",
              text: "Slow loading states due to unoptimized 3D visual assets and uncompressed textures."
            },
            {
              title: "Jittery Transitions",
              text: "Animations felt choppy on medium-spec and mobile screen displays."
            }
          ]
        },
        {
          title: "Research",
          description: "Creative websites often suffer from poor performance due to unoptimized animations and heavy assets.",
          points: [
            {
              title: "Performance Auditing",
              text: "Audited existing creative sites to understand layout shifts and paint times on low-end mobile devices."
            },
            {
              title: "Interaction Studies",
              text: "Researched scroll behaviors to balance visual excitement (WebGL/Parallax) with usability and layout stability."
            }
          ]
        },
        {
          title: "Solution",
          description: "A highly optimized frontend experience combining smooth scroll libraries and hardware-accelerated transforms.",
          points: [
            {
              title: "Lenis Integration",
              text: "Implemented a smooth-scrolling wrapper that aligns with native scroll behaviors while providing customized acceleration."
            },
            {
              title: "Asset Optimization",
              text: "Leveraged modern video formats and WebP imagery combined with lazy loading to achieve a near-perfect Lighthouse score."
            }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: "Aura Mood Tracker",
    description: "Vibrant, interaction-heavy iOS app for tracking daily sentiment and energy levels.",
    category: "Vibe-Coded Projects",
    color: "from-zinc-950 to-zinc-800",
    caseStudy: {
      overview: "Aura is a vibrant mobile mood-tracking experience that uses generative colors and micro-interactions to make journal entry engaging.",
      sections: [
        {
          title: "Problem",
          description: "Existing mood trackers are dry, text-heavy, and feel like homework, resulting in very low user retention after the first week.",
          points: [
            {
              title: "Friction in Logging",
              text: "Requiring multiple form fields and text notes just to track a mood."
            },
            {
              title: "Sterile Interfaces",
              text: "Lacked visual interest or empathetic response styles."
            }
          ]
        },
        {
          title: "Research",
          description: "Investigated habit formation and emotional tracking app retention patterns.",
          points: [
            {
              title: "Retention Modeling",
              text: "Found that friction during journal onboarding is the primary reason why users abandon tracking apps within 3 days."
            },
            {
              title: "Vibe / Sentiment Testing",
              text: "Discovered that users respond better to warm, fluid color gradients that shift dynamically with their selected moods."
            }
          ]
        },
        {
          title: "Solution",
          description: "An interactive diary featuring fluid liquid-mesh designs, haptic responses, and swipe-based navigation.",
          points: [
            {
              title: "Generative Colors",
              text: "Built a dynamic shader overlay that morphs gradients according to the balance of daily journal entries."
            },
            {
              title: "Zero-Keyboard Input",
              text: "Replaced heavy typing tasks with interactive wheels and sliders, making mood logging take less than 5 seconds."
            }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    title: "AI Search Analytics",
    description: "Real-time React dashboard for AI agent query tracing and performance monitoring.",
    category: "React-Coded Projects",
    color: "from-zinc-800 to-zinc-900",
    caseStudy: {
      overview: "AI Search Analytics tracks agent decision trees, latency metrics, and API call logs to help engineers optimize model performance.",
      sections: [
        {
          title: "Problem",
          description: "ML developers lacked trace visibility into multi-step agent decisions, making query execution errors extremely difficult to diagnose.",
          points: [
            {
              title: "Opaque Agent Loops",
              text: "LLM routing decisions occurred in black-box environments with no temporal inspection."
            },
            {
              title: "Cluttered Raw Logs",
              text: "Flat text dumps was the only logging mechanism, forcing devs to read thousands of lines of output."
            }
          ]
        },
        {
          title: "Research",
          description: "Studied technical debugging practices in agentic systems.",
          points: [
            {
              title: "Developer Workflows",
              text: "Conducted contextual inquiries with ML engineers to trace how they diagnose execution loop failures."
            },
            {
              title: "Visualizing Complexity",
              text: "Noticed developers struggled to read flat JSON logs when looking at dynamic, branching LLM decision trees."
            }
          ]
        },
        {
          title: "Solution",
          description: "An intuitive tree visualization dashboard that shows real-time routing paths and performance bottlenecks.",
          points: [
            {
              title: "Dynamic Graph Renderers",
              text: "Implemented custom canvas nodes to render complex model logic paths without blocking UI responsiveness."
            },
            {
              title: "Timeline Scrubber",
              text: "Designed a temporal slider to let developers step backward and forward through LLM execution steps."
            }
          ]
        }
      ]
    }
  }
];
