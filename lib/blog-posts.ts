export type Section =
    | { type: "lead"; text: string }
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string; attribution?: string };

export interface Post {
    slug: string;
    title: string;
    date: string;
    readTime: number;
    tag: string;
    featured: boolean;
    excerpt: string;
    content: Section[];
}

export const POSTS: Post[] = [
    {
        slug: "how-is-it-like-to-go-fastlane",
        title: "How is it like to go fastlane?",
        date: "May 6, 2025",
        readTime: 5,
        tag: "Life",
        featured: true,
        excerpt:
            "Most people optimize for safety. I optimize for ownership. Here's what that actually looks and feels like, day to day.",
        content: [
            {
                type: "lead",
                text: "Most people optimize for safety. I optimize for ownership.",
            },
            {
                type: "p",
                text: 'The first time I truly understood the word "fastlane" it wasn\'t in a business book — it was from watching a friend close a deal while I was clocking in for a shift. That contrast stayed with me for years.',
            },
            {
                type: "p",
                text: "The fastlane is not about speed for its own sake. It's not hustle culture or grinding 80-hour weeks to prove something to yourself. It's a different orientation entirely. It's about building systems instead of trading hours. It's about owning the output of your work, not just the process.",
            },
            {
                type: "h2",
                text: "What it actually feels like",
            },
            {
                type: "p",
                text: "Uncomfortable. At first, mostly uncomfortable.",
            },
            {
                type: "p",
                text: "You don't have a boss to blame when things go wrong. You don't have a salary to cushion a slow month. You don't have a team absorbing your mistakes. Everything is yours — the wins, the errors, the decisions.",
            },
            {
                type: "p",
                text: "But there's a different kind of discomfort in the slowlane that I couldn't stop noticing: the discomfort of knowing your ceiling. Of watching the calendar fill with obligations you didn't choose. Of building something that will never fully belong to you.",
            },
            {
                type: "h2",
                text: "The trade",
            },
            {
                type: "p",
                text: "Going fastlane means trading a certain kind of security for a different kind of freedom. Your mornings belong to you. The work you do compounds — a tool you built at 22 can still be generating value at 32. The leverage is real, and so is the exposure.",
            },
            {
                type: "quote",
                text: "I'd rather struggle on my own terms than succeed inside someone else's framework.",
            },
            {
                type: "p",
                text: "It also means uncertainty is your constant companion. You have to build tolerance for ambiguity the same way athletes build physical endurance — deliberately, over time, and with the expectation that it will sometimes hurt.",
            },
            {
                type: "h2",
                text: "What nobody tells you",
            },
            {
                type: "p",
                text: "The fastlane feels lonely before it feels good. You'll have months where you question everything. Where the slowlane looks genuinely attractive because at least there's clarity in it — a paycheck, a role, a ladder.",
            },
            {
                type: "p",
                text: "The people in your life won't always understand. \"But don't you want a stable job?\" is a sentence I've heard in many forms. What they're really asking is: don't you want what I have? And the honest answer is: I want what's possible, not what's predictable.",
            },
            {
                type: "h2",
                text: "Is it worth it?",
            },
            {
                type: "p",
                text: "For me — yes. Not because it's glamorous, but because the alternative is a life lived inside someone else's constraints. The fastlane isn't a destination. It's a way of moving through the world — with your eyes open, and your hands on the wheel.",
            },
        ],
    },
    {
        slug: "build-your-own-ideas-with-structure",
        title: "Build your own ideas with structure",
        date: "April 21, 2025",
        readTime: 4,
        tag: "Building",
        featured: true,
        excerpt:
            "An idea without structure is just a thought. Here's how I consistently move from the spark of an idea to something that actually exists.",
        content: [
            {
                type: "lead",
                text: "An idea without structure is just a thought. Structure is what turns thinking into building.",
            },
            {
                type: "p",
                text: "I have notebooks full of ideas I never shipped. Most people do. The problem isn't ideas — they're abundant. The problem is the gap between having an idea and the first version of it existing in the world. That gap is where most good things die.",
            },
            {
                type: "h2",
                text: "Why structure doesn't kill creativity",
            },
            {
                type: "p",
                text: "There's a common belief that structure is the enemy of spontaneity. That if you plan too much, you lose the spark. I've found the opposite to be true.",
            },
            {
                type: "p",
                text: "Structure is what makes creativity sustainable. A blank canvas is terrifying. A framework with defined edges is where real work happens. When I started treating ideas like projects — with a clear scope, a defined first step, and an explicit list of what I wouldn't include — more of them actually shipped.",
            },
            {
                type: "h2",
                text: "The three questions",
            },
            {
                type: "p",
                text: "Every idea I work on now passes through three questions before I write a single line of code or design a single screen:",
            },
            {
                type: "quote",
                text: "What is the simplest version of this that would prove the idea works?",
            },
            {
                type: "p",
                text: "Who is this actually for, and what do they need to feel in the first 30 seconds of using it? And: what is the one constraint that will force me to make real decisions instead of deferring them?",
            },
            {
                type: "p",
                text: "These aren't restrictions. They're handles. They give you something to hold onto when the idea starts to feel overwhelming — which it always does, somewhere in the middle.",
            },
            {
                type: "h2",
                text: "Shipping ugly first",
            },
            {
                type: "p",
                text: "The hardest part is not the building. It's the permission you have to give yourself to ship something imperfect.",
            },
            {
                type: "p",
                text: "Structure helps here too. If you've defined what \"done\" looks like — not perfect, just done — you have a finish line. Without one, you'll keep adding features and adjusting details until the project quietly dies of your own perfectionism. I've killed more projects that way than through any external obstacle.",
            },
            {
                type: "h2",
                text: "A system, not a method",
            },
            {
                type: "p",
                text: "I don't think there's one right way to structure ideas. What matters is that you have something — a template, a ritual, a document — that consistently moves you from idea to artifact.",
            },
            {
                type: "p",
                text: "Mine involves four fields: what the thing is, who it's for, what the first working version looks like, and a date by which I'll decide if it's worth continuing. Four fields. But they've shipped more ideas than any planning tool I've ever tried.",
            },
            {
                type: "p",
                text: "The idea isn't the thing. The thing is the thing.",
            },
        ],
    },
];
