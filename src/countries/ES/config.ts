// ──────────────────────────────────────────────────────────────────────────────
// Spain Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const ES: CountryConfig = {
  iso2: 'ES',
  name: 'Spain',
  defaultLocale: 'es-ES',
  locales: ['es-ES', 'en-GB', 'ca-ES'],
  currency: 'EUR',
  timeZones: ['Europe/Madrid', 'Atlantic/Canary'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'ES',
    dialingCountry: 'ES'
  },
  cities: {
    madrid: {
      id: 'madrid',
      name: 'Madrid',
      weather: {
        lat: 40.4168,
        lon: -3.7038
      },
      highlights: {
        localOptions: [
          {
            name: 'Prado Museum',
            type: 'activity',
            notes: 'World-class art—Velázquez, Goya, El Greco. Free last 2 hours daily (6-8pm Mon-Sat, 5-7pm Sun).',
            rating: 4.8,
            travelTime: 'Retiro',
            map: 'https://maps.google.com/?q=Prado+Museum+Madrid',
            website: 'https://www.museodelprado.es/en'
          },
          {
            name: 'Retiro Park',
            type: 'activity',
            notes: '125-hectare park with Crystal Palace, lake, rose garden. Rent rowboats €6/30min.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Retiro+Park+Madrid'
          },
          {
            name: 'Mercado de San Miguel',
            type: 'eat',
            notes: 'Upscale food market—tapas, oysters, croquetas, vermouth. Touristy but quality.',
            rating: 4.5,
            travelTime: 'Near Plaza Mayor',
            map: 'https://maps.google.com/?q=Mercado+de+San+Miguel+Madrid',
            website: 'https://www.mercadodesanmiguel.es/en/'
          },
          {
            name: 'Royal Palace',
            type: 'activity',
            notes: 'Europe\'s largest functioning palace (3,418 rooms). Changing of guard Wed/Sat 11am.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Royal+Palace+Madrid',
            website: 'https://www.patrimonionacional.es/en'
          }
        ],
        facts: [
          'Madrid is Europe\'s highest capital at 667m elevation—clear mountain air.',
          'The city has more bars per capita than any European capital (over 3,000).',
          'Sunday flea market El Rastro dates to the 1740s—500+ vendors, millions of visitors.',
          'Madrid never sleeps—dinners start at 10pm, clubs open at 1am.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Madrid Metro',
            type: 'metro',
            notes: '12 lines + 3 light rail. 2nd largest in EU. Buy Multi Card—€1.50-2 per trip.',
            website: 'https://www.metromadrid.es/en',
            app: 'Metro de Madrid app'
          },
          {
            name: 'Cercanías (Commuter Rail)',
            type: 'rail',
            notes: '9 lines to suburbs, airport, Toledo, Segovia. Same Multi Card.',
            website: 'https://www.renfe.com/en/cercanias'
          }
        ]
      }
    },
    barcelona: {
      id: 'barcelona',
      name: 'Barcelona',
      weather: {
        lat: 41.3851,
        lon: 2.1734
      },
      highlights: {
        localOptions: [
          {
            name: 'Sagrada Família',
            type: 'activity',
            notes: 'Gaudí\'s unfinished masterpiece (completion 2026). Book 2-3 months ahead—tower access sells out.',
            rating: 4.9,
            travelTime: 'Eixample',
            map: 'https://maps.google.com/?q=Sagrada+Familia+Barcelona',
            website: 'https://sagradafamilia.org/en/'
          },
          {
            name: 'Park Güell',
            type: 'activity',
            notes: 'Gaudí\'s mosaic park with city views. Timed entry required—€13 online, €15 at gate.',
            rating: 4.7,
            travelTime: 'Gràcia',
            map: 'https://maps.google.com/?q=Park+Guell+Barcelona',
            website: 'https://parkguell.barcelona/'
          },
          {
            name: 'La Boqueria Market',
            type: 'eat',
            notes: 'Iconic food market off Las Ramblas. Fresh juice stands, jamón stalls, seafood counters.',
            rating: 4.6,
            travelTime: 'Gothic Quarter',
            map: 'https://maps.google.com/?q=La+Boqueria+Barcelona',
            website: 'https://www.boqueria.barcelona/home'
          },
          {
            name: 'Barceloneta Beach',
            type: 'activity',
            notes: '1km sandy beach with chiringuitos (beach bars). Crowded in summer—go early.',
            rating: 4.4,
            travelTime: 'Waterfront',
            map: 'https://maps.google.com/?q=Barceloneta+Beach'
          }
        ],
        facts: [
          'Barcelona is Catalonia\'s capital—locals speak Catalan first, Spanish second.',
          'Gaudí\'s 7 works in the city are UNESCO World Heritage Sites.',
          'The city was redesigned for the 1992 Olympics, opening 4km of beaches.',
          'FC Barcelona\'s Camp Nou stadium holds 99,354—Europe\'s largest.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Barcelona Metro',
            type: 'metro',
            notes: '12 lines (L1-L12). Buy T-Casual card—10 trips €12.15.',
            website: 'https://www.tmb.cat/en/home',
            app: 'TMB app'
          },
          {
            name: 'Bicing Bike Share',
            type: 'bus',
            notes: '7,000+ bikes. Annual membership only (residents). Tourists use Donkey Republic.',
            website: 'https://www.tmb.cat/en/barcelona/bicing'
          }
        ]
      }
    },
    seville: {
      id: 'seville',
      name: 'Seville',
      weather: {
        lat: 37.3886,
        lon: -5.9823
      },
      highlights: {
        localOptions: [
          {
            name: 'Alcázar of Seville',
            type: 'activity',
            notes: 'Moorish palace with stunning gardens. Game of Thrones filming location. Book 2-3 days ahead.',
            rating: 4.9,
            travelTime: 'Historic Center',
            map: 'https://maps.google.com/?q=Alcazar+of+Seville',
            website: 'https://www.alcazarsevilla.org/en/'
          },
          {
            name: 'Seville Cathedral',
            type: 'activity',
            notes: 'World\'s largest Gothic cathedral. Climb Giralda tower (104m) for panoramas.',
            rating: 4.8,
            travelTime: 'Historic Center',
            map: 'https://maps.google.com/?q=Seville+Cathedral',
            website: 'https://www.catedraldesevilla.es/en/'
          },
          {
            name: 'Flamenco at Casa de la Memoria',
            type: 'activity',
            notes: 'Intimate flamenco shows (80 seats). €20—reserve online for 9pm show.',
            rating: 4.7,
            travelTime: 'Santa Cruz',
            map: 'https://maps.google.com/?q=Casa+de+la+Memoria+Seville',
            website: 'https://www.casadelamemoria.es/en/'
          },
          {
            name: 'Tapas in Triana',
            type: 'eat',
            notes: 'Cross the bridge to Triana district—authentic bars, ceramic workshops.',
            rating: 4.6,
            travelTime: 'Triana',
            map: 'https://maps.google.com/?q=Triana+Seville'
          }
        ],
        facts: [
          'Seville is Europe\'s hottest major city—summer temps hit 45°C (113°F).',
          'The city invented tapas culture—bars serve free snacks with drinks.',
          'Semana Santa (Holy Week) processions draw 1 million visitors—book hotels 6+ months ahead.',
          'The April Fair (Feria de Abril) features 1,000+ casetas (tents) for flamenco dancing and sherry.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Seville Metro',
            type: 'metro',
            notes: '1 line (more under construction). €1.35 single, €4.50 day pass.',
            website: 'https://www.metro-sevilla.es/en',
            app: 'Metro Sevilla app'
          },
          {
            name: 'Sevici Bike Share',
            type: 'bus',
            notes: '2,750 bikes. First 30 min free, €1/hour after. Flat city—ideal for cycling.',
            website: 'https://www.sevici.es/'
          }
        ]
      }
    },
    valencia: {
      id: 'valencia',
      name: 'Valencia',
      weather: {
        lat: 39.4699,
        lon: -0.3763
      },
      highlights: {
        localOptions: [
          {
            name: 'City of Arts and Sciences',
            type: 'activity',
            notes: 'Futuristic complex—Oceanogràfic aquarium, Science Museum, IMAX. Combo tickets €37.',
            rating: 4.7,
            travelTime: 'Quatre Carreres',
            map: 'https://maps.google.com/?q=City+of+Arts+and+Sciences+Valencia',
            website: 'https://www.cac.es/en/home.html'
          },
          {
            name: 'Mercado Central',
            type: 'eat',
            notes: 'Modernist market hall with 400 stalls. Buy horchata (tiger nut milk) and fartons (sweet bread).',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Mercado+Central+Valencia',
            website: 'https://www.mercadocentralvalencia.es/en/'
          },
          {
            name: 'Paella at Casa Carmela',
            type: 'eat',
            notes: 'Paella birthplace—try Valenciana with chicken/rabbit, or seafood. Lunch only (1-3:30pm).',
            rating: 4.8,
            travelTime: 'Malvarrosa Beach',
            map: 'https://maps.google.com/?q=Casa+Carmela+Valencia',
            website: 'https://www.restaurantecasacarmela.com/'
          },
          {
            name: 'Turia Gardens',
            type: 'activity',
            notes: '9km park in former riverbed. Cycling, playgrounds, Gulliver Park (giant climbing structure).',
            rating: 4.7,
            travelTime: 'City-wide',
            map: 'https://maps.google.com/?q=Turia+Gardens+Valencia'
          }
        ],
        facts: [
          'Valencia invented paella—the original recipe uses rabbit, chicken, and green beans (no seafood!).',
          'Las Fallas festival (March) features 700+ sculptures burned in massive bonfires.',
          'The city has 300+ days of sunshine per year and 320km of beaches.',
          'Holy Grail legend: Valencia Cathedral claims to house the chalice used at the Last Supper.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Valencia Metro',
            type: 'metro',
            notes: '9 lines (5 metro, 4 tram). Buy TuiN card—€1.50 single, €4 day pass.',
            website: 'https://www.metrovalencia.es/en/',
            app: 'Metro Valencia app'
          },
          {
            name: 'Valenbisi Bike Share',
            type: 'bus',
            notes: '2,750 bikes. First 30 min free—perfect for Turia Gardens route.',
            website: 'https://www.valenbisi.es/'
          }
        ]
      }
    },
    bilbao: {
      id: 'bilbao',
      name: 'Bilbao',
      weather: {
        lat: 43.2630,
        lon: -2.9350
      },
      highlights: {
        localOptions: [
          {
            name: 'Guggenheim Museum',
            type: 'activity',
            notes: 'Titanium-clad Frank Gehry masterpiece. €16 entry—see Puppy sculpture (Jeff Koons) outside.',
            rating: 4.8,
            travelTime: 'Abando',
            map: 'https://maps.google.com/?q=Guggenheim+Museum+Bilbao',
            website: 'https://www.guggenheim-bilbao.eus/en'
          },
          {
            name: 'Casco Viejo (Old Town)',
            type: 'eat',
            notes: 'Pintxos bars on every corner—pay per toothpick. Try Gilda (anchovy, olive, pepper).',
            rating: 4.7,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Casco+Viejo+Bilbao'
          },
          {
            name: 'San Juan de Gaztelugatxe',
            type: 'activity',
            notes: 'Islet with 241 steps to chapel. Game of Thrones Dragonstone location. 1 hour drive.',
            rating: 4.9,
            travelTime: '1 hour by car/bus',
            map: 'https://maps.google.com/?q=San+Juan+de+Gaztelugatxe'
          },
          {
            name: 'Mercado de la Ribera',
            type: 'shopping',
            notes: 'Europe\'s largest covered market. Fresh fish, Ibérico ham, Basque cheese.',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Mercado+de+la+Ribera+Bilbao'
          }
        ],
        facts: [
          'Bilbao transformed from industrial city to cultural hub after the 1997 Guggenheim opening.',
          'Basque Country has its own language (Euskara)—one of Europe\'s oldest.',
          'Pintxos culture: each bar has specialty—bar hopping is an art form.',
          'The city invented the Spanish omelette (tortilla española) in the 1800s.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Bilbao Metro',
            type: 'metro',
            notes: '3 lines designed by Norman Foster. Buy Barik card—€1.60 Zone 1.',
            website: 'https://www.metrobilbao.eus/en',
            app: 'Metro Bilbao app'
          },
          {
            name: 'Tram',
            type: 'metro',
            notes: '1 line along riverfront. Same Barik card.',
            website: 'https://www.euskotren.eus/en'
          }
        ]
      }
    },
    granada: {
      id: 'granada',
      name: 'Granada',
      weather: {
        lat: 37.1773,
        lon: -3.5986
      },
      highlights: {
        localOptions: [
          {
            name: 'Alhambra Palace',
            type: 'activity',
            notes: 'Moorish palace-fortress. Tickets sell out 3 months ahead—buy at 8am on alhambra-patronato.es.',
            rating: 4.9,
            travelTime: 'Sabika Hill',
            map: 'https://maps.google.com/?q=Alhambra+Granada',
            website: 'https://www.alhambra-patronato.es/en'
          },
          {
            name: 'Albaicín Quarter',
            type: 'activity',
            notes: 'Moorish neighborhood with white-washed houses. Climb to Mirador San Nicolás for sunset views.',
            rating: 4.8,
            travelTime: 'Historic Center',
            map: 'https://maps.google.com/?q=Albaicin+Granada'
          },
          {
            name: 'Free Tapas Bars',
            type: 'eat',
            notes: 'Granada\'s bars serve free tapa with every drink—3 beers = 3 tapas. Try Bodegas Castañeda.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Bodegas+Castaneda+Granada'
          },
          {
            name: 'Sierra Nevada Skiing',
            type: 'activity',
            notes: 'Europe\'s southernmost ski resort. 45 min drive—ski in morning, beach in afternoon!',
            rating: 4.6,
            travelTime: '45 min by car/bus',
            map: 'https://maps.google.com/?q=Sierra+Nevada+Ski+Resort',
            website: 'https://sierranevada.es/en/'
          }
        ],
        facts: [
          'Granada is Spain\'s only major city where tapas are still free with drinks.',
          'The Alhambra receives 2.7 million visitors per year—Spain\'s most-visited monument.',
          'The city was the last Muslim stronghold in Spain, conquered in 1492.',
          'Sierra Nevada is the only place in Europe where you can ski and see the Mediterranean.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Granada Metro',
            type: 'metro',
            notes: '1 line (light rail). €1.35 single—connects train station to Albaicín.',
            website: 'https://www.metropolitanogranada.es/en/',
            app: 'Metro Granada app'
          },
          {
            name: 'Albaicín Minibuses',
            type: 'bus',
            notes: 'Lines C31/C32 navigate steep streets. €1.40—saves uphill walks.',
            website: 'https://www.transportesrober.com/'
          }
        ]
      }
    },
    malaga: {
      id: 'malaga',
      name: 'Málaga',
      weather: {
        lat: 36.7213,
        lon: -4.4214
      },
      highlights: {
        localOptions: [
          {
            name: 'Picasso Museum',
            type: 'activity',
            notes: 'Birthplace of Picasso. Museum has 285 works. Free last 2 hours on Sundays.',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Picasso+Museum+Malaga',
            website: 'https://www.museopicassomalaga.org/en'
          },
          {
            name: 'Alcazaba & Gibralfaro',
            type: 'activity',
            notes: 'Moorish fortress with Roman theater. Combo ticket €5.50—climb for harbor views.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Alcazaba+Malaga'
          },
          {
            name: 'Espetos de Sardinas',
            type: 'eat',
            notes: 'Grilled sardines on beach. Try El Tintero—no menus, waiters shout specials.',
            rating: 4.5,
            travelTime: 'Playa del Palo',
            map: 'https://maps.google.com/?q=El+Tintero+Malaga'
          },
          {
            name: 'Caminito del Rey',
            type: 'activity',
            notes: 'Cliffside walkway 100m high. 1 hour drive—book 1-2 weeks ahead (€10).',
            rating: 4.9,
            travelTime: '1 hour by car',
            map: 'https://maps.google.com/?q=Caminito+del+Rey',
            website: 'https://www.caminitodelrey.info/en/'
          }
        ],
        facts: [
          'Málaga has 320 days of sunshine per year—Europe\'s warmest winter climate.',
          'The city is Costa del Sol\'s capital—gateway to 150km of beaches.',
          'Málaga sweet wine was Shakespeare\'s favorite—mentioned in his plays.',
          'The port is the busiest cruise terminal in Spain—500,000+ passengers annually.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Málaga Metro',
            type: 'metro',
            notes: '2 lines. €1.35 single. Line 1 connects airport to city.',
            website: 'https://www.metromalaga.es/en/',
            app: 'Metro Málaga app'
          },
          {
            name: 'Málaga Bici',
            type: 'bus',
            notes: 'Bike share with 150 stations. First 30 min free—beachfront cycling paths.',
            website: 'https://www.malagabici.es/'
          }
        ]
      }
    },
    sanSebastian: {
      id: 'sanSebastian',
      name: 'San Sebastián',
      weather: {
        lat: 43.3183,
        lon: -1.9812
      },
      highlights: {
        localOptions: [
          {
            name: 'La Concha Beach',
            type: 'activity',
            notes: 'Europe\'s most beautiful city beach—crescent bay with golden sand. Kayak rentals available.',
            rating: 4.9,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=La+Concha+Beach+San+Sebastian'
          },
          {
            name: 'Parte Vieja Pintxos Crawl',
            type: 'eat',
            notes: 'Old Town has world\'s highest Michelin star concentration. Pintxo hopping essential.',
            rating: 4.8,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Parte+Vieja+San+Sebastian'
          },
          {
            name: 'Monte Igueldo Funicular',
            type: 'activity',
            notes: '1912 funicular to hilltop amusement park. €4 round-trip—panoramic bay views.',
            rating: 4.6,
            travelTime: 'West side',
            map: 'https://maps.google.com/?q=Monte+Igueldo+San+Sebastian'
          },
          {
            name: 'Arzak Restaurant',
            type: 'eat',
            notes: '3 Michelin stars—book 2-3 months ahead. €255 tasting menu.',
            rating: 4.9,
            travelTime: 'Gros',
            map: 'https://maps.google.com/?q=Arzak+Restaurant+San+Sebastian',
            website: 'https://www.arzak.es/en/'
          }
        ],
        facts: [
          'San Sebastián has 16 Michelin stars—more per capita than anywhere except Kyoto.',
          'The city hosts the International Film Festival every September.',
          'Basque pintxos average €3-4 each—order txakoli (sparkling white wine) to pair.',
          'La Concha Beach was Queen Isabella II\'s summer retreat in the 1850s, starting the tourism boom.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Dbus',
            type: 'bus',
            notes: '30+ lines. Buy Mugi card—€1.85 per trip. Beach to Old Town is walkable (20 min).',
            website: 'https://www.dbus.eus/en',
            app: 'Dbus app'
          },
          {
            name: 'Bizi Bike Share',
            type: 'bus',
            notes: '200 bikes. First 30 min free—scenic coastal paths.',
            website: 'https://www.mugi.eus/en/bizi/'
          }
        ]
      }
    }
  },
  weather: {
    city: 'Madrid',
    lat: 40.4168,
    lon: -3.7038
  },
  news: {
    query: 'Spain travel families safety updates',
    region: 'ES',
    staticAlerts: [
      {
        id: 'es_siesta',
        type: 'tip',
        title: 'Siesta Hours',
        description: 'Many shops close 2-5pm. Restaurants serve lunch 2-4pm, dinner 9-11pm.',
        priority: 'medium',
        icon: '😴'
      },
      {
        id: 'es_august',
        type: 'warning',
        title: 'August Closures',
        description: 'Many businesses close for summer holidays in August—cities like Madrid empty out.',
        priority: 'low',
        icon: '🏖️'
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Sagrada Família',
        type: 'activity',
        notes: 'Gaudí\'s unfinished masterpiece in Barcelona. Book months ahead.',
        rating: 4.9,
        travelTime: 'Barcelona',
        map: 'https://maps.google.com/?q=Sagrada+Familia+Barcelona',
        website: 'https://sagradafamilia.org/en/'
      },
      {
        name: 'Alhambra',
        type: 'activity',
        notes: 'Moorish palace in Granada. Tickets sell out 3 months ahead.',
        rating: 4.9,
        travelTime: 'Granada',
        map: 'https://maps.google.com/?q=Alhambra+Granada',
        website: 'https://www.alhambra-patronato.es/en'
      },
      {
        name: 'Tapas & Pintxos',
        type: 'eat',
        notes: 'Bar hop for small plates—free in Granada, €3-4 in Basque Country.',
        rating: 4.8,
        travelTime: 'Everywhere'
      },
      {
        name: 'Camino de Santiago',
        type: 'activity',
        notes: 'Pilgrimage trail ending in Santiago de Compostela. Walk last 100km for certificate.',
        rating: 4.8,
        travelTime: 'Galicia',
        map: 'https://maps.google.com/?q=Camino+de+Santiago'
      }
    ],
    facts: [
      'Spain is the world\'s 2nd most-visited country after France (83 million tourists/year).',
      'The country produces 45% of the world\'s olive oil—mostly from Andalusia.',
      'Spain has 49 UNESCO World Heritage Sites—3rd most globally.',
      'Spanish is the world\'s 2nd most-spoken native language with 485 million speakers.'
    ]
  },
  content: {
    emergency: {
      police: '091',
      ambulance: '061',
      fire: '080'
    },
    transitCards: [
      'Multi Card (Madrid)',
      'T-Casual (Barcelona)',
      'TuiN (Valencia)',
      'Barik (Bilbao)'
    ],
    sockets: 'Type C/F · 230V',
    etiquetteNotes: [
      'Greet with two kisses (cheek-to-cheek air kisses)',
      'Dinner starts at 9-10pm—restaurants open late',
      'Lunch is the main meal (2-4pm), often 3 courses + wine',
      'Tipping is optional—round up 5-10% for excellent service',
      'Say "Buen provecho" (enjoy your meal) when others are eating',
      'August is vacation month—expect closures'
    ],
    quickStarts: [
      {
        title: 'Barcelona: Gaudí, Gothic Quarter & Beach',
        tags: ['architecture', 'art', 'Mediterranean']
      },
      {
        title: 'Andalusia: Seville, Granada & Córdoba',
        tags: ['Moorish', 'flamenco', 'historic']
      },
      {
        title: 'Basque Country: San Sebastián, Bilbao & Wine Regions',
        tags: ['gastronomy', 'culture', 'coastal']
      },
      {
        title: 'Madrid & Toledo: Royal Palace, Prado & Day Trip',
        tags: ['museums', 'history', 'central']
      }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default ES;
