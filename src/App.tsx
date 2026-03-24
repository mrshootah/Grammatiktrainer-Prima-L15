import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  GraduationCap, 
  Info,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  BrainCircuit
} from 'lucide-react';
import { grammarData, GrammarSection, GrammarTable, Example, Exercise } from './data/grammar';

// --- Types ---
type TitleTag = 'h2' | 'h3';
type ViewMode = 'learn' | 'trainer';

// --- Utils ---
const normalizeLatin = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0304]/g, '')
    .toLowerCase()
    .trim();
};

// --- Components ---

const Table: React.FC<{ table: GrammarTable }> = ({ table }) => (
  <div className="overflow-x-auto my-6 rounded-xl border border-stone-200 bg-white shadow-sm">
    <table className="w-full text-sm text-left">
      <thead className="bg-stone-50 text-stone-600 font-medium border-b border-stone-200">
        <tr>
          {table.headers.map((header, i) => (
            <th key={i} className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-stone-100">
        {table.rows.map((row, i) => (
          <tr key={i} className="hover:bg-stone-50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-3 font-mono text-stone-700">
                {cell.split('-').map((part, k) => (
                  <span key={k} className={k % 2 === 1 ? "text-rose-600 font-bold" : ""}>
                    {part}
                  </span>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ExampleBox: React.FC<{ example: Example }> = ({ example }) => (
  <div className="group p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300 mb-3">
    <div className="flex justify-between items-start mb-1">
      <p className="font-serif italic text-lg text-stone-900 group-hover:text-emerald-900 transition-colors">
        {example.latin}
      </p>
      {example.note && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-200/50 px-2 py-0.5 rounded">
          {example.note}
        </span>
      )}
    </div>
    <p className="text-stone-600 text-sm leading-relaxed">
      {example.german}
    </p>
  </div>
);

const ExerciseCard: React.FC<{ exercise: Exercise; onComplete: (correct: boolean) => void }> = ({ exercise, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [clozeValue, setClozeValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    let correct = false;
    if (exercise.type === 'cloze') {
      correct = normalizeLatin(clozeValue) === normalizeLatin(exercise.correctAnswer);
    } else {
      correct = selectedOption === exercise.correctAnswer;
    }
    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete(correct);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setClozeValue('');
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-6 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
          <BrainCircuit size={20} />
        </div>
        <h4 className="font-semibold text-stone-800">Aufgabe</h4>
      </div>

      <p className="text-stone-700 mb-4 font-medium">{exercise.question}</p>
      
      {exercise.latin && (
        <p className="text-xl font-serif italic text-stone-900 mb-6 bg-stone-50 p-4 rounded-xl border border-stone-100 text-center">
          {exercise.latin}
        </p>
      )}

      <div className="space-y-3">
        {exercise.type === 'multiple-choice' || exercise.type === 'dropdown' ? (
          <div className="grid gap-3">
            {exercise.options?.map((option, i) => (
              <button
                key={i}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedOption === option 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' 
                    : 'border-stone-200 hover:border-stone-300 text-stone-600'
                } ${isSubmitted && option === exercise.correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : ''}
                  ${isSubmitted && selectedOption === option && option !== exercise.correctAnswer ? 'border-red-500 bg-red-50 text-red-700' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isSubmitted && option === exercise.correctAnswer && <CheckCircle2 size={18} className="text-emerald-500" />}
                  {isSubmitted && selectedOption === option && option !== exercise.correctAnswer && <XCircle size={18} className="text-red-500" />}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              disabled={isSubmitted}
              value={clozeValue}
              onChange={(e) => setClozeValue(e.target.value)}
              placeholder="Antwort eingeben..."
              className={`w-full p-4 rounded-xl border outline-none transition-all ${
                isSubmitted 
                  ? isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'
                  : 'border-stone-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
              }`}
            />
            {isSubmitted && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isCorrect ? <CheckCircle2 className="text-emerald-500" /> : <XCircle className="text-red-500" />}
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-100"
          >
            <p className={`font-semibold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
              {isCorrect ? 'Richtig!' : `Nicht ganz. Richtig wäre: ${exercise.correctAnswer}`}
            </p>
            {exercise.explanation && (
              <p className="text-sm text-stone-600 leading-relaxed">
                {exercise.explanation}
              </p>
            )}
            <button 
              onClick={handleReset}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <RotateCcw size={14} /> Nochmal versuchen
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSubmitted && (
        <button
          disabled={exercise.type === 'cloze' ? !clozeValue : !selectedOption}
          onClick={handleSubmit}
          className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200"
        >
          Prüfen
        </button>
      )}
    </motion.div>
  );
};

const Section: React.FC<{ section: GrammarSection; level?: number }> = ({ section, level = 0 }) => {
  const TitleTag = (level === 0 ? 'h2' : 'h3') as TitleTag;
  const titleClasses = level === 0 
    ? "text-3xl font-bold text-stone-900 mb-4 tracking-tight" 
    : "text-xl font-semibold text-stone-800 mb-3 mt-8 border-l-4 border-emerald-500 pl-4";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <TitleTag className={titleClasses}>{section.title}</TitleTag>
      {section.subtitle && (
        <p className="text-stone-500 font-serif italic mb-4 -mt-2">{section.subtitle}</p>
      )}
      
      {section.content.map((p, i) => (
        <p key={i} className="text-stone-700 leading-relaxed mb-4">
          {p}
        </p>
      ))}

      {section.tables?.map((table, i) => (
        <Table key={i} table={table} />
      ))}

      {section.examples && section.examples.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <BookOpen size={14} /> Beispiele
          </h4>
          <div className="grid gap-2">
            {section.examples.map((ex, i) => (
              <ExampleBox key={i} example={ex} />
            ))}
          </div>
        </div>
      )}

      {section.exercises && section.exercises.length > 0 && (
        <div className="mt-12 pt-8 border-t-2 border-dashed border-stone-200">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <BrainCircuit size={14} /> Übung
          </h4>
          {section.exercises.map((ex) => (
            <ExerciseCard key={ex.id} exercise={ex} onComplete={() => {}} />
          ))}
        </div>
      )}

      {section.subsections?.map((sub, i) => (
        <Section key={i} section={sub} level={level + 1} />
      ))}
    </motion.div>
  );
};

const Trainer: React.FC<{ sections: GrammarSection[] }> = ({ sections }) => {
  const allExercises = useMemo(() => {
    const exercises: Exercise[] = [];
    const extract = (s: GrammarSection) => {
      if (s.exercises) exercises.push(...s.exercises);
      s.subsections?.forEach(extract);
    };
    sections.forEach(extract);
    return exercises;
  }, [sections]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleComplete = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
  };

  const nextExercise = () => {
    if (currentIndex < allExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetTrainer = () => {
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  };

  if (allExercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-6 bg-stone-100 rounded-full text-stone-400 mb-4">
          <BrainCircuit size={48} />
        </div>
        <h3 className="text-xl font-semibold text-stone-800">Keine Übungen verfügbar</h3>
        <p className="text-stone-500 mt-2">Wähle ein anderes Thema aus.</p>
      </div>
    );
  }

  if (completed) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="p-8 bg-yellow-100 text-yellow-600 rounded-full mb-6 shadow-xl shadow-yellow-100">
          <Trophy size={64} />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Trainer abgeschlossen!</h2>
        <p className="text-xl text-stone-600 mb-8">
          Du hast <span className="font-bold text-indigo-600">{score}</span> von <span className="font-bold">{allExercises.length}</span> Aufgaben richtig gelöst.
        </p>
        <button 
          onClick={resetTrainer}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
        >
          <RotateCcw size={20} /> Trainer neustarten
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Grammatik-Trainer</h2>
          <p className="text-stone-500">Aufgabe {currentIndex + 1} von {allExercises.length}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">Score</p>
          <p className="text-2xl font-mono font-bold text-emerald-600">{score}</p>
        </div>
      </div>

      <div className="w-full bg-stone-200 h-2 rounded-full mb-12 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / allExercises.length) * 100}%` }}
          className="bg-indigo-500 h-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={allExercises[currentIndex].id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExerciseCard 
            exercise={allExercises[currentIndex]} 
            onComplete={handleComplete} 
          />
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={nextExercise}
              className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-800 transition-all"
            >
              Nächste Aufgabe <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeId, setActiveId] = useState(grammarData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('learn');

  const activeSection = useMemo(() => {
    const findSection = (sections: GrammarSection[]): GrammarSection | undefined => {
      for (const section of sections) {
        if (section.id === activeId) return section;
        if (section.subsections) {
          const found = findSection(section.subsections);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findSection(grammarData) || grammarData[0];
  }, [activeId]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return grammarData;
    return grammarData.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.content.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId, viewMode]);

  const handleSectionSelect = useCallback((id: string) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 font-sans selection:bg-emerald-200">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-stone-200 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <span className="font-bold tracking-tight">Latein Master</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r border-stone-200 z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-stone-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">Latein Master</h1>
                <p className="text-xs text-stone-400 mt-1 font-medium">Grammatik Kurs</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="text"
                placeholder="Suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredData.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => handleSectionSelect(section.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 group
                    ${activeId === section.id 
                      ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm border border-emerald-100' 
                      : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-2 h-2 rounded-full transition-all
                      ${activeId === section.id ? 'bg-emerald-500 scale-125' : 'bg-stone-200 group-hover:bg-stone-400'}
                    `} />
                    <span className="text-sm">{section.title}</span>
                  </div>
                  <ChevronRight size={14} className={`transition-transform ${activeId === section.id ? 'rotate-90 text-emerald-500' : 'text-stone-300'}`} />
                </button>
                {section.subsections && activeId.startsWith(section.id.split('-')[0]) && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-stone-100 pl-2">
                    {section.subsections.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => handleSectionSelect(sub.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          activeId === sub.id 
                            ? 'text-emerald-600 bg-emerald-50/50' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="p-6 border-t border-stone-100 bg-stone-50/50">
            <div className="flex items-center gap-3 text-stone-400">
              <Info size={16} />
              <p className="text-[10px] uppercase tracking-widest font-bold">Prima. Band 2</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-24 lg:pt-0 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 lg:static bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b lg:border-none border-stone-200 z-30 px-6 py-4 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-2 text-sm text-stone-400">
            <span>Grammatik</span>
            <ChevronRight size={14} />
            <span className="text-stone-900 font-medium truncate max-w-[200px]">
              {activeSection?.title}
            </span>
          </div>
          
          <div className="flex bg-stone-200/50 p-1 rounded-xl ml-auto">
            <button 
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'learn' ? 'bg-white text-emerald-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Lernen
            </button>
            <button 
              onClick={() => setViewMode('trainer')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'trainer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Trainer
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-12 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {viewMode === 'learn' ? (
              <Section key={`learn-${activeSection.id}`} section={activeSection} />
            ) : (
              <Trainer key={`trainer-${activeSection.id}`} sections={[activeSection]} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
