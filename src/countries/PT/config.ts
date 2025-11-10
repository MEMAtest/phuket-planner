// ──────────────────────────────────────────────────────────────────────────────
// Portugal Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const PT: CountryConfig = {
  iso2: 'PT',
  name: 'Portugal',
  defaultLocale: 'pt-PT',
  locales: ['pt-PT', 'en-GB'],
  currency: 'EUR',
  timeZones: ['Europe/Lisbon', 'Atlantic/Azores', 'Atlantic/Madeira'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'PT',
    dialingCountry: 'PT'
  },
  cities: {
    lisbon: {
      id: 'lisbon',
      name: 'Lisbon',
      weather: { lat: 38.7223, lon: -9.1393 },
      highlights: {
        localOptions: [
          { name: 'Tram 28', type: 'activity', notes: 'Historic yellow tram through Alfama, Graça, Estrela. €3 single, board at 7am to avoid crowds.', rating: 4.7, travelTime: 'Citywide', map: 'https://maps.google.com/?q=Tram+28+Lisbon' },
          { name: 'Belém Tower', type: 'activity', notes: 'UNESCO fortress from Age of Discovery. Combo ticket with Jerónimos Monastery €12.', rating: 4.6, travelTime: 'Belém', map: 'https://maps.google.com/?q=Belem+Tower+Lisbon', website: 'https://www.patrimoniocultural.gov.pt/en/' },
          { name: 'Pastéis de Belém', type: 'eat', notes: 'Original custard tart bakery since 1837. Secret recipe—lines form but move fast. €1.30 each.', rating: 4.8, travelTime: 'Belém', map: 'https://maps.google.com/?q=Pasteis+de+Belem', website: 'https://pasteisdebelem.pt/en/' },
          { name: 'Sintra Day Trip', type: 'activity', notes: 'Fairytale palaces 40 min away. Pena Palace, Quinta da Regaleira. Train €4.60 round-trip.', rating: 4.9, travelTime: '40 min by train', map: 'https://maps.google.com/?q=Sintra+Portugal' }
        ],
        facts: [
          'Lisbon is Europe\'s 2nd oldest capital after Athens, founded by Phoenicians 3,000 years ago.',
          'The 1755 earthquake destroyed 85% of the city and killed 60,000—rebuilt in grid pattern.',
          'Fado music (UNESCO heritage) expresses saudade (longing)—best heard in Alfama taverns.',
          'Lisbon has 28 hills and 3 funiculars—wear comfortable shoes!'
        ]
      },
      transit: {
        systems: [
          { name: 'Lisbon Metro', type: 'metro', notes: '4 lines. Buy Viva Viagem card—€1.50 rechargeable, €1.50/trip.', website: 'https://www.metrolisboa.pt/en/', app: 'Metro Lisboa app' },
          { name: 'Trams & Funiculars', type: 'metro', notes: '5 historic tram lines + 3 funiculars (Glória, Bica, Lavra). Same Viva card.', website: 'https://www.carris.pt/en/' }
        ]
      }
    },
    porto: {
      id: 'porto',
      name: 'Porto',
      weather: { lat: 41.1579, lon: -8.6291 },
      highlights: {
        localOptions: [
          { name: 'Port Wine Cellars', type: 'activity', notes: 'Vila Nova de Gaia has 60+ cellars. Taylor\'s, Graham\'s offer tours €15-20 with tastings.', rating: 4.8, travelTime: 'Gaia (across river)', map: 'https://maps.google.com/?q=Port+Wine+Cellars+Porto' },
          { name: 'Livraria Lello', type: 'shopping', notes: 'World\'s most beautiful bookstore (Harry Potter inspiration). €5 entry, redeemable on books.', rating: 4.6, travelTime: 'City Center', map: 'https://maps.google.com/?q=Livraria+Lello+Porto', website: 'https://www.livrarialello.pt/en/' },
          { name: 'Francesinha Sandwich', type: 'eat', notes: 'Porto\'s signature—steak, ham, sausage, egg, melted cheese, beer sauce. Try Café Santiago.', rating: 4.7, travelTime: 'City Center', map: 'https://maps.google.com/?q=Cafe+Santiago+Porto' },
          { name: 'Dom Luís I Bridge Walk', type: 'activity', notes: 'Double-deck iron bridge. Upper level for metro/pedestrians—dizzying views 45m high.', rating: 4.7, travelTime: 'Ribeira', map: 'https://maps.google.com/?q=Dom+Luis+I+Bridge+Porto' }
        ],
        facts: [
          'Porto gave its name to Portugal—"Portus Cale" (Port of Cale).',
          'Port wine must be aged in Vila Nova de Gaia by law, not Porto proper.',
          'J.K. Rowling taught English here 1991-93—Lello Bookstore inspired Hogwarts library.',
          'The city\'s historic center is a UNESCO World Heritage Site.'
        ]
      },
      transit: {
        systems: [
          { name: 'Porto Metro', type: 'metro', notes: '6 lines (A-F). Buy Andante card—Z2 ticket €1.30 covers center.', website: 'https://www.metrodoporto.pt/en/', app: 'Metro do Porto app' },
          { name: 'Tram Line 1', type: 'metro', notes: 'Vintage trams to Foz beaches. €3.50 single—scenic riverside route.', website: 'https://www.stcp.pt/en/' }
        ]
      }
    },
    faro: {
      id: 'faro',
      name: 'Faro',
      weather: { lat: 37.0194, lon: -7.9322 },
      highlights: {
        localOptions: [
          { name: 'Ria Formosa Natural Park', type: 'activity', notes: 'Barrier islands with pristine beaches. Ferry to Ilha Deserta (uninhabited island) €10.', rating: 4.8, travelTime: 'Waterfront', map: 'https://maps.google.com/?q=Ria+Formosa+Faro' },
          { name: 'Faro Old Town', type: 'activity', notes: 'Walled medieval quarter with cathedral, orange trees, stork nests. Climb bell tower for lagoon views.', rating: 4.5, travelTime: 'City Center', map: 'https://maps.google.com/?q=Faro+Old+Town' },
          { name: 'Algarve Beaches', type: 'activity', notes: 'Lagos, Albufeira, Tavira 30-60 min away. Dramatic cliffs, golden sand, water sports.', rating: 4.7, travelTime: '30-60 min by train/bus', map: 'https://maps.google.com/?q=Algarve+Beaches' },
          { name: 'Seafood at Faro Marina', type: 'eat', notes: 'Grilled sardines, clams, octopus salad. Waterfront restaurants €15-25/person.', rating: 4.6, travelTime: 'Marina', map: 'https://maps.google.com/?q=Faro+Marina' }
        ],
        facts: [
          'Faro is the Algarve\'s capital and gateway—300+ days of sunshine per year.',
          'Ria Formosa lagoon is one of Europe\'s 7 Natural Wonders, protecting 18,000 hectares.',
          'The Chapel of Bones (Capela dos Ossos) walls are lined with 1,200 monks\' skulls.',
          'Algarve means "the west" in Arabic—the region was under Moorish rule until 1249.'
        ]
      },
      transit: {
        systems: [
          { name: 'Algarve Train Line', type: 'rail', notes: 'Connects Faro to Lagos, Albufeira, Tavira. €3-5 tickets—scenic coastal route.', website: 'https://www.cp.pt/passageiros/en', app: 'CP app' },
          { name: 'Eva Bus', type: 'bus', notes: 'Regional buses to beaches, villages. Buy at station or driver—€1.50-5.', website: 'https://www.eva-bus.com/' }
        ]
      }
    },
    coimbra: {
      id: 'coimbra',
      name: 'Coimbra',
      weather: { lat: 40.2033, lon: -8.4103 },
      highlights: {
        localOptions: [
          { name: 'University of Coimbra', type: 'activity', notes: 'Europe\'s oldest university (1290). Joanina Library with baroque gold leaf—€12.50 ticket.', rating: 4.8, travelTime: 'Upper Town', map: 'https://maps.google.com/?q=University+of+Coimbra', website: 'https://www.uc.pt/en/visit' },
          { name: 'Fado ao Centro', type: 'activity', notes: 'Coimbra fado is sung by students, more intellectual than Lisbon. Daily shows 6pm, €10.', rating: 4.7, travelTime: 'Lower Town', map: 'https://maps.google.com/?q=Fado+ao+Centro+Coimbra', website: 'https://www.fadoaocentro.com/' },
          { name: 'Mondego River Walk', type: 'activity', notes: 'Pedestrian paths along both riverbanks. Rent kayak/paddleboard €10/hour.', rating: 4.5, travelTime: 'Riverfront', map: 'https://maps.google.com/?q=Mondego+River+Coimbra' },
          { name: 'Chanfana Stew', type: 'eat', notes: 'Slow-cooked goat in red wine. Try Zé Manel dos Ossos—rustic tavern, €15-20.', rating: 4.6, travelTime: 'Lower Town', map: 'https://maps.google.com/?q=Ze+Manel+dos+Ossos+Coimbra' }
        ],
        facts: [
          'Coimbra was Portugal\'s capital 1139-1255 before Lisbon.',
          'Students wear black capes (inspired Harry Potter robes) and burn ribbons at graduation.',
          'The university library holds 300,000 books and releases bats at night to eat insects.',
          'Coimbra is halfway between Lisbon and Porto—1 hour by train from each.'
        ]
      },
      transit: {
        systems: [
          { name: 'SMTUC Buses', type: 'bus', notes: '30+ lines. Buy Anda card at kiosks—€1.60/trip.', website: 'https://www.smtuc.pt/', app: 'SMTUC app' },
          { name: 'Funicular dos Mercadores', type: 'rail', notes: 'Mini funicular linking lower/upper towns. €1.20—saves steep climb.', website: 'https://www.smtuc.pt/' }
        ]
      }
    },
    braga: {
      id: 'braga',
      name: 'Braga',
      weather: { lat: 41.5518, lon: -8.4229 },
      highlights: {
        localOptions: [
          { name: 'Bom Jesus do Monte', type: 'activity', notes: 'Hilltop sanctuary with baroque staircase (573 steps!). Funicular €2 or hike for pilgrims.', rating: 4.8, travelTime: '6km east', map: 'https://maps.google.com/?q=Bom+Jesus+do+Monte+Braga', website: 'https://bomjesus.pt/en/' },
          { name: 'Braga Cathedral', type: 'activity', notes: 'Portugal\'s oldest cathedral (1089). Treasury museum has medieval artifacts. €5 entry.', rating: 4.6, travelTime: 'City Center', map: 'https://maps.google.com/?q=Braga+Cathedral' },
          { name: 'Cozido à Portuguesa', type: 'eat', notes: 'Portuguese stew with meats, sausages, vegetables. Comfort food classic at €10-15.', rating: 4.5, travelTime: 'City Center' },
          { name: 'Guimarães Day Trip', type: 'activity', notes: 'Birthplace of Portugal 15 min away. Castle, medieval center. Train €1.50.', rating: 4.7, travelTime: '15 min by train', map: 'https://maps.google.com/?q=Guimaraes+Portugal' }
        ],
        facts: [
          'Braga is Portugal\'s oldest city, founded by Romans as "Bracara Augusta" in 16 BC.',
          'The city is nicknamed "Portuguese Rome" for 30+ churches.',
          'Bom Jesus\' water-powered funicular (1882) is the world\'s oldest still operating.',
          'Holy Week processions draw 100,000+ pilgrims—book hotels 6 months ahead.'
        ]
      },
      transit: {
        systems: [
          { name: 'TUB Buses', type: 'bus', notes: '80+ lines. Buy tickets on bus—€1.50 single.', website: 'https://www.tub.pt/', app: 'TUB app' },
          { name: 'CP Trains', type: 'rail', notes: 'Frequent service to Porto (1 hour) and Guimarães (15 min). €3-4 tickets.', website: 'https://www.cp.pt/passageiros/en' }
        ]
      }
    }
  },
  weather: { city: 'Lisbon', lat: 38.7223, lon: -9.1393 },
  news: {
    query: 'Portugal travel families safety updates',
    region: 'PT',
    staticAlerts: [
      { id: 'pt_hills', type: 'tip', title: 'Steep Hills', description: 'Lisbon & Porto are hilly—use trams, funiculars, comfortable shoes essential.', priority: 'low', icon: '⛰️' }
    ]
  },
  highlights: {
    localOptions: [
      { name: 'Pastéis de Nata', type: 'eat', notes: 'Custard tarts—best in Belém, but every bakery has them. €1-2 each.', rating: 4.8, travelTime: 'Everywhere' },
      { name: 'Port Wine Tours', type: 'activity', notes: 'Vila Nova de Gaia cellars in Porto. €15-30 with tastings.', rating: 4.8, travelTime: 'Porto', map: 'https://maps.google.com/?q=Port+Wine+Cellars+Porto' },
      { name: 'Sintra Palaces', type: 'activity', notes: 'Pena Palace, Quinta da Regaleira, Moorish Castle. Day trip from Lisbon.', rating: 4.9, travelTime: 'Sintra', map: 'https://maps.google.com/?q=Sintra+Portugal' },
      { name: 'Algarve Beaches', type: 'activity', notes: '200km of coastline with 300+ days sun. Lagos, Albufeira, Tavira.', rating: 4.7, travelTime: 'Southern coast' }
    ],
    facts: [
      'Portugal is Europe\'s westernmost country—Cabo da Roca is the continent\'s edge.',
      'The country has 17 UNESCO World Heritage Sites including Sintra and Porto.',
      'Portuguese is spoken by 260 million people—8th most-spoken language.',
      'Cork production is 50% of world supply—Alentejo has vast cork oak forests.'
    ]
  },
  content: {
    emergency: { police: '112', ambulance: '112', fire: '112' },
    transitCards: ['Viva Viagem (Lisbon)', 'Andante (Porto)', 'Anda (Coimbra)'],
    sockets: 'Type C/F · 230V',
    etiquetteNotes: [
      'Greet with two kisses (cheek-to-cheek)',
      'Lunch is 12:30-3pm, dinner 8-10pm',
      'Tipping is optional—round up 5-10% for good service',
      'Say "Bom dia" (good morning) until 2pm, then "Boa tarde"',
      'Bread and butter at restaurants are charged if you eat them',
      'Sunday shops close early except in tourist areas'
    ],
    quickStarts: [
      { title: 'Lisbon: Alfama, Belém & Sintra Day Trip', tags: ['historic', 'palaces', 'pastries'] },
      { title: 'Porto & Douro Valley: Port Wine & River Cruise', tags: ['wine', 'scenic', 'riverside'] },
      { title: 'Algarve: Beach Hopping & Coastal Cliffs', tags: ['beach', 'sun', 'nature'] }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default PT;
