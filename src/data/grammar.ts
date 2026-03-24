export interface Example {
  latin: string;
  german: string;
  note?: string;
}

export interface GrammarTable {
  headers: string[];
  rows: string[][];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'cloze' | 'dropdown';
  question: string;
  latin?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface GrammarSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  tables?: GrammarTable[];
  examples?: Example[];
  subsections?: GrammarSection[];
  exercises?: Exercise[];
}

export const grammarData: GrammarSection[] = [
  {
    id: "plusquamperfekt-bildung",
    title: "Verben: Das Plusquamperfekt",
    subtitle: "Die 3. Vergangenheit",
    content: [
      "Die Formen des Plusquamperfekts bestehen bei allen Verben aus dem Perfektstamm, dem Kennzeichen -era- und den Imperfekt-Endungen (-m, -s, -t, -mus, -tis, -nt).",
      "Es bezeichnet einen Vorgang der Vergangenheit, der zeitlich vor einem anderen – ebenfalls vergangenen – Vorgang liegt (Vorvergangenheit)."
    ],
    tables: [
      {
        headers: ["Infinitiv", "Perfektstamm", "Plusquamperfekt (1. Pers. Sg.)", "Übersetzung"],
        rows: [
          ["vocāre", "vocā-v-", "vocā-v-era-m", "ich hatte gerufen"],
          ["monēre", "mon-u-", "mon-u-era-m", "ich hatte ermahnt"],
          ["manēre", "mān-s-", "mān-s-era-m", "ich war geblieben"],
          ["dēfendere", "dēfend-", "dēfend-era-m", "ich hatte verteidigt"],
          ["currere", "cucurr-", "cucurr-era-m", "ich war gelaufen"],
          ["venīre", "vēn-", "vēn-era-m", "ich war gekommen"],
          ["esse", "fu-", "fu-era-m", "ich war gewesen"],
        ],
      },
    ],
    examples: [
      { latin: "Servus scelerātōs vīderat. Itaque ad dominum cucurrit.", german: "Der Sklave hatte die Verbrecher gesehen. Deshalb lief er zu seinem Herrn." },
      { latin: "Servus ad dominum cucurrit, quia scelerātōs vīderat.", german: "Der Sklave lief zu seinem Herrn, weil er die Verbrecher gesehen hatte." },
    ],
    exercises: [
      {
        id: "ex-pq-1",
        type: "cloze",
        question: "Bilde die 1. Person Singular Plusquamperfekt von 'capere' (Perfektstamm: cēp-):",
        correctAnswer: "cēperam",
        explanation: "Perfektstamm (cēp-) + Kennzeichen (-era-) + Endung (-m) = cēperam."
      },
      {
        id: "ex-pq-2",
        type: "multiple-choice",
        question: "Welche Zeitstufe drückt das Plusquamperfekt aus?",
        options: ["Gegenwart", "Zukunft", "Vorvergangenheit", "Gleichzeitigkeit in der Vergangenheit"],
        correctAnswer: "Vorvergangenheit",
        explanation: "Das Plusquamperfekt beschreibt Handlungen, die vor einer anderen vergangenen Handlung abgeschlossen waren."
      }
    ]
  },
  {
    id: "adverb-bildung",
    title: "Die Adverbbildung",
    content: [
      "Adverbien werden im Lateinischen oft von Adjektiven abgeleitet. Je nach Deklinationsklasse des Adjektivs werden unterschiedliche Endungen an den Wortstamm angefügt:",
      "1. Adjektive der a- und o-Deklination erhalten die Endung -ē.",
      "2. Adjektive der 3. Deklination erhalten die Endung -iter.",
      "3. Endet der Wortstamm auf -nt, wird nur -er angefügt."
    ],
    tables: [
      {
        headers: ["Adjektiv", "Typ", "Adverb", "Übersetzung"],
        rows: [
          ["improbus, a, um", "a/o-Dekl.", "improb-ē", "unanständig"],
          ["celer, celeris, celere", "3. Dekl.", "celer-iter", "schnell"],
          ["vehemēns (Stamm: vehement-)", "3. Dekl. (-nt)", "vehement-er", "heftig"],
          ["fortis, e", "3. Dekl.", "fort-iter", "tapfer / kräftig"],
        ],
      },
    ],
    examples: [
      { latin: "Equus celeriter currit.", german: "Das Pferd läuft schnell.", note: "Adverb als Adverbiale" },
      { latin: "Equus celer est.", german: "Das Pferd ist schnell.", note: "Adjektiv als Prädikatsnomen" },
    ],
    exercises: [
      {
        id: "ex-adv-1",
        type: "dropdown",
        question: "Wähle die richtige Adverb-Form von 'malus' (schlecht):",
        options: ["maliter", "maler", "malē"],
        correctAnswer: "malē",
        explanation: "Da 'malus' zur a/o-Deklination gehört, wird die Endung -ē angehängt."
      },
      {
        id: "ex-adv-2",
        type: "cloze",
        question: "Bilde das Adverb zu 'crūdēlis' (grausam):",
        correctAnswer: "crūdēliter",
        explanation: "Adjektive der 3. Deklination bilden das Adverb auf -iter."
      }
    ]
  },
  {
    id: "wortbildung-adjektive",
    title: "Wortbildung: Adjektiv-Suffixe",
    content: [
      "Bestimmte Suffixe (Nachsilben) helfen dabei, die Bedeutung von Adjektiven zu erschließen:",
    ],
    tables: [
      {
        headers: ["Suffix", "Beispiel", "Abgeleitet von", "Bedeutung"],
        rows: [
          ["-ius", "rēgius, a, um", "rēx, rēgis", "Herkunft / Zugehörigkeit"],
          ["-ālis", "mortālis, e", "mors, mortis", "Eigenschaft"],
          ["-idus", "cupidus, a, um", "cupere", "Eigenschaft"],
          ["-bilis", "amābilis, e", "amāre", "Möglichkeit / Eigenschaft"],
        ],
      },
    ],
    examples: [
      { latin: "amābilis", german: "liebenswert (Möglichkeit, geliebt zu werden)" },
      { latin: "mortālis", german: "sterblich (Eigenschaft des Todes)" },
    ],
    exercises: [
      {
        id: "ex-wb-1",
        type: "multiple-choice",
        question: "Was bedeutet das Suffix '-bilis' meistens?",
        options: ["Herkunft", "Verneinung", "Möglichkeit oder Eigenschaft", "Steigerung"],
        correctAnswer: "Möglichkeit oder Eigenschaft",
        explanation: "Suffixe wie -bilis (z.B. in 'laudābilis' - lobenswert) drücken oft eine Möglichkeit aus."
      }
    ]
  },
  {
    id: "vokabular-l15",
    title: "Vokabular Lektion 15",
    subtitle: "Dem Willen der Götter folgen?",
    content: [
      "Hier findest du die wichtigsten Vokabeln der Lektion 15.",
    ],
    tables: [
      {
        headers: ["Latein", "Deutsch"],
        rows: [
          ["accūsāre, accūsō", "anklagen, beschuldigen"],
          ["aequus, a, um", "eben, gerecht, gleich"],
          ["animadvertere, -vertō", "bemerken"],
          ["caelum, caelī n", "der Himmel"],
          ["capere, capiō, cēpī", "nehmen, ergreifen, erobern"],
          ["celer, celeris, celere", "schnell"],
          ["cōnsilium, cōnsiliī n", "Beratung, Plan, Rat"],
          ["crēdere, crēdō, crēdidī", "glauben, anvertrauen"],
          ["crūdēlis, e", "grausam"],
          ["dēbēre, dēbeō, dēbuī", "müssen, sollen, schulden"],
          ["dolus, dolī m", "die List, die Täuschung"],
          ["fātum, fātī n", "das Schicksal, der Götterspruch"],
          ["fugere, fugiō, fūgī", "fliehen (vor), entfliehen"],
          ["gravis, e", "schwer, bedeutend"],
          ["improbus, a, um", "schlecht, unanständig"],
          ["lītus, lītoris n", "die Küste, der Strand"],
          ["perspicere, -spiciō, -spexī", "erkennen, durchschauen"],
          ["pius, a, um", "fromm, gerecht, pflichtbewusst"],
          ["trīstis, e", "traurig, unfreundlich"],
          ["turpis, e", "schlecht, hässlich, schändlich"],
          ["vehemēns", "energisch, heftig"],
          ["Aenēās, Aenēae m", "Äneas (trojanischer Held)"],
          ["Anchīsēs, Anchīsae m", "Anchises (Vater des Äneas)"],
          ["arma, armōrum n Pl.", "die Waffen, das Gerät"],
          ["at", "aber, jedoch, dagegen"],
          ["bene", "gut"],
          ["classis, classis f", "die Flotte, die Abteilung"],
          ["cōgitāre, cōgitō", "denken, nachdenken"],
          ["comes, comitis m f", "Begleiter, Gefährte"],
          ["cōnūbium", "die Ehe"],
          ["cūr?", "warum"],
          ["dē (m. Abl.)", "über, von, von ... her"],
          ["dēnique", "schließlich, zuletzt"],
          ["deus, deī m", "der Gott, die Gottheit"],
          ["dīcere, dīcō, dīxī", "sagen, sprechen"],
          ["Dīdō, Dīdōnis f", "Dido (Königin von Karthago)"],
          ["discēdere, -cēdō, -cessī", "weggehen, auseinandergehen"],
          ["diū", "lange, lange Zeit"],
          ["esse, sum, fuī", "sein, sich befinden"],
          ["facere, faciō, fēcī", "machen, tun, handeln"],
          ["fallere, fallō, fefellī", "täuschen, betrügen"],
          ["gerere, gerō, gessī", "führen, ausführen, tragen"],
          ["hīc", "hier"],
          ["homō, hominis m", "der Mensch"],
          ["iam", "schon, bereits, nun"],
          ["illīc", "dort"],
          ["imperium, imperiī n", "der Befehl, die Herrschaft, das Reich"],
          ["itaque", "deshalb"],
          ["iubēre, iubeō, iussī", "anordnen, befehlen"],
          ["Iuppiter, Iovis m", "Jupiter (höchster Gott)"],
          ["malus, a, um", "schlecht, schlimm, böse"],
          ["Mercurius, Mercuriī m", "Merkur (Götterbote)"],
          ["mittere, mittō, mīsī", "schicken, werfen"],
          ["monēre, moneō, monuī", "mahnen, ermahnen"],
          ["nam", "denn, nämlich"],
          ["nōn", "nicht"],
          ["novus, a, um", "neu, ungewöhnlich"],
          ["numquam", "nie, niemals"],
          ["nunc", "jetzt, nun"],
          ["nūntius, nūntiī m", "der Bote, die Nachricht"],
          ["pārēre, pāreō, pāruī", "gehorchen"],
          ["pater, patris m", "der Vater"],
          ["patria, patriae f", "die Heimat"],
          ["petere, petō, petīvī", "bitten, verlangen, eilen zu"],
          ["properāre, properō", "eilen, sich beeilen"],
          ["pulcher, pulchra, pulchrum", "schön"],
          ["Pūnicus, a, um", "punisch"],
          ["-que", "und (angehängt)"],
          ["quī, quae, quod", "welcher, welche, welches; der, die, das"],
          ["quid?", "was?"],
          ["regere, regō, rēxī", "beherrschen, leiten, lenken"],
          ["relinquere, -linquō, -līquī", "verlassen, zurücklassen"],
          ["semper", "immer"],
          ["somnus, somnī m", "der Schlaf"],
          ["statim", "sofort, auf der Stelle"],
          ["tacēre, taceō, tacuī", "schweigen"],
          ["tum", "da, dann, damals"],
          ["verbum, verbī n", "das Wort, die Äußerung"],
          ["vidēre, videō, vīdī", "sehen"],
          ["vir, virī m", "der Mann"],
          ["vīta, vītae f", "das Leben, die Lebensweise"],
          ["vīvere, vīvō, vīxī", "leben"],
          ["vocāre, vocō", "rufen, nennen"],
          ["vōx, vōcis f", "die Stimme, die Äußerung"],
        ],
      },
    ],
    exercises: [
      {
        id: "ex-vok-1",
        type: "multiple-choice",
        question: "Was bedeutet 'fātum'?",
        options: ["Der Vater", "Das Schicksal", "Die Flotte", "Das Wort"],
        correctAnswer: "Das Schicksal",
        explanation: "'fātum' bedeutet das Schicksal oder der Götterspruch."
      }
    ]
  }
];
