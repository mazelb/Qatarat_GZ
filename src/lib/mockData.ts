/**
 * Mock data module for development and testing
 * Provides fallback data when the GraphQL API is not available
 */

// Mock Campaign Data
export const mockCampaigns = [
  {
    id: '1',
    slug: 'gaza-emergency',
    title: 'Gaza Emergency Appeal',
    description: 'Providing urgent aid to families affected by the ongoing crisis in Gaza.',
    headerImage: 'https://images.unsplash.com/photo-1611764553930-fde61e3ea505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdhemF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    status: 'Urgent',
    goal: 500000,
    raised: 278500,
    contentBlocks: [
      {
        id: 'block1',
        type: 'text',
        title: 'The Situation',
        content: 'Families in Gaza are facing an unprecedented humanitarian crisis. With limited access to food, water, and medical supplies, the situation is dire and requires immediate intervention.'
      },
      {
        id: 'block2',
        type: 'image',
        title: 'Distribution of Aid',
        content: 'Our team distributing emergency supplies to families in need.',
        media: 'https://images.unsplash.com/photo-1596487162338-5943a280726c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'block3',
        type: 'quote',
        content: 'Your donation has given us hope in the darkest of times. My children now have food and clean water. Thank you for not forgetting us.',
        title: 'Fatima, mother of four in Gaza City'
      }
    ],
    timeline: [
      {
        id: 'timeline1',
        date: '2023-10-07',
        title: 'Emergency Appeal Launched',
        description: 'In response to the escalating crisis, we launched our Gaza Emergency Appeal to provide urgent humanitarian aid.',
        media: null
      },
      {
        id: 'timeline2',
        date: '2023-10-15',
        title: 'First Aid Shipment',
        description: 'Successfully delivered the first shipment of emergency food packages and medical supplies to Gaza.',
        media: 'https://images.unsplash.com/photo-1601933513793-bbc4e1af3f9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 'timeline3',
        date: '2023-11-01',
        title: 'Medical Team Deployed',
        description: 'Our medical team has been deployed to provide emergency healthcare services to injured civilians.',
        media: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      }
    ]
  },
  {
    id: '2',
    slug: 'water-wells',
    title: 'Clean Water Wells Project',
    description: 'Building water wells to provide sustainable access to clean water for communities in Gaza.',
    headerImage: 'https://images.unsplash.com/photo-1548576969-5c759ca552f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2F0ZXIlMjB3ZWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    status: 'Active',
    goal: 200000,
    raised: 95000,
    contentBlocks: [
      {
        id: 'block1',
        type: 'text',
        title: 'The Need for Clean Water',
        content: 'Access to clean water is a fundamental human right, yet many communities in Gaza struggle with contaminated water sources that cause illness and disease.'
      }
    ],
    timeline: []
  },
  {
    id: '3',
    slug: 'orphan-sponsorship',
    title: 'Orphan Sponsorship Program',
    description: 'Support orphaned children in Gaza with education, healthcare, and essential needs.',
    headerImage: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNoaWxkcmVufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    status: 'Active',
    goal: 300000,
    raised: 185000,
    contentBlocks: [],
    timeline: []
  }
];

// Mock About Content
export const mockAboutContent = {
  mission: "Our mission is to provide immediate relief and sustainable solutions to the people of Gaza, addressing both emergency needs and long-term development goals. We believe in empowering communities through access to clean water, healthcare, education, and economic opportunities.",
  vision: "We envision a future where all people in Gaza live with dignity, self-sufficiency, and hope. A future where children have access to quality education, families have sustainable livelihoods, and communities thrive with adequate infrastructure and services.",
  values: "Integrity, compassion, sustainability, accountability, and respect guide all of our work. We operate with transparency and ensure that donations directly benefit those in need. We respect the dignity of all people and involve local communities in program design and implementation.",
  story: "Qatarat Gaza (Droplets of Gaza) was founded in response to the escalating humanitarian crisis in Gaza. What began as a small group of volunteers collecting donations for emergency relief has grown into an organization implementing sustainable programs across Gaza. Our journey started with the belief that every drop of aid, every act of kindness, contributes to a larger impact – just as small droplets of water come together to sustain life.\n\nOver the years, we have expanded our reach and deepened our impact. We've built water wells, supported orphans, implemented healthcare initiatives, and responded to multiple emergencies. Through it all, we've remained committed to our core belief: that the people of Gaza deserve to live with dignity and hope.",
  headerImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  teamMembers: [
    {
      id: '1',
      name: 'Ahmed Khalidi',
      role: 'Executive Director',
      bio: 'Ahmed has over 15 years of experience in humanitarian work across the Middle East. He leads our strategic initiatives and oversees all operations with a focus on sustainability and impact.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    },
    {
      id: '2',
      name: 'Layla Hamdan',
      role: 'Programs Director',
      bio: 'Layla coordinates our field programs, ensuring effective implementation and monitoring. Her background in public health informs our healthcare initiatives.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'
    },
    {
      id: '3',
      name: 'Omar Nasser',
      role: 'Water Projects Specialist',
      bio: 'Omar is an environmental engineer who oversees our water well projects, bringing technical expertise and innovation to our water access initiatives.',
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    },
    {
      id: '4',
      name: 'Nour Abed',
      role: 'Child Welfare Coordinator',
      bio: 'Nour manages our orphan sponsorship program, ensuring that children receive holistic support for their educational, psychological, and physical wellbeing.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80'
    }
  ]
};
