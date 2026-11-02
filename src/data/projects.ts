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
  /**
   * Quick facts shown under the case-study title. All optional: set only
   * what's actually known, and the row hides whatever is missing.
   */
  year?: string;
  caseStudy?: {
    overview: string;
    sections: CaseStudySection[];
  };
}

export const projects: Project[] = [
  // Web Design
  {
    id: 13,
    title: "Court Doc Pro Website",
    description: "The marketing site for Court Doc Pro, an app that helps co-parents document incidents and see the patterns in them. Its job is to explain a heavy, unfamiliar product to stressed parents and get them to start a free trial.",
    category: "Web Design",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-13-hand.webp",
    mockupImages: ["/projects/project-13-inside.webp"],
    caseStudy: {
      overview: "Court Doc Pro helps parents dealing with a high-conflict co-parent keep a record of what keeps happening and how it affects their kids. The website has one job: take someone who feels like nobody believes them and walk them, on a single long page, to the 7-day free trial. On the way it explains the DATA method, shows the app and a sample report, and is upfront that the product is a documentation tool, not legal or mental health advice.",
      sections: [
        {
          title: "Problem",
          description: "The idea behind the product is abstract, and the people reading about it are tired and stressed. Nobody who has spent years screenshotting texts knows what a \"behavioral documentation framework\" is. The page had to make the value obvious fast, earn some trust, and never promise more than the product does.",
          points: [
            {
              title: "Hard to explain in a headline",
              text: "The whole point is that a pattern only shows up once incidents are connected. That's hard to say in one line, and harder still without an example to point at."
            },
            {
              title: "A wary audience",
              text: "A lot of visitors have already felt brushed off by family, lawyers or the court. Polished startup copy would read as one more thing that doesn't get it."
            },
            {
              title: "Trust has to come before the signup",
              text: "The site asks people to put private, painful records into an app. Privacy, who built it, and what it won't do all needed answers before the page asked for anything."
            },
            {
              title: "The real alternative is expensive",
              text: "Parents aren't comparing this to another app. They're comparing it to paying a professional $8,000 to $25,000 for 20 to 60 hours of work, and I wanted that to land without sounding like a sales pitch."
            }
          ]
        },
        {
          title: "Solution",
          description: "I laid the page out as one story that follows what the visitor has been living through. First they recognize their situation, then they see the method, then the proof. The free trial comes back at each point where someone might be ready for it.",
          points: [
            {
              title: "A hero that shows the result",
              text: "\"Document the Incidents. Reveal the Pattern.\" sits next to an app screen and a small pattern summary card. You see what you'd get before reading a single paragraph."
            },
            {
              title: "Their situation before our features",
              text: "Before any feature appears, there's a section listing things these parents know too well: the missed parenting time, the unanswered requests, the decisions made without them."
            },
            {
              title: "The DATA method in four letters",
              text: "Document, Analyze, Track, Articulate. Each letter gets one plain sentence, which makes the framework easy to remember."
            },
            {
              title: "A look inside the app",
              text: "A four-step walkthrough uses real app screens to show how an incident gets logged. Right after it come the nine tracked categories, and most parents will spot their own situation somewhere in that list."
            },
            {
              title: "A sample report",
              text: "The page shows a report instead of describing one: incidents in order, behaviors grouped by category, a short pattern summary and the impact on parenting time."
            },
            {
              title: "Trust first, then the ask",
              text: "The cost comparison, testimonials, the founders' 20 years in behavioral psychology and an FAQ on privacy, exports, cancelling and the no-legal-advice line all come before the last push to start the trial."
            }
          ]
        }
      ]
    }
  },
  {
    id: 1,
    title: "Heal",
    description: "A mental wellness platform built around a five-step journey (Discover, Reflect, Act, Track, Grow), with daily check-ins, an AI companion and a calm interface that stays out of the way.",
    category: "Web Design",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-1-hand.webp",
    mockupImages: ["/projects/project-1-inside.webp"],
    caseStudy: {
      overview: "Heal gives people a structured way to check in with themselves. There are guided daily check-ins, a private journal with mood tags, an AI companion, quotes, challenge-based modules, and a calendar that shows progress over the weeks.",
      sections: [
        {
          title: "Problem",
          description: "Most wellness apps open to a blank journal or a mood tracker with no context. That's a lot to ask of someone who's having a bad day.",
          points: [
            {
              title: "Nowhere to start",
              text: "You open the app and get an empty screen, with no hint of what to write or where to begin."
            },
            {
              title: "Interfaces that feel clinical",
              text: "Charts and dense menus make sense in a fitness app. For someone looking for emotional support, they feel cold."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed Heal around five steps, Discover, Reflect, Act, Track and Grow, so every screen has an obvious next thing to do.",
          points: [
            {
              title: "Onboarding that asks first",
              text: "A short intake asks what brought you here, how you've been feeling and what you'd like to feel more of. By the time you see the journal, the app already knows a bit about you."
            },
            {
              title: "Daily check-ins with prompts",
              text: "Simple questions replace the blank page and help people name what they feel and why, one day at a time."
            },
            {
              title: "An AI companion and modules",
              text: "\"Talk\" is an AI companion you can chat with, and the topic-based challenge modules give people something to do between reflections."
            },
            {
              title: "Quiet mode",
              text: "A softer version of the interface for reflecting at night, with most of the visual noise taken out."
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "LangoFunk",
    description: "A language-learning app built on music. Tap a word in the lyrics while the song plays, get the translation, and pick up vocabulary one track at a time.",
    category: "Web Design",
    color: "from-zinc-900 to-zinc-800",
    mockupImage: "/projects/project-2-hand.webp",
    mockupImages: ["/projects/project-2-inside.webp"],
    caseStudy: {
      overview: "LangoFunk teaches vocabulary through songs people already listen to. Tracks come from Spotify or a global catalog with synced lyrics. Tap any word for a translation in context, and an AI coach called Papa Funk adds practice and slang on top.",
      sections: [
        {
          title: "Problem",
          description: "Most language apps want you to sit down for a study session and drill flashcards. It's easy to start and hard to keep doing.",
          points: [
            {
              title: "Studying feels like homework",
              text: "Flashcard apps need their own slot in your day. They don't fit into anything you already do."
            },
            {
              title: "Words with no context",
              text: "Word lists learned on their own rarely stick, because nothing ties them to a moment or a feeling."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed LangoFunk around something people already do every day, listening to music, so the learning happens while the song plays.",
          points: [
            {
              title: "Tap a lyric to translate it",
              text: "Lyrics stay in sync with the song. Tap a word you don't know and you get the meaning right there, in the line it came from."
            },
            {
              title: "Your own Spotify music",
              text: "It pulls in your playlists or a global chart. You're learning from songs you picked yourself."
            },
            {
              title: "From new to known",
              text: "Words move from \"New\" to \"Known\" as you keep running into them, so you can see progress without sitting a quiz."
            },
            {
              title: "Papa Funk, the AI coach",
              text: "An AI coach adds slang, practice prompts and recommendations based on what you've been listening to."
            }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "MyCareerAssessment",
    description: "A 25-question career readiness quiz that scores you on five dimensions, then tells you what to work on next.",
    category: "Web Design",
    color: "from-zinc-800 to-zinc-950",
    mockupImage: "/projects/project-3-hand.webp",
    mockupImages: ["/projects/project-3-inside.webp"],
    caseStudy: {
      overview: "MyCareerAssessment is a career readiness quiz. You answer 25 questions, get a score for each of five dimensions (Clarity, Ownership, Curiosity, Confidence, and Network & Visibility), and end up with a plan for what to work on next.",
      sections: [
        {
          title: "Problem",
          description: "Most career quizzes end with one score or a label. You learn something about yourself and have no idea what to do with it.",
          points: [
            {
              title: "A score with nothing after it",
              text: "You get a number or a type, and that's where it ends."
            },
            {
              title: "Everything squashed into one number",
              text: "Readiness usually comes out as a single score, which hides whether the actual gap is confidence, direction or how visible you are."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the quiz around five separate dimensions and made the results page read like a plan someone wrote for you.",
          points: [
            {
              title: "Five dimensions, scored separately",
              text: "Clarity, Ownership, Curiosity, Confidence, and Network & Visibility each get their own score. That way the result points at a specific gap."
            },
            {
              title: "25 questions",
              text: "Short enough that people finish it, and long enough to score all five dimensions properly."
            },
            {
              title: "An action plan at the end",
              text: "Each dimension score turns into a concrete next step. You leave with something to actually do."
            }
          ]
        }
      ]
    }
  },
  // Mobile Applications
  {
    id: 14,
    title: "Court Doc Pro App",
    description: "An app for co-parents that turns one-off incidents into a running record, then uses AI to show which behaviors keep repeating and how often.",
    category: "Mobile Applications",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-14-hand.webp",
    mockupImages: [
      "/projects/project-14-0.webp",
      "/projects/project-14-1.webp",
      "/projects/project-14-2.webp",
    ],
    mockupImagesFramed: true,
    caseStudy: {
      overview: "Court Doc Pro is for parents dealing with a high-conflict co-parent, and it's built on a documentation framework from two behavioral experts with 20 years of experience. You log incidents as they happen and the app connects the related ones. Over time you get a record of which behaviors keep coming back, how often, and what they've cost, which exports as a report you can hand to a professional or a family court. It organizes what you record. It doesn't give legal or mental health advice, check whether events happened, or guess at anyone's intent.",
      sections: [
        {
          title: "Problem",
          description: "With a high-conflict co-parent it's rarely one incident that matters. It's the pattern. But a pattern only shows up once events are connected, and most parents are left with hundreds of messages and screenshots that don't explain much on their own.",
          points: [
            {
              title: "One incident is easy to dismiss",
              text: "A missed exchange or an ignored message can be written off as a misunderstanding. What gets lost is how often it happens and what it does to the kids over time."
            },
            {
              title: "The history lives in a phone",
              text: "Years of incidents sit in texts, screenshots and memory. Every time the story has to be told again, to family, a lawyer or a judge, the parent starts from zero."
            },
            {
              title: "Doing it properly costs a lot",
              text: "Spotting behaviors, connecting events, tracking how often they recur and writing up the impact is 20 to 60 hours of specialist work, and it can cost $8,000 to $25,000."
            },
            {
              title: "It doesn't end after one hearing",
              text: "A new agreement or parenting plan doesn't always stop the problems. When something happens again six months later, everything before it still matters."
            }
          ]
        },
        {
          title: "Solution",
          description: "I built the app around the DATA method (Document, Analyze, Track, Articulate), so each entry adds to a record that keeps growing. The more a parent documents, the clearer the pattern gets.",
          points: [
            {
              title: "A home screen with one main action",
              text: "\"Document an Incident\" is the big button. Under it are counts for incidents, categories, evidence and reports, plus recent activity tagged by category, so you can watch the record build up."
            },
            {
              title: "Logging an incident in four steps",
              text: "What happened, which category it fits, any evidence, then a behavioral analysis. A progress bar keeps you oriented, and the prompts ask for facts and observable behavior rather than a wall of text."
            },
            {
              title: "Nine behavior categories",
              text: "Parenting time, decision-making, communication, parenting responsibilities, financial responsibilities, basic needs, exchanges, the parent-child relationship, and pressure and intimidation. Every incident lands in one of them."
            },
            {
              title: "AI that finds the pattern",
              text: "The framework links related incidents and counts how often each behavior shows up. A line like \"exchanges didn't take place 3 times across 7 weeks\" comes out of the data, and nobody has to add it up by hand."
            },
            {
              title: "Reports for professionals and court",
              text: "One export pulls together the incidents in order, behaviors by category, the recurring patterns, charts and the documented impact, all written in plain, neutral language."
            },
            {
              title: "Private, and built to keep going",
              text: "Photos, PDFs and screenshots attach to each incident, and new entries add to the categories you already have rather than starting a new file. Nobody else sees any of it unless you export or share a report."
            }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    title: "LittleBirdi",
    description: "A map-first app for finding local cafes, bars, restaurants and boutiques. Locals earn status and perks for finding good spots, and venues get tools to bring people in and host events.",
    category: "Mobile Applications",
    color: "from-zinc-800 to-zinc-900",
    mockupImage: "/projects/project-5-hand.webp",
    mockupImages: [
      "/projects/project-5-0.webp",
      "/projects/project-5-1.webp",
      "/projects/project-5-2.webp",
    ],
    mockupImagesFramed: true,
    caseStudy: {
      overview: "LittleBirdi is a local discovery app built around a map. Search a city, filter by cafe, bar, restaurant or boutique, and browse spots ranked by the Little Birdi Score. The social side, with followers, following and a Social Buzz photo feed, shows where people you follow have actually been. On top of that sit Flock Rewards, which gives people status and perks for finding good places, and a set of tools that let venues sponsor challenges and host events.",
      sections: [
        {
          title: "Problem",
          description: "Most discovery apps make you pick between a map that shows what's nearby and a feed that tells you what's good. Hardly any do both. And neither the people who find great spots nor the spots themselves get anything back.",
          points: [
            {
              title: "Star ratings all look the same",
              text: "A 4.2 average doesn't tell you whether a place is popular right now or just sitting on old reviews."
            },
            {
              title: "Pins, but no people",
              text: "Map apps show you locations. They don't show you where your friends actually go."
            },
            {
              title: "Nothing for the people doing the work",
              text: "Locals who post, check in and find places early are the reason a discovery app is any good, and they get no status, perks or payoff for it."
            },
            {
              title: "Venues can't reach anyone",
              text: "Businesses get listed and that's it. They can't bring people in on a quiet night, build hype before opening, or fill an event from inside the app people use to decide where to go."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed the app around one map-based discovery flow, with the score and a friends' feed layered on top. Then I built two loops around it: Flock Rewards for the people who find good places, and tools for the venues themselves.",
          points: [
            {
              title: "Map search with category filters",
              text: "Search a location and filter with one tap: Cafe, Bar, Restaurant or Boutique. Discovery stays tied to where you are."
            },
            {
              title: "Little Birdi Score and trending",
              text: "Every curated spot has its own score and a live \"trending now\" count. It's a quicker read than a star rating."
            },
            {
              title: "Social Buzz feed",
              text: "Followers, following and your friends' photos in one feed. Recommendations come from people you know."
            },
            {
              title: "Flock Rewards, two separate games",
              text: "Everyday activity earns Feathers. You never spend them; they move you through five tiers from Hatchling to Birdi Elite and unlock soft-opening invites, gala entry and VIP access. Only growth actions and top content (nominating venues, referrals, posts that start a trend) earn Birdi Bucks, which turn into gift cards. The two never convert into each other, so status can be generous while the cash side stays under control."
            },
            {
              title: "Rewards that stay quiet",
              text: "Buttons don't show point values. Most rewards just happen after you do something, with a small pop and a tier progress bar. Growth actions get suggested where they make sense (\"Nominate this spot\"), and new tiers, badges and leaderboard jumps get celebrated when they happen. The one thing that's never hidden is how to cash out."
            },
            {
              title: "Fixing the empty map",
              text: "New users can import their food posts from Instagram in one tap, which fills the map from day one. Everyone who signs up also gets a Scout Pass, a guaranteed early spot at a soft opening, within their first 90 seconds."
            },
            {
              title: "Venues sign up and grow",
              text: "Businesses join the platform themselves and fund their own Birdi Bucks campaigns, like content challenges, slow-hour offers or buzz before an opening. It's a self-serve way to reach the most active locals."
            },
            {
              title: "Hosted events",
              text: "Venues post events such as soft openings, wine nights and galas. They show up in an Events feed with upcoming and past tabs, one-tap \"Add to my calendar\" and directions, so you can find a night out and commit to it in the same place."
            }
          ]
        }
      ]
    }
  },
  {
    id: 6,
    title: "WatchDock",
    description: "A streaming aggregator that puts movies and series from different platforms in one place, plus a group quiz for the nightly \"what should we watch\" argument.",
    category: "Mobile Applications",
    color: "from-zinc-900 to-zinc-800",
    mockupImage: "/projects/project-6-hand.webp",
    mockupImages: [
      "/projects/project-6-onboarding.webp",
      "/projects/project-6-hub.webp",
      "/projects/project-6-theater.webp",
    ],
    mockupImagesFramed: true,
    caseStudy: {
      overview: "WatchDock pulls movies and TV series from streaming platforms and rentals into one searchable app, split into Trending, Watchlist, Hub, Theater and For You. There's also a quiz you do together that gets a group from \"I don't mind, you pick\" to an actual choice.",
      sections: [
        {
          title: "Problem",
          description: "Everything is spread across a different app for each platform. Picking something as a couple or a group means flicking through all of them until someone gives up.",
          points: [
            {
              title: "Too many apps",
              text: "Movies and shows are split across platform apps, and there's no one place to search all of it."
            },
            {
              title: "Groups can't decide",
              text: "Choosing together usually means passing a phone around with no real way to settle on something."
            }
          ]
        },
        {
          title: "Solution",
          description: "I designed one hub for browsing across platforms, and a quick quiz that makes choosing together part of the app.",
          points: [
            {
              title: "One hub for movies and series",
              text: "All Movies and All TV Series rails sit in one searchable feed, with an \"all content\" toggle that adds rentals and other platforms."
            },
            {
              title: "A quiz for deciding together",
              text: "A couple or a group answers a few prompts and lands on a genre or a title, which beats scrolling forever."
            },
            {
              title: "Theater release calendar",
              text: "A dated list of upcoming premieres, for keeping track of what's coming next."
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
    description: "An AI sales rep for SolidAppMaker that chats like a person, gets to know a visitor's idea, and only suggests booking a call once they're ready.",
    category: "AI Projects",
    color: "from-zinc-800 to-zinc-950",
    mockupImage: "/projects/project-7-hand.webp",
    mockupImages: ["/projects/project-7-inside.webp"],
    caseStudy: {
      overview: "Daisy is the AI rep on SolidAppMaker's website, built to come across as part of the team rather than a bot. She starts the conversation normally, asks about the visitor's idea, and only moves toward a call once they're confident SolidAppMaker can help. Then she hands over a Calendly link and logs the conversation as a lead in SolidAppMaker's CRM.",
      sections: [
        {
          title: "Problem",
          description: "Off-the-shelf AI chat widgets sound scripted. And every time SolidAppMaker wanted to change Daisy's personality or limits, they had to pull in a developer, even though the people who talk to customers know best how she should sound.",
          points: [
            {
              title: "Bot language kills trust",
              text: "Default widgets say things like \"as an AI\" or \"virtual assistant\", and the moment a prospect reads that, they know they're talking to a script."
            },
            {
              title: "Forms pretending to be chats",
              text: "Most widgets want your name and email before they'll tell you anything useful. That's a form with a chat bubble on it."
            }
          ]
        },
        {
          title: "Research",
          description: "I didn't start from a blank page. The conversation design came out of a working reference tool and the client's own guidelines for how they talk to people.",
          points: [
            {
              title: "Starting from HubSpot chatflows",
              text: "I sketched the first conversation logic in a HubSpot chatflow so there was something working to react to. After that, the persona moved away from a fixed step-by-step script toward a looser conversation that follows context."
            },
            {
              title: "Writing down the client's voice",
              text: "SolidAppMaker's engagement rules, business ethics, and an MBTI and Enneagram profile for Daisy all went into the system prompt, so she sounds the way the company wants to sound."
            }
          ]
        },
        {
          title: "Solution",
          description: "I built Daisy to have a proper conversation first, and to ask for contact details only once the visitor wants to move forward.",
          points: [
            {
              title: "Strict language rules",
              text: "A set of rules bans phrases like \"as an AI\" and \"virtual assistant\" and spells out how Daisy steers away from off-topic or personal questions. She stays in character the whole time."
            },
            {
              title: "Talk first, qualify later",
              text: "Daisy starts by asking about the visitor's idea and explaining how SolidAppMaker could help. The name-and-email part comes much later."
            },
            {
              title: "Calendly when they're ready",
              text: "Once the visitor is interested, Daisy asks for a name and email and sends a Calendly link, so they pick a time themselves instead of going back and forth in the chat."
            },
            {
              title: "Leads go straight into the CRM",
              text: "When the conversation ends, it's saved in SolidAppMaker's CRM as a new lead. Nobody has to copy anything across."
            }
          ]
        }
      ]
    }
  },
  {
    id: 12,
    title: "PrepAI",
    description: "An AI mock interview coach. Practice for a specific company and role, then get a score out of 100 and a written breakdown of what to work on.",
    category: "AI Projects",
    color: "from-zinc-900 to-zinc-800",
    mockupImage: "/projects/project-12-hand.webp",
    mockupImages: ["/projects/project-12-inside.webp"],
    year: "2024–2025",
    caseStudy: {
      overview: "PrepAI is an interview practice platform. You run a mock interview for a specific company and role, and at the end you get a score out of 100 with a written breakdown of what went well and what didn't. A dashboard keeps your past interviews so you can see whether you're getting better.",
      sections: [
        {
          title: "Problem",
          description: "Generic interview prep doesn't change with the role you're going for, and practice sessions usually end with a vague feeling about how it went.",
          points: [
            {
              title: "Generic practice for a specific interview",
              text: "Question banks and interview PDFs are the same for everyone. What you practice rarely matches what you get asked."
            },
            {
              title: "No honest read on how you did",
              text: "Without a score or a written breakdown, you walk away thinking \"it went fine\" with no idea what to fix."
            }
          ]
        },
        {
          title: "Solution",
          description: "I built the practice flow around interviews for a specific role, and every one ends with a score and a breakdown rather than a bare transcript.",
          points: [
            {
              title: "Interviews tagged by company and role",
              text: "Each session is tied to a company and role and tagged Mixed or Technical. The questions match what that interview would actually cover."
            },
            {
              title: "A score as soon as you finish",
              text: "Every interview ends with an AI score out of 100 and notes on what you did well and where you fell short."
            },
            {
              title: "Feedback that knows the stack",
              text: "Each interview card shows the stack it covered, and the feedback sticks to the tools that role uses."
            },
            {
              title: "A history of your attempts",
              text: "Past interviews stay on a dashboard with their dates, scores and tags, so you can tell whether you're improving."
            }
          ]
        }
      ]
    }
  },
];
