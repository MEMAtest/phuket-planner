// ──────────────────────────────────────────────────────────────────────────────
// United Kingdom Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const GB: CountryConfig = {
  iso2: 'GB',
  name: 'United Kingdom',
  defaultLocale: 'en-GB',
  locales: ['en-GB', 'en-US'],
  currency: 'GBP',
  timeZones: ['Europe/London'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'GB',
    dialingCountry: 'GB'
  },
  cities: {
    london: {
      id: 'london',
      name: 'London',
      weather: {
        lat: 51.5074,
        lon: -0.1278
      },
      highlights: {
        localOptions: [
          {
            name: 'British Museum',
            type: 'activity',
            notes: 'World-class museum with free entry. Rosetta Stone, Egyptian mummies, and more.',
            rating: 4.7,
            travelTime: 'Bloomsbury',
            map: 'https://maps.google.com/?q=British%20Museum%20London',
            website: 'https://www.britishmuseum.org/'
          },
          {
            name: 'Tower of London',
            type: 'activity',
            notes: 'Historic castle housing the Crown Jewels. Book tickets online to skip queues.',
            rating: 4.6,
            travelTime: 'Tower Hill',
            map: 'https://maps.google.com/?q=Tower%20of%20London',
            website: 'https://www.hrp.org.uk/tower-of-london/'
          },
          {
            name: 'Borough Market',
            type: 'eat',
            notes: 'Iconic food market with street food, artisanal produce, and vibrant atmosphere.',
            rating: 4.5,
            travelTime: 'Southwark',
            map: 'https://maps.google.com/?q=Borough%20Market%20London',
            website: 'https://boroughmarket.org.uk/'
          },
          {
            name: 'Natural History Museum',
            type: 'activity',
            notes: 'Free museum with dinosaur exhibits, blue whale skeleton, and interactive displays.',
            rating: 4.8,
            travelTime: 'South Kensington',
            map: 'https://maps.google.com/?q=Natural%20History%20Museum%20London',
            website: 'https://www.nhm.ac.uk/'
          },
          {
            name: 'Camden Market',
            type: 'shopping',
            notes: 'Alternative market with vintage clothing, street art, and international food stalls.',
            rating: 4.4,
            travelTime: 'Camden Town',
            map: 'https://maps.google.com/?q=Camden%20Market%20London',
            website: 'https://www.camdenmarket.com/'
          },
          {
            name: 'Dishoom',
            type: 'eat',
            notes: 'Bombay-style café with excellent brunch and curry. Covent Garden or King\'s Cross locations.',
            rating: 4.6,
            travelTime: 'Multiple locations',
            map: 'https://maps.google.com/?q=Dishoom%20Covent%20Garden',
            website: 'https://www.dishoom.com/'
          },
          {
            name: 'Sky Garden',
            type: 'activity',
            notes: 'Free observation deck (book ahead) with panoramic London views and bar.',
            rating: 4.5,
            travelTime: 'City of London',
            map: 'https://maps.google.com/?q=Sky%20Garden%20London',
            website: 'https://skygarden.london/'
          },
          {
            name: 'The Ivy Market Grill',
            type: 'eat',
            notes: 'Modern British brasserie in Covent Garden. Great for pre-theatre dining.',
            rating: 4.4,
            travelTime: 'Covent Garden',
            map: 'https://maps.google.com/?q=The%20Ivy%20Market%20Grill%20London',
            website: 'https://www.the-ivy-market-grill.com/'
          },
          {
            name: 'Covent Garden Market',
            type: 'shopping',
            notes: 'Historic covered market with street performers, boutique shops, and Apple Market crafts.',
            rating: 4.5,
            travelTime: 'Covent Garden',
            map: 'https://maps.google.com/?q=Covent%20Garden%20Market%20London',
            website: 'https://www.coventgarden.london/'
          },
          {
            name: 'Churchill War Rooms',
            type: 'activity',
            notes: 'Secret WWII bunker beneath Westminster. Book online—compelling for history enthusiasts.',
            rating: 4.7,
            travelTime: 'Westminster',
            map: 'https://maps.google.com/?q=Churchill%20War%20Rooms%20London',
            website: 'https://www.iwm.org.uk/visits/churchill-war-rooms'
          },
          {
            name: 'St. Paul\'s Cathedral',
            type: 'activity',
            notes: 'Iconic dome by Christopher Wren. Climb 528 steps to Golden Gallery for panoramic views.',
            rating: 4.7,
            travelTime: 'City of London',
            map: 'https://maps.google.com/?q=St%20Paul%27s%20Cathedral%20London',
            website: 'https://www.stpauls.co.uk/'
          },
          {
            name: 'Brick Lane',
            type: 'eat',
            notes: 'East London\'s curry district with vintage markets. Sunday UpMarket for street food and crafts.',
            rating: 4.4,
            travelTime: 'Shoreditch',
            map: 'https://maps.google.com/?q=Brick%20Lane%20London'
          }
        ],
        facts: [
          'London is the only city to have hosted the Summer Olympics three times (1908, 1948, 2012).',
          'The London Underground is the world\'s oldest metro system, opening in 1863.',
          'Big Ben refers to the bell, not the clock tower—officially named the Elizabeth Tower since 2012.',
          'London has over 170 museums, more than any other city in the world.',
          'The city is home to four UNESCO World Heritage Sites: Tower of London, Kew Gardens, Westminster Abbey, and Maritime Greenwich.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'London Underground (Tube)',
            type: 'metro',
            notes: '11 lines covering central London and suburbs. Use Oyster card or contactless payment.',
            website: 'https://tfl.gov.uk/modes/tube/',
            app: 'TfL Go or Citymapper'
          },
          {
            name: 'London Buses',
            type: 'bus',
            notes: 'Extensive bus network. Cashless—use Oyster or contactless only.',
            website: 'https://tfl.gov.uk/modes/buses/',
            app: 'TfL Go or Citymapper'
          },
          {
            name: 'Elizabeth Line',
            type: 'rail',
            notes: 'High-frequency rail from Heathrow to central London and beyond.',
            website: 'https://tfl.gov.uk/modes/elizabeth-line/',
            app: 'TfL Go'
          },
          {
            name: 'National Rail',
            type: 'rail',
            notes: 'Connects London to other UK cities. Book advance tickets for best prices.',
            website: 'https://www.nationalrail.co.uk/',
            app: 'Trainline or National Rail'
          }
        ]
      }
    },
    edinburgh: {
      id: 'edinburgh',
      name: 'Edinburgh',
      weather: {
        lat: 55.9533,
        lon: -3.1883
      },
      highlights: {
        localOptions: [
          {
            name: 'Edinburgh Castle',
            type: 'activity',
            notes: 'Iconic fortress with Scottish crown jewels and stunning city views.',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Edinburgh%20Castle',
            website: 'https://www.edinburghcastle.scot/'
          },
          {
            name: 'Royal Mile',
            type: 'activity',
            notes: 'Historic street connecting the Castle to Holyrood Palace. Shops, pubs, and street performers.',
            rating: 4.5,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Royal%20Mile%20Edinburgh'
          },
          {
            name: 'Arthur\'s Seat',
            type: 'activity',
            notes: 'Extinct volcano with hiking trails. 360° views of Edinburgh from the summit.',
            rating: 4.8,
            travelTime: 'Holyrood Park',
            map: 'https://maps.google.com/?q=Arthur%27s%20Seat%20Edinburgh'
          },
          {
            name: 'The Witchery by the Castle',
            type: 'eat',
            notes: 'Gothic-themed fine dining near the castle. Book ahead for dramatic atmosphere.',
            rating: 4.5,
            travelTime: 'Castlehill',
            map: 'https://maps.google.com/?q=The%20Witchery%20Edinburgh',
            website: 'https://www.thewitchery.com/'
          }
        ],
        facts: [
          'Edinburgh is built on seven hills, like Rome and Lisbon.',
          'The Royal Edinburgh Military Tattoo draws 220,000 visitors annually during August.',
          'Edinburgh was the first UNESCO City of Literature (2004).',
          'The city hosted the world\'s first fire brigade in 1824.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Lothian Buses',
            type: 'bus',
            notes: 'Extensive bus network across Edinburgh. Use Ridacard or contactless.',
            website: 'https://www.lothianbuses.com/',
            app: 'Lothian Buses m-tickets'
          },
          {
            name: 'Edinburgh Tram',
            type: 'rail',
            notes: 'Tram from airport to city centre and beyond. Contactless accepted.',
            website: 'https://edinburghtrams.com/',
            app: 'Edinburgh Tram app'
          }
        ]
      }
    },
    manchester: {
      id: 'manchester',
      name: 'Manchester',
      weather: {
        lat: 53.4808,
        lon: -2.2426
      },
      highlights: {
        localOptions: [
          {
            name: 'Science and Industry Museum',
            type: 'activity',
            notes: 'Free museum exploring Manchester\'s industrial heritage. Interactive exhibits for families.',
            rating: 4.6,
            travelTime: 'Castlefield',
            map: 'https://maps.google.com/?q=Science%20and%20Industry%20Museum%20Manchester',
            website: 'https://www.scienceandindustrymuseum.org.uk/'
          },
          {
            name: 'Northern Quarter',
            type: 'shopping',
            notes: 'Bohemian area with independent shops, vintage stores, and street art.',
            rating: 4.5,
            travelTime: 'City Centre',
            map: 'https://maps.google.com/?q=Northern%20Quarter%20Manchester'
          },
          {
            name: 'Mackie Mayor',
            type: 'eat',
            notes: 'Victorian market hall turned food hall. Diverse vendors and communal seating.',
            rating: 4.4,
            travelTime: 'Northern Quarter',
            map: 'https://maps.google.com/?q=Mackie%20Mayor%20Manchester'
          },
          {
            name: 'Old Trafford Stadium',
            type: 'activity',
            notes: 'Manchester United\'s iconic stadium. Museum and stadium tours available.',
            rating: 4.7,
            travelTime: 'Old Trafford',
            map: 'https://maps.google.com/?q=Old%20Trafford%20Stadium',
            website: 'https://www.manutd.com/en/visit-old-trafford'
          },
          {
            name: 'The Lowry',
            type: 'activity',
            notes: 'Waterfront arts centre with theatres and gallery. Showcases L.S. Lowry\'s industrial paintings.',
            rating: 4.5,
            travelTime: 'Salford Quays',
            map: 'https://maps.google.com/?q=The%20Lowry%20Manchester',
            website: 'https://www.thelowry.com/'
          }
        ],
        facts: [
          'Manchester was the world\'s first industrialized city during the 19th century.',
          'The city is home to two Premier League football clubs: Manchester United and Manchester City.',
          'The Guardian newspaper was founded in Manchester in 1821.',
          'Manchester\'s music scene gave birth to bands like Oasis, The Smiths, and Joy Division.',
          'The Curry Mile in Rusholme has over 70 South Asian restaurants and is Europe\'s largest curry district.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Metrolink',
            type: 'rail',
            notes: 'Tram network with 8 lines. Use contactless or get a day pass.',
            website: 'https://tfgm.com/public-transport/tram',
            app: 'TfGM app'
          },
          {
            name: 'Manchester Buses',
            type: 'bus',
            notes: 'Extensive bus network across Greater Manchester.',
            website: 'https://tfgm.com/public-transport/bus',
            app: 'TfGM app'
          }
        ]
      }
    },
    birmingham: {
      id: 'birmingham',
      name: 'Birmingham',
      weather: {
        lat: 52.4862,
        lon: -1.8904
      },
      highlights: {
        localOptions: [
          {
            name: 'Cadbury World',
            type: 'activity',
            notes: 'Interactive chocolate factory experience. Book online—popular with families.',
            rating: 4.5,
            travelTime: 'Bournville',
            map: 'https://maps.google.com/?q=Cadbury%20World%20Birmingham',
            website: 'https://www.cadburyworld.co.uk/'
          },
          {
            name: 'Birmingham Museum & Art Gallery',
            type: 'activity',
            notes: 'Free museum with Pre-Raphaelite art collection and Staffordshire Hoard.',
            rating: 4.6,
            travelTime: 'City Centre',
            map: 'https://maps.google.com/?q=Birmingham%20Museum%20Art%20Gallery',
            website: 'https://www.birminghammuseums.org.uk/bmag'
          },
          {
            name: 'Balti Triangle',
            type: 'eat',
            notes: 'Home of the Balti curry. Try Adil\'s or Al Frash for authentic Birmingham-style curry.',
            rating: 4.5,
            travelTime: 'Sparkbrook/Balsall Heath',
            map: 'https://maps.google.com/?q=Balti%20Triangle%20Birmingham'
          },
          {
            name: 'Jewellery Quarter',
            type: 'shopping',
            notes: 'Historic district producing 40% of UK jewellery. Independent shops, cafés, and Museum of the Jewellery Quarter.',
            rating: 4.4,
            travelTime: 'Jewellery Quarter',
            map: 'https://maps.google.com/?q=Jewellery%20Quarter%20Birmingham'
          }
        ],
        facts: [
          'Birmingham has more canals than Venice—35 miles of waterways traverse the city.',
          'The Balti curry was invented in Birmingham in the 1970s.',
          'The city is the UK\'s second-largest, with a population of 1.14 million.',
          'The Jewellery Quarter produces 40% of UK-made jewellery and has over 100 retailers.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'West Midlands Metro',
            type: 'rail',
            notes: 'Tram network connecting city centre to Wolverhampton. Use contactless or Swift card.',
            website: 'https://www.metroalliance.co.uk/',
            app: 'West Midlands Network app'
          },
          {
            name: 'National Express West Midlands',
            type: 'bus',
            notes: 'Extensive bus network. Use contactless or Swift card for best fares.',
            website: 'https://nxbus.co.uk/west-midlands',
            app: 'West Midlands Network app'
          }
        ]
      }
    },
    liverpool: {
      id: 'liverpool',
      name: 'Liverpool',
      weather: {
        lat: 53.4084,
        lon: -2.9916
      },
      highlights: {
        localOptions: [
          {
            name: 'The Beatles Story',
            type: 'activity',
            notes: 'Immersive museum at Albert Dock telling the Beatles\' story. Audio guide included.',
            rating: 4.6,
            travelTime: 'Albert Dock',
            map: 'https://maps.google.com/?q=The%20Beatles%20Story%20Liverpool',
            website: 'https://www.beatlesstory.com/'
          },
          {
            name: 'Cavern Club',
            type: 'activity',
            notes: 'Legendary venue where the Beatles performed 292 times. Live music daily.',
            rating: 4.5,
            travelTime: 'Mathew Street',
            map: 'https://maps.google.com/?q=Cavern%20Club%20Liverpool',
            website: 'https://www.cavernclub.com/'
          },
          {
            name: 'Albert Dock',
            type: 'activity',
            notes: 'UNESCO waterfront with museums, restaurants, and Tate Liverpool gallery.',
            rating: 4.6,
            travelTime: 'Waterfront',
            map: 'https://maps.google.com/?q=Albert%20Dock%20Liverpool',
            website: 'https://albertdock.com/'
          },
          {
            name: 'Scouse at The Baltic Market',
            type: 'eat',
            notes: 'Try traditional Scouse stew (lamb, vegetables, potatoes) at this converted warehouse food hall.',
            rating: 4.4,
            travelTime: 'Baltic Triangle',
            map: 'https://maps.google.com/?q=Baltic%20Market%20Liverpool'
          },
          {
            name: 'Anfield Stadium',
            type: 'activity',
            notes: 'Liverpool FC\'s iconic ground. Stadium tours and museum available—book ahead.',
            rating: 4.7,
            travelTime: 'Anfield',
            map: 'https://maps.google.com/?q=Anfield%20Stadium%20Liverpool',
            website: 'https://www.liverpoolfc.com/tickets/museum-and-tour'
          }
        ],
        facts: [
          'Liverpool was European Capital of Culture in 2008, sparking major regeneration.',
          'The city has more Georgian buildings than Bath and more museums than any UK city outside London.',
          'Albert Dock is the UK\'s most visited multi-use heritage attraction outside London.',
          'Scouse (the stew and the dialect) originated from Norwegian sailors\' "lobscouse" brought to Liverpool docks.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Merseyrail',
            type: 'rail',
            notes: 'Underground rail network covering Liverpool and Merseyside. Use contactless or Walrus card.',
            website: 'https://www.merseyrail.org/',
            app: 'Merseyrail app'
          },
          {
            name: 'Liverpool Buses',
            type: 'bus',
            notes: 'Extensive bus network. Arriva and Stagecoach services—contactless accepted.',
            website: 'https://www.merseytravel.gov.uk/',
            app: 'Arriva Bus app'
          }
        ]
      }
    },
    glasgow: {
      id: 'glasgow',
      name: 'Glasgow',
      weather: {
        lat: 55.8642,
        lon: -4.2518
      },
      highlights: {
        localOptions: [
          {
            name: 'Kelvingrove Art Gallery and Museum',
            type: 'activity',
            notes: 'Free museum with Scottish art, natural history, and Salvador Dalí\'s Christ of Saint John of the Cross.',
            rating: 4.8,
            travelTime: 'West End',
            map: 'https://maps.google.com/?q=Kelvingrove%20Art%20Gallery%20Glasgow',
            website: 'https://www.glasgowlife.org.uk/museums/venues/kelvingrove-art-gallery-and-museum'
          },
          {
            name: 'Glasgow Cathedral',
            type: 'activity',
            notes: 'Medieval cathedral dating from 1197. One of few Scottish churches to survive the Reformation intact.',
            rating: 4.7,
            travelTime: 'Cathedral Quarter',
            map: 'https://maps.google.com/?q=Glasgow%20Cathedral',
            website: 'https://www.historicenvironment.scot/visit-a-place/places/glasgow-cathedral/'
          },
          {
            name: 'The Gannet',
            type: 'eat',
            notes: 'Michelin-recommended modern Scottish cuisine. Seasonal menu with local ingredients.',
            rating: 4.6,
            travelTime: 'Finnieston',
            map: 'https://maps.google.com/?q=The%20Gannet%20Glasgow',
            website: 'https://www.thegannetgla.com/'
          },
          {
            name: 'Riverside Museum',
            type: 'activity',
            notes: 'Free transport museum designed by Zaha Hadid. Vintage cars, locomotives, and tall ship Glenlee.',
            rating: 4.7,
            travelTime: 'West End',
            map: 'https://maps.google.com/?q=Riverside%20Museum%20Glasgow',
            website: 'https://www.glasgowlife.org.uk/museums/venues/riverside-museum'
          },
          {
            name: 'Ashton Lane',
            type: 'eat',
            notes: 'Cobbled West End lane with pubs, restaurants, and Grosvenor Cinema. Lively nightlife.',
            rating: 4.5,
            travelTime: 'West End',
            map: 'https://maps.google.com/?q=Ashton%20Lane%20Glasgow'
          }
        ],
        facts: [
          'Glasgow is Scotland\'s largest city with 630,000 residents.',
          'The city has more listed buildings per capita than anywhere in the UK except Bath.',
          'Charles Rennie Mackintosh, the Art Nouveau architect, was born and worked in Glasgow.',
          'Glasgow\'s Subway is the third-oldest in the world (after London and Budapest), opening in 1896.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Glasgow Subway',
            type: 'metro',
            notes: 'Circular line serving 15 stations. Use contactless or buy a day ticket.',
            website: 'https://www.spt.co.uk/subway/',
            app: 'SPT Subway app'
          },
          {
            name: 'Glasgow Buses',
            type: 'bus',
            notes: 'First Bus and McGill\'s services cover the city. Use contactless for best fares.',
            website: 'https://www.firstbus.co.uk/greater-glasgow',
            app: 'First Bus app'
          },
          {
            name: 'ScotRail',
            type: 'rail',
            notes: 'Connects Glasgow to Edinburgh (50 min), Highlands, and rest of Scotland.',
            website: 'https://www.scotrail.co.uk/',
            app: 'ScotRail app'
          }
        ]
      }
    }
  },
  weather: {
    city: 'London',
    lat: 51.5074,
    lon: -0.1278
  },
  news: {
    query: 'UK travel families safety updates',
    region: 'GB',
    staticAlerts: [
      {
        id: 'gb_bank_holidays',
        type: 'tip',
        title: 'Bank Holiday Travel',
        description: 'Bank holidays see heavy traffic and transport disruption. Book accommodation and trains early.',
        priority: 'medium',
        icon: '🏖️',
        months: [5, 8, 12]
      },
      {
        id: 'gb_weather',
        type: 'tip',
        title: 'Pack Layers',
        description: 'UK weather is famously unpredictable. Always carry a waterproof jacket and layers.',
        priority: 'low',
        icon: '🌦️'
      },
      {
        id: 'gb_edinburgh_festival',
        type: 'event',
        title: 'Edinburgh Festival Fringe',
        description: 'World\'s largest arts festival runs throughout August. Book accommodation months in advance.',
        priority: 'high',
        icon: '🎭',
        months: [8]
      },
      {
        id: 'gb_notting_hill',
        type: 'event',
        title: 'Notting Hill Carnival',
        description: 'Europe\'s largest street festival (late August). Expect transport disruption in West London.',
        priority: 'medium',
        icon: '🎊',
        months: [8]
      },
      {
        id: 'gb_christmas_markets',
        type: 'event',
        title: 'Christmas Markets',
        description: 'Traditional markets in Bath, Birmingham, Edinburgh, and Manchester run November-December.',
        priority: 'low',
        icon: '🎄',
        months: [11, 12]
      },
      {
        id: 'gb_train_strikes',
        type: 'warning',
        title: 'Rail Strike Action',
        description: 'Train strikes occur periodically. Check National Rail website before travel and book flexible tickets.',
        priority: 'medium',
        icon: '🚂'
      },
      {
        id: 'gb_school_holidays',
        type: 'tip',
        title: 'School Holiday Pricing',
        description: 'Accommodation and attractions cost 30-50% more during school holidays (late July-early September, Easter, half-terms).',
        priority: 'low',
        icon: '🎒',
        months: [2, 4, 7, 8, 10]
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Stonehenge',
        type: 'activity',
        notes: 'Prehistoric monument near Salisbury. Book timed entry tickets online.',
        rating: 4.5,
        travelTime: '2 hours from London',
        map: 'https://maps.google.com/?q=Stonehenge',
        website: 'https://www.english-heritage.org.uk/visit/places/stonehenge/'
      },
      {
        name: 'The Cotswolds',
        type: 'activity',
        notes: 'Picture-perfect villages with honey-stone cottages. Rent a car to explore Bourton-on-the-Water, Bibury, and Stow-on-the-Wold.',
        rating: 4.7,
        travelTime: '2 hours from London',
        map: 'https://maps.google.com/?q=The%20Cotswolds',
        website: 'https://www.cotswolds.com/'
      },
      {
        name: 'Lake District National Park',
        type: 'activity',
        notes: 'England\'s largest national park. Hiking, lakes, and stunning scenery. Visit Windermere, Keswick, and Beatrix Potter\'s cottage.',
        rating: 4.8,
        travelTime: 'Cumbria (North West England)',
        map: 'https://maps.google.com/?q=Lake%20District%20National%20Park',
        website: 'https://www.lakedistrict.gov.uk/'
      },
      {
        name: 'Bath',
        type: 'activity',
        notes: 'Georgian city with Roman baths and stunning architecture. UNESCO World Heritage Site. Don\'t miss the Royal Crescent.',
        rating: 4.6,
        travelTime: '90 min from London',
        map: 'https://maps.google.com/?q=Bath%20UK',
        website: 'https://visitbath.co.uk/'
      },
      {
        name: 'Oxford University',
        type: 'activity',
        notes: 'Historic university city. Visit colleges, Bodleian Library, and Ashmolean Museum. Christ Church inspired Harry Potter\'s Great Hall.',
        rating: 4.7,
        travelTime: '1 hour from London',
        map: 'https://maps.google.com/?q=Oxford%20University',
        website: 'https://www.ox.ac.uk/visitors'
      },
      {
        name: 'Cambridge University',
        type: 'activity',
        notes: 'Beautiful university city. Punting on the River Cam is a must-do. Visit King\'s College Chapel and The Backs.',
        rating: 4.7,
        travelTime: '1 hour from London',
        map: 'https://maps.google.com/?q=Cambridge%20University',
        website: 'https://www.visitcambridge.org/'
      },
      {
        name: 'Windsor Castle',
        type: 'activity',
        notes: 'Oldest occupied castle in the world. Check opening times (closes during state visits). State Apartments and St George\'s Chapel included.',
        rating: 4.6,
        travelTime: '45 min from London',
        map: 'https://maps.google.com/?q=Windsor%20Castle',
        website: 'https://www.rct.uk/visit/windsor-castle'
      },
      {
        name: 'York',
        type: 'activity',
        notes: 'Medieval walled city with York Minster cathedral and Viking heritage. Walk the city walls and visit Shambles medieval street.',
        rating: 4.7,
        travelTime: '2 hours from London',
        map: 'https://maps.google.com/?q=York%20UK',
        website: 'https://www.visityork.org/'
      },
      {
        name: 'Stratford-upon-Avon',
        type: 'activity',
        notes: 'Shakespeare\'s birthplace. Visit his home, Anne Hathaway\'s Cottage, and see RSC performances.',
        rating: 4.6,
        travelTime: '2 hours from London',
        map: 'https://maps.google.com/?q=Stratford-upon-Avon',
        website: 'https://www.shakespeare.org.uk/'
      },
      {
        name: 'Scottish Highlands',
        type: 'activity',
        notes: 'Dramatic landscapes, lochs, and castles. Visit Loch Ness, Glencoe, and Isle of Skye.',
        rating: 4.9,
        travelTime: 'North Scotland',
        map: 'https://maps.google.com/?q=Scottish%20Highlands',
        website: 'https://www.visitscotland.com/destinations-maps/highlands/'
      },
      {
        name: 'Canterbury Cathedral',
        type: 'activity',
        notes: 'UNESCO site and mother church of worldwide Anglicanism. Founded in 597 AD.',
        rating: 4.7,
        travelTime: '1 hour from London',
        map: 'https://maps.google.com/?q=Canterbury%20Cathedral',
        website: 'https://www.canterbury-cathedral.org/'
      },
      {
        name: 'Brighton',
        type: 'activity',
        notes: 'Seaside city with Royal Pavilion, pebble beach, and vibrant LGBTQ+ scene. Visit The Lanes for vintage shopping.',
        rating: 4.5,
        travelTime: '1 hour from London',
        map: 'https://maps.google.com/?q=Brighton%20UK',
        website: 'https://www.visitbrighton.com/'
      },
      {
        name: 'Fish & Chips',
        type: 'eat',
        notes: 'National dish best enjoyed at the seaside. Cod or haddock, mushy peas, and curry sauce optional. £8-12.',
        rating: 4.6,
        travelTime: 'Everywhere'
      },
      {
        name: 'Traditional Afternoon Tea',
        type: 'eat',
        notes: 'Finger sandwiches, scones with clotted cream and jam, pastries. Book ahead at hotels like The Ritz or Claridge\'s. £40-70.',
        rating: 4.7,
        travelTime: 'Major cities'
      }
    ],
    facts: [
      'The UK has 33 UNESCO World Heritage Sites, including Stonehenge, Hadrian\'s Wall, and the Tower of London.',
      'Great Britain refers to England, Scotland, and Wales; the UK includes Northern Ireland.',
      'The London Eye was the world\'s tallest Ferris wheel when it opened in 2000.',
      'The UK has over 1,500 castles, more per square mile than any other country.',
      'Fish and chips became a British staple in the 1860s and remains the nation\'s favourite takeaway.',
      'The British Library holds over 170 million items, including original Beatles lyrics and Magna Carta.',
      'The UK invented the world\'s first postage stamp (Penny Black, 1840) and still doesn\'t print its country name on stamps.',
      'There are over 20,000 pubs in England—the oldest, Ye Olde Fighting Cocks in St Albans, dates from 793 AD.'
    ]
  },
  content: {
    emergency: {
      police: '999',
      ambulance: '999',
      fire: '999'
    },
    transitCards: [
      'Oyster Card (London)',
      'Contactless payment cards accepted nationwide'
    ],
    sockets: 'Type G · 230V',
    etiquetteNotes: [
      'Queueing is taken seriously—always join the back of the queue and never push in',
      'Say "please" and "thank you" frequently; "cheers" works for casual thanks',
      'Tipping: 10-15% in restaurants if service not included, round up taxi fares, no tipping in pubs',
      'Stand on the right on escalators (especially the Tube); walk on the left',
      'Pubs: Order drinks at the bar and pay immediately. Don\'t tip bartenders or wait for table service',
      'It\'s polite to apologize even when it\'s not your fault—"Sorry!" is used liberally',
      'Mind the gap (between train and platform)—you\'ll hear this announcement frequently',
      'Tea is traditionally served with milk, not lemon (except for Earl Grey)',
      'When invited for dinner, bring wine or flowers but never white lilies (associated with funerals)',
      'Table manners: Fork in left hand, knife in right; keep hands visible above the table',
      'Punctuality is important—arrive on time for appointments and social gatherings',
      'Avoid loud conversations on public transport; keep mobile calls brief and quiet'
    ],
    quickStarts: [
      {
        title: 'London Classics: Westminster, Buckingham Palace & Tower Bridge',
        tags: ['iconic', 'history', 'family']
      },
      {
        title: 'Harry Potter Tour: King\'s Cross, Warner Bros Studio & Oxford',
        tags: ['family', 'culture', 'film']
      },
      {
        title: 'Scottish Highlands: Edinburgh, Loch Ness & Glencoe',
        tags: ['nature', 'scenic', 'adventure']
      },
      {
        title: 'Historic England: Bath, Stonehenge & Cotswolds',
        tags: ['history', 'culture', 'scenic']
      },
      {
        title: 'University Cities: Oxford & Cambridge Day Trips',
        tags: ['culture', 'architecture', 'education']
      },
      {
        title: 'Beatles & Football: Liverpool & Manchester',
        tags: ['music', 'sports', 'culture']
      },
      {
        title: 'Coastal England: Brighton, Canterbury & Dover Cliffs',
        tags: ['beach', 'history', 'scenic']
      },
      {
        title: 'Royal Windsor & Afternoon Tea Experience',
        tags: ['royal', 'food', 'luxury']
      },
      {
        title: 'Literary Britain: Stratford-upon-Avon, Lake District & Edinburgh',
        tags: ['culture', 'literary', 'history']
      },
      {
        title: 'Countryside Escapes: Cotswolds Villages & Peak District',
        tags: ['nature', 'hiking', 'villages']
      }
    ]
  },
  features: {
    showJetLagTools: false,           // Minimal time difference from most European countries
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default GB;
