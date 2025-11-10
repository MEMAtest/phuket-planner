// ──────────────────────────────────────────────────────────────────────────────
// Germany Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const DE: CountryConfig = {
  iso2: 'DE',
  name: 'Germany',
  defaultLocale: 'de-DE',
  locales: ['de-DE', 'en-GB'],
  currency: 'EUR',
  timeZones: ['Europe/Berlin'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'DE',
    dialingCountry: 'DE'
  },
  cities: {
    berlin: {
      id: 'berlin',
      name: 'Berlin',
      weather: { lat: 52.5200, lon: 13.4050 },
      highlights: {
        localOptions: [
          { name: 'Brandenburg Gate', type: 'activity', notes: 'Iconic neoclassical monument. Free access 24/7—stunning when lit at night.', rating: 4.7, travelTime: 'Mitte', map: 'https://maps.google.com/?q=Brandenburg+Gate+Berlin' },
          { name: 'Berlin Wall & East Side Gallery', type: 'activity', notes: '1.3km of remaining Wall covered in murals. Checkpoint Charlie museum nearby €17.50.', rating: 4.6, travelTime: 'Friedrichshain', map: 'https://maps.google.com/?q=East+Side+Gallery+Berlin' },
          { name: 'Currywurst at Curry 36', type: 'eat', notes: 'Berlin\'s signature street food—fried sausage with curry ketchup. €3-5, open til 5am.', rating: 4.5, travelTime: 'Kreuzberg', map: 'https://maps.google.com/?q=Curry+36+Berlin', website: 'https://curry36.de/' },
          { name: 'Museum Island', type: 'activity', notes: '5 world-class museums on UNESCO island. Pergamon Museum (closed til 2027), Neues Museum €12 each.', rating: 4.8, travelTime: 'Mitte', map: 'https://maps.google.com/?q=Museum+Island+Berlin', website: 'https://www.smb.museum/en/home/' }
        ],
        facts: [
          'Berlin is 9x larger than Paris—takes 1+ hours to cross by S-Bahn.',
          'The city has 180+ museums and 440 art galleries.',
          'Döner kebab was invented here in 1972 by Turkish immigrants.',
          'Berlin has more bridges (960) than Venice (391)!'
        ]
      },
      transit: {
        systems: [
          { name: 'U-Bahn & S-Bahn', type: 'metro', notes: '10 U-Bahn + 16 S-Bahn lines. Buy Berlin Welcome Card—€25/48hr includes transport + museum discounts.', website: 'https://www.bvg.de/en', app: 'BVG app' },
          { name: 'Nextbike', type: 'bus', notes: '5,000 bikes. First 30 min free with day pass—flat city, 850km of bike lanes.', website: 'https://www.nextbike.de/en/' }
        ]
      }
    },
    munich: {
      id: 'munich',
      name: 'Munich',
      weather: { lat: 48.1351, lon: 11.5820 },
      highlights: {
        localOptions: [
          { name: 'Marienplatz & Glockenspiel', type: 'activity', notes: 'Central square with clock tower—figures dance at 11am, 12pm, 5pm daily. Free.', rating: 4.6, travelTime: 'City Center', map: 'https://maps.google.com/?q=Marienplatz+Munich' },
          { name: 'Hofbräuhaus', type: 'eat', notes: 'World-famous beer hall since 1589. 1L steins €10, pretzels €4, roast pork €15. Cash only.', rating: 4.5, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Hofbrauhaus+Munich', website: 'https://www.hofbraeuhaus.de/en/' },
          { name: 'Neuschwanstein Castle Day Trip', type: 'activity', notes: 'Disney castle inspiration 2 hours away. Train + bus €30. Book tickets 2 months ahead.', rating: 4.9, travelTime: '2 hours', map: 'https://maps.google.com/?q=Neuschwanstein+Castle', website: 'https://www.neuschwanstein.de/englisch/' },
          { name: 'English Garden', type: 'activity', notes: 'Larger than Central Park! Surfing on Eisbach wave, beer gardens, nude sunbathing sections.', rating: 4.7, travelTime: 'City Center', map: 'https://maps.google.com/?q=English+Garden+Munich' }
        ],
        facts: [
          'Munich hosts Oktoberfest (late Sept-Oct)—7 million visitors, 7 million liters of beer consumed.',
          'BMW headquarters and museum are in Munich—factory tours available.',
          'The city is gateway to the Alps—skiing 1 hour away in winter.',
          'Munich\'s beer purity law (Reinheitsgebot) from 1516 is the world\'s oldest food regulation.'
        ]
      },
      transit: {
        systems: [
          { name: 'MVV (U-Bahn, S-Bahn, Tram)', type: 'metro', notes: '8 U-Bahn + 8 S-Bahn lines. Buy day ticket €7.80 (Zone M). Validate before boarding!', website: 'https://www.mvv-muenchen.de/en/', app: 'MVG app' },
          { name: 'MVG Rad Bike Share', type: 'bus', notes: '2,800 bikes. First 30 min free with MVG app—bike-friendly city.', website: 'https://www.mvg-rad.de/' }
        ]
      }
    },
    hamburg: {
      id: 'hamburg',
      name: 'Hamburg',
      weather: { lat: 53.5511, lon: 9.9937 },
      highlights: {
        localOptions: [
          { name: 'Miniatur Wunderland', type: 'activity', notes: 'World\'s largest model railway. 16,000m² with 1,040 trains, tiny airports. Book online €18.', rating: 4.9, travelTime: 'Speicherstadt', map: 'https://maps.google.com/?q=Miniatur+Wunderland+Hamburg', website: 'https://www.miniatur-wunderland.com/discover-wunderland/' },
          { name: 'Speicherstadt & HafenCity', type: 'activity', notes: 'UNESCO warehouse district with canals. Elbphilharmonie concert hall has free viewing platform.', rating: 4.7, travelTime: 'City Center', map: 'https://maps.google.com/?q=Speicherstadt+Hamburg' },
          { name: 'Fischmarkt', type: 'eat', notes: 'Sunday fish market 5-9:30am. Fresh seafood, flowers, live music. Tradition since 1703!', rating: 4.6, travelTime: 'St. Pauli', map: 'https://maps.google.com/?q=Fischmarkt+Hamburg' },
          { name: 'Reeperbahn', type: 'activity', notes: 'Red-light district & nightlife center. Beatles played here 1960-62. Adult entertainment + clubs.', rating: 4.4, travelTime: 'St. Pauli', map: 'https://maps.google.com/?q=Reeperbahn+Hamburg' }
        ],
        facts: [
          'Hamburg has more bridges (2,500+) than Amsterdam, Venice, and London combined.',
          'Europe\'s 2nd largest port handles 130 million tons of cargo annually.',
          'The city-state is one of Germany\'s 16 federal states.',
          'Hamburg is Germany\'s media capital—Der Spiegel, Die Zeit, Gruner + Jahr headquartered here.'
        ]
      },
      transit: {
        systems: [
          { name: 'Hamburg U-Bahn & S-Bahn', type: 'metro', notes: '4 U-Bahn + 6 S-Bahn lines. Buy day ticket €7.90. Validates on entry—no gates.', website: 'https://www.hvv.de/en', app: 'HVV app' },
          { name: 'Ferries', type: 'ferry', notes: 'Line 62 ferry is public transit (€3.50 ticket)—scenic harbor cruise alternative to tour boats.', website: 'https://www.hvv.de/en' }
        ]
      }
    },
    frankfurt: {
      id: 'frankfurt',
      name: 'Frankfurt',
      weather: { lat: 50.1109, lon: 8.6821 },
      highlights: {
        localOptions: [
          { name: 'Römerberg', type: 'activity', notes: 'Medieval town square with half-timbered houses. Rebuilt after WWII—City Hall since 1405.', rating: 4.5, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Romerberg+Frankfurt' },
          { name: 'Main Tower Observation Deck', type: 'activity', notes: 'Only skyscraper open to public. €9—360° views from 200m. Open til 11pm Fri/Sat.', rating: 4.6, travelTime: 'Financial District', map: 'https://maps.google.com/?q=Main+Tower+Frankfurt', website: 'https://www.maintower.de/en' },
          { name: 'Apfelwein (Apple Wine) in Sachsenhausen', type: 'eat', notes: 'Frankfurt\'s signature drink—tart cider in ribbed glasses. Try Adolf Wagner tavern €4/glass.', rating: 4.5, travelTime: 'Sachsenhausen', map: 'https://maps.google.com/?q=Adolf+Wagner+Frankfurt' },
          { name: 'Palmengarten', type: 'activity', notes: 'Botanical garden with tropical greenhouses. €7 entry—peaceful escape from financial district.', rating: 4.6, travelTime: 'Westend', map: 'https://maps.google.com/?q=Palmengarten+Frankfurt', website: 'https://www.palmengarten.de/en/' }
        ],
        facts: [
          'Frankfurt is Europe\'s financial capital—ECB, Bundesbank, Deutsche Börse headquartered here.',
          'The city has Germany\'s busiest airport—70 million passengers/year.',
          'Goethe was born here in 1749—his birthplace is now a museum.',
          'Frankfurt Book Fair is the world\'s largest publishing event (October).'
        ]
      },
      transit: {
        systems: [
          { name: 'Frankfurt U-Bahn & S-Bahn', type: 'metro', notes: '9 U-Bahn + 9 S-Bahn lines. Buy day ticket €5.95 (Frankfurt zone). Validate before entry.', website: 'https://www.rmv.de/en/', app: 'RMV app' },
          { name: 'Call a Bike', type: 'bus', notes: 'Deutsche Bahn bike share. 5,000 bikes—first 30 min free with registration.', website: 'https://www.callabike-interaktiv.de/en' }
        ]
      }
    },
    cologne: {
      id: 'cologne',
      name: 'Cologne',
      weather: { lat: 50.9375, lon: 6.9603 },
      highlights: {
        localOptions: [
          { name: 'Cologne Cathedral', type: 'activity', notes: 'Gothic masterpiece—took 632 years to build. Climb 533 steps to towers €6. Free entry.', rating: 4.9, travelTime: 'City Center', map: 'https://maps.google.com/?q=Cologne+Cathedral', website: 'https://www.koelner-dom.de/index.php?id=19184&L=1' },
          { name: 'Hohenzollern Bridge Love Locks', type: 'activity', notes: 'Railway bridge with 500,000+ love locks. Walk across for Rhine views—trains pass constantly!', rating: 4.6, travelTime: 'City Center', map: 'https://maps.google.com/?q=Hohenzollern+Bridge+Cologne' },
          { name: 'Kölsch Beer in Old Town', type: 'eat', notes: 'Local beer served in 0.2L glasses. Servers replace empties automatically—put coaster on top to stop!', rating: 4.7, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Old+Town+Cologne' },
          { name: '4711 Cologne House', type: 'shopping', notes: 'Original eau de cologne factory since 1709. Free entry, €5 samples. Glockengasse 4711 address.', rating: 4.4, travelTime: 'City Center', map: 'https://maps.google.com/?q=4711+Haus+Cologne', website: 'https://www.4711.com/' }
        ],
        facts: [
          'Cologne Cathedral survived 14 WWII bombings—used as landmark by Allied pilots.',
          'The city invented eau de cologne perfume in the 18th century.',
          'Carnival (Karneval) in February is Germany\'s biggest party—million+ revelers.',
          'Cologne has 12 Romanesque churches—more than any other city.'
        ]
      },
      transit: {
        systems: [
          { name: 'Cologne U-Bahn & Tram', type: 'metro', notes: '12 tram lines + 2 U-Bahn lines (underground trams). Day ticket €9.20.', website: 'https://www.kvb.koeln/english/', app: 'KVB app' },
          { name: 'KVB Rad Bike Share', type: 'bus', notes: '3,300 bikes. First 30 min free—Rhine riverside paths.', website: 'https://www.kvb-rad.de/' }
        ]
      }
    },
    dresden: {
      id: 'dresden',
      name: 'Dresden',
      weather: { lat: 51.0504, lon: 13.7373 },
      highlights: {
        localOptions: [
          { name: 'Frauenkirche (Church of Our Lady)', type: 'activity', notes: 'Baroque church rebuilt after WWII bombing. Climb dome €10—360° views. Free entry for prayer.', rating: 4.8, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Frauenkirche+Dresden', website: 'https://www.frauenkirche-dresden.de/en/' },
          { name: 'Zwinger Palace', type: 'activity', notes: 'Baroque palace with museums—Old Masters gallery has Raphael\'s Sistine Madonna. €14.', rating: 4.7, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Zwinger+Palace+Dresden', website: 'https://www.der-dresdner-zwinger.de/en/' },
          { name: 'Striezelmarkt Christmas Market', type: 'activity', notes: 'Germany\'s oldest Christmas market (1434). Late Nov-Dec 24. Stollen cake originated here.', rating: 4.9, travelTime: 'Old Town', map: 'https://maps.google.com/?q=Striezelmarkt+Dresden' },
          { name: 'Saxon Switzerland Day Trip', type: 'activity', notes: 'Sandstone cliffs 30 min away. Bastei Bridge viewpoint—inspiring landscapes. Train €7 round-trip.', rating: 4.9, travelTime: '30 min', map: 'https://maps.google.com/?q=Saxon+Switzerland+National+Park' }
        ],
        facts: [
          'Dresden was 85% destroyed in 1945 firebombing—25,000 killed in one night.',
          'The city\'s nickname is "Florence on the Elbe" for baroque architecture.',
          'Stollen cake (Christstollen) was invented here in 1474—traditional Christmas treat.',
          'Semperoper opera house premiered 9 Wagner and Richard Strauss operas.'
        ]
      },
      transit: {
        systems: [
          { name: 'Dresden Tram', type: 'metro', notes: '12 lines. Day ticket €7—covers Old Town, Neustadt, suburbs.', website: 'https://www.dvb.de/en-gb/', app: 'DVB mobil app' },
          { name: 'S-Bahn', type: 'rail', notes: '3 lines to Saxon Switzerland, Meissen. Regional tickets €7-10.', website: 'https://www.bahn.com/en' }
        ]
      }
    }
  },
  weather: { city: 'Berlin', lat: 52.5200, lon: 13.4050 },
  news: {
    query: 'Germany travel families safety updates',
    region: 'DE',
    staticAlerts: [
      { id: 'de_sundays', type: 'tip', title: 'Sunday Closures', description: 'Shops close on Sundays except bakeries, gas stations, train stations. Stock up Saturday!', priority: 'medium', icon: '🚫' },
      { id: 'de_cash', type: 'tip', title: 'Cash Culture', description: 'Many restaurants/shops don\'t accept cards. ATMs everywhere—withdraw cash.', priority: 'medium', icon: '💶' }
    ]
  },
  highlights: {
    localOptions: [
      { name: 'Berlin Wall & Museum Island', type: 'activity', notes: 'Cold War history + 5 world-class museums. Full day needed.', rating: 4.8, travelTime: 'Berlin', map: 'https://maps.google.com/?q=Berlin+Wall' },
      { name: 'Neuschwanstein Castle', type: 'activity', notes: 'Fairytale castle in Bavarian Alps. Day trip from Munich.', rating: 4.9, travelTime: 'Bavaria', map: 'https://maps.google.com/?q=Neuschwanstein+Castle', website: 'https://www.neuschwanstein.de/englisch/' },
      { name: 'Oktoberfest', type: 'activity', notes: 'Munich beer festival (late Sept-Oct). Book hotels 12+ months ahead!', rating: 4.8, travelTime: 'Munich', map: 'https://maps.google.com/?q=Oktoberfest+Munich', website: 'https://www.oktoberfest.de/en' },
      { name: 'Rhine River Cruise', type: 'activity', notes: 'Castles, vineyards, medieval towns from Cologne to Mainz.', rating: 4.7, travelTime: 'Rhine Valley', map: 'https://maps.google.com/?q=Rhine+River+Cruise' }
    ],
    facts: [
      'Germany has 46 UNESCO World Heritage Sites including 6 Bauhaus buildings.',
      'The country produces 1,300+ types of sausage (Wurst) and 300+ types of bread.',
      'Germany has more cultural institutions (60,000+) than any other country.',
      'The autobahn has no general speed limit on 70% of its network.'
    ]
  },
  content: {
    emergency: { police: '110', ambulance: '112', fire: '112' },
    transitCards: ['Berlin Welcome Card', 'München Card', 'Hamburg Card', 'Frankfurt Card'],
    sockets: 'Type C/F · 230V',
    etiquetteNotes: [
      'Always validate tickets before boarding—fines are €60',
      'Jaywalking is illegal and frowned upon—wait for green light',
      'Sunday is sacred—shops closed, no loud activities',
      'Many places are cash-only—bring Euros',
      'Separate trash meticulously—recycling is serious',
      'Be on time—Germans value punctuality'
    ],
    quickStarts: [
      { title: 'Berlin: Wall, Brandenburg Gate & Museum Island', tags: ['history', 'museums', 'culture'] },
      { title: 'Bavaria: Munich, Neuschwanstein & Alps', tags: ['castles', 'mountains', 'beer'] },
      { title: 'Romantic Road: Medieval Towns & Castles', tags: ['scenic', 'villages', 'historic'] }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default DE;
