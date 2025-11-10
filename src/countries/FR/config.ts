// ──────────────────────────────────────────────────────────────────────────────
// France Country Configuration
// ──────────────────────────────────────────────────────────────────────────────

import { CountryConfig } from '../types';

const FR: CountryConfig = {
  iso2: 'FR',
  name: 'France',
  defaultLocale: 'fr-FR',
  locales: ['fr-FR', 'en-GB'],
  currency: 'EUR',
  timeZones: ['Europe/Paris'],
  map: {
    provider: 'google',
    coordSystem: 'WGS84'
  },
  forms: {
    addressSchema: 'FR',
    dialingCountry: 'FR'
  },
  cities: {
    paris: {
      id: 'paris',
      name: 'Paris',
      weather: {
        lat: 48.8566,
        lon: 2.3522
      },
      highlights: {
        localOptions: [
          {
            name: 'Louvre Museum',
            type: 'activity',
            notes: 'World\'s largest art museum. Book timed entry online—avoid Wednesday/weekend crowds.',
            rating: 4.8,
            travelTime: '1st Arrondissement',
            map: 'https://maps.google.com/?q=Louvre+Museum+Paris',
            website: 'https://www.louvre.fr/en'
          },
          {
            name: 'Eiffel Tower',
            type: 'activity',
            notes: 'Iconic 330m tower. Summit tickets sell out weeks ahead—book at 9am exactly 60 days prior.',
            rating: 4.7,
            travelTime: 'Champ de Mars',
            map: 'https://maps.google.com/?q=Eiffel+Tower+Paris',
            website: 'https://www.toureiffel.paris/en'
          },
          {
            name: 'L\'As du Fallafel',
            type: 'eat',
            notes: 'Legendary falafel in the Marais. Lines form by noon—go at 11:30am opening.',
            rating: 4.6,
            travelTime: 'Le Marais',
            map: 'https://maps.google.com/?q=L%27As+du+Fallafel+Paris'
          },
          {
            name: 'Versailles Palace',
            type: 'activity',
            notes: 'Opulent royal château with gardens. RER C train from city center (40 min). Skip-the-line essential.',
            rating: 4.9,
            travelTime: 'Versailles (RER C)',
            map: 'https://maps.google.com/?q=Palace+of+Versailles',
            website: 'https://en.chateauversailles.fr/'
          }
        ],
        facts: [
          'Paris has 20 arrondissements spiraling clockwise from the center like a snail shell.',
          'The Métro is the world\'s 2nd busiest—over 1.5 billion trips per year.',
          'There are 464 Métro stations, with 180 station names repeated across lines.',
          'Boulangeries legally must bake bread on-site to use the title—buy croissants daily for freshness.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Paris Métro',
            type: 'metro',
            notes: '16 lines covering the city. Buy Navigo Easy card (€2) or week pass (Passe Navigo).',
            website: 'https://www.ratp.fr/en',
            app: 'Bonjour RATP / Île-de-France Mobilités'
          },
          {
            name: 'RER (Regional Express)',
            type: 'rail',
            notes: '5 lines (A-E) connecting suburbs, airports, Versailles. Same tickets as Métro within Paris.',
            website: 'https://www.ratp.fr/en'
          }
        ]
      }
    },
    lyon: {
      id: 'lyon',
      name: 'Lyon',
      weather: {
        lat: 45.764,
        lon: 4.8357
      },
      highlights: {
        localOptions: [
          {
            name: 'Vieux Lyon (Old Town)',
            type: 'activity',
            notes: 'Renaissance quarter with traboules (secret passageways). Start at Place Bellecour.',
            rating: 4.7,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Vieux+Lyon'
          },
          {
            name: 'Paul Bocuse Market',
            type: 'eat',
            notes: 'Indoor food hall named after Lyon\'s legendary chef. Oysters, cheese, charcuterie stalls.',
            rating: 4.6,
            travelTime: 'Part-Dieu',
            map: 'https://maps.google.com/?q=Les+Halles+de+Lyon+Paul+Bocuse'
          },
          {
            name: 'Basilica of Notre-Dame de Fourvière',
            type: 'activity',
            notes: 'Hilltop basilica with panoramic views. Free entry; take funicular from Vieux Lyon.',
            rating: 4.8,
            travelTime: 'Fourvière Hill',
            map: 'https://maps.google.com/?q=Basilica+Notre-Dame+de+Fourviere+Lyon',
            website: 'https://www.fourviere.org/en/'
          },
          {
            name: 'Bouchon Lyonnais',
            type: 'eat',
            notes: 'Traditional bistro serving quenelles, andouillette, praline tart. Reservations essential.',
            rating: 4.5,
            travelTime: 'Presqu\'île',
            map: 'https://maps.google.com/?q=Bouchon+Lyonnais+Lyon'
          }
        ],
        facts: [
          'Lyon is the gastronomic capital of France with 14 Michelin-starred restaurants.',
          'The city sits at the confluence of the Rhône and Saône rivers.',
          'Traboules are hidden Renaissance passageways—over 400 exist in Vieux Lyon.',
          'Lyon\'s December Festival of Lights (Fête des Lumières) draws 4 million visitors.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'TCL Metro & Tram',
            type: 'metro',
            notes: '4 metro lines + 6 tram lines. Buy Técély card or day pass at stations.',
            website: 'https://www.tcl.fr/en',
            app: 'TCL app'
          },
          {
            name: 'Funiculars',
            type: 'rail',
            notes: 'F1 to Fourvière Hill, F2 to Saint-Just. Included in metro tickets.',
            website: 'https://www.tcl.fr/en'
          }
        ]
      }
    },
    marseille: {
      id: 'marseille',
      name: 'Marseille',
      weather: {
        lat: 43.2965,
        lon: 5.3698
      },
      highlights: {
        localOptions: [
          {
            name: 'Vieux-Port (Old Port)',
            type: 'activity',
            notes: 'Historic harbor lined with seafood restaurants. Daily fish market 8am-1pm.',
            rating: 4.5,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Vieux-Port+Marseille'
          },
          {
            name: 'Calanques National Park',
            type: 'activity',
            notes: 'Dramatic limestone cliffs and turquoise coves. Hike Calanque de Sormiou (3 hours round-trip).',
            rating: 4.9,
            travelTime: '30 min by bus',
            map: 'https://maps.google.com/?q=Calanques+National+Park',
            website: 'https://www.calanques-parcnational.fr/en'
          },
          {
            name: 'Bouillabaisse at Chez Fonfon',
            type: 'eat',
            notes: 'Traditional Provençal fish stew. Order 24 hours ahead—€65-80 per person.',
            rating: 4.7,
            travelTime: 'Vallon des Auffes',
            map: 'https://maps.google.com/?q=Chez+Fonfon+Marseille',
            website: 'https://www.chez-fonfon.com/'
          },
          {
            name: 'Basilique Notre-Dame de la Garde',
            type: 'activity',
            notes: 'Hilltop basilica with gold Madonna statue. Free entry; bus or 20-min uphill walk.',
            rating: 4.8,
            travelTime: 'La Garde Hill',
            map: 'https://maps.google.com/?q=Notre-Dame+de+la+Garde+Marseille'
          }
        ],
        facts: [
          'Marseille is France\'s oldest city, founded by Greek sailors in 600 BC.',
          'The city is the 2nd largest in France with 870,000 residents.',
          'Bouillabaisse must contain at least 4 types of rockfish to be authentic.',
          'The Frioul Islands off the coast house the Château d\'If from "The Count of Monte Cristo."'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Marseille Metro',
            type: 'metro',
            notes: '2 lines (M1, M2). Buy RTM card or 24-hour pass.',
            website: 'https://www.rtm.fr/en',
            app: 'RTM app'
          },
          {
            name: 'Tram & Bus',
            type: 'bus',
            notes: '3 tram lines + extensive bus network. Same tickets as metro.',
            website: 'https://www.rtm.fr/en'
          }
        ]
      }
    },
    nice: {
      id: 'nice',
      name: 'Nice',
      weather: {
        lat: 43.7102,
        lon: 7.262
      },
      highlights: {
        localOptions: [
          {
            name: 'Promenade des Anglais',
            type: 'activity',
            notes: '7km seafront promenade. Rent bikes or walk at sunset—Riviera views.',
            rating: 4.7,
            travelTime: 'Seafront',
            map: 'https://maps.google.com/?q=Promenade+des+Anglais+Nice'
          },
          {
            name: 'Cours Saleya Market',
            type: 'shopping',
            notes: 'Daily flower/produce market (Tue-Sun). Socca (chickpea pancake) stalls—€3.',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Cours+Saleya+Nice'
          },
          {
            name: 'Eze Village',
            type: 'activity',
            notes: 'Medieval hilltop village 20 min away. Exotic gardens + perfume workshops.',
            rating: 4.8,
            travelTime: '20 min by bus 82/112',
            map: 'https://maps.google.com/?q=Eze+Village+France'
          },
          {
            name: 'Socca at Chez Pipo',
            type: 'eat',
            notes: 'Niçoise chickpea flatbread cooked in wood-fired oven. Cash only.',
            rating: 4.5,
            travelTime: 'Port area',
            map: 'https://maps.google.com/?q=Chez+Pipo+Nice'
          }
        ],
        facts: [
          'Nice was part of Italy until 1860—the local dialect is Niçard, closer to Italian.',
          'The Promenade des Anglais was built by English expats in the 1820s.',
          'Over 300 days of sunshine per year make it France\'s sunniest major city.',
          'Socca is Nice\'s signature street food—a vegan chickpea crepe seasoned with black pepper.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Nice Tram',
            type: 'metro',
            notes: '3 lines (T1-T3). Buy Pastel card or 10-trip tickets.',
            website: 'https://www.lignesdazur.com/en',
            app: 'Lignes d\'Azur app'
          },
          {
            name: 'Regional Buses',
            type: 'bus',
            notes: 'Ligne d\'Azur buses to Monaco, Cannes, Antibes. €1.50 flat fare.',
            website: 'https://www.lignesdazur.com/en'
          }
        ]
      }
    },
    toulouse: {
      id: 'toulouse',
      name: 'Toulouse',
      weather: {
        lat: 43.6047,
        lon: 1.4442
      },
      highlights: {
        localOptions: [
          {
            name: 'Cité de l\'Espace',
            type: 'activity',
            notes: 'Space museum with full-scale Ariane 5 rocket. Planetarium shows + astronaut exhibits.',
            rating: 4.7,
            travelTime: 'East Toulouse',
            map: 'https://maps.google.com/?q=Cite+de+l+Espace+Toulouse',
            website: 'https://www.cite-espace.com/en/'
          },
          {
            name: 'Basilica of Saint-Sernin',
            type: 'activity',
            notes: 'Largest Romanesque church in Europe. Free entry; climb tower for €2.50.',
            rating: 4.6,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Basilica+Saint-Sernin+Toulouse'
          },
          {
            name: 'Cassoulet at Le Colombier',
            type: 'eat',
            notes: 'Traditional white bean stew with duck confit. Hearty portions—share a pot.',
            rating: 4.5,
            travelTime: 'Capitole area',
            map: 'https://maps.google.com/?q=Le+Colombier+Toulouse'
          },
          {
            name: 'Airbus Factory Tour',
            type: 'activity',
            notes: 'See A380 assembly line. Book 2-3 weeks ahead—tours in English daily.',
            rating: 4.8,
            travelTime: 'Blagnac (30 min)',
            map: 'https://maps.google.com/?q=Airbus+Factory+Toulouse',
            website: 'https://manatour.fr/en/'
          }
        ],
        facts: [
          'Toulouse is nicknamed "La Ville Rose" (The Pink City) for its terracotta brick buildings.',
          'Airbus headquarters employs 20,000+ workers—the A380 is assembled here.',
          'The Canal du Midi, a UNESCO site, connects Toulouse to the Mediterranean.',
          'Cassoulet originated in nearby Castelnaudary during the Hundred Years\' War.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Toulouse Metro',
            type: 'metro',
            notes: '2 lines (A, B) using VAL driverless trains. Buy Pastel card.',
            website: 'https://www.tisseo.fr/en',
            app: 'Tisséo app'
          },
          {
            name: 'Tram',
            type: 'metro',
            notes: '2 tram lines (T1, T2). Same tickets as metro—€1.70 single.',
            website: 'https://www.tisseo.fr/en'
          }
        ]
      }
    },
    bordeaux: {
      id: 'bordeaux',
      name: 'Bordeaux',
      weather: {
        lat: 44.8378,
        lon: -0.5792
      },
      highlights: {
        localOptions: [
          {
            name: 'Cité du Vin',
            type: 'activity',
            notes: 'Interactive wine museum with tastings. Belvedere pass includes panoramic bar.',
            rating: 4.6,
            travelTime: 'Bacalan',
            map: 'https://maps.google.com/?q=Cite+du+Vin+Bordeaux',
            website: 'https://www.laciteduvin.com/en'
          },
          {
            name: 'Saint-Émilion Day Trip',
            type: 'activity',
            notes: 'Medieval village in wine country. Train 35 min—visit châteaux, underground church.',
            rating: 4.8,
            travelTime: '35 min by train',
            map: 'https://maps.google.com/?q=Saint-Emilion+France'
          },
          {
            name: 'Canelé at Baillardran',
            type: 'eat',
            notes: 'Bordeaux\'s signature pastry—caramelized crust, custardy center. Buy warm from oven.',
            rating: 4.7,
            travelTime: 'Multiple locations',
            map: 'https://maps.google.com/?q=Baillardran+Bordeaux',
            website: 'https://www.baillardran.com/'
          },
          {
            name: 'Place de la Bourse',
            type: 'activity',
            notes: '18th-century square with Miroir d\'Eau (water mirror). Best at sunset/night.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Place+de+la+Bourse+Bordeaux'
          }
        ],
        facts: [
          'Bordeaux produces 960 million bottles of wine per year across 60 appellations.',
          'The city center is a UNESCO World Heritage Site—largest urban site listed.',
          'The Garonne River estuary creates a unique terroir for Bordeaux wines.',
          'Canelés were invented by nuns in the 17th century using leftover egg yolks from wine clarification.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Bordeaux Tram',
            type: 'metro',
            notes: '4 lines (A-D). World\'s first ground-level power supply (no overhead wires in center).',
            website: 'https://www.infotbm.com/en',
            app: 'TBM app'
          },
          {
            name: 'V³ Bike Share',
            type: 'bus',
            notes: '1,800 bikes at 180 stations. First 30 min free with day pass.',
            website: 'https://www.infotbm.com/en'
          }
        ]
      }
    },
    strasbourg: {
      id: 'strasbourg',
      name: 'Strasbourg',
      weather: {
        lat: 48.5734,
        lon: 7.7521
      },
      highlights: {
        localOptions: [
          {
            name: 'Strasbourg Cathedral',
            type: 'activity',
            notes: 'Gothic masterpiece with astronomical clock (shows daily at 12:30pm). Climb 332 steps for tower view.',
            rating: 4.8,
            travelTime: 'Grande Île',
            map: 'https://maps.google.com/?q=Strasbourg+Cathedral'
          },
          {
            name: 'La Petite France',
            type: 'activity',
            notes: 'Picturesque half-timbered houses on canals. Best in December for Christmas market.',
            rating: 4.7,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=La+Petite+France+Strasbourg'
          },
          {
            name: 'Tarte Flambée at Le Gruber',
            type: 'eat',
            notes: 'Alsatian pizza—thin crust with crème fraîche, onions, lardons. €8-12.',
            rating: 4.6,
            travelTime: 'Petite France',
            map: 'https://maps.google.com/?q=Le+Gruber+Strasbourg'
          },
          {
            name: 'European Parliament',
            type: 'activity',
            notes: 'Free guided tours when parliament in session (check calendar). Audioguides available.',
            rating: 4.5,
            travelTime: 'European Quarter',
            map: 'https://maps.google.com/?q=European+Parliament+Strasbourg',
            website: 'https://www.europarl.europa.eu/visiting/en/strasbourg'
          }
        ],
        facts: [
          'Strasbourg hosts the European Parliament, Council of Europe, and European Court of Human Rights.',
          'The Christmas market is Europe\'s oldest (since 1570) and largest.',
          'The city was part of Germany 1871-1918 and 1940-1944—Alsatian culture blends French and German.',
          'Tarte flambée (Flammkuchen in German) is baked in wood-fired ovens at 450°C for 2 minutes.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Strasbourg Tram',
            type: 'metro',
            notes: '6 lines (A-F). Buy Badgéo card or 24-hour pass.',
            website: 'https://www.cts-strasbourg.eu/en/',
            app: 'CTS app'
          },
          {
            name: 'Vélhop Bike Share',
            type: 'bus',
            notes: '5,000+ bikes. Strasbourg is France\'s most bike-friendly city (600km of paths).',
            website: 'https://www.velhop.strasbourg.eu/'
          }
        ]
      }
    },
    nantes: {
      id: 'nantes',
      name: 'Nantes',
      weather: {
        lat: 47.2184,
        lon: -1.5536
      },
      highlights: {
        localOptions: [
          {
            name: 'Machines of the Isle of Nantes',
            type: 'activity',
            notes: 'Steampunk mechanical animals—ride the Grand Elephant (12m tall). Kids love the carousel.',
            rating: 4.8,
            travelTime: 'Île de Nantes',
            map: 'https://maps.google.com/?q=Machines+of+the+Isle+of+Nantes',
            website: 'https://www.lesmachines-nantes.fr/en/'
          },
          {
            name: 'Château des Ducs de Bretagne',
            type: 'activity',
            notes: 'Medieval castle with rampart walk. Museum traces Nantes\' maritime/slave trade history.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Chateau+des+Ducs+de+Bretagne+Nantes',
            website: 'https://www.chateaunantes.fr/en'
          },
          {
            name: 'Crêperie Heb-Ken',
            type: 'eat',
            notes: 'Authentic Breton galettes (savory buckwheat crepes). Try andouille sausage version.',
            rating: 4.6,
            travelTime: 'Bouffay',
            map: 'https://maps.google.com/?q=Creperie+Heb-Ken+Nantes'
          },
          {
            name: 'Passage Pommeraye',
            type: 'shopping',
            notes: '1843 shopping arcade with ornate staircases. Boutiques, chocolatiers, toy shops.',
            rating: 4.5,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Passage+Pommeraye+Nantes'
          }
        ],
        facts: [
          'Nantes was the capital of Brittany until 1941—the city still celebrates Breton culture.',
          'The Loire River once made Nantes France\'s largest port; it\'s now Europe\'s 6th greenest city.',
          'Jules Verne was born here—his Museum features manuscripts and mechanical inventions.',
          'The city pioneered car-free zones and tramways in the 1980s, now a model for sustainable urbanism.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Nantes Tram',
            type: 'metro',
            notes: '3 lines. Buy Libertan card—€1.70 single, €6 day pass.',
            website: 'https://www.tan.fr/en',
            app: 'TAN app'
          },
          {
            name: 'Navibus',
            type: 'ferry',
            notes: 'River shuttle across Loire. Same tickets as tram—scenic 5-min crossing.',
            website: 'https://www.tan.fr/en'
          }
        ]
      }
    },
    lille: {
      id: 'lille',
      name: 'Lille',
      weather: {
        lat: 50.6292,
        lon: 3.0573
      },
      highlights: {
        localOptions: [
          {
            name: 'Palais des Beaux-Arts',
            type: 'activity',
            notes: 'France\'s 2nd largest art museum after the Louvre. Rubens, Delacroix, Monet collections.',
            rating: 4.7,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Palais+des+Beaux-Arts+Lille',
            website: 'https://pba.lille.fr/en'
          },
          {
            name: 'Vieux-Lille (Old Town)',
            type: 'activity',
            notes: 'Flemish-style architecture with cobblestone streets. Antique shops, chocolatiers, estaminets (taverns).',
            rating: 4.6,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Vieux-Lille'
          },
          {
            name: 'Moules-Frites at Aux Moules',
            type: 'eat',
            notes: 'Classic Belgian mussels with fries. 16 sauce variations—try white wine & cream.',
            rating: 4.5,
            travelTime: 'Old Town',
            map: 'https://maps.google.com/?q=Aux+Moules+Lille'
          },
          {
            name: 'Braderie de Lille',
            type: 'activity',
            notes: 'Europe\'s largest flea market (1st weekend Sept). 2 million visitors, 10,000+ vendors.',
            rating: 4.8,
            travelTime: 'Citywide',
            map: 'https://maps.google.com/?q=Braderie+de+Lille'
          }
        ],
        facts: [
          'Lille was part of Flanders until 1668—architecture and cuisine blend French and Belgian.',
          'The city is 1 hour from Paris, 35 min from Brussels by TGV/Eurostar.',
          'During the Braderie, restaurants pile empty mussel shells on sidewalks—the highest pile wins bragging rights.',
          'Lille was European Capital of Culture in 2004, sparking a cultural renaissance.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Lille Metro',
            type: 'metro',
            notes: '2 lines (M1, M2) using VAL driverless trains. Buy Pass Pass card.',
            website: 'https://www.ilevia.fr/en/',
            app: 'Ilevia app'
          },
          {
            name: 'Tram',
            type: 'metro',
            notes: '2 tram lines (R, T). Same tickets as metro—€1.75 single.',
            website: 'https://www.ilevia.fr/en/'
          }
        ]
      }
    },
    montpellier: {
      id: 'montpellier',
      name: 'Montpellier',
      weather: {
        lat: 43.6108,
        lon: 3.8767
      },
      highlights: {
        localOptions: [
          {
            name: 'Place de la Comédie',
            type: 'activity',
            notes: 'Grand oval plaza nicknamed "L\'Œuf" (The Egg). Opera house, fountain, terraced cafés.',
            rating: 4.5,
            travelTime: 'City Center',
            map: 'https://maps.google.com/?q=Place+de+la+Comedie+Montpellier'
          },
          {
            name: 'Jardin des Plantes',
            type: 'activity',
            notes: 'France\'s oldest botanical garden (1593). Free entry—shaded walks, medicinal plant collections.',
            rating: 4.6,
            travelTime: 'Near Faculty of Medicine',
            map: 'https://maps.google.com/?q=Jardin+des+Plantes+Montpellier'
          },
          {
            name: 'Mediterranean Beaches',
            type: 'activity',
            notes: 'Palavas-les-Flots and Carnon beaches 20 min by tram. Sandy shores, beachside restaurants.',
            rating: 4.4,
            travelTime: '20 min by Tram 3',
            map: 'https://maps.google.com/?q=Palavas-les-Flots'
          },
          {
            name: 'Oysters at Marché du Lez',
            type: 'eat',
            notes: 'Food market with oyster bars. Fresh Bouzigues oysters from Étang de Thau—€6-12/dozen.',
            rating: 4.7,
            travelTime: 'Port Marianne',
            map: 'https://maps.google.com/?q=Marche+du+Lez+Montpellier'
          }
        ],
        facts: [
          'Montpellier is one of France\'s fastest-growing cities—population doubled since 1960.',
          'The city is home to Europe\'s oldest medical school, founded in 1220.',
          'Over 70,000 students (1 in 4 residents) make it France\'s most youthful major city.',
          'Étang de Thau produces 10% of France\'s oysters and mussels—30km from Montpellier.'
        ]
      },
      transit: {
        systems: [
          {
            name: 'Montpellier Tram',
            type: 'metro',
            notes: '5 lines. Line 3 goes to beaches. Buy TAM card—€1.70 single, €4.50 day pass.',
            website: 'https://www.tam-voyages.com/en/',
            app: 'TAM Montpellier app'
          },
          {
            name: 'Vélomagg Bike Share',
            type: 'bus',
            notes: '3,200 bikes. First 30 min free—ideal for car-free city center.',
            website: 'https://www.tam-voyages.com/en/'
          }
        ]
      }
    }
  },
  weather: {
    city: 'Paris',
    lat: 48.8566,
    lon: 2.3522
  },
  news: {
    query: 'France travel families safety updates',
    region: 'FR',
    staticAlerts: [
      {
        id: 'fr_strikes',
        type: 'warning',
        title: 'Transport Strikes',
        description: 'Unions strike periodically, disrupting trains/metros. Check RATP/SNCF status before travel.',
        priority: 'medium',
        icon: '🚇'
      },
      {
        id: 'fr_restaurant_hours',
        type: 'tip',
        title: 'Meal Times',
        description: 'Lunch: 12-2pm, Dinner: 7:30-10pm. Many restaurants close between services and on Sundays.',
        priority: 'low',
        icon: '🍽️'
      }
    ]
  },
  highlights: {
    localOptions: [
      {
        name: 'Louvre Museum',
        type: 'activity',
        notes: 'World\'s largest art museum with Mona Lisa, Venus de Milo. Book timed entry.',
        rating: 4.8,
        travelTime: 'Paris',
        map: 'https://maps.google.com/?q=Louvre+Museum+Paris',
        website: 'https://www.louvre.fr/en'
      },
      {
        name: 'Mont Saint-Michel',
        type: 'activity',
        notes: 'Island abbey in Normandy. Day trip from Paris (3.5 hours) or stay overnight.',
        rating: 4.9,
        travelTime: 'Normandy',
        map: 'https://maps.google.com/?q=Mont+Saint-Michel',
        website: 'https://www.ot-montsaintmichel.com/en/'
      },
      {
        name: 'Boulangerie Croissants',
        type: 'eat',
        notes: 'Buy fresh daily—croissant au beurre (butter) vs ordinaire (margarine). €1-2 each.',
        rating: 4.7,
        travelTime: 'Everywhere'
      },
      {
        name: 'Château de Chambord',
        type: 'activity',
        notes: 'Loire Valley\'s largest château. Renaissance architecture, double-helix staircase.',
        rating: 4.8,
        travelTime: 'Loire Valley',
        map: 'https://maps.google.com/?q=Chateau+de+Chambord',
        website: 'https://www.chambord.org/en/'
      }
    ],
    facts: [
      'France is the world\'s most-visited country with 90 million tourists annually.',
      'The French invented the Michelin star system in 1926 to encourage car travel to restaurants.',
      'Paris has 20,000+ restaurants—more per capita than any major city.',
      'France produces 1,200+ types of cheese—De Gaulle famously asked, "How can you govern a country with 246 cheeses?"'
    ]
  },
  content: {
    emergency: {
      police: '17',
      ambulance: '15',
      fire: '18'
    },
    transitCards: [
      'Navigo (Paris)',
      'Pastel (Toulouse)',
      'Técély (Lyon)',
      'Libertan (Nantes)'
    ],
    sockets: 'Type C/E · 230V',
    etiquetteNotes: [
      'Greet shopkeepers with "Bonjour" upon entering',
      'Tipping is included in the bill (service compris)—round up €1-2 for good service',
      'Bread is placed directly on the table, not on a plate',
      'It\'s rude to ask for a doggy bag ("emporter")',
      'Pharmacies have green crosses and can provide medical advice',
      'Sunday is rest day—most shops closed except in tourist areas'
    ],
    quickStarts: [
      {
        title: 'Paris Classic: Eiffel Tower, Louvre, Montmartre & Seine Cruise',
        tags: ['iconic', 'culture', 'romantic']
      },
      {
        title: 'Provence: Lavender Fields, Hilltop Villages & Wine Tasting',
        tags: ['scenic', 'wine', 'countryside']
      },
      {
        title: 'French Riviera: Nice, Cannes, Monaco & Èze',
        tags: ['beach', 'luxury', 'Mediterranean']
      },
      {
        title: 'Loire Valley Châteaux: Chambord, Chenonceau & Amboise',
        tags: ['history', 'architecture', 'UNESCO']
      }
    ]
  },
  features: {
    showJetLagTools: true,
    supportsEsimAdvice: true,
    mapTrafficLayer: true
  }
};

export default FR;
