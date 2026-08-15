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
  mockupImages?: string[];
  mockupImagesFramed?: boolean;
  caseStudy?: {
    overview: string;
    sections: CaseStudySection[];
  };
}

export const projects: Project[] = [
  // Web Design
  {
    id: 1,
    title: "Heal",
    description: "A mental wellness platform guiding users through a five-step healing journey — Discover, Reflect, Act, Track, Grow — with daily check-ins, an AI companion, and a calm, low-noise interface.",
    category: "Web Design",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-1-hand.png",
    mockupImages: ["/projects/project-1-inside.png"],
    caseStudy: {
      overview: "Heal is a mental wellness platform built around a five-step healing journey. Guided daily check-ins, a private journal with mood tagging, an AI companion, curated quotes, and challenge-based modules give users a structured, low-friction way to build emotional awareness over time — tracked through a calendar-based progress path.",
      sections: [
        {
          title: "Problem",
          description: "Most wellness apps present users with an open-ended blank slate — a journal with no prompts, a mood tracker with no context — which asks for more emotional labor than someone in a low moment can give.",
          points: [
            {
              title: "No Clear Starting Point",
              text: "Generic journaling and mood-tracking tools drop users into an empty screen with no guidance on where to begin."
            },
            {
              title: "Cluttered, Clinical Interfaces",
              text: "Existing apps lean heavily on charts and dense navigation, which reads as clinical rather than calming for someone seeking emotional support."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the product around a five-step journey — Discover, Reflect, Act, Track, Grow — so every screen has a clear next action instead of an open-ended blank state.",
          points: [
            {
              title: "Guided Onboarding",
              text: "A short, conversational intake (What brings you here? How have you been feeling? What would you like to feel more of?) personalizes the experience before the user ever sees an empty journal."
            },
            {
              title: "Structured Daily Check-Ins",
              text: "Simple, prompted questions replace the blank page, helping users name what they feel and why, one day at a time."
            },
            {
              title: "AI Companion & Modules",
              text: "A conversational AI companion (\"Talk\") and topic-based challenge modules give users something to act on between reflection sessions."
            },
            {
              title: "Quiet Mode",
              text: "A softer interface variant strips back visual noise for nightly reflection, keeping the calm-first design promise even in low-energy moments."
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "LangoFunk",
    description: "A language-learning app that turns streamed songs into interactive lessons — tap a lyric for an instant translation and build vocabulary one track at a time.",
    category: "Web Design",
    color: "from-zinc-900 to-zinc-800",
    mockupImage: "/projects/project-2-hand.png",
    mockupImages: ["/projects/project-2-inside.png"],
    caseStudy: {
      overview: "LangoFunk teaches vocabulary through music people already listen to. Songs pull in from Spotify or a global catalog with synced lyrics; tapping any word gives an instant, in-context translation, and an AI coach (\"Papa Funk\") adds practice and slang lessons on top.",
      sections: [
        {
          title: "Problem",
          description: "Traditional language apps ask users to sit down and drill flashcards in a dedicated study session — a habit that's easy to start and hard to keep up.",
          points: [
            {
              title: "Study Feels Like a Chore",
              text: "Flashcard and drill-based apps compete for a separate block of a user's time instead of living inside something they already do daily."
            },
            {
              title: "Vocabulary Without Context",
              text: "Word lists learned in isolation rarely stick, since there's no emotional or situational hook tying the word to a memory."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the experience around tapping into an existing habit — listening to music — so learning happens passively, one lyric at a time.",
          points: [
            {
              title: "Tap-to-Translate Lyrics",
              text: "Synced lyrics let users tap any unfamiliar word mid-song for an instant, in-context translation rather than an isolated flashcard."
            },
            {
              title: "Spotify-Connected Catalog",
              text: "Pulling in a user's own playlists (or a global chart) means the learning material is music they already chose to listen to."
            },
            {
              title: "New → Known Word Tracking",
              text: "Words visually progress from 'New' to 'Known' as users re-encounter them, giving a lightweight sense of mastery without a formal quiz."
            },
            {
              title: "Papa Funk AI Coach",
              text: "An AI language coach layers in slang, practice prompts, and personalized recommendations on top of the songs a user streams."
            }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "MyCareerAssessment",
    description: "A 25-question career readiness quiz that scores users across five dimensions and hands back a personalized action plan instead of a generic report.",
    category: "Web Design",
    color: "from-zinc-800 to-zinc-950",
    mockupImage: "/projects/project-3-hand.png",
    mockupImages: ["/projects/project-3-inside.png"],
    caseStudy: {
      overview: "MyCareerAssessment is a quiz-driven career readiness tool. Users answer 25 questions, get scored across five dimensions — Clarity, Ownership, Curiosity, Confidence, and Network & Visibility — and land on a personalized action plan instead of a generic \"here's your result\" page.",
      sections: [
        {
          title: "Problem",
          description: "Most online career quizzes end at a single score or label, leaving the user with a data point but no idea what to actually do next.",
          points: [
            {
              title: "Score Without a Next Step",
              text: "Generic assessments hand back a number or label and stop there, offering no concrete plan for what to do with the result."
            },
            {
              title: "One-Dimensional Scoring",
              text: "Career readiness collapses into a single axis in most tools, hiding whether the real gap is confidence, direction, or visibility."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the flow around five distinct dimensions and a results page built to feel like a personalized action plan rather than a static report.",
          points: [
            {
              title: "Five-Dimension Framework",
              text: "Clarity, Ownership, Curiosity, Confidence, and Network & Visibility are scored separately, so the result points to a specific gap rather than a single vague number."
            },
            {
              title: "25-Question Flow",
              text: "A short, focused question set keeps completion friction low while still covering all five dimensions in enough depth to score meaningfully."
            },
            {
              title: "Personalized Action Plan",
              text: "The results page translates each dimension score into a concrete next step, so the takeaway is a plan rather than just a label."
            }
          ]
        }
      ]
    }
  },
  // Mobile Applications
  {
    id: 5,
    title: "LittleBirdi",
    description: "A map-first local discovery app that scores cafes, bars, restaurants, and boutiques, and layers in a social feed of what friends have actually been to.",
    category: "Mobile Applications",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-5-hand.png",
    mockupImages: [
      "/projects/project-5-0.png",
      "/projects/project-5-1.png",
      "/projects/project-5-2.png",
    ],
    mockupImagesFramed: true,
    caseStudy: {
      overview: "LittleBirdi is a local discovery app built around a map: search a city, filter by category (cafe, bar, restaurant, boutique), and browse curated spots ranked by a proprietary Little Birdi Score. A social layer — followers, following, and a 'Social Buzz' photo feed — pulls in what people you follow have actually been eating and drinking.",
      sections: [
        {
          title: "Problem",
          description: "Most discovery apps force a choice: a map for finding what's nearby, or a feed for trusting what's actually good — rarely both in the same flow.",
          points: [
            {
              title: "Star Ratings Don't Differentiate",
              text: "A generic 4.2-star average doesn't tell you whether a spot is trending right now or just accumulating old reviews."
            },
            {
              title: "No Social Trust Signal",
              text: "Map-first apps show pins, not people — there's no way to see what places your own network is actually visiting."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the app around a single map-based discovery flow, layering a proprietary score and a friends' activity feed on top instead of bolting on a separate social tab.",
          points: [
            {
              title: "Category-Filtered Map Search",
              text: "Location search with one-tap category filters (Cafe, Bar, Restaurant, Boutique) keeps discovery anchored to where the user actually is."
            },
            {
              title: "Little Birdi Score & Trending",
              text: "Each curated spot carries a proprietary score plus a live 'trending now' count, giving a faster trust signal than a plain star rating."
            },
            {
              title: "Social Buzz Feed",
              text: "A profile-level feed of followers, following, and friends' own photos ties recommendations back to people the user actually trusts."
            }
          ]
        }
      ]
    }
  },
  {
    id: 6,
    title: "WatchDock",
    description: "A streaming aggregator that pulls movies and TV series into one hub, with a group quiz mode built for the age-old 'what should we watch' standoff.",
    category: "Mobile Applications",
    color: "from-zinc-900 to-zinc-800",
    mockupImage: "/projects/project-6-hand.png",
    mockupImages: [
      "/projects/project-6-onboarding.png",
      "/projects/project-6-hub.png",
      "/projects/project-6-theater.png",
    ],
    mockupImagesFramed: true,
    caseStudy: {
      overview: "WatchDock centralizes movies and TV series across streaming platforms and rentals into one searchable hub, organized into Trending, Watchlist, Hub, Theater, and For You tabs. A quiz-driven 'decide together' flow sits on top, turning group indecision into a quick pick.",
      sections: [
        {
          title: "Problem",
          description: "Content is scattered across separate apps per platform, and picking something to watch as a couple or group usually means scrolling every app back and forth until someone gives up.",
          points: [
            {
              title: "Content Scattered Across Apps",
              text: "Movies and shows live in separate platform apps, so there's no single place to search or browse everything available to a user."
            },
            {
              title: "Group Decisions Stall Out",
              text: "Deciding what to watch together usually means passing a phone back and forth with no structured way to land on a pick."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed a single hub for browsing across platforms, plus a lightweight quiz flow that turns picking a movie together into an actual feature instead of an afterthought.",
          points: [
            {
              title: "Unified Movie & Series Hub",
              text: "All Movies and All TV Series rails aggregate content in one searchable feed, with an 'all content' toggle to include rentals and other platforms."
            },
            {
              title: "Decide-Together Quiz",
              text: "An onboarding-level quiz flow lets a couple or group answer a few prompts and land on a genre or pick instead of scrolling indefinitely."
            },
            {
              title: "Theater Release Calendar",
              text: "A dated timeline of upcoming premieres keeps users ahead of what's landing next, not just what's already out."
            }
          ]
        }
      ]
    }
  },

  // AI Projects
  {
    id: 7,
    title: "Daisy SuperHuman Chat Bot",
    description: "",
    category: "AI Projects",
    color: "from-zinc-800 to-zinc-950",
  },
  {
    id: 8,
    title: "Onboarding Automation Workflow",
    description: "",
    category: "Agentic Workflow",
    color: "from-zinc-950 to-zinc-800",
  },
  {
    id: 9,
    title: "Asset Management Automation Workflow",
    description: "",
    category: "Agentic Workflow",
    color: "from-zinc-800 to-zinc-900",
  },
  {
    id: 10,
    title: "Project KickOff Automation Workflow",
    description: "",
    category: "Agentic Workflow",
    color: "from-zinc-900 to-zinc-800",
  },
  {
    id: 11,
    title: "Thumbnail Generator Automation Workflow",
    description: "",
    category: "Agentic Workflow",
    color: "from-zinc-800 to-zinc-950",
  },
];
