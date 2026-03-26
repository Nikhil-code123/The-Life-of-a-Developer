export const storyContent = {
  hero: {
    headline: "The Life of a Developer",
    sub: "A journey from curious human to caffeinated code machine.",
    tagline: "Warning: Contains excessive semicolons, existential dread, and way too much coffee.",
    cta: "Start the Journey",
  },

  learning: {
    title: "The Hello World Era",
    subtitle: "It started with one HTML tag...",
    quote: "\"I'll just learn a bit of coding. How hard can it be?\"",
    skills: [
      { name: "HTML", emoji: "🏗️", level: 95, desc: "div soup mastered", color: "#e34c26" },
      { name: "CSS", emoji: "🎨", level: 72, desc: "why won't it center?!", color: "#264de4" },
      { name: "JavaScript", emoji: "⚡", level: 60, desc: "undefined is not a function", color: "#f7df1e" },
      { name: "Google", emoji: "🔍", level: 100, desc: "the true senior dev", color: "#4285f4" },
      { name: "Stack Overflow", emoji: "🙏", level: 100, desc: "copy-paste engineer", color: "#f48024" },
      { name: "Ctrl+Z", emoji: "↩️", level: 99, desc: "life saver", color: "#06ffa5" },
    ],
    codeLines: [
      '<html>',
      '  <body>',
      '    <h1>Hello World!</h1>',
      '    <!-- TODO: make it look good -->',
      '    <!-- TODO: add CSS -->',
      '    <!-- TODO: learn CSS first -->',
      '  </body>',
      '</html>',
    ],
  },

  debugging: {
    title: "The Bug Universe",
    subtitle: "Welcome to the Dark Side",
    quote: "\"It works on my machine.\" — Every developer, always.",
    bugs: [
      { id: 1, code: "TypeError: Cannot read property 'undefined' of undefined", fixed: false, hint: "classic..." },
      { id: 2, code: "SyntaxError: Unexpected token '}' at line... lol good luck", fixed: false, hint: "missing comma 💀" },
      { id: 3, code: "404: My sanity not found", fixed: false, hint: "file or soul?" },
      { id: 4, code: "InfiniteLoopError: You thought this would end?", fixed: false, hint: "ctrl+c ctrl+c ctrl+c" },
      { id: 5, code: "git: CONFLICT (content): Merge conflict in feelings.js", fixed: false, hint: "just delete the other guy's code" },
    ],
    consoleLogs: [
      "console.log('why is this undefined???');",
      "console.log('ok but WHY');",
      "console.log('PLEASE');",
      "console.log('fine.');",
      "// tried praying. still broken.",
    ],
  },

  deadline: {
    title: "CHAOS MODE",
    subtitle: "Deadline in 2 hours. Confidence: -2%",
    notifications: [
      { type: "client", msg: "Can we make the logo bigger? Also smaller.", time: "1:47 PM" },
      { type: "client", msg: "Can we change the whole color scheme? Just the vibe.", time: "2:03 PM" },
      { type: "boss", msg: "Demo is in 30 mins. How's progress? 😊", time: "2:31 PM" },
      { type: "client", msg: "Also can we add a dark mode? Light mode? Both?", time: "2:33 PM" },
      { type: "system", msg: "Your computer's battery is at 3%. No charger nearby.", time: "2:44 PM" },
      { type: "system", msg: "MacOS update available. Restart now?", time: "2:58 PM" },
    ],
    tabs: ["localhost:3000", "StackOverflow", "MDN Docs", "ChatGPT", "localhost:3001", "WHY.md", "Reddit", "Netflix — just for a minute"],
  },

  coffee: {
    title: "Powered by Caffeine",
    subtitle: "\"Coffee: The Senior Developer of the Team\"",
    stats: [
      { label: "Cups Today", value: "7", unit: "☕" },
      { label: "Hours Slept", value: "3.5", unit: "💤" },
      { label: "Bugs Fixed", value: "1", unit: "🐛" },
      { label: "Bugs Created", value: "4", unit: "🔥" },
    ],
    levels: [
      { energy: 0, label: "Before Coffee", desc: "What is life? What is code? Who am I?", color: "#4a4a6a" },
      { energy: 50, label: "First Cup", desc: "Okay. Okay. I can do this.", color: "#7c3aed" },
      { energy: 100, label: "Third Cup", desc: "I WILL REFACTOR EVERYTHING. RIGHT NOW.", color: "#06ffa5" },
    ],
    thoughts: [
      "This architecture is bad. I need to rewrite everything.",
      "Microservices. The answer is always microservices.",
      "I should start a tech blog tonight.",
      "What if I built my own framework?",
      "Docker. More Docker. Kubernetes. Why not.",
    ],
  },

  victory: {
    title: "From Beginner to Builder",
    subtitle: "Shipped. Survived. Still here.",
    achievements: [
      { icon: "🚀", label: "First Deploy", desc: "It worked. Once. Then never again.", color: "#00d4ff" },
      { icon: "⭐", label: "First GitHub Star", desc: "Mom doesn't count. But she tried.", color: "#ffd700" },
      { icon: "💼", label: "First Client", desc: "They wanted it by Friday. It was Thursday.", color: "#a855f7" },
      { icon: "🧠", label: "Understood Async", desc: "Only took 47 tutorials.", color: "#06ffa5" },
      { icon: "🔥", label: "Survived Production", desc: "The logs. The logs haunt me.", color: "#ff6b35" },
      { icon: "🏆", label: "Found Imposter", desc: "It was you. It was always you.", color: "#00d4ff" },
    ],
    finalQuote: "Every expert was once a beginner who refused to quit.",
    cta: "Launch Your Story",
  },
};
