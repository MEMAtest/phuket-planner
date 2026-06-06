/**
 * German Learning Themes - Structured path from A1 to B1
 * 41 themes (36 core + 5 family). Each core theme: 8-10 key phrases, 3 scenarios
 * with grammar drills and vocabulary. Enriched for depth and real practice.
 */

export const GERMAN_THEMES = {
  "A1": [
    {
      "id": "a1-1",
      "number": 1,
      "level": "A1",
      "title": "Introducing Yourself",
      "description": "Learn to introduce yourself, say where you're from, and basic greetings",
      "estimatedTime": 15,
      "keyPhrases": [
        "Hallo, ich heiße [Name]",
        "Ich komme aus England",
        "Ich wohne in [Stadt]",
        "Ich bin [Beruf]",
        "Freut mich!",
        "Wie heißen Sie?",
        "Woher kommst du?",
        "Ich spreche ein bisschen Deutsch",
        "Ich bin 30 Jahre alt",
        "Auf Wiedersehen!"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Meeting someone at a party",
          "prompt": "Introduce yourself informally: name, where you're from, what you do",
          "expectedPattern": "Hallo, ich heiße... Ich komme aus... Ich bin...",
          "vocabulary": [
            "der Name",
            "das Land",
            "der Beruf",
            "die Stadt",
            "die Party"
          ],
          "grammarDrill": {
            "pattern": "Present tense of \"sein\" (to be): ich bin, du bist, er/sie ist",
            "exercise": "Complete: Ich ___ Lehrer. Du ___ aus England. Sie ___ Ärztin."
          }
        },
        {
          "id": "s2",
          "situation": "First day at work",
          "prompt": "Greet your new colleague formally and tell them about yourself",
          "expectedPattern": "Guten Tag, ich bin... Ich wohne in...",
          "vocabulary": [
            "der Kollege",
            "die Kollegin",
            "die Arbeit",
            "der Tag",
            "die Firma"
          ],
          "grammarDrill": {
            "pattern": "Formal vs informal address: Sie vs du",
            "exercise": "Formal: Wie heißen Sie? / Informal: Wie heißt du? Practice both."
          }
        },
        {
          "id": "s3",
          "situation": "Asking someone about themselves",
          "prompt": "Ask a new acquaintance their name and where they come from",
          "expectedPattern": "Wie heißt du? Woher kommst du?",
          "vocabulary": [
            "wie",
            "woher",
            "wo",
            "kommen",
            "wohnen"
          ],
          "grammarDrill": {
            "pattern": "W-questions (question words): wie, woher, wo, was",
            "exercise": "Build questions: ___ heißt du? ___ kommst du? ___ wohnst du?"
          }
        }
      ]
    },
    {
      "id": "a1-2",
      "number": 2,
      "level": "A1",
      "title": "Ordering Food & Drink",
      "description": "Order at cafés, restaurants, and bars confidently",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich möchte ein Bier, bitte",
        "Ich hätte gern einen Kaffee",
        "Kann ich die Speisekarte haben?",
        "Die Rechnung, bitte",
        "Das war sehr lecker!",
        "Was empfehlen Sie?",
        "Ich nehme das Schnitzel",
        "Zahlen, bitte",
        "Für mich ein Wasser, bitte",
        "Guten Appetit!"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Ordering at a café",
          "prompt": "Order a coffee and a piece of cake",
          "expectedPattern": "Ich hätte gern einen Kaffee und ein Stück Kuchen.",
          "vocabulary": [
            "der Kaffee",
            "der Kuchen",
            "der Tee",
            "das Stück",
            "die Tasse"
          ],
          "grammarDrill": {
            "pattern": "Accusative articles: einen (m), eine (f), ein (n)",
            "exercise": "Ich möchte ___ Kaffee (m), ___ Limonade (f), ___ Wasser (n)."
          }
        },
        {
          "id": "s2",
          "situation": "At a restaurant",
          "prompt": "Ask for the menu, order a meal, and ask for the bill",
          "expectedPattern": "Kann ich die Speisekarte haben? Ich nehme... Die Rechnung, bitte.",
          "vocabulary": [
            "die Speisekarte",
            "die Rechnung",
            "das Schnitzel",
            "der Salat",
            "die Suppe"
          ],
          "grammarDrill": {
            "pattern": "Verb \"nehmen\" (to take): ich nehme, du nimmst, er nimmt",
            "exercise": "Ich ___ den Salat. Was ___ du? Er ___ die Suppe."
          }
        },
        {
          "id": "s3",
          "situation": "Ordering drinks at a bar",
          "prompt": "Order two beers and ask what the bartender recommends",
          "expectedPattern": "Zwei Bier, bitte. Was empfehlen Sie?",
          "vocabulary": [
            "das Bier",
            "der Wein",
            "das Glas",
            "die Flasche",
            "der Saft"
          ],
          "grammarDrill": {
            "pattern": "Plurals of drinks/nouns: ein Bier → zwei Bier(e)",
            "exercise": "Order using numbers: zwei ___, drei ___, ein ___."
          }
        }
      ]
    },
    {
      "id": "a1-3",
      "number": 3,
      "level": "A1",
      "title": "Asking Directions",
      "description": "Navigate German cities by asking for directions",
      "estimatedTime": 15,
      "keyPhrases": [
        "Wo ist...?",
        "Wie komme ich zum Bahnhof?",
        "Links, rechts, geradeaus",
        "Entschuldigung, können Sie mir helfen?",
        "Danke für Ihre Hilfe!",
        "Ist es weit von hier?",
        "Gibt es hier eine Apotheke?",
        "Gehen Sie die erste Straße links",
        "Ich habe mich verlaufen",
        "Wie weit ist es zu Fuß?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Lost and looking for the train station",
          "prompt": "Ask a stranger politely where the train station is",
          "expectedPattern": "Entschuldigung, wo ist der Bahnhof?",
          "vocabulary": [
            "der Bahnhof",
            "die Straße",
            "die Ecke",
            "der Platz",
            "die Ampel"
          ],
          "grammarDrill": {
            "pattern": "Question word \"wo\" + \"sein\": Wo ist der/die/das...?",
            "exercise": "Wo ___ der Bahnhof? Wo ___ die Apotheke? Wo ___ das Hotel?"
          }
        },
        {
          "id": "s2",
          "situation": "Looking for a pharmacy",
          "prompt": "Ask how to get to the nearest pharmacy",
          "expectedPattern": "Wie komme ich zur Apotheke?",
          "vocabulary": [
            "die Apotheke",
            "das Krankenhaus",
            "die Bank",
            "das Geschäft",
            "der Supermarkt"
          ],
          "grammarDrill": {
            "pattern": "Dative with \"zu\": zum (zu dem, m/n), zur (zu der, f)",
            "exercise": "Wie komme ich ___ Bahnhof (m)? ___ Apotheke (f)? ___ Hotel (n)?"
          }
        },
        {
          "id": "s3",
          "situation": "Understanding directions given to you",
          "prompt": "Listen and confirm directions: go straight, then turn left",
          "expectedPattern": "Also geradeaus und dann links. Ist das richtig?",
          "vocabulary": [
            "geradeaus",
            "links",
            "rechts",
            "die Kreuzung",
            "die Brücke"
          ],
          "grammarDrill": {
            "pattern": "Imperative (formal): Gehen Sie..., Nehmen Sie...",
            "exercise": "Gehen Sie ___ (straight). Nehmen Sie die erste Straße ___ (left)."
          }
        }
      ]
    },
    {
      "id": "a1-4",
      "number": 4,
      "level": "A1",
      "title": "Shopping Basics",
      "description": "Buy things at shops, markets, and supermarkets",
      "estimatedTime": 15,
      "keyPhrases": [
        "Was kostet das?",
        "Ich suche...",
        "Haben Sie...?",
        "Ich nehme das",
        "Kann ich mit Karte zahlen?",
        "Das ist zu teuer",
        "Haben Sie das auch in einer anderen Größe?",
        "Wo finde ich die Milch?",
        "Geben Sie mir bitte ein Kilo Äpfel",
        "Sonst noch etwas?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "At a bakery",
          "prompt": "Ask for bread and ask the price",
          "expectedPattern": "Haben Sie Brot? Was kostet das?",
          "vocabulary": [
            "das Brot",
            "das Brötchen",
            "der Kuchen",
            "die Bäckerei",
            "das Stück"
          ],
          "grammarDrill": {
            "pattern": "Verb \"kosten\": Was kostet das? Was kosten die Äpfel?",
            "exercise": "Was ___ das Brot? Was ___ die Brötchen? (singular vs plural)"
          }
        },
        {
          "id": "s2",
          "situation": "At a clothing shop",
          "prompt": "Say you are looking for a jacket and ask if they have it in blue",
          "expectedPattern": "Ich suche eine Jacke. Haben Sie das in Blau?",
          "vocabulary": [
            "die Jacke",
            "das Hemd",
            "die Hose",
            "die Größe",
            "die Farbe"
          ],
          "grammarDrill": {
            "pattern": "Verb \"suchen\" + accusative: Ich suche einen/eine/ein...",
            "exercise": "Ich suche ___ Pullover (m), ___ Jacke (f), ___ Hemd (n)."
          }
        },
        {
          "id": "s3",
          "situation": "Paying at the supermarket checkout",
          "prompt": "Say you take it and ask if you can pay by card",
          "expectedPattern": "Ich nehme das. Kann ich mit Karte zahlen?",
          "vocabulary": [
            "die Kasse",
            "die Karte",
            "das Geld",
            "der Euro",
            "die Tüte"
          ],
          "grammarDrill": {
            "pattern": "Modal verb \"können\": Kann ich...? Können Sie...?",
            "exercise": "Build: Kann ich mit Karte ___ (zahlen)? ___ Sie mir helfen?"
          }
        }
      ]
    },
    {
      "id": "a1-5",
      "number": 5,
      "level": "A1",
      "title": "Numbers, Time & Dates",
      "description": "Tell time, say dates, and use numbers in conversation",
      "estimatedTime": 15,
      "keyPhrases": [
        "Es ist zehn Uhr",
        "Wann...?",
        "Um wie viel Uhr?",
        "Am Montag",
        "Im Januar",
        "Wie spät ist es?",
        "Es ist halb drei",
        "Es ist Viertel nach acht",
        "Heute ist der erste Mai",
        "Mein Geburtstag ist am dritten März"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Making an appointment",
          "prompt": "Suggest a time to meet",
          "expectedPattern": "Können wir uns um drei Uhr treffen?",
          "vocabulary": [
            "die Uhr",
            "die Zeit",
            "der Termin",
            "die Stunde",
            "die Minute"
          ],
          "grammarDrill": {
            "pattern": "Time with \"um\": Um wie viel Uhr? — Um acht Uhr.",
            "exercise": "Answer: Um wie viel Uhr? ___ (7:00), ___ (9:30 = halb zehn)."
          }
        },
        {
          "id": "s2",
          "situation": "Asking for the current time on the street",
          "prompt": "Politely ask a passer-by what time it is",
          "expectedPattern": "Entschuldigung, wie spät ist es?",
          "vocabulary": [
            "halb",
            "Viertel",
            "vor",
            "nach",
            "Mittag"
          ],
          "grammarDrill": {
            "pattern": "Telling time: halb (half), Viertel nach/vor (quarter past/to)",
            "exercise": "Say in German: 8:15 = Viertel ___ acht; 8:45 = Viertel ___ neun."
          }
        },
        {
          "id": "s3",
          "situation": "Talking about days and dates",
          "prompt": "Say which day your German course is and when your birthday is",
          "expectedPattern": "Der Kurs ist am Montag. Mein Geburtstag ist im Mai.",
          "vocabulary": [
            "der Montag",
            "der Tag",
            "der Monat",
            "das Jahr",
            "der Geburtstag"
          ],
          "grammarDrill": {
            "pattern": "Prepositions of time: am (days), im (months)",
            "exercise": "Fill in: ___ Montag, ___ Dienstag, ___ Januar, ___ Sommer."
          }
        }
      ]
    },
    {
      "id": "a1-6",
      "number": 6,
      "level": "A1",
      "title": "Family & Relationships",
      "description": "Talk about your family and relationships",
      "estimatedTime": 15,
      "keyPhrases": [
        "Meine Frau heißt...",
        "Ich habe zwei Kinder",
        "Mein Sohn ist fünf Jahre alt",
        "Meine Familie kommt aus...",
        "Wir wohnen in...",
        "Hast du Geschwister?",
        "Ich habe einen Bruder und eine Schwester",
        "Meine Eltern wohnen in Berlin",
        "Bist du verheiratet?",
        "Das ist mein Mann"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Small talk at work",
          "prompt": "Tell a colleague about your family",
          "expectedPattern": "Ich habe zwei Kinder. Meine Frau ist Lehrerin.",
          "vocabulary": [
            "die Frau",
            "der Mann",
            "das Kind",
            "der Sohn",
            "die Tochter"
          ],
          "grammarDrill": {
            "pattern": "Possessive articles: mein/meine, dein/deine",
            "exercise": "Fill in: ___ Sohn (m), ___ Tochter (f), ___ Kind (n), ___ Eltern (pl)."
          }
        },
        {
          "id": "s2",
          "situation": "Asking a new friend about their family",
          "prompt": "Ask if they have siblings and whether they are married",
          "expectedPattern": "Hast du Geschwister? Bist du verheiratet?",
          "vocabulary": [
            "der Bruder",
            "die Schwester",
            "die Geschwister",
            "die Eltern",
            "verheiratet"
          ],
          "grammarDrill": {
            "pattern": "Verb \"haben\": ich habe, du hast, er/sie hat",
            "exercise": "Ich ___ einen Bruder. Du ___ eine Schwester. Sie ___ drei Kinder."
          }
        },
        {
          "id": "s3",
          "situation": "Showing a family photo",
          "prompt": "Point to people in a photo and say who they are",
          "expectedPattern": "Das ist mein Vater und das ist meine Mutter.",
          "vocabulary": [
            "der Vater",
            "die Mutter",
            "die Großmutter",
            "der Großvater",
            "das Foto"
          ],
          "grammarDrill": {
            "pattern": "Demonstrative \"das ist\" / \"das sind\"",
            "exercise": "Das ___ mein Bruder. Das ___ meine Eltern. (singular vs plural)"
          }
        }
      ]
    },
    {
      "id": "a1-7",
      "number": 7,
      "level": "A1",
      "title": "Hobbies & Free Time",
      "description": "Discuss what you like to do in your free time",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich spiele gern Fußball",
        "Ich mag Musik",
        "In meiner Freizeit lese ich",
        "Am Wochenende gehe ich schwimmen",
        "Mein Hobby ist Kochen",
        "Was machst du gern?",
        "Ich höre gern Musik",
        "Ich treffe mich mit Freunden",
        "Ich gehe gern ins Kino",
        "Spielst du ein Instrument?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Chatting at a party",
          "prompt": "Talk about your hobbies and what you like to do",
          "expectedPattern": "Ich spiele gern Fußball. In meiner Freizeit lese ich.",
          "vocabulary": [
            "das Hobby",
            "die Freizeit",
            "der Fußball",
            "die Musik",
            "das Buch"
          ],
          "grammarDrill": {
            "pattern": "Verb + \"gern\" to express liking an activity",
            "exercise": "Ich spiele ___ Tennis. Ich lese ___. Ich koche ___."
          }
        },
        {
          "id": "s2",
          "situation": "Asking a friend about their interests",
          "prompt": "Ask what they like to do and whether they play a sport",
          "expectedPattern": "Was machst du gern? Treibst du Sport?",
          "vocabulary": [
            "der Sport",
            "das Instrument",
            "das Kino",
            "der Garten",
            "die Kamera"
          ],
          "grammarDrill": {
            "pattern": "Verb \"machen\" present tense: ich mache, du machst, er macht",
            "exercise": "Was ___ du gern? Ich ___ Sport. Er ___ Musik."
          }
        },
        {
          "id": "s3",
          "situation": "Planning a weekend activity together",
          "prompt": "Suggest doing a hobby together at the weekend",
          "expectedPattern": "Am Wochenende gehe ich schwimmen. Kommst du mit?",
          "vocabulary": [
            "das Wochenende",
            "schwimmen",
            "wandern",
            "tanzen",
            "malen"
          ],
          "grammarDrill": {
            "pattern": "Word order: time element first inverts verb and subject",
            "exercise": "Reorder: (schwimmen / am Wochenende / ich / gehe) → ?"
          }
        }
      ]
    },
    {
      "id": "a1-8",
      "number": 8,
      "level": "A1",
      "title": "Weather & Seasons",
      "description": "Small talk about the weather",
      "estimatedTime": 15,
      "keyPhrases": [
        "Wie ist das Wetter?",
        "Es ist kalt",
        "Es ist warm und sonnig",
        "Es regnet",
        "Im Sommer ist es heiß",
        "Schönes Wetter heute!",
        "Es schneit",
        "Der Himmel ist blau",
        "Heute ist es bewölkt",
        "Im Winter ist es oft kalt"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Making small talk about today's weather",
          "prompt": "Comment on the weather today",
          "expectedPattern": "Es ist heute sonnig und warm.",
          "vocabulary": [
            "das Wetter",
            "die Sonne",
            "der Regen",
            "der Wind",
            "der Schnee"
          ],
          "grammarDrill": {
            "pattern": "Impersonal \"es ist\" + adjective for weather",
            "exercise": "Es ist ___ (cold). Es ist ___ (warm). Es ist ___ (sunny)."
          }
        },
        {
          "id": "s2",
          "situation": "Talking about the seasons",
          "prompt": "Say what the weather is like in summer and in winter",
          "expectedPattern": "Im Sommer ist es heiß. Im Winter ist es kalt.",
          "vocabulary": [
            "der Sommer",
            "der Winter",
            "der Frühling",
            "der Herbst",
            "die Jahreszeit"
          ],
          "grammarDrill": {
            "pattern": "Preposition \"im\" with seasons: im Sommer, im Winter",
            "exercise": "Fill in: ___ Frühling, ___ Sommer, ___ Herbst, ___ Winter."
          }
        },
        {
          "id": "s3",
          "situation": "Deciding what to do based on the weather",
          "prompt": "Say it is raining and suggest staying inside",
          "expectedPattern": "Es regnet. Wir bleiben heute zu Hause.",
          "vocabulary": [
            "regnen",
            "schneien",
            "scheinen",
            "der Regenschirm",
            "die Wolke"
          ],
          "grammarDrill": {
            "pattern": "Weather verbs with \"es\": es regnet, es schneit",
            "exercise": "Conjugate: Es ___ (regnen). Es ___ (schneien). Die Sonne ___ (scheinen)."
          }
        }
      ]
    },
    {
      "id": "a1-9",
      "number": 9,
      "level": "A1",
      "title": "Making Appointments",
      "description": "Schedule meetings, appointments, and plans",
      "estimatedTime": 15,
      "keyPhrases": [
        "Können wir uns treffen?",
        "Wann passt es Ihnen?",
        "Um wie viel Uhr?",
        "Das passt mir gut",
        "Bis dann!",
        "Haben Sie am Montag Zeit?",
        "Geht es um drei Uhr?",
        "Tut mir leid, da kann ich nicht",
        "Wo treffen wir uns?",
        "Ich freue mich darauf"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Scheduling a meeting with a friend",
          "prompt": "Arrange to meet a friend next week",
          "expectedPattern": "Können wir uns nächste Woche treffen? Um wie viel Uhr?",
          "vocabulary": [
            "der Termin",
            "die Woche",
            "die Zeit",
            "das Treffen",
            "das Café"
          ],
          "grammarDrill": {
            "pattern": "Reflexive verb \"sich treffen\": wir treffen uns",
            "exercise": "Wir ___ uns morgen. Treffen ___ uns um drei? Ich ___ mich mit Anna."
          }
        },
        {
          "id": "s2",
          "situation": "Making a doctor's appointment by phone",
          "prompt": "Ask if there is a free appointment on Monday",
          "expectedPattern": "Haben Sie am Montag einen Termin frei?",
          "vocabulary": [
            "der Arzt",
            "die Praxis",
            "der Montag",
            "frei",
            "der Vormittag"
          ],
          "grammarDrill": {
            "pattern": "Verb \"haben\" in questions: Haben Sie...? Hast du...?",
            "exercise": "___ Sie Zeit? ___ du am Dienstag Zeit? ___ er einen Termin?"
          }
        },
        {
          "id": "s3",
          "situation": "Politely declining and proposing another time",
          "prompt": "Say that time does not work and suggest another one",
          "expectedPattern": "Tut mir leid, da kann ich nicht. Geht es um fünf Uhr?",
          "vocabulary": [
            "leider",
            "passen",
            "gehen",
            "später",
            "früher"
          ],
          "grammarDrill": {
            "pattern": "Verb \"passen\" (dative): Das passt mir / Ihnen gut.",
            "exercise": "Das passt ___ gut (to me). Passt ___ der Termin (to you, formal)?"
          }
        }
      ]
    },
    {
      "id": "a1-10",
      "number": 10,
      "level": "A1",
      "title": "Transportation",
      "description": "Use public transport and talk about travel",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich fahre mit dem Zug",
        "Wo ist die Haltestelle?",
        "Wann fährt der Bus?",
        "Eine Fahrkarte, bitte",
        "Ich nehme ein Taxi",
        "Wie viel kostet die Fahrt?",
        "Fährt dieser Bus zum Zentrum?",
        "Wo muss ich umsteigen?",
        "Der Zug hat Verspätung",
        "Auf welchem Gleis fährt der Zug?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "At the train station ticket counter",
          "prompt": "Buy a ticket to Munich",
          "expectedPattern": "Eine Fahrkarte nach München, bitte.",
          "vocabulary": [
            "der Zug",
            "die Fahrkarte",
            "das Gleis",
            "der Bahnhof",
            "die Fahrt"
          ],
          "grammarDrill": {
            "pattern": "Preposition \"mit\" + dative for transport",
            "exercise": "Ich fahre ___ dem Zug (m). ___ der Bahn (f). ___ dem Bus (m)."
          }
        },
        {
          "id": "s2",
          "situation": "At a bus stop",
          "prompt": "Ask when the next bus to the centre leaves",
          "expectedPattern": "Wann fährt der nächste Bus zum Zentrum?",
          "vocabulary": [
            "der Bus",
            "die Haltestelle",
            "das Zentrum",
            "die Linie",
            "die Abfahrt"
          ],
          "grammarDrill": {
            "pattern": "Verb \"fahren\" (stem change): ich fahre, du fährst, er fährt",
            "exercise": "Ich ___ nach Berlin. Du ___ mit dem Bus. Der Zug ___ um acht."
          }
        },
        {
          "id": "s3",
          "situation": "Asking for help changing trains",
          "prompt": "Ask where you have to change to get to the airport",
          "expectedPattern": "Wo muss ich umsteigen, um zum Flughafen zu kommen?",
          "vocabulary": [
            "umsteigen",
            "der Flughafen",
            "die U-Bahn",
            "die Richtung",
            "das Ticket"
          ],
          "grammarDrill": {
            "pattern": "Modal verb \"müssen\": ich muss, du musst, er muss",
            "exercise": "Ich ___ umsteigen. ___ du hier aussteigen? Er ___ warten."
          }
        }
      ]
    },
    {
      "id": "a1-11",
      "number": 11,
      "level": "A1",
      "title": "At the Doctor",
      "description": "Describe symptoms and understand medical advice",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich habe Kopfschmerzen",
        "Mir ist schlecht",
        "Ich brauche ein Medikament",
        "Wo tut es weh?",
        "Seit wann?",
        "Ich habe Fieber",
        "Mein Hals tut weh",
        "Ich bin erkältet",
        "Ich brauche einen Termin",
        "Gute Besserung!"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "At the doctor's office describing a headache",
          "prompt": "Tell the doctor you have a headache and since when",
          "expectedPattern": "Ich habe Kopfschmerzen seit gestern.",
          "vocabulary": [
            "der Kopf",
            "die Kopfschmerzen",
            "das Fieber",
            "der Arzt",
            "krank"
          ],
          "grammarDrill": {
            "pattern": "Verb \"haben\" for symptoms: Ich habe Kopfschmerzen.",
            "exercise": "Ich ___ Fieber. Du ___ Husten. Er ___ Bauchschmerzen."
          }
        },
        {
          "id": "s2",
          "situation": "Pointing to where it hurts",
          "prompt": "Tell the doctor that your throat and your stomach hurt",
          "expectedPattern": "Mein Hals tut weh und mein Bauch auch.",
          "vocabulary": [
            "der Hals",
            "der Bauch",
            "der Rücken",
            "das Bein",
            "der Arm"
          ],
          "grammarDrill": {
            "pattern": "Expression \"wehtun\": Mein Kopf tut weh. Meine Füße tun weh.",
            "exercise": "Mein Bein ___ weh. Meine Augen ___ weh. (singular vs plural)"
          }
        },
        {
          "id": "s3",
          "situation": "At the pharmacy asking for medicine",
          "prompt": "Say you have a cold and ask for medicine",
          "expectedPattern": "Ich bin erkältet. Ich brauche ein Medikament.",
          "vocabulary": [
            "das Medikament",
            "die Apotheke",
            "die Tablette",
            "der Husten",
            "der Schnupfen"
          ],
          "grammarDrill": {
            "pattern": "Verb \"brauchen\" + accusative: Ich brauche einen/eine/ein...",
            "exercise": "Ich brauche ___ Tee (m), ___ Tablette (f), ___ Medikament (n)."
          }
        }
      ]
    },
    {
      "id": "a1-12",
      "number": 12,
      "level": "A1",
      "title": "Hotel & Accommodation",
      "description": "Check in, ask about facilities, and solve problems",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich habe eine Reservierung",
        "Für zwei Nächte",
        "Gibt es WLAN?",
        "Wann ist das Frühstück?",
        "Das Zimmer ist zu laut",
        "Haben Sie ein Einzelzimmer frei?",
        "Wo ist der Aufzug?",
        "Kann ich später einchecken?",
        "Die Heizung funktioniert nicht",
        "Um wie viel Uhr muss ich auschecken?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Checking into a hotel",
          "prompt": "Check in with your reservation and ask about breakfast",
          "expectedPattern": "Ich habe eine Reservierung. Wann ist das Frühstück?",
          "vocabulary": [
            "die Reservierung",
            "das Zimmer",
            "die Nacht",
            "das Frühstück",
            "der Schlüssel"
          ],
          "grammarDrill": {
            "pattern": "Verb \"haben\" with accusative: Ich habe eine Reservierung.",
            "exercise": "Ich ___ eine Reservierung. ___ Sie ein Zimmer frei? Wir ___ Gepäck."
          }
        },
        {
          "id": "s2",
          "situation": "Asking about hotel facilities",
          "prompt": "Ask whether there is WiFi and where the elevator is",
          "expectedPattern": "Gibt es WLAN? Wo ist der Aufzug?",
          "vocabulary": [
            "das WLAN",
            "der Aufzug",
            "das Schwimmbad",
            "die Rezeption",
            "der Parkplatz"
          ],
          "grammarDrill": {
            "pattern": "Expression \"es gibt\" + accusative: Gibt es...? Es gibt...",
            "exercise": "Gibt es ___ Aufzug (m)? ___ eine Bar (f)? ___ ein Restaurant (n)?"
          }
        },
        {
          "id": "s3",
          "situation": "Reporting a problem with the room",
          "prompt": "Complain that the room is too loud and the heating does not work",
          "expectedPattern": "Das Zimmer ist zu laut und die Heizung funktioniert nicht.",
          "vocabulary": [
            "die Heizung",
            "die Dusche",
            "das Licht",
            "laut",
            "kaputt"
          ],
          "grammarDrill": {
            "pattern": "Negation with \"nicht\": ... funktioniert nicht.",
            "exercise": "Das Licht funktioniert ___. Die Dusche ist ___ warm. Das ist ___ gut."
          }
        }
      ]
    }
  ],
  "A2": [
    {
      "id": "a2-1",
      "number": 13,
      "level": "A2",
      "title": "Talking About Your Day",
      "description": "Describe daily routines and what you did today",
      "estimatedTime": 15,
      "keyPhrases": [
        "Heute habe ich viel gemacht",
        "Zuerst..., dann..., danach...",
        "Am Morgen/Nachmittag/Abend",
        "Ich bin zur Arbeit gefahren",
        "Das war interessant/langweilig",
        "Ich bin um sieben Uhr aufgestanden",
        "Nach dem Mittagessen habe ich gearbeitet",
        "Am Abend war ich müde",
        "Den ganzen Tag habe ich nichts gemacht",
        "Wie war dein Tag?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Evening chat with a friend",
          "prompt": "Describe what you did today in order, from morning to evening",
          "expectedPattern": "Zuerst bin ich aufgestanden, dann habe ich gefrühstückt, danach bin ich zur Arbeit gefahren.",
          "vocabulary": [
            "aufstehen",
            "frühstücken",
            "die Arbeit",
            "der Nachmittag",
            "müde",
            "danach"
          ],
          "grammarDrill": {
            "pattern": "Perfekt with \"haben\" and \"sein\"",
            "exercise": "machen → Ich habe gemacht / fahren → Ich bin gefahren / aufstehen → Ich bin aufgestanden"
          }
        },
        {
          "id": "s2",
          "situation": "A colleague asks how your weekend was",
          "prompt": "Talk about your typical daily routine using time expressions",
          "expectedPattern": "Am Morgen stehe ich um sieben Uhr auf. Am Nachmittag arbeite ich, und am Abend koche ich.",
          "vocabulary": [
            "der Morgen",
            "der Abend",
            "kochen",
            "die Routine",
            "jeden Tag",
            "normalerweise"
          ],
          "grammarDrill": {
            "pattern": "Separable verbs in present tense (verb-second)",
            "exercise": "aufstehen → Ich stehe um sieben auf / einkaufen → Ich kaufe am Abend ein"
          }
        },
        {
          "id": "s3",
          "situation": "Telling your partner why you are tired",
          "prompt": "Explain that you are tired and give the reason using \"weil\"",
          "expectedPattern": "Ich bin müde, weil ich heute viel gearbeitet habe.",
          "vocabulary": [
            "müde",
            "der Grund",
            "anstrengend",
            "der Stress",
            "die Pause",
            "genug"
          ],
          "grammarDrill": {
            "pattern": "Subordinate clause with \"weil\" (verb at the end)",
            "exercise": "Ich bin müde, weil ich lange gearbeitet habe. / Ich bin glücklich, weil ich frei habe."
          }
        }
      ]
    },
    {
      "id": "a2-2",
      "number": 14,
      "level": "A2",
      "title": "Making Plans & Suggestions",
      "description": "Suggest activities and make social plans",
      "estimatedTime": 15,
      "keyPhrases": [
        "Wollen wir ins Kino gehen?",
        "Hast du Lust auf einen Kaffee?",
        "Lass uns spazieren gehen",
        "Das ist eine gute Idee",
        "Leider kann ich nicht",
        "Wie wäre es mit einem Spaziergang?",
        "Was machst du am Wochenende?",
        "Vielleicht ein anderes Mal",
        "Um wie viel Uhr treffen wir uns?",
        "Ich freue mich darauf"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Planning weekend activities with a friend",
          "prompt": "Suggest going to the cinema and ask if your friend wants to come",
          "expectedPattern": "Hast du Lust auf Kino? Wollen wir am Samstag ins Kino gehen?",
          "vocabulary": [
            "das Kino",
            "die Lust",
            "das Wochenende",
            "der Film",
            "treffen",
            "zusammen"
          ],
          "grammarDrill": {
            "pattern": "Suggestions with \"Wollen wir...?\" and \"Lass uns...\"",
            "exercise": "Wollen wir essen gehen? / Lass uns einen Film sehen! / Hast du Lust auf Pizza?"
          }
        },
        {
          "id": "s2",
          "situation": "A friend invites you but you are busy",
          "prompt": "Politely decline and give a reason using a modal verb",
          "expectedPattern": "Leider kann ich nicht, weil ich arbeiten muss. Vielleicht ein anderes Mal.",
          "vocabulary": [
            "leider",
            "absagen",
            "beschäftigt",
            "müssen",
            "ein anderes Mal",
            "keine Zeit"
          ],
          "grammarDrill": {
            "pattern": "Modal verbs \"können\" and \"müssen\"",
            "exercise": "Ich kann nicht kommen. / Ich muss heute arbeiten. / Wir können morgen gehen."
          }
        },
        {
          "id": "s3",
          "situation": "Agreeing on a time and place to meet",
          "prompt": "Suggest a meeting time and place, and confirm the plan",
          "expectedPattern": "Wie wäre es mit acht Uhr vor dem Kino? Das passt mir gut.",
          "vocabulary": [
            "der Treffpunkt",
            "vor dem Kino",
            "passen",
            "die Uhrzeit",
            "pünktlich",
            "abmachen"
          ],
          "grammarDrill": {
            "pattern": "Dative prepositions of place: vor, bei, an",
            "exercise": "vor dem Kino / an der Haltestelle / bei mir zu Hause"
          }
        }
      ]
    },
    {
      "id": "a2-3",
      "number": 15,
      "level": "A2",
      "title": "Describing People & Things",
      "description": "Give detailed descriptions",
      "estimatedTime": 15,
      "keyPhrases": [
        "Er ist groß und schlank",
        "Sie hat braune Haare",
        "Sie trägt eine Brille",
        "Das ist sehr schön",
        "Es sieht alt aus",
        "Er hat blaue Augen",
        "Die Tasche ist aus Leder",
        "Sie ist freundlich und nett",
        "Das ist klein und rund",
        "Welche Farbe hat es?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Describing a lost item to hotel staff",
          "prompt": "Describe your lost bag: color, size, material and what is inside",
          "expectedPattern": "Meine Tasche ist klein und braun. Sie ist aus Leder. Darin ist mein Pass.",
          "vocabulary": [
            "die Tasche",
            "das Leder",
            "braun",
            "klein",
            "der Pass",
            "darin"
          ],
          "grammarDrill": {
            "pattern": "Adjective endings after \"ein/eine\" (nominative)",
            "exercise": "eine kleine Tasche / ein blauer Koffer / eine schwarze Jacke"
          }
        },
        {
          "id": "s2",
          "situation": "Describing a friend so someone can recognize them",
          "prompt": "Describe a person: height, hair, eyes, glasses and clothes",
          "expectedPattern": "Er ist groß und hat kurze, dunkle Haare. Er trägt eine Brille und eine blaue Jacke.",
          "vocabulary": [
            "die Haare",
            "die Augen",
            "die Brille",
            "groß",
            "schlank",
            "tragen"
          ],
          "grammarDrill": {
            "pattern": "Adjective endings in accusative after \"tragen\"",
            "exercise": "Er trägt einen roten Pullover / eine grüne Hose / ein weißes Hemd"
          }
        },
        {
          "id": "s3",
          "situation": "Describing your character to a new acquaintance",
          "prompt": "Describe your personality and compare yourself to your sibling",
          "expectedPattern": "Ich bin freundlich und ruhig. Mein Bruder ist lauter als ich.",
          "vocabulary": [
            "freundlich",
            "ruhig",
            "lustig",
            "der Charakter",
            "nett",
            "geduldig"
          ],
          "grammarDrill": {
            "pattern": "Comparative with \"als\"",
            "exercise": "ruhig → ruhiger als / laut → lauter als / nett → netter als"
          }
        }
      ]
    },
    {
      "id": "a2-4",
      "number": 16,
      "level": "A2",
      "title": "Past Events (Perfekt)",
      "description": "Talk about what happened using past tense",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich bin nach Berlin gefahren",
        "Ich habe einen Film gesehen",
        "Wir haben viel gelacht",
        "Gestern war ich im Park",
        "Letztes Wochenende habe ich gefeiert",
        "Wir sind spät nach Hause gekommen",
        "Hast du gut geschlafen?",
        "Ich habe das schon gemacht",
        "Wann bist du angekommen?",
        "Es hat mir sehr gefallen"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Telling a friend about your last vacation",
          "prompt": "Say where you traveled, what you saw and what you did",
          "expectedPattern": "Ich bin nach Italien gefahren. Ich habe das Meer gesehen und viel Pizza gegessen.",
          "vocabulary": [
            "der Urlaub",
            "reisen",
            "das Meer",
            "essen",
            "sehen",
            "das Hotel"
          ],
          "grammarDrill": {
            "pattern": "Perfekt: choosing \"haben\" vs \"sein\"",
            "exercise": "fahren → Ich bin gefahren / sehen → Ich habe gesehen / essen → Ich habe gegessen"
          }
        },
        {
          "id": "s2",
          "situation": "A colleague asks what you did yesterday evening",
          "prompt": "Describe your evening in the past using Perfekt and time words",
          "expectedPattern": "Gestern Abend habe ich gekocht, dann habe ich ferngesehen und bin früh ins Bett gegangen.",
          "vocabulary": [
            "gestern Abend",
            "kochen",
            "fernsehen",
            "ins Bett gehen",
            "früh",
            "dann"
          ],
          "grammarDrill": {
            "pattern": "Word order: time expression first, verb second",
            "exercise": "Gestern habe ich... / Am Wochenende bin ich... / Letzte Woche haben wir..."
          }
        },
        {
          "id": "s3",
          "situation": "Explaining why you were late",
          "prompt": "Apologize for being late and explain what happened using \"weil\"",
          "expectedPattern": "Es tut mir leid. Ich bin zu spät gekommen, weil der Zug Verspätung hatte.",
          "vocabulary": [
            "zu spät",
            "die Verspätung",
            "der Zug",
            "verpassen",
            "es tut mir leid",
            "der Stau"
          ],
          "grammarDrill": {
            "pattern": "Perfekt in subordinate clause with \"weil\" (auxiliary at the end)",
            "exercise": "Ich war müde, weil ich schlecht geschlafen habe. / weil der Bus nicht gekommen ist."
          }
        }
      ]
    },
    {
      "id": "a2-5",
      "number": 17,
      "level": "A2",
      "title": "Comparisons & Preferences",
      "description": "Compare things and express preferences",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich mag Tee lieber als Kaffee",
        "Das ist besser als das",
        "Der Zug ist schneller als das Auto",
        "Am liebsten esse ich Pizza",
        "Ich bevorzuge das blaue Hemd",
        "Diese Stadt ist größer als meine",
        "Das gefällt mir am besten",
        "Was magst du lieber?",
        "Beides ist gut, aber...",
        "Es ist genauso teuer wie das andere"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Choosing a restaurant with a friend",
          "prompt": "Explain which restaurant you prefer and why",
          "expectedPattern": "Ich mag das italienische Restaurant lieber, weil das Essen frischer ist.",
          "vocabulary": [
            "das Restaurant",
            "das Essen",
            "frisch",
            "günstig",
            "gemütlich",
            "die Auswahl"
          ],
          "grammarDrill": {
            "pattern": "Comparative + \"als\" and \"lieber\"",
            "exercise": "gut → besser als / frisch → frischer als / Ich mag X lieber als Y"
          }
        },
        {
          "id": "s2",
          "situation": "Comparing two cities you have lived in",
          "prompt": "Compare two cities using comparatives and the superlative",
          "expectedPattern": "Berlin ist größer als Köln, aber München ist am teuersten.",
          "vocabulary": [
            "die Stadt",
            "groß",
            "teuer",
            "ruhig",
            "das Leben",
            "die Miete"
          ],
          "grammarDrill": {
            "pattern": "Superlative with \"am ...sten\"",
            "exercise": "groß → am größten / teuer → am teuersten / gut → am besten"
          }
        },
        {
          "id": "s3",
          "situation": "Telling a salesperson which product you prefer",
          "prompt": "Say which of two products you like best and that they cost the same",
          "expectedPattern": "Mir gefällt das blaue Modell am besten. Es ist genauso teuer wie das rote.",
          "vocabulary": [
            "das Modell",
            "gefallen",
            "die Farbe",
            "genauso wie",
            "die Qualität",
            "wählen"
          ],
          "grammarDrill": {
            "pattern": "Equality with \"genauso ... wie\"",
            "exercise": "genauso teuer wie / genauso schön wie / genauso schnell wie"
          }
        }
      ]
    },
    {
      "id": "a2-6",
      "number": 18,
      "level": "A2",
      "title": "Giving Advice & Suggestions",
      "description": "Recommend things and give advice",
      "estimatedTime": 15,
      "keyPhrases": [
        "Du solltest mehr schlafen",
        "Ich würde das empfehlen",
        "Versuch doch mal Yoga",
        "An deiner Stelle würde ich warten",
        "Das ist wichtig für dich",
        "Du musst zum Arzt gehen",
        "Es ist besser, früh anzufangen",
        "Mach dir keine Sorgen",
        "Vergiss nicht, Wasser zu trinken",
        "Das hilft bestimmt"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "A friend wants to learn German",
          "prompt": "Give advice about learning German using \"du solltest\"",
          "expectedPattern": "Du solltest jeden Tag üben. Ich würde dir auch deutsche Filme empfehlen.",
          "vocabulary": [
            "üben",
            "empfehlen",
            "die Vokabeln",
            "der Film",
            "die Sprache",
            "der Kurs"
          ],
          "grammarDrill": {
            "pattern": "Advice with \"sollen\" (Konjunktiv: solltest)",
            "exercise": "Du solltest mehr lesen. / Ihr solltet langsamer sprechen. / Er sollte üben."
          }
        },
        {
          "id": "s2",
          "situation": "A colleague feels stressed at work",
          "prompt": "Suggest ways to relax using \"an deiner Stelle würde ich\"",
          "expectedPattern": "An deiner Stelle würde ich eine Pause machen und mit dem Chef sprechen.",
          "vocabulary": [
            "der Stress",
            "die Pause",
            "sich entspannen",
            "der Chef",
            "das Problem",
            "reden"
          ],
          "grammarDrill": {
            "pattern": "Konjunktiv II \"würde\" + infinitive for advice",
            "exercise": "Ich würde warten. / Ich würde einen Arzt fragen. / Ich würde es versuchen."
          }
        },
        {
          "id": "s3",
          "situation": "A tourist asks what to visit in your city",
          "prompt": "Recommend places and tell them not to forget something",
          "expectedPattern": "Du musst unbedingt den Markt besuchen. Vergiss nicht, das Museum anzuschauen.",
          "vocabulary": [
            "besuchen",
            "der Markt",
            "das Museum",
            "die Sehenswürdigkeit",
            "unbedingt",
            "sich anschauen"
          ],
          "grammarDrill": {
            "pattern": "Imperative for recommendations",
            "exercise": "Besuch den Markt! / Probier das Essen! / Vergiss die Kamera nicht!"
          }
        }
      ]
    },
    {
      "id": "a2-7",
      "number": 19,
      "level": "A2",
      "title": "Complaints & Problems",
      "description": "Politely complain and solve problems",
      "estimatedTime": 15,
      "keyPhrases": [
        "Es gibt ein Problem",
        "Das funktioniert nicht",
        "Können Sie mir helfen?",
        "Das ist nicht in Ordnung",
        "Ich bin nicht zufrieden",
        "Ich möchte mich beschweren",
        "Die Heizung ist kaputt",
        "Das habe ich nicht bestellt",
        "Können Sie das reparieren?",
        "Ich möchte mein Geld zurück"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Complaining about a noisy hotel room",
          "prompt": "Explain the problem politely and ask for a solution",
          "expectedPattern": "Entschuldigung, es gibt ein Problem. Das Zimmer ist zu laut. Können Sie mir helfen?",
          "vocabulary": [
            "das Zimmer",
            "laut",
            "die Lösung",
            "leise",
            "wechseln",
            "der Lärm"
          ],
          "grammarDrill": {
            "pattern": "Polite requests with \"Können Sie...?\"",
            "exercise": "Können Sie mir helfen? / Können Sie das wechseln? / Könnten Sie bitte kommen?"
          }
        },
        {
          "id": "s2",
          "situation": "Something you bought is broken",
          "prompt": "Tell the shop the item is broken and ask for a refund or repair",
          "expectedPattern": "Das Handy funktioniert nicht. Ich möchte mein Geld zurück oder eine Reparatur.",
          "vocabulary": [
            "kaputt",
            "funktionieren",
            "die Reparatur",
            "umtauschen",
            "die Garantie",
            "der Kassenbon"
          ],
          "grammarDrill": {
            "pattern": "Negation with \"nicht\" and \"kein\"",
            "exercise": "Das funktioniert nicht. / Ich habe keine Quittung. / Das ist nicht in Ordnung."
          }
        },
        {
          "id": "s3",
          "situation": "The wrong meal arrives at a restaurant",
          "prompt": "Say this is not what you ordered and explain why you are not satisfied",
          "expectedPattern": "Das habe ich nicht bestellt. Ich bin nicht zufrieden, weil das Essen kalt ist.",
          "vocabulary": [
            "bestellen",
            "falsch",
            "kalt",
            "zufrieden",
            "der Kellner",
            "noch einmal"
          ],
          "grammarDrill": {
            "pattern": "Perfekt + reason with \"weil\"",
            "exercise": "Ich bin sauer, weil ich lange gewartet habe. / weil das Essen kalt geworden ist."
          }
        }
      ]
    },
    {
      "id": "a2-8",
      "number": 20,
      "level": "A2",
      "title": "Talking About Work",
      "description": "Discuss your job and work life",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich arbeite als Ingenieur",
        "Meine Arbeit macht Spaß",
        "Ich muss oft Berichte schreiben",
        "Der Job ist manchmal stressig",
        "Meine Kollegen sind sehr nett",
        "Ich arbeite von neun bis fünf",
        "Ich habe ein eigenes Büro",
        "Am Montag habe ich eine Besprechung",
        "Ich arbeite im Homeoffice",
        "Wie lange arbeitest du schon dort?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "At a networking event",
          "prompt": "Explain what you do for work and what your tasks are",
          "expectedPattern": "Ich arbeite als Lehrer. Ich muss Stunden vorbereiten und Tests korrigieren.",
          "vocabulary": [
            "der Beruf",
            "die Aufgabe",
            "vorbereiten",
            "das Büro",
            "die Firma",
            "verdienen"
          ],
          "grammarDrill": {
            "pattern": "Modal verb \"müssen\" + infinitive at the end",
            "exercise": "Ich muss früh aufstehen. / Ich muss viele E-Mails schreiben. / Wir müssen pünktlich sein."
          }
        },
        {
          "id": "s2",
          "situation": "Describing a typical workday to a friend",
          "prompt": "Describe your daily work schedule using time expressions",
          "expectedPattern": "Ich fange um neun an. Am Vormittag habe ich Besprechungen, am Nachmittag schreibe ich E-Mails.",
          "vocabulary": [
            "anfangen",
            "die Besprechung",
            "die Pause",
            "der Vormittag",
            "der Feierabend",
            "die Aufgabe"
          ],
          "grammarDrill": {
            "pattern": "Separable verbs: anfangen, aufhören",
            "exercise": "Ich fange um neun an. / Ich höre um fünf auf. / Wir machen um zwölf Pause."
          }
        },
        {
          "id": "s3",
          "situation": "Talking about what you like and dislike at work",
          "prompt": "Say what you like and dislike about your job and why",
          "expectedPattern": "Ich mag meinen Job, weil die Kollegen nett sind. Der Stress gefällt mir aber nicht.",
          "vocabulary": [
            "der Kollege",
            "der Stress",
            "das Gehalt",
            "die Überstunden",
            "der Spaß",
            "anstrengend"
          ],
          "grammarDrill": {
            "pattern": "Expressing likes/dislikes + \"weil\"",
            "exercise": "Ich mag den Job, weil er interessant ist. / Ich mag ihn nicht, weil er stressig ist."
          }
        }
      ]
    },
    {
      "id": "a2-9",
      "number": 21,
      "level": "A2",
      "title": "Future Plans",
      "description": "Talk about future intentions and plans",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich werde nächstes Jahr umziehen",
        "Nächsten Sommer will ich reisen",
        "Ich plane eine Reise nach Spanien",
        "Ich habe vor, Deutsch zu lernen",
        "In Zukunft möchte ich mehr Sport machen",
        "Morgen werde ich einkaufen gehen",
        "Bald fange ich einen neuen Job an",
        "Was sind deine Pläne?",
        "Vielleicht kaufe ich ein Auto",
        "Ich freue mich schon darauf"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Discussing plans for next summer",
          "prompt": "Talk about your travel plans using the future with \"werden\"",
          "expectedPattern": "Nächsten Sommer werde ich nach Spanien fahren und am Strand entspannen.",
          "vocabulary": [
            "der Sommer",
            "die Reise",
            "der Strand",
            "sich entspannen",
            "das Flugzeug",
            "buchen"
          ],
          "grammarDrill": {
            "pattern": "Future tense with \"werden\" + infinitive",
            "exercise": "Ich werde reisen. / Wir werden umziehen. / Er wird einen Job suchen."
          }
        },
        {
          "id": "s2",
          "situation": "Talking about your goals for the next year",
          "prompt": "Describe your intentions using \"ich habe vor\" and \"ich möchte\"",
          "expectedPattern": "Ich habe vor, mehr Sport zu machen, und ich möchte besser Deutsch sprechen.",
          "vocabulary": [
            "der Plan",
            "das Ziel",
            "vorhaben",
            "lernen",
            "verbessern",
            "gesund"
          ],
          "grammarDrill": {
            "pattern": "Infinitive with \"zu\" after \"vorhaben\"",
            "exercise": "Ich habe vor, zu reisen. / Ich habe vor, ein Auto zu kaufen. / Ich plane, umzuziehen."
          }
        },
        {
          "id": "s3",
          "situation": "Making concrete plans for the weekend",
          "prompt": "Say what you are going to do this weekend and ask about your friend's plans",
          "expectedPattern": "Am Samstag besuche ich meine Eltern. Und was machst du am Wochenende?",
          "vocabulary": [
            "das Wochenende",
            "besuchen",
            "die Eltern",
            "der Ausflug",
            "planen",
            "frei haben"
          ],
          "grammarDrill": {
            "pattern": "Present tense for near-future plans",
            "exercise": "Morgen gehe ich ins Kino. / Am Sonntag treffe ich Freunde. / Heute Abend koche ich."
          }
        }
      ]
    },
    {
      "id": "a2-10",
      "number": 22,
      "level": "A2",
      "title": "Invitations & Events",
      "description": "Invite people and discuss events",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich lade dich zu meiner Party ein",
        "Kommst du mit?",
        "Wir feiern meinen Geburtstag",
        "Die Party ist am Samstag",
        "Bring bitte etwas zu trinken mit",
        "Hast du am Freitag Zeit?",
        "Die Feier beginnt um acht Uhr",
        "Vielen Dank für die Einladung",
        "Ich kann leider nicht kommen",
        "Soll ich etwas mitbringen?"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Inviting a colleague to your birthday party",
          "prompt": "Invite someone, say when and where, and ask if they can come",
          "expectedPattern": "Ich feiere am Samstag meinen Geburtstag. Die Party ist bei mir um acht. Kommst du?",
          "vocabulary": [
            "der Geburtstag",
            "die Party",
            "feiern",
            "die Einladung",
            "einladen",
            "die Adresse"
          ],
          "grammarDrill": {
            "pattern": "Separable verb \"einladen\"",
            "exercise": "Ich lade dich ein. / Wir laden alle ein. / Er lädt seine Freunde ein."
          }
        },
        {
          "id": "s2",
          "situation": "Accepting an invitation and offering to help",
          "prompt": "Thank for the invitation, accept, and ask what you should bring",
          "expectedPattern": "Vielen Dank für die Einladung! Ich komme gern. Soll ich einen Salat mitbringen?",
          "vocabulary": [
            "danken",
            "gern",
            "mitbringen",
            "der Salat",
            "das Getränk",
            "das Geschenk"
          ],
          "grammarDrill": {
            "pattern": "Separable verb \"mitbringen\" in questions",
            "exercise": "Soll ich Kuchen mitbringen? / Bring bitte Brot mit! / Was bringst du mit?"
          }
        },
        {
          "id": "s3",
          "situation": "Declining an invitation politely",
          "prompt": "Politely refuse and explain why you cannot come",
          "expectedPattern": "Das ist sehr nett, aber leider kann ich nicht kommen, weil ich verreist bin.",
          "vocabulary": [
            "leider",
            "absagen",
            "verreist",
            "schade",
            "das nächste Mal",
            "beschäftigt"
          ],
          "grammarDrill": {
            "pattern": "Modal \"können\" + \"weil\" clause",
            "exercise": "Ich kann nicht kommen, weil ich arbeiten muss. / weil ich krank bin."
          }
        }
      ]
    },
    {
      "id": "a2-11",
      "number": 23,
      "level": "A2",
      "title": "Shopping for Clothes",
      "description": "Shop for clothing and discuss sizes/colors",
      "estimatedTime": 15,
      "keyPhrases": [
        "Welche Größe haben Sie?",
        "Kann ich das anprobieren?",
        "Das steht mir gut",
        "Haben Sie das in Blau?",
        "Das ist mir zu teuer",
        "Wo ist die Umkleidekabine?",
        "Die Hose ist zu groß",
        "Haben Sie eine kleinere Größe?",
        "Ich suche eine warme Jacke",
        "Das nehme ich"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Trying on a jacket in a clothing store",
          "prompt": "Ask to try on a jacket and ask about your size",
          "expectedPattern": "Kann ich diese Jacke anprobieren? Haben Sie sie in Größe M?",
          "vocabulary": [
            "die Jacke",
            "anprobieren",
            "die Größe",
            "die Umkleidekabine",
            "passen",
            "die Farbe"
          ],
          "grammarDrill": {
            "pattern": "Separable verb \"anprobieren\" + modal \"können\"",
            "exercise": "Kann ich das anprobieren? / Ich probiere die Hose an. / Probier den Mantel an!"
          }
        },
        {
          "id": "s2",
          "situation": "The item does not fit well",
          "prompt": "Say the item is too big or too small and ask for another size or color",
          "expectedPattern": "Die Hose ist mir zu groß. Haben Sie sie eine Nummer kleiner oder in Schwarz?",
          "vocabulary": [
            "zu groß",
            "zu klein",
            "zu eng",
            "die Nummer",
            "der Stoff",
            "das Hemd"
          ],
          "grammarDrill": {
            "pattern": "Dative with \"mir\" + \"zu\" + adjective",
            "exercise": "Das ist mir zu teuer. / Die Schuhe sind mir zu eng. / Der Pullover ist mir zu warm."
          }
        },
        {
          "id": "s3",
          "situation": "Deciding to buy and paying",
          "prompt": "Say you will take the item and ask if you can pay by card",
          "expectedPattern": "Das steht mir gut, das nehme ich. Kann ich mit Karte zahlen?",
          "vocabulary": [
            "nehmen",
            "stehen",
            "zahlen",
            "die Karte",
            "die Kasse",
            "der Rabatt"
          ],
          "grammarDrill": {
            "pattern": "Verb \"stehen\" with dative (it suits me)",
            "exercise": "Das steht dir gut. / Die Farbe steht mir nicht. / Das Kleid steht ihr toll."
          }
        }
      ]
    },
    {
      "id": "a2-12",
      "number": 24,
      "level": "A2",
      "title": "Phone Conversations",
      "description": "Make phone calls and leave messages",
      "estimatedTime": 15,
      "keyPhrases": [
        "Guten Tag, hier spricht Herr Müller",
        "Kann ich bitte mit Frau Schmidt sprechen?",
        "Einen Moment, bitte",
        "Kann ich eine Nachricht hinterlassen?",
        "Auf Wiederhören",
        "Können Sie mich zurückrufen?",
        "Ich rufe wegen des Termins an",
        "Die Leitung ist gerade besetzt",
        "Können Sie das bitte wiederholen?",
        "Ich habe mich verwählt"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Calling a doctor to make an appointment",
          "prompt": "Introduce yourself on the phone and say you want an appointment",
          "expectedPattern": "Guten Tag, hier spricht Frau Klein. Ich möchte einen Termin vereinbaren.",
          "vocabulary": [
            "der Termin",
            "vereinbaren",
            "die Praxis",
            "anrufen",
            "dringend",
            "die Sprechstunde"
          ],
          "grammarDrill": {
            "pattern": "Separable verb \"anrufen\" and reason with \"wegen\"",
            "exercise": "Ich rufe wegen eines Termins an. / Ich rufe wegen der Rechnung an."
          }
        },
        {
          "id": "s2",
          "situation": "The person you want is not available",
          "prompt": "Ask to leave a message and ask them to call you back",
          "expectedPattern": "Kann ich eine Nachricht hinterlassen? Können Sie mich bitte zurückrufen?",
          "vocabulary": [
            "die Nachricht",
            "hinterlassen",
            "zurückrufen",
            "die Nummer",
            "erreichen",
            "später"
          ],
          "grammarDrill": {
            "pattern": "Polite requests with \"Können Sie...?\" + separable verb",
            "exercise": "Können Sie zurückrufen? / Können Sie mir die Nummer geben? / Können Sie warten?"
          }
        },
        {
          "id": "s3",
          "situation": "You did not understand something on the phone",
          "prompt": "Politely ask the person to repeat or speak more slowly",
          "expectedPattern": "Entschuldigung, ich habe Sie nicht verstanden. Können Sie bitte langsamer sprechen?",
          "vocabulary": [
            "verstehen",
            "wiederholen",
            "langsam",
            "buchstabieren",
            "die Leitung",
            "laut"
          ],
          "grammarDrill": {
            "pattern": "Comparative adverbs: langsamer, lauter, deutlicher",
            "exercise": "Sprechen Sie bitte langsamer. / lauter. / deutlicher."
          }
        }
      ]
    }
  ],
  "B1": [
    {
      "id": "b1-1",
      "number": 25,
      "level": "B1",
      "title": "Expressing Opinions",
      "description": "Share your views and opinions on various topics",
      "estimatedTime": 15,
      "keyPhrases": [
        "Meiner Meinung nach...",
        "Ich glaube, dass...",
        "Ich bin der Ansicht, dass...",
        "Das finde ich (nicht) gut",
        "Einerseits..., andererseits...",
        "Ich bin davon überzeugt, dass...",
        "Soweit ich weiß,...",
        "Ehrlich gesagt finde ich...",
        "Im Großen und Ganzen...",
        "Ich teile diese Meinung (nicht)"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Discussing a controversial news topic with colleagues",
          "prompt": "Share your opinion on a current political topic and justify it",
          "expectedPattern": "Meiner Meinung nach sollte... Ich glaube, dass...",
          "vocabulary": [
            "die Meinung",
            "die Politik",
            "die Regierung",
            "die Lösung",
            "überzeugt sein",
            "das Argument"
          ],
          "grammarDrill": {
            "pattern": "Subordinate clause with \"dass\" (verb goes to the end)",
            "exercise": "Ich glaube, dass die Regierung mehr tun muss. / Ich bin sicher, dass das funktioniert."
          }
        },
        {
          "id": "s2",
          "situation": "A friend asks whether social media is good or bad",
          "prompt": "Give a balanced opinion showing both sides of the issue",
          "expectedPattern": "Einerseits..., andererseits... Trotzdem finde ich...",
          "vocabulary": [
            "die sozialen Medien",
            "der Vorteil",
            "der Nachteil",
            "die Auswirkung",
            "abhängig",
            "der Einfluss"
          ],
          "grammarDrill": {
            "pattern": "Connector \"trotzdem\" (concession; verb in second position after it)",
            "exercise": "Es gibt viele Nachteile. Trotzdem nutze ich es jeden Tag."
          }
        },
        {
          "id": "s3",
          "situation": "Disagreeing politely in a book club discussion",
          "prompt": "Politely express that you see things differently and explain why",
          "expectedPattern": "Das sehe ich anders, weil... Ich bin der Ansicht, dass...",
          "vocabulary": [
            "widersprechen",
            "die Ansicht",
            "der Standpunkt",
            "nachvollziehbar",
            "zustimmen",
            "der Eindruck"
          ],
          "grammarDrill": {
            "pattern": "Causal connector \"weil\" vs \"denn\" (weil sends verb to end, denn keeps main word order)",
            "exercise": "Ich mag das Buch nicht, weil die Handlung langweilig ist. / ..., denn die Handlung ist langweilig."
          }
        }
      ]
    },
    {
      "id": "b1-2",
      "number": 26,
      "level": "B1",
      "title": "Telling Stories",
      "description": "Narrate events and experiences in detail",
      "estimatedTime": 15,
      "keyPhrases": [
        "Es war einmal...",
        "Plötzlich...",
        "Danach ist etwas Komisches passiert",
        "Am Ende...",
        "Die ganze Geschichte war ziemlich verrückt",
        "Zuerst..., dann..., schließlich...",
        "Auf einmal merkte ich, dass...",
        "Du wirst nicht glauben, was passiert ist",
        "Während wir... waren,...",
        "Kaum hatte ich..., da..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Entertaining friends at dinner",
          "prompt": "Tell a funny story from your past in the past tense",
          "expectedPattern": "Vor ein paar Jahren... Plötzlich... Am Ende...",
          "vocabulary": [
            "passieren",
            "plötzlich",
            "die Geschichte",
            "sich erinnern",
            "peinlich",
            "lustig"
          ],
          "grammarDrill": {
            "pattern": "Präteritum of common verbs for narration (war, hatte, ging, kam, sah)",
            "exercise": "Ich war im Urlaub. Es gab ein Problem. Wir gingen ins Hotel. Plötzlich kam ein Mann."
          }
        },
        {
          "id": "s2",
          "situation": "Recounting a dramatic travel experience",
          "prompt": "Describe a moment when something went wrong during a trip and how it ended",
          "expectedPattern": "Während wir am Flughafen warteten, wurde unser Flug gestrichen...",
          "vocabulary": [
            "der Flughafen",
            "streichen",
            "die Verspätung",
            "verpassen",
            "das Gepäck",
            "die Panik"
          ],
          "grammarDrill": {
            "pattern": "Temporal clause with \"als\" (single past event) vs \"während\" (parallel action)",
            "exercise": "Als ich ankam, war der Zug schon weg. / Während ich schlief, regnete es."
          }
        },
        {
          "id": "s3",
          "situation": "Telling a childhood memory to your kids",
          "prompt": "Narrate a memory from your childhood, setting the scene and the outcome",
          "expectedPattern": "Als ich klein war, hatten wir... Eines Tages...",
          "vocabulary": [
            "die Kindheit",
            "die Erinnerung",
            "damals",
            "das Dorf",
            "aufwachsen",
            "die Nachbarn"
          ],
          "grammarDrill": {
            "pattern": "Plusquamperfekt for events before the main past event",
            "exercise": "Nachdem wir gegessen hatten, gingen wir nach Hause. / Ich hatte vergessen, dass..."
          }
        }
      ]
    },
    {
      "id": "b1-3",
      "number": 27,
      "level": "B1",
      "title": "Complex Explanations",
      "description": "Explain processes and concepts in detail",
      "estimatedTime": 15,
      "keyPhrases": [
        "Zuerst muss man...",
        "Der Grund dafür ist...",
        "Das bedeutet, dass...",
        "Um das zu verstehen, muss man wissen...",
        "Zusammengefasst...",
        "Mit anderen Worten...",
        "Das hängt damit zusammen, dass...",
        "Es funktioniert folgendermaßen:...",
        "Daraus folgt, dass...",
        "Anders ausgedrückt..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Explaining your job to someone outside your field",
          "prompt": "Explain in detail what you do at work and why it matters",
          "expectedPattern": "Ich bin verantwortlich für... Das bedeutet, dass ich...",
          "vocabulary": [
            "verantwortlich",
            "die Aufgabe",
            "der Ablauf",
            "das Ziel",
            "die Abteilung",
            "zuständig sein"
          ],
          "grammarDrill": {
            "pattern": "Infinitive clause with \"um... zu\" (in order to)",
            "exercise": "Ich analysiere Daten, um Probleme zu erkennen. / Wir treffen uns, um Entscheidungen zu treffen."
          }
        },
        {
          "id": "s2",
          "situation": "Explaining a recipe or process step by step",
          "prompt": "Explain how to prepare a dish or complete a task using sequencing words",
          "expectedPattern": "Zuerst..., dann..., danach... und schließlich...",
          "vocabulary": [
            "die Zutat",
            "der Schritt",
            "vorbereiten",
            "hinzufügen",
            "mischen",
            "schließlich"
          ],
          "grammarDrill": {
            "pattern": "Passive voice (Vorgangspassiv) for impersonal instructions",
            "exercise": "Das Gemüse wird geschnitten. Die Soße wird hinzugefügt. Alles wird gemischt."
          }
        },
        {
          "id": "s3",
          "situation": "Clarifying a misunderstanding in a discussion",
          "prompt": "Re-explain your point more clearly because you were misunderstood",
          "expectedPattern": "Mit anderen Worten, ich meinte, dass... Der Grund dafür ist...",
          "vocabulary": [
            "das Missverständnis",
            "klarstellen",
            "gemeint",
            "verwechseln",
            "der Grund",
            "verdeutlichen"
          ],
          "grammarDrill": {
            "pattern": "Connector \"deshalb\" / \"deswegen\" (consequence; inversion follows)",
            "exercise": "Ich habe mich unklar ausgedrückt, deshalb erkläre ich es noch einmal."
          }
        }
      ]
    },
    {
      "id": "b1-4",
      "number": 28,
      "level": "B1",
      "title": "Debating & Discussing",
      "description": "Engage in debates and express disagreement politely",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich stimme dir (nicht) zu",
        "Das sehe ich anders",
        "Einerseits hast du Recht, aber...",
        "Darf ich kurz widersprechen?",
        "Lass uns einen Kompromiss finden",
        "Da bin ich ganz deiner Meinung",
        "Das mag sein, aber...",
        "Im Gegenteil,...",
        "Genau das ist der Punkt",
        "Wenn ich dich richtig verstehe,..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Friendly debate about city versus countryside life",
          "prompt": "Discuss whether living in a city is better than the countryside",
          "expectedPattern": "Einerseits hast du Recht, dass..., aber andererseits...",
          "vocabulary": [
            "das Land",
            "die Großstadt",
            "die Lebensqualität",
            "die Miete",
            "der Lärm",
            "die Natur"
          ],
          "grammarDrill": {
            "pattern": "Concessive connector \"obwohl\" (although; verb to the end)",
            "exercise": "Obwohl die Stadt teurer ist, wohne ich gern hier. / Ich mag das Land, obwohl es ruhig ist."
          }
        },
        {
          "id": "s2",
          "situation": "Workplace meeting about remote work policy",
          "prompt": "Argue for or against working from home and respond to counterarguments",
          "expectedPattern": "Ich bin überzeugt, dass... Das mag sein, aber...",
          "vocabulary": [
            "das Homeoffice",
            "die Produktivität",
            "der Kompromiss",
            "flexibel",
            "das Argument",
            "die Erreichbarkeit"
          ],
          "grammarDrill": {
            "pattern": "Two-part connector \"zwar..., aber...\" (admittedly..., but...)",
            "exercise": "Homeoffice ist zwar bequem, aber man fühlt sich isoliert."
          }
        },
        {
          "id": "s3",
          "situation": "Discussing whether technology makes us happier",
          "prompt": "Take a position on technology and happiness, then seek common ground",
          "expectedPattern": "Da muss ich widersprechen... Lass uns einen Kompromiss finden.",
          "vocabulary": [
            "die Technologie",
            "der Fortschritt",
            "die Abhängigkeit",
            "das Gleichgewicht",
            "sich verbessern",
            "der Zweifel"
          ],
          "grammarDrill": {
            "pattern": "Comparative with \"je..., desto...\" (the more..., the more...)",
            "exercise": "Je mehr wir Technik nutzen, desto weniger reden wir miteinander."
          }
        }
      ]
    },
    {
      "id": "b1-5",
      "number": 29,
      "level": "B1",
      "title": "Hypothetical Situations",
      "description": "Use subjunctive to discuss \"what if\" scenarios",
      "estimatedTime": 15,
      "keyPhrases": [
        "Wenn ich... wäre, würde ich...",
        "Ich würde gern...",
        "Stell dir vor,...",
        "An deiner Stelle würde ich...",
        "Das wäre toll/schrecklich",
        "Wenn ich mehr Zeit hätte,...",
        "Was würdest du tun, wenn...?",
        "Ich hätte das anders gemacht",
        "Es wäre besser, wenn...",
        "Angenommen, wir hätten..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Daydreaming about winning the lottery",
          "prompt": "Discuss what you would do if you won the lottery",
          "expectedPattern": "Wenn ich im Lotto gewinnen würde, würde ich...",
          "vocabulary": [
            "das Lotto",
            "der Gewinn",
            "reisen",
            "spenden",
            "sich leisten",
            "der Traum"
          ],
          "grammarDrill": {
            "pattern": "Konjunktiv II for unreal conditions (würde + infinitive / wäre / hätte)",
            "exercise": "Wenn ich reich wäre, würde ich um die Welt reisen. / Wenn ich Zeit hätte, würde ich mehr lesen."
          }
        },
        {
          "id": "s2",
          "situation": "Giving advice to a friend about a job offer",
          "prompt": "Tell your friend what you would do in their situation",
          "expectedPattern": "An deiner Stelle würde ich... Ich an deiner Stelle hätte...",
          "vocabulary": [
            "die Stelle",
            "der Vertrag",
            "das Gehalt",
            "sich entscheiden",
            "die Chance",
            "zögern"
          ],
          "grammarDrill": {
            "pattern": "Polite suggestions with \"An deiner Stelle würde ich...\" + Konjunktiv II",
            "exercise": "An deiner Stelle würde ich das Angebot annehmen. / Ich würde noch verhandeln."
          }
        },
        {
          "id": "s3",
          "situation": "Regretting a past decision",
          "prompt": "Express what you would have done differently in the past",
          "expectedPattern": "Wenn ich das gewusst hätte, hätte ich anders gehandelt.",
          "vocabulary": [
            "bereuen",
            "die Entscheidung",
            "der Fehler",
            "rückblickend",
            "anders",
            "die Möglichkeit"
          ],
          "grammarDrill": {
            "pattern": "Konjunktiv II der Vergangenheit (hätte/wäre + Partizip) for past regrets",
            "exercise": "Wenn ich früher angefangen hätte, wäre ich jetzt fertig. / Ich hätte mehr lernen sollen."
          }
        }
      ]
    },
    {
      "id": "b1-6",
      "number": 30,
      "level": "B1",
      "title": "Cultural Discussions",
      "description": "Discuss cultural differences and traditions",
      "estimatedTime": 15,
      "keyPhrases": [
        "In meiner Kultur...",
        "Das ist typisch für...",
        "Bei uns macht man das anders",
        "Interessanterweise...",
        "Das finde ich faszinierend",
        "Im Vergleich zu Deutschland...",
        "Daran musste ich mich erst gewöhnen",
        "Das ist mir zuerst komisch vorgekommen",
        "Es gibt da einen großen Unterschied",
        "Das hat mit der Tradition zu tun"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Cultural exchange with a German friend",
          "prompt": "Compare British and German customs around daily life",
          "expectedPattern": "In England... aber in Deutschland... Das finde ich interessant.",
          "vocabulary": [
            "die Kultur",
            "die Sitte",
            "die Tradition",
            "der Unterschied",
            "die Gewohnheit",
            "üblich"
          ],
          "grammarDrill": {
            "pattern": "Relative clauses (der/die/das) to add detail about cultural things",
            "exercise": "Das ist ein Brauch, der sehr alt ist. / Die Tradition, die wir feiern, kommt aus..."
          }
        },
        {
          "id": "s2",
          "situation": "Talking about a festival or holiday from your country",
          "prompt": "Explain a traditional celebration and what it means to people",
          "expectedPattern": "Bei uns feiert man... Das bedeutet, dass...",
          "vocabulary": [
            "das Fest",
            "der Feiertag",
            "feiern",
            "die Bedeutung",
            "der Brauch",
            "das Erbe"
          ],
          "grammarDrill": {
            "pattern": "Passive with \"man\" as an alternative impersonal form",
            "exercise": "Man isst traditionell Kuchen. / Es wird viel getanzt. / Man schenkt sich Geschenke."
          }
        },
        {
          "id": "s3",
          "situation": "Discussing culture shock after moving abroad",
          "prompt": "Describe what surprised you about German culture and how you adapted",
          "expectedPattern": "Am Anfang war es seltsam, dass... aber inzwischen habe ich mich daran gewöhnt.",
          "vocabulary": [
            "der Kulturschock",
            "sich gewöhnen an",
            "die Pünktlichkeit",
            "die Mülltrennung",
            "die Direktheit",
            "anpassen"
          ],
          "grammarDrill": {
            "pattern": "Verbs with fixed prepositions (sich gewöhnen an + Akkusativ)",
            "exercise": "Ich habe mich an das Wetter gewöhnt. / Ich denke oft an meine Heimat."
          }
        }
      ]
    },
    {
      "id": "b1-7",
      "number": 31,
      "level": "B1",
      "title": "Emotional Expressions",
      "description": "Express feelings and emotions in depth",
      "estimatedTime": 15,
      "keyPhrases": [
        "Ich bin begeistert von...",
        "Das macht mich wütend/traurig/glücklich",
        "Ich habe Angst vor...",
        "Ich freue mich auf...",
        "Das berührt mich sehr",
        "Ich bin völlig überfordert",
        "Es tut mir wirklich leid, dass...",
        "Ich bin stolz auf...",
        "Das hat mich tief beeindruckt",
        "Mir ist das Ganze sehr unangenehm"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "A deep conversation with a close friend",
          "prompt": "Talk about something that made you emotional recently and why",
          "expectedPattern": "Das hat mich sehr berührt, weil... Ich war so gerührt, dass...",
          "vocabulary": [
            "die Gefühle",
            "berühren",
            "gerührt",
            "die Träne",
            "überwältigt",
            "dankbar"
          ],
          "grammarDrill": {
            "pattern": "Verbs with fixed prepositions for emotions (sich freuen auf/über, Angst haben vor)",
            "exercise": "Ich freue mich auf das Wochenende. / Ich freue mich über dein Geschenk. / Ich habe Angst vor der Prüfung."
          }
        },
        {
          "id": "s2",
          "situation": "Comforting a friend who is going through a hard time",
          "prompt": "Express empathy and offer emotional support",
          "expectedPattern": "Ich kann verstehen, dass du dich so fühlst. Es tut mir leid, dass...",
          "vocabulary": [
            "trösten",
            "mitfühlen",
            "die Sorge",
            "belastet sein",
            "für jemanden da sein",
            "die Unterstützung"
          ],
          "grammarDrill": {
            "pattern": "Reflexive verbs of emotion (sich fühlen, sich ärgern, sich aufregen)",
            "exercise": "Ich fühle mich schlecht. / Er regt sich über alles auf. / Ärgere dich nicht!"
          }
        },
        {
          "id": "s3",
          "situation": "Sharing excitement about good personal news",
          "prompt": "Tell someone enthusiastically about something great that happened",
          "expectedPattern": "Ich bin so begeistert! Du glaubst nicht, wie glücklich ich bin, dass...",
          "vocabulary": [
            "die Begeisterung",
            "aufgeregt",
            "die Freude",
            "kaum erwarten",
            "stolz",
            "gespannt"
          ],
          "grammarDrill": {
            "pattern": "Exclamatory clauses with \"wie\" and \"was für ein\"",
            "exercise": "Wie schön das ist! / Was für eine tolle Nachricht! / Wie sehr ich mich freue!"
          }
        }
      ]
    },
    {
      "id": "b1-8",
      "number": 32,
      "level": "B1",
      "title": "Negotiations & Compromises",
      "description": "Negotiate and find middle ground",
      "estimatedTime": 15,
      "keyPhrases": [
        "Können wir uns einigen?",
        "Wie wäre es mit...?",
        "Das geht leider nicht",
        "Ich kann Ihnen entgegenkommen",
        "Lass uns einen Deal machen",
        "Wäre ein Mittelweg möglich?",
        "Unter einer Bedingung:...",
        "Darüber lässt sich reden",
        "Damit kann ich leben",
        "Das ist mein letztes Angebot"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Negotiating the price of a used car",
          "prompt": "Negotiate the price of a used car with the seller",
          "expectedPattern": "Könnten Sie mit dem Preis runtergehen? Wie wäre es mit...?",
          "vocabulary": [
            "der Preis",
            "handeln",
            "der Rabatt",
            "der Gebrauchtwagen",
            "sich einigen",
            "das Angebot"
          ],
          "grammarDrill": {
            "pattern": "Polite requests with Konjunktiv II (könnten Sie, wären Sie bereit)",
            "exercise": "Könnten Sie mir entgegenkommen? / Wären Sie bereit, den Preis zu senken?"
          }
        },
        {
          "id": "s2",
          "situation": "Agreeing with your partner on weekend plans you both want",
          "prompt": "Find a compromise when you each want to do something different",
          "expectedPattern": "Wie wäre es, wenn wir zuerst..., und danach...? Damit kann ich leben.",
          "vocabulary": [
            "der Kompromiss",
            "der Mittelweg",
            "nachgeben",
            "die Bedingung",
            "sich einig sein",
            "fair"
          ],
          "grammarDrill": {
            "pattern": "Conditional clauses with \"falls\" (in case)",
            "exercise": "Falls es regnet, bleiben wir zu Hause. / Falls du willst, können wir tauschen."
          }
        },
        {
          "id": "s3",
          "situation": "Asking your boss for a raise or flexible hours",
          "prompt": "Make your case professionally and respond to objections",
          "expectedPattern": "Ich würde gern über... sprechen. Wäre es möglich, dass...?",
          "vocabulary": [
            "die Gehaltserhöhung",
            "die Arbeitszeit",
            "die Leistung",
            "verhandeln",
            "das Argument",
            "vertreten"
          ],
          "grammarDrill": {
            "pattern": "Indirect questions with \"ob\" (whether)",
            "exercise": "Ich wollte fragen, ob eine Erhöhung möglich wäre. / Ich weiß nicht, ob das geht."
          }
        }
      ]
    },
    {
      "id": "b1-9",
      "number": 33,
      "level": "B1",
      "title": "Professional Conversations",
      "description": "Conduct business meetings and presentations",
      "estimatedTime": 15,
      "keyPhrases": [
        "Vielen Dank für die Einladung",
        "Ich möchte Ihnen heute... präsentieren",
        "Die Zahlen zeigen, dass...",
        "Haben Sie noch Fragen?",
        "Lassen Sie uns zusammenfassen",
        "Kommen wir zum nächsten Punkt",
        "Ich komme gleich zum Wesentlichen",
        "Darf ich kurz nachhaken?",
        "Wir sollten das im Auge behalten",
        "Lassen Sie mich das kurz erläutern"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Presenting a project to colleagues in a meeting",
          "prompt": "Present a project, highlight key points, and invite questions",
          "expectedPattern": "Ich möchte Ihnen das Projekt vorstellen. Die Hauptpunkte sind...",
          "vocabulary": [
            "die Präsentation",
            "das Projekt",
            "das Ergebnis",
            "der Zeitplan",
            "die Folie",
            "der Überblick"
          ],
          "grammarDrill": {
            "pattern": "Passive voice in professional reports (Vorgangspassiv)",
            "exercise": "Das Projekt wurde letztes Jahr gestartet. Die Ziele werden bis Juni erreicht."
          }
        },
        {
          "id": "s2",
          "situation": "Writing or saying a professional email opening on a call",
          "prompt": "Politely follow up on a request and clarify next steps",
          "expectedPattern": "Ich wollte mich erkundigen, wie der Stand ist. Könnten Sie mir mitteilen...?",
          "vocabulary": [
            "sich erkundigen",
            "der Stand",
            "die Frist",
            "erledigen",
            "die Rückmeldung",
            "der Termin"
          ],
          "grammarDrill": {
            "pattern": "Genitiv with formal nouns (der Stand des Projekts, das Ende der Frist)",
            "exercise": "Der Erfolg des Projekts ist wichtig. / Wegen des Termins müssen wir uns beeilen."
          }
        },
        {
          "id": "s3",
          "situation": "Handling a difficult question or objection in a meeting",
          "prompt": "Respond calmly to criticism and steer the discussion forward",
          "expectedPattern": "Das ist ein berechtigter Einwand. Lassen Sie mich das erläutern...",
          "vocabulary": [
            "der Einwand",
            "berechtigt",
            "erläutern",
            "die Herausforderung",
            "die Maßnahme",
            "die Priorität"
          ],
          "grammarDrill": {
            "pattern": "Indirect speech with Konjunktiv I/II for reporting (er sagte, er habe/hätte)",
            "exercise": "Der Kunde sagte, er sei zufrieden. / Sie meinte, das Ergebnis sei gut."
          }
        }
      ]
    },
    {
      "id": "b1-10",
      "number": 34,
      "level": "B1",
      "title": "Abstract Concepts",
      "description": "Discuss abstract ideas like happiness, success, freedom",
      "estimatedTime": 15,
      "keyPhrases": [
        "Glück bedeutet für mich...",
        "Erfolg ist relativ",
        "Das hängt davon ab, wie man es sieht",
        "Philosophisch gesehen...",
        "Im Großen und Ganzen...",
        "Letztlich kommt es darauf an, dass...",
        "Für die einen..., für die anderen...",
        "Das ist eine Frage der Definition",
        "Es gibt keine einfache Antwort darauf",
        "Im Grunde genommen..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "A philosophical discussion about happiness",
          "prompt": "Discuss what happiness means to you and whether money can buy it",
          "expectedPattern": "Für mich bedeutet Glück..., weil... Letztlich kommt es darauf an, dass...",
          "vocabulary": [
            "das Glück",
            "die Zufriedenheit",
            "der Sinn",
            "das Bedürfnis",
            "die Erfüllung",
            "wertvoll"
          ],
          "grammarDrill": {
            "pattern": "da-compounds (darauf, davon, daran) referring back to ideas",
            "exercise": "Es kommt darauf an. / Ich denke oft darüber nach. / Das hängt davon ab."
          }
        },
        {
          "id": "s2",
          "situation": "Talking about what success means at different life stages",
          "prompt": "Reflect on how your definition of success has changed over time",
          "expectedPattern": "Früher dachte ich, Erfolg sei..., aber heute glaube ich, dass...",
          "vocabulary": [
            "der Erfolg",
            "die Karriere",
            "der Maßstab",
            "die Anerkennung",
            "sich verändern",
            "das Ziel"
          ],
          "grammarDrill": {
            "pattern": "Nominalization of verbs (das Streben, die Erfüllung, das Erreichen)",
            "exercise": "Das Streben nach Erfolg ist anstrengend. / Das Erreichen von Zielen macht zufrieden."
          }
        },
        {
          "id": "s3",
          "situation": "Debating the meaning of freedom in modern society",
          "prompt": "Express what freedom means and where its limits should be",
          "expectedPattern": "Freiheit bedeutet für mich..., aber sie hat auch Grenzen, denn...",
          "vocabulary": [
            "die Freiheit",
            "die Verantwortung",
            "die Grenze",
            "die Gesellschaft",
            "das Recht",
            "die Pflicht"
          ],
          "grammarDrill": {
            "pattern": "Genitiv with abstract nouns (die Grenzen der Freiheit, der Sinn des Lebens)",
            "exercise": "Die Grenzen der Freiheit sind schwer zu ziehen. / Der Wert der Bildung ist enorm."
          }
        }
      ]
    },
    {
      "id": "b1-11",
      "number": 35,
      "level": "B1",
      "title": "Spontaneous Conversations",
      "description": "Handle unexpected topics and keep conversations flowing",
      "estimatedTime": 15,
      "keyPhrases": [
        "Übrigens,...",
        "Das erinnert mich an...",
        "Apropos...",
        "Bevor ich es vergesse,...",
        "Ach ja, noch etwas...",
        "Wo wir gerade davon sprechen,...",
        "Das ist eine gute Frage,...",
        "Komm, lass uns das Thema wechseln",
        "Da fällt mir gerade ein,...",
        "Wie auch immer,..."
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Small talk that drifts between topics at a party",
          "prompt": "Keep a casual conversation going by smoothly changing topics",
          "expectedPattern": "Übrigens, das erinnert mich an... Apropos...",
          "vocabulary": [
            "der Smalltalk",
            "das Thema wechseln",
            "einfallen",
            "erwähnen",
            "plaudern",
            "beiläufig"
          ],
          "grammarDrill": {
            "pattern": "Inversion after sentence-initial adverbs (Übrigens, ...; Apropos, ...)",
            "exercise": "Übrigens habe ich gestern Anna getroffen. / Apropos Anna, wie geht es ihr?"
          }
        },
        {
          "id": "s2",
          "situation": "Reacting naturally when you do not know an answer",
          "prompt": "Buy time and respond when caught off guard by a question",
          "expectedPattern": "Hmm, das ist eine gute Frage... Lass mich kurz überlegen...",
          "vocabulary": [
            "überlegen",
            "die Ahnung",
            "spontan",
            "reagieren",
            "sich erinnern",
            "ehrlich gesagt"
          ],
          "grammarDrill": {
            "pattern": "Filler structures and modal particles (eigentlich, halt, eben, ja)",
            "exercise": "Das ist eigentlich gar nicht so einfach. / Ich weiß es halt nicht genau."
          }
        },
        {
          "id": "s3",
          "situation": "Picking up an old conversation thread later",
          "prompt": "Return to something mentioned earlier and continue it naturally",
          "expectedPattern": "Wo wir gerade davon sprechen, du wolltest mir noch erzählen, dass...",
          "vocabulary": [
            "anknüpfen",
            "vorhin",
            "erwähnen",
            "zurückkommen auf",
            "das Gespräch",
            "der Faden"
          ],
          "grammarDrill": {
            "pattern": "Verbs with fixed prepositions (zurückkommen auf + Akk., sprechen über + Akk.)",
            "exercise": "Ich komme später darauf zurück. / Wir haben über die Reise gesprochen."
          }
        }
      ]
    },
    {
      "id": "b1-12",
      "number": 36,
      "level": "B1",
      "title": "Full Conversational Fluency",
      "description": "Final test: 30-minute natural conversation",
      "estimatedTime": 30,
      "keyPhrases": [
        "Lass uns über etwas anderes reden",
        "Das ist ein spannendes Thema",
        "Wenn ich ehrlich bin,...",
        "Da bin ich ganz bei dir",
        "Kannst du das genauer erklären?",
        "Was meinst du damit genau?",
        "Ich sehe das so:...",
        "Das könnte man so oder so sehen",
        "Genau darüber wollte ich auch reden",
        "Alles in allem war das ein gutes Gespräch"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Capstone conversation covering personal and abstract topics",
          "prompt": "Have a natural conversation moving between your life, opinions and hypotheticals",
          "expectedPattern": "Mix opinions (Meiner Meinung nach...), hypotheticals (Ich würde...) and narration.",
          "vocabulary": [
            "das Gespräch",
            "der Übergang",
            "flüssig",
            "das Thema",
            "die Meinung",
            "die Erfahrung"
          ],
          "grammarDrill": {
            "pattern": "Integrating Konjunktiv II, Passiv and connectors in one flow",
            "exercise": "Wenn ich könnte, würde ich... Trotzdem glaube ich, dass... Das wird oft gesagt, aber..."
          }
        },
        {
          "id": "s2",
          "situation": "Reacting and asking follow-up questions to keep depth",
          "prompt": "Listen actively, ask follow-up questions, and react to what you hear",
          "expectedPattern": "Wie meinst du das? Und was ist dann passiert? Das finde ich interessant, weil...",
          "vocabulary": [
            "nachfragen",
            "reagieren",
            "zuhören",
            "das Detail",
            "nachhaken",
            "das Interesse"
          ],
          "grammarDrill": {
            "pattern": "Indirect questions embedded in statements (Ich wüsste gern, warum/wie/ob...)",
            "exercise": "Ich frage mich, warum das so ist. / Ich wüsste gern, wie du das gemacht hast."
          }
        },
        {
          "id": "s3",
          "situation": "Wrapping up a long conversation politely",
          "prompt": "Summarize, share a final thought, and end the conversation warmly",
          "expectedPattern": "Alles in allem war das ein tolles Gespräch. Wir sollten das bald wiederholen.",
          "vocabulary": [
            "zusammenfassen",
            "der Abschied",
            "sich melden",
            "das Fazit",
            "wiederholen",
            "sich freuen"
          ],
          "grammarDrill": {
            "pattern": "Future tense with \"werden\" for plans and promises",
            "exercise": "Ich werde mich bald melden. / Wir werden uns wiedersehen. / Das werde ich mir merken."
          }
        }
      ]
    }
  ],
  "FAMILY": [
    {
      "id": "fam-1",
      "number": 37,
      "level": "B1",
      "title": "Talking with Your Partner",
      "description": "Daily conversations with your spouse - planning, discussing, problem-solving",
      "estimatedTime": 30,
      "realWorldContext": true,
      "keyPhrases": [
        "Was hältst du davon?",
        "Sollen wir... oder lieber...?",
        "Ich finde, dass...",
        "Hast du schon... gemacht?",
        "Lass uns darüber reden"
      ],
      "grammarFocus": [
        "Subjunctive II",
        "Modal verbs",
        "Subordinate clauses",
        "Future tense"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Planning the weekend with your wife",
          "prompt": "Discuss what you should do Saturday - kids activities, shopping, visiting family",
          "expectedPattern": "Am Wochenende könnten wir... Sollen wir... oder würdest du lieber...?",
          "grammarDrill": {
            "pattern": "Modal verbs + infinitive",
            "exercise": "Practice: Wir müssen/sollen/können/wollen + [activity]"
          }
        },
        {
          "id": "s2",
          "situation": "Discussing finances and household decisions",
          "prompt": "Talk about a big purchase, budget concerns, or home repairs needed",
          "expectedPattern": "Ich denke, wir sollten... Was meinst du? Können wir uns das leisten?",
          "grammarDrill": {
            "pattern": "Subordinate clauses with \"dass\", \"ob\", \"weil\"",
            "exercise": "Ich finde, dass... / Ich weiß nicht, ob... / Wir können es kaufen, weil..."
          }
        },
        {
          "id": "s3",
          "situation": "Resolving a disagreement calmly",
          "prompt": "You disagree about something - express your view, listen, find compromise",
          "expectedPattern": "Ich verstehe deinen Punkt, aber... Vielleicht könnten wir...",
          "culturalNotes": "Germans value direct communication - be honest but respectful"
        }
      ]
    },
    {
      "id": "fam-2",
      "number": 38,
      "level": "A2",
      "title": "Parenting in German",
      "description": "Essential phrases for daily parenting - instructions, praise, discipline, bedtime",
      "estimatedTime": 30,
      "realWorldContext": true,
      "keyPhrases": [
        "Zieh dich an!",
        "Räum dein Zimmer auf!",
        "Gut gemacht!",
        "Das darfst du nicht!",
        "Komm, wir gehen ins Bett",
        "Hast du deine Hausaufgaben gemacht?"
      ],
      "grammarFocus": [
        "Imperative mood",
        "Separable verbs",
        "Perfect tense",
        "Reflexive verbs"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Morning routine - getting kids ready",
          "prompt": "Tell kids to wake up, get dressed, brush teeth, eat breakfast, hurry up",
          "expectedPattern": "Steh auf! Zieh dich an! Beeil dich!",
          "vocabulary": [
            "sich anziehen",
            "sich beeilen",
            "Zähne putzen",
            "frühstücken"
          ],
          "grammarDrill": {
            "pattern": "Imperative + separable verbs",
            "exercise": "aufstehen → Steh auf! / sich anziehen → Zieh dich an!"
          }
        },
        {
          "id": "s2",
          "situation": "Homework and school talk",
          "prompt": "Ask about school day, check homework, help with problems, praise effort",
          "expectedPattern": "Wie war die Schule? Was hast du gelernt? Zeig mir deine Hausaufgaben.",
          "vocabulary": [
            "Hausaufgaben",
            "Klassenarbeit",
            "Note",
            "Lehrer/in"
          ]
        },
        {
          "id": "s3",
          "situation": "Bedtime routine",
          "prompt": "Bath, pajamas, story time, goodnight kisses, expressing love",
          "expectedPattern": "Zeit fürs Bett. Ich lese dir eine Geschichte vor. Gute Nacht, Schatz. Ich hab dich lieb.",
          "emotionalVocabulary": [
            "Ich hab dich lieb",
            "Schlaf gut",
            "Träum was Schönes"
          ]
        }
      ]
    },
    {
      "id": "fam-3",
      "number": 39,
      "level": "B1",
      "title": "German Family Gatherings",
      "description": "Navigate visits with in-laws and extended family",
      "estimatedTime": 30,
      "realWorldContext": true,
      "keyPhrases": [
        "Vielen Dank für die Einladung",
        "Der Kuchen schmeckt hervorragend",
        "Wie geht es [Name]?",
        "Schön, euch zu sehen"
      ],
      "grammarFocus": [
        "Formal Sie vs informal du",
        "Adjective endings"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Arriving at in-laws for Kaffee und Kuchen",
          "prompt": "Greet family, thank for invitation, compliment the cake, make small talk",
          "expectedPattern": "Guten Tag! Danke für die Einladung. Der Kuchen sieht toll aus.",
          "culturalNotes": [
            "Bring cake or flowers",
            "Take shoes off at door",
            "Arrive on time"
          ]
        },
        {
          "id": "s2",
          "situation": "Family dinner - catching up",
          "prompt": "Ask about their lives, share news, discuss current events",
          "expectedPattern": "Was gibt es Neues bei euch? Wir haben gerade...",
          "vocabulary": [
            "Verwandtschaft",
            "Schwiegermutter",
            "Schwager",
            "Schwägerin"
          ]
        }
      ]
    },
    {
      "id": "fam-4",
      "number": 40,
      "level": "A2",
      "title": "Kids Activities & Socializing",
      "description": "Talk with other parents at playground, school, parties",
      "estimatedTime": 20,
      "realWorldContext": true,
      "keyPhrases": [
        "Wie alt ist dein Kind?",
        "In welche Klasse geht er/sie?",
        "Wollen wir uns treffen?"
      ],
      "grammarFocus": [
        "Question formation",
        "Reflexive verbs"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Meeting parents at playground",
          "prompt": "Introduce yourself, ask about their kids, arrange playdates",
          "expectedPattern": "Hallo, ich bin [Name]. Das ist mein Sohn/meine Tochter.",
          "vocabulary": [
            "Spielplatz",
            "Sandkasten",
            "Schaukel"
          ]
        },
        {
          "id": "s2",
          "situation": "School pickup small talk",
          "prompt": "Chat with other parents about school, events, weekend plans",
          "expectedPattern": "Wie war die Schule heute? Was macht ihr am Wochenende?"
        }
      ]
    },
    {
      "id": "fam-5",
      "number": 41,
      "level": "B1",
      "title": "Complex Family Topics",
      "description": "Discuss emotions, relationships, future plans, difficult subjects",
      "estimatedTime": 30,
      "realWorldContext": true,
      "keyPhrases": [
        "Ich mache mir Sorgen um...",
        "Können wir über... sprechen?",
        "Was hältst du von der Idee...?",
        "Ich fühle mich..."
      ],
      "grammarFocus": [
        "Subjunctive II",
        "Reflexive verbs",
        "Complex subordinate clauses"
      ],
      "scenarios": [
        {
          "id": "s1",
          "situation": "Discussing concerns about one of the kids",
          "prompt": "Share worries, ask for perspective, discuss solutions",
          "expectedPattern": "Ich mache mir Sorgen um [Name]. Ist dir aufgefallen, dass...?",
          "vocabulary": [
            "sich Sorgen machen",
            "auffallen",
            "Verhalten"
          ]
        },
        {
          "id": "s2",
          "situation": "Planning a big life change",
          "prompt": "Discuss options, pros and cons, make decisions together",
          "expectedPattern": "Was wäre, wenn wir...? Einerseits... andererseits...",
          "grammarDrill": {
            "pattern": "Subjunctive II (Konjunktiv II)",
            "exercise": "Was wäre, wenn...? / Wir könnten..."
          }
        }
      ]
    }
  ]
};;

/**
 * Get all themes as flat array
 */
export function getAllThemes() {
  return [...GERMAN_THEMES.A1, ...GERMAN_THEMES.A2, ...GERMAN_THEMES.B1, ...GERMAN_THEMES.FAMILY];
}

/**
 * Get family themes
 */
export function getFamilyThemes() {
  return GERMAN_THEMES.FAMILY;
}

/**
 * Get theme by ID
 */
export function getThemeById(id) {
  const all = getAllThemes();
  return all.find(theme => theme.id === id);
}

/**
 * Get themes by level
 */
export function getThemesByLevel(level) {
  return GERMAN_THEMES[level] || [];
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completedThemeIds) {
  const total = 41; // 36 core + 5 family themes
  const completed = completedThemeIds.length;
  return Math.round((completed / total) * 100);
}

/**
 * Get next theme to learn
 */
export function getNextTheme(completedThemeIds) {
  const all = getAllThemes();
  return all.find(theme => !completedThemeIds.includes(theme.id));
}

/**
 * Get level from completed count
 */
export function getCurrentLevel(completedThemeIds) {
  const count = completedThemeIds.length;
  if (count < 12) return 'A1';
  if (count < 24) return 'A2';
  if (count < 36) return 'B1';
  return 'B1+';
}
