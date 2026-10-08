export type Review = {
  name: string
  role: string
  rating: number
  title: string
  body: string
  date: string
}

export const reviewSummary = {
  average: 4.9,
  total: 2184,
  distribution: [
    { stars: 5, percent: 91 },
    { stars: 4, percent: 7 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
}

export const reviews: Review[] = [
  {
    name: 'Maya Chen',
    role: 'Staff Engineer, Lumen',
    rating: 5,
    title: 'My open office finally went quiet',
    body: 'The adaptive ANC handles keyboards and chatter better than anything I have tried. Wore them for 9 hours straight with zero fatigue.',
    date: 'Sep 2026',
  },
  {
    name: 'Daniel Okafor',
    role: 'Music Producer',
    rating: 5,
    title: 'Studio-grade, no exaggeration',
    body: 'Flat, detailed response with tight low end. I reference mixes on these now when I travel.',
    date: 'Aug 2026',
  },
  {
    name: 'Sofia Lindqvist',
    role: 'Product Designer',
    rating: 5,
    title: 'Beautiful and absurdly light',
    body: 'Graphite finish looks premium. Multipoint switching between laptop and phone is seamless.',
    date: 'Aug 2026',
  },
  {
    name: 'Arjun Mehta',
    role: 'Founder, Stackline',
    rating: 4,
    title: 'Battery that outlasts my flights',
    body: 'Two transatlantic trips on one charge. Only wish the case were a little smaller.',
    date: 'Jul 2026',
  },
  {
    name: 'Grace Kim',
    role: 'Remote PM',
    rating: 5,
    title: 'Calls sound crystal clear',
    body: 'Teammates stopped asking me to repeat myself. The beamforming mics are the real deal.',
    date: 'Jul 2026',
  },
  {
    name: 'Leo Martins',
    role: 'Data Scientist',
    rating: 5,
    title: 'Firmware 2.0 is a big upgrade',
    body: 'Spatial audio update made movies feel cinematic. Love that they keep improving after launch.',
    date: 'Jun 2026',
  },
]
