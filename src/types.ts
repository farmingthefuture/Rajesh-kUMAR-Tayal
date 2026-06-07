export interface Visitor {
  id: string;
  name: string;
  email: string;
  location: string;
  interestArea: 'CBG Plant Query' | 'Investment' | 'Bio-Coal' | 'Sustainable Farming';
  status: 'Active Lead' | 'Contacted' | 'Qualified Lead' | 'In Progress';
  createdAt: string;
  avatarColor: string;
}

export interface OperationalMetrics {
  totalVisitorsToday: number;
  activeSessions: number;
  newLeadsGenerated: number;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  date: string;
}

export interface AdminProfile {
  name: string;
  division: string;
  email: string;
  avatarUrl: string;
}

export const INITIAL_VISITORS: Visitor[] = [
  {
    id: '1',
    name: 'Amritpal Singh',
    email: 'amrit@punjabagri.com',
    location: 'Ludhiana, Punjab',
    interestArea: 'CBG Plant Query',
    status: 'Active Lead',
    createdAt: '2026-06-07T08:30:00Z',
    avatarColor: 'bg-teal-700 text-teal-100',
  },
  {
    id: '2',
    name: 'Rajesh Pathak',
    email: 'r.pathak@energymodels.in',
    location: 'Gurugram, Haryana',
    interestArea: 'Investment',
    status: 'Contacted',
    createdAt: '2026-06-06T14:20:00Z',
    avatarColor: 'bg-lime-700 text-lime-100',
  },
  {
    id: '3',
    name: 'Meena Kaur',
    email: 'meena.kaur@farmercoop.org',
    location: 'Fatehgarh Sahib, Punjab',
    interestArea: 'Bio-Coal',
    status: 'Qualified Lead',
    createdAt: '2026-06-05T11:15:00Z',
    avatarColor: 'bg-amber-700 text-amber-100',
  },
  {
    id: '4',
    name: 'Gaurav Kothari',
    email: 'g_kothari@cleanfuels.co.in',
    location: 'Bathinda, Punjab',
    interestArea: 'CBG Plant Query',
    status: 'In Progress',
    createdAt: '2026-06-07T10:05:00Z',
    avatarColor: 'bg-emerald-700 text-emerald-100',
  },
  {
    id: '5',
    name: 'Kirpal Dhillon',
    email: 'dhillon.k@punjabfields.org',
    location: 'Jalandhar, Punjab',
    interestArea: 'Sustainable Farming',
    status: 'Active Lead',
    createdAt: '2026-06-07T06:45:00Z',
    avatarColor: 'bg-indigo-700 text-indigo-100',
  },
  {
    id: '6',
    name: 'Suhail Ahmed',
    email: 'suhail@greengrids.in',
    location: 'Noida, Uttar Pradesh',
    interestArea: 'Investment',
    status: 'Contacted',
    createdAt: '2026-06-04T16:30:00Z',
    avatarColor: 'bg-cyan-700 text-cyan-100',
  },
];

export const INITIAL_METRICS: OperationalMetrics = {
  totalVisitorsToday: 1284,
  activeSessions: 42,
  newLeadsGenerated: 87,
};

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'session-1',
    title: 'Napier Grass Yield Query',
    date: '2026-06-07',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Tell me about Napier Grass yields.',
        timestamp: '12:00 PM',
      },
      {
        id: 'msg-2',
        sender: 'ai',
        text: 'Napier Grass (Pennisetum purpureum), often referred to as "The 80 Tonne Engine", yields up to 80 tonnes of dry matter per hectare annually under optimal conditions in Punjab. It is high-energy, drought-resistant, requires minimal crop maintenance, and presents a continuous year-round source for biogas and biofuel production.',
        timestamp: '12:01 PM',
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Bio-Coal Hydrophobic Properties',
    date: '2026-06-06',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        text: 'Why makes Bio-Coal water-resistant?',
        timestamp: '03:10 PM',
      },
      {
        id: 'msg-4',
        sender: 'ai',
        text: 'Bio-Coal pellets produced through carbonization (mild roasting) of paddy straw become highly hydrophobic. The process breaks down hemicellulose polymers, which are responsible for absorbing moisture. This structural transformation prevents water retention, allowing outdoor storage without degradation, ideal for coal co-firing plants.',
        timestamp: '03:12 PM',
      },
    ],
  },
];
