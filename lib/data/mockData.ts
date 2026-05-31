import type { Conversation } from "@/lib/types";

export const conversations: Conversation[] = [
  {
    id: "conv_001",
    platform: "whatsapp",
    contactName: "Rahul Mehta",
    businessType: "Wedding Photographer",
    status: "hot",
    daysSinceLastReply: 3,
    avatar: "RM",
    leadValue: "₹50k",
    leadScore: 9,
    urgency: "Critical",
    nextBestAction: "Send December wedding packages with a 50k option and ask for event dates to block availability.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 3
    },
    dealSummary: "Two-day Pune wedding enquiry with stated 50k budget and December timeline.",
    contextualReplies: [
      "Rahul, for a two-day December wedding in Pune, I can fit your 50k budget with a photo-only package and an add-on video option. Share the exact dates once, and I will send the package breakup and availability today.",
      "Rahul, your sister's December Pune wedding can work within 50k if we keep coverage focused on the main ceremony and reception. Send me the two dates and venue area, and I will block availability while sharing the package sheet.",
      "Rahul, I have a 50k wedding package that covers two days with edited photos, highlights, and delivery timeline included. If your December dates are still open, send them now and I will confirm availability before the slot goes."
    ],
    messages: [
      {
        id: "msg_001",
        role: "customer",
        content: "Hi Rahul, saw your wedding photos from Jaipur. Very nice work yaar.",
        timestamp: "Mon 9:12 AM"
      },
      {
        id: "msg_002",
        role: "business",
        content: "Thanks so much! Glad you liked them. Is this for your wedding or someone in the family?",
        timestamp: "Mon 9:18 AM"
      },
      {
        id: "msg_003",
        role: "customer",
        content: "For my sister. Wedding is in December in Pune, two days function.",
        timestamp: "Mon 9:31 AM"
      },
      {
        id: "msg_004",
        role: "business",
        content: "Lovely. I do photo and video both. I can share package options based on dates and coverage.",
        timestamp: "Mon 10:04 AM"
      },
      {
        id: "msg_005",
        role: "customer",
        content: "please send your December packages, budget is around 50k",
        timestamp: "3 days ago"
      }
    ]
  },
  {
    id: "conv_002",
    platform: "whatsapp",
    contactName: "Priya Sharma",
    businessType: "Beauty Salon",
    status: "pending",
    daysSinceLastReply: 1,
    avatar: "PS",
    leadValue: "₹2.5k",
    leadScore: 6,
    urgency: "Medium",
    nextBestAction: "Confirm Saturday 5 PM availability and ask for skin sensitivity details before booking.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 1
    },
    dealSummary: "Salon booking request for a Saturday facial slot.",
    contextualReplies: [
      "Priya, Saturday around 5 PM is available for the mild hydrating facial. I can hold the slot for you now; please confirm if you have any product allergies or active skin irritation.",
      "Priya, I can book you for Saturday at 5 PM for the sensitive-skin facial. Please share your phone number and any ingredients your skin reacts to.",
      "Priya, the Saturday 5 PM slot is open. I will reserve it for the mild hydrating facial once you confirm your contact number."
    ],
    messages: [
      {
        id: "msg_006",
        role: "customer",
        content: "Hello, do you have facial service for sensitive skin?",
        timestamp: "Yesterday 11:20 AM"
      },
      {
        id: "msg_007",
        role: "business",
        content: "Yes Priya, we have a mild hydrating facial. It takes around 60 minutes.",
        timestamp: "Yesterday 11:33 AM"
      },
      {
        id: "msg_008",
        role: "customer",
        content: "Nice, can you book one Saturday facial slot for me around 5 pm?",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "conv_003",
    platform: "instagram",
    contactName: "Ananya Joshi",
    businessType: "Handmade Jewellery",
    status: "hot",
    daysSinceLastReply: 2,
    avatar: "AJ",
    leadValue: "₹4.8k",
    leadScore: 8,
    urgency: "High",
    nextBestAction: "Confirm pearl choker price with weekend delivery to Andheri and request payment confirmation.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 2
    },
    dealSummary: "Ready-to-buy Instagram lead asking total price and delivery for a specific product.",
    contextualReplies: [
      "Ananya, the pearl choker is available and weekend delivery to Lokhandwala works. Total is ₹4,800 including delivery; I can pack this piece for you once payment is confirmed.",
      "Ananya, I can deliver the pearl choker to Andheri West by this weekend. The total comes to ₹4,800 with delivery, and I can reserve the exact piece from the reel for you.",
      "Ananya, Lokhandwala delivery by the weekend is possible. The pearl choker total is ₹4,800 including delivery; should I share the payment link and reserve it under your name?"
    ],
    messages: [
      {
        id: "msg_009",
        role: "customer",
        content: "Hey, is the pearl choker from your latest reel available?",
        timestamp: "Tue 4:08 PM"
      },
      {
        id: "msg_010",
        role: "business",
        content: "Hi Ananya, yes it is available. It is handmade with freshwater pearls.",
        timestamp: "Tue 4:21 PM"
      },
      {
        id: "msg_011",
        role: "customer",
        content: "Super cute. Can you deliver to Andheri by this weekend?",
        timestamp: "Tue 4:29 PM"
      },
      {
        id: "msg_012",
        role: "customer",
        content: "Address is Lokhandwala, Andheri West. Please tell total price with delivery.",
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "conv_004",
    platform: "instagram",
    contactName: "Karan Patel",
    businessType: "Graphic Design",
    status: "pending",
    daysSinceLastReply: 1,
    avatar: "KP",
    leadValue: "₹18k",
    leadScore: 7,
    urgency: "High",
    nextBestAction: "Send logo package quote and ask for delivery deadline.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: true,
      timelineMentioned: false,
      delayedDays: 1
    },
    dealSummary: "Startup logo enquiry with brief shared and explicit quote request.",
    contextualReplies: [
      "Karan, for the snack brand logo, my starter package is ₹18k with 3 concepts, 2 revision rounds, and final files for packaging and social. Share your launch deadline and I will map the delivery timeline.",
      "Karan, based on the clean and fun direction, the logo project would start at ₹18k including concept exploration and final brand files. When do you need the first concepts?",
      "Karan, I can quote ₹18k for the logo with 3 routes and final files for print plus digital. Send the launch date and I will confirm if I can fit the timeline."
    ],
    messages: [
      {
        id: "msg_013",
        role: "customer",
        content: "Hi, I am starting a small D2C snack brand and need a logo.",
        timestamp: "Yesterday 6:12 PM"
      },
      {
        id: "msg_014",
        role: "business",
        content: "Sounds exciting. Please share the brand name, target audience, and any style references.",
        timestamp: "Yesterday 6:40 PM"
      },
      {
        id: "msg_015",
        role: "customer",
        content: "Sharing brand brief now. We want a clean fun logo for a startup snack brand. What will be your quote?",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "conv_005",
    platform: "email",
    contactName: "Meera Nair",
    businessType: "Home Tiffin Service",
    status: "hot",
    daysSinceLastReply: 4,
    avatar: "MN",
    leadValue: "₹72k/mo",
    leadScore: 10,
    urgency: "Critical",
    nextBestAction: "Send weekly menu, bulk pricing for 20 employees, and delivery commitment before lunch deadline.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 4
    },
    dealSummary: "Recurring office lunch lead for 20 employees with delivery timing requirement.",
    contextualReplies: [
      "Meera, for 20 employees we can do a weekly veg lunch plan at ₹180 per meal, with Friday chicken curry as an optional add-on. Delivery before 12:45 PM in Koramangala is workable; I can send the weekly menu and trial-day options now.",
      "Meera, your 20-person office lunch plan would be around ₹72k/month for weekday veg meals, with Friday non-veg available as an add-on. I can commit to delivery before 12:45 PM and share this week's menu today.",
      "Meera, we can handle the Koramangala office order for 20 people with delivery before 12:45 PM. The bulk plan starts at ₹180 per veg meal, and I can send a weekly menu plus one-day trial option."
    ],
    messages: [
      {
        id: "msg_016",
        role: "customer",
        content: "Hi, we are looking for daily lunch tiffins for our office team in Koramangala.",
        timestamp: "Thu 10:05 AM"
      },
      {
        id: "msg_017",
        role: "business",
        content: "Hi Meera, happy to help. We do home-style veg and non-veg meals with weekly plans.",
        timestamp: "Thu 10:28 AM"
      },
      {
        id: "msg_018",
        role: "customer",
        content: "Good. Mostly veg, but Friday non-veg option would be nice.",
        timestamp: "Thu 11:02 AM"
      },
      {
        id: "msg_019",
        role: "business",
        content: "That works. We can keep veg standard and add Friday chicken curry as optional.",
        timestamp: "Thu 11:26 AM"
      },
      {
        id: "msg_020",
        role: "customer",
        content: "Delivery should reach before 12:45 because our lunch break starts at 1.",
        timestamp: "Thu 12:10 PM"
      },
      {
        id: "msg_021",
        role: "customer",
        content: "Can you send weekly menu and bulk pricing for 20 employees?",
        timestamp: "4 days ago"
      }
    ]
  },
  {
    id: "conv_006",
    platform: "email",
    contactName: "Rohan Desai",
    businessType: "Yoga Instructor",
    status: "cold",
    daysSinceLastReply: 6,
    avatar: "RD",
    leadValue: "₹3k/mo",
    leadScore: 3,
    urgency: "Low",
    nextBestAction: "Send schedule and fee, but prioritize hotter revenue opportunities first.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: false,
      timelineMentioned: false,
      delayedDays: 6
    },
    dealSummary: "General online class enquiry with no explicit urgency or budget.",
    contextualReplies: [
      "Rohan, beginner evening classes run Monday, Wednesday, and Friday at 7 PM. The monthly fee is ₹3,000, and you can join one trial class before enrolling.",
      "Rohan, I have beginner-friendly online yoga classes in the evening at 7 PM on weekdays. Monthly fees are ₹3,000, with one trial session available.",
      "Rohan, the online beginner batch runs three evenings a week at 7 PM. The monthly fee is ₹3,000; I can share the joining link for a trial class."
    ],
    messages: [
      {
        id: "msg_022",
        role: "customer",
        content: "Hi Rohan, do you conduct online yoga classes for beginners in the evening?",
        timestamp: "6 days ago"
      },
      {
        id: "msg_023",
        role: "customer",
        content: "Please share the online class schedule and monthly fee when possible.",
        timestamp: "6 days ago"
      }
    ]
  },
  {
    id: "gmail_001",
    platform: "email",
    contactName: "Sneha Kulkarni",
    businessType: "Wedding Planner",
    status: "hot",
    daysSinceLastReply: 2,
    avatar: "SK",
    leadValue: "₹1.2L",
    leadScore: 9,
    urgency: "Critical",
    nextBestAction: "Send full-day coverage quote and ask for venue confirmation before her shortlist closes.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 2
    },
    dealSummary: "High-value wedding planning inquiry — budget confirmed, February deadline, shortlisting vendors this week.",
    contextualReplies: [
      "Sneha, for a February wedding in Pune with a 1.2L budget I can put together a tailored day-of coordination package with full vendor liaison. Can you confirm the venue so I can send the detailed quote today?",
      "Sneha, your February timeline works perfectly. I have packages starting at ₹85k for coordination-only and ₹1.2L for end-to-end planning. I'd love to schedule a 20-minute call this week — are you free Thursday or Friday?",
      "Sneha, based on your email I believe we'd be a great fit. Let me send over a detailed scope document and pricing for your February wedding. Could you confirm the expected guest count and venue city?"
    ],
    messages: [
      {
        id: "gmail_001_m1",
        role: "customer",
        content: "Hello, I came across your profile on WeddingWire and I'm very impressed with your portfolio. We're planning a wedding for February next year in Pune — around 300 guests. Our budget for planning and coordination is approximately ₹1.2 lakhs. Could you send your packages and availability?",
        timestamp: "Thu 10:22 AM"
      },
      {
        id: "gmail_001_m2",
        role: "business",
        content: "Hi Sneha! Thank you for reaching out — a February Pune wedding sounds beautiful. I'd love to share our packages. Could you tell me a bit more about the venue you have in mind?",
        timestamp: "Thu 11:05 AM"
      },
      {
        id: "gmail_001_m3",
        role: "customer",
        content: "We're looking at Mayfair Banquets or The Orchid. Still finalising. We are shortlisting vendors this week so a quick response would really help.",
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "gmail_002",
    platform: "email",
    contactName: "Arjun Mehrotra",
    businessType: "Digital Agency",
    status: "hot",
    daysSinceLastReply: 1,
    avatar: "AM",
    leadValue: "₹80k",
    leadScore: 8,
    urgency: "High",
    nextBestAction: "Send e-commerce SEO proposal with 3-month roadmap and pricing tiers before the Monday deadline.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 1
    },
    dealSummary: "E-commerce brand needs SEO + content strategy, budget shared, wants proposal before Monday.",
    contextualReplies: [
      "Arjun, I'll have a full SEO + content proposal over to you by Sunday. Our e-commerce packages start at ₹45k/month with a 3-month minimum. Can I get access to your current GA4 and Search Console to include an audit in the proposal?",
      "Arjun, for a D2C fashion brand your size, I'd recommend starting with technical SEO cleanup and a content calendar targeting buyer-intent keywords. I can have a scoped proposal to you by Saturday — does ₹60-80k/month fit your current planning range?",
      "Arjun, noted on the Monday deadline — I'll prioritise this. Could you share your top 3 competitor domains? That will help me include a gap analysis in the proposal and make the case for where we can win fastest."
    ],
    messages: [
      {
        id: "gmail_002_m1",
        role: "customer",
        content: "Hi, we run a D2C fashion brand doing about ₹40L/month in revenue. We're looking for an agency to handle our SEO and content strategy. Budget is around ₹80k/month. We need a proposal before Monday as we're making a decision next week.",
        timestamp: "Yesterday 2:14 PM"
      },
      {
        id: "gmail_002_m2",
        role: "business",
        content: "Hi Arjun, that's great timing — we specialise in exactly this. I'd love to put together a tailored proposal. Can you share your website URL and your current monthly organic traffic?",
        timestamp: "Yesterday 3:40 PM"
      },
      {
        id: "gmail_002_m3",
        role: "customer",
        content: "Website is ardenclothing.in. We get about 12k organic visits/month but our conversion rate is poor. We need someone who can fix the funnel. Awaiting your proposal.",
        timestamp: "1 day ago"
      }
    ]
  },
  {
    id: "gmail_003",
    platform: "email",
    contactName: "Divya Menon",
    businessType: "Interior Designer",
    status: "pending",
    daysSinceLastReply: 3,
    avatar: "DM",
    leadValue: "₹3.5L",
    leadScore: 7,
    urgency: "High",
    nextBestAction: "Share 3D render samples and a scoped quote for a 2BHK full-home interior with possession in April.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 3
    },
    dealSummary: "Full-home 2BHK interior project, possession in April, budget around ₹3.5L, actively comparing designers.",
    contextualReplies: [
      "Divya, for a 2BHK full-home interior with April possession, I'd suggest we start with a site visit in the next two weeks to lock in materials and timelines. Our 2BHK packages start at ₹2.8L and go up to ₹4.2L depending on finish level. Shall I block a Saturday slot?",
      "Divya, thank you for your patience — I'd love to share some recent 2BHK projects we've completed in a similar style. Can I ask what aesthetic you're going for — Scandinavian minimal, warm contemporary, or something else?",
      "Divya, April possession is workable if we finalise scope by February end. I'll send over a detailed quote and some mood boards by tomorrow. Would Sobha City be similar in size to yours so I can benchmark the numbers?"
    ],
    messages: [
      {
        id: "gmail_003_m1",
        role: "customer",
        content: "Hello, I am getting possession of my 2BHK in Whitefield, Bangalore in April. I want to do a complete interior — modular kitchen, wardrobes, false ceiling, and living room. Budget is around ₹3 to 3.5 lakhs. Are you available and can you share your portfolio for similar projects?",
        timestamp: "Mon 4:55 PM"
      },
      {
        id: "gmail_003_m2",
        role: "business",
        content: "Hi Divya! Congratulations on the new home. We've done several 2BHKs in Whitefield in that range. I'm sharing our portfolio link — happy to schedule a call once you've had a look.",
        timestamp: "Mon 6:10 PM"
      },
      {
        id: "gmail_003_m3",
        role: "customer",
        content: "I looked at the portfolio — really liked the Prestige project. I'm comparing 3 designers right now. Could you send a rough quote so I can compare?",
        timestamp: "3 days ago"
      }
    ]
  },
  {
    id: "gmail_004",
    platform: "email",
    contactName: "Kabir Sood",
    businessType: "Photography Studio",
    status: "hot",
    daysSinceLastReply: 5,
    avatar: "KS",
    leadValue: "₹95k",
    leadScore: 9,
    urgency: "Critical",
    nextBestAction: "Send corporate event photography package with day rate and past event samples — 5 days no reply is a danger zone.",
    whyItMatters: {
      budgetMentioned: true,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 5
    },
    dealSummary: "Corporate annual day shoot for 400 pax, budget confirmed at ₹95k, event is in 3 weeks.",
    contextualReplies: [
      "Kabir, apologies for the delay. For a 400-person corporate event I can cover the full day with two photographers, candid and formal setups, and deliver edited photos within 5 working days. My quote for an event of this scale is ₹95k all-inclusive. Are the dates still available?",
      "Kabir, just following up — the event is 3 weeks away so I want to make sure we lock this in on time. I've attached a sample gallery from a similar 350-person annual day we shot last quarter. Happy to jump on a quick call today.",
      "Kabir, wanted to touch base before the event gets too close. I can confirm availability for your annual day. Could you share the date and venue so I can send a confirmed booking form with the ₹95k package details?"
    ],
    messages: [
      {
        id: "gmail_004_m1",
        role: "customer",
        content: "Hi, we're organising our company's Annual Day for around 400 employees in 3 weeks. We need professional photography coverage for the full day — awards ceremony, team activities, and dinner. Our budget is ₹95,000. Do you have availability?",
        timestamp: "Wed 9:00 AM"
      },
      {
        id: "gmail_004_m2",
        role: "business",
        content: "Hi Kabir! That sounds like a great event. I cover corporate annual days regularly and ₹95k is very workable for a full-day shoot with a team. Please share the event date and I'll confirm availability.",
        timestamp: "Wed 9:45 AM"
      },
      {
        id: "gmail_004_m3",
        role: "customer",
        content: "Event is on June 21st at Taj Lands End, Mumbai. Please confirm and send your package details.",
        timestamp: "5 days ago"
      }
    ]
  },
  {
    id: "gmail_005",
    platform: "email",
    contactName: "Priyanka Iyer",
    businessType: "Catering Service",
    status: "pending",
    daysSinceLastReply: 2,
    avatar: "PI",
    leadValue: "₹40k",
    leadScore: 6,
    urgency: "Medium",
    nextBestAction: "Send veg buffet menu options and per-plate pricing for a 150-person office event next month.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 2
    },
    dealSummary: "Office lunch catering for 150 people, vegetarian only, one-time event next month in Hyderabad.",
    contextualReplies: [
      "Priyanka, for 150 people veg buffet in Hyderabad, our corporate event menu starts at ₹280/plate. That would be ₹42,000 all-in, including setup, serving staff, and basic cutlery. Shall I send the menu options and a formal quote?",
      "Priyanka, happy to cater your office event. I'm attaching our veg corporate buffet menu — we have a South Indian spread and a North Indian spread, or a combination of both. What's the event date so I can check our team's availability?",
      "Priyanka, noted on vegetarian-only. We do corporate events in Hyderabad regularly. For 150 guests our buffet includes 2 mains, 3 sides, rice, bread, dessert, and beverages. I can send a formal quote once you confirm the date and venue."
    ],
    messages: [
      {
        id: "gmail_005_m1",
        role: "customer",
        content: "Hello, we need catering for a company offsite lunch next month. Around 150 people, vegetarian only. It's a one-time event in Hyderabad. Please share your menu and pricing.",
        timestamp: "Fri 3:30 PM"
      },
      {
        id: "gmail_005_m2",
        role: "business",
        content: "Hi Priyanka! We'd be happy to cater your event. We specialise in corporate vegetarian spreads. Could you share the exact date and venue location in Hyderabad?",
        timestamp: "Fri 4:15 PM"
      },
      {
        id: "gmail_005_m3",
        role: "customer",
        content: "Date is June 28th. Venue is HITEC City, we'll share the exact address closer to the event. Please send menu options and pricing.",
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "gmail_006",
    platform: "email",
    contactName: "Nisha Agarwal",
    businessType: "E-commerce Brand",
    status: "pending",
    daysSinceLastReply: 1,
    avatar: "NA",
    leadValue: "₹25k",
    leadScore: 6,
    urgency: "Medium",
    nextBestAction: "Send product photography package for 50 SKUs with turnaround time and sample images.",
    whyItMatters: {
      budgetMentioned: false,
      buyingIntentDetected: true,
      timelineMentioned: true,
      delayedDays: 1
    },
    dealSummary: "E-commerce product photography for 50 SKUs, needs delivery within 2 weeks for a Myntra listing deadline.",
    contextualReplies: [
      "Nisha, for 50 SKUs with white-background product shots I can deliver within 10 working days. Standard pricing is ₹400–₹500/SKU depending on angles required — for 50 products that's ₹20–25k. Want me to send a sample pack from a similar e-commerce project?",
      "Nisha, your Myntra deadline is tight but doable. I can start the shoot this weekend if we lock in the booking today. Please share the product list and I'll send a confirmed timeline and quote.",
      "Nisha, I've done similar shoots for Myntra-listed brands before — the listing requirements are very specific and I'm familiar with them. Can you confirm if you need plain white background only or lifestyle shots too? That will affect the quote."
    ],
    messages: [
      {
        id: "gmail_006_m1",
        role: "customer",
        content: "Hi, I run a small skincare brand and I need product photography for about 50 SKUs. These are for our Myntra listing and we need them done within the next 2 weeks. Please share your pricing and process.",
        timestamp: "Yesterday 11:00 AM"
      },
      {
        id: "gmail_006_m2",
        role: "business",
        content: "Hi Nisha! Myntra product photography is something we do regularly — I know exactly what specs they need. Could you confirm if you need white-background only or lifestyle shots as well?",
        timestamp: "Yesterday 12:30 PM"
      },
      {
        id: "gmail_006_m3",
        role: "customer",
        content: "Mostly white background, but 5-10 lifestyle shots would be great too. What's the pricing for this?",
        timestamp: "1 day ago"
      }
    ]
  }
];

export default conversations;
