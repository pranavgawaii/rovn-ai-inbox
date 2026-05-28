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
  }
];

export default conversations;
