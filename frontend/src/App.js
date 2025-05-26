import React, { useState } from 'react';
import './App.css';

// State Management Solutions Database
const STATE_MANAGEMENT_SOLUTIONS = {
  'redux-toolkit': {
    name: 'Redux Toolkit',
    description: 'The official, opinionated, batteries-included toolset for efficient Redux development',
    pros: ['Predictable state updates', 'Excellent DevTools', 'Large ecosystem', 'Time-travel debugging'],
    cons: ['Learning curve', 'Boilerplate for simple apps', 'Overkill for small projects'],
    bestFor: ['Large applications', 'Complex state logic', 'Team collaboration', 'Predictable state updates'],
    difficulty: 'Medium',
    performance: 'Excellent',
    learningCurve: 'Steep',
    installation: 'npm install @reduxjs/toolkit react-redux',
    codeExample: `// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

export const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// Component usage
import { useSelector, useDispatch } from 'react-redux';
const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();`
  },
  'zustand': {
    name: 'Zustand',
    description: 'A small, fast, and scalable bearbones state-management solution',
    pros: ['Simple API', 'No providers needed', 'TypeScript support', 'Small bundle size'],
    cons: ['Newer ecosystem', 'Less tooling', 'No time-travel debugging'],
    bestFor: ['Medium apps', 'Simple global state', 'Quick prototyping', 'Minimal boilerplate'],
    difficulty: 'Easy',
    performance: 'Excellent',
    learningCurve: 'Gentle',
    installation: 'npm install zustand',
    codeExample: `// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// Component usage
const { count, increment, decrement } = useStore();`
  },
  'context-api': {
    name: 'React Context API',
    description: 'Built-in React solution for sharing state across component tree',
    pros: ['Built into React', 'No extra dependencies', 'Simple for basic use cases'],
    cons: ['Performance issues with frequent updates', 'Prop drilling for complex state', 'No DevTools'],
    bestFor: ['Small apps', 'Theme switching', 'User authentication', 'Simple global state'],
    difficulty: 'Easy',
    performance: 'Good',
    learningCurve: 'Gentle',
    installation: 'Built into React - no installation needed',
    codeExample: `// Context setup
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <StateContext.Provider value={{ count, setCount }}>
      {children}
    </StateContext.Provider>
  );
};

// Component usage
const { count, setCount } = useContext(StateContext);`
  },
  'jotai': {
    name: 'Jotai',
    description: 'Primitive and flexible state management for React',
    pros: ['Atomic approach', 'No providers', 'Great TypeScript support', 'Composable'],
    cons: ['Different mental model', 'Smaller community', 'Learning curve for atoms concept'],
    bestFor: ['Component-level state', 'Atomic state management', 'Complex derived state', 'Modern React apps'],
    difficulty: 'Medium',
    performance: 'Excellent',
    learningCurve: 'Medium',
    installation: 'npm install jotai',
    codeExample: `// atoms.js
import { atom } from 'jotai';

export const countAtom = atom(0);
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Component usage
import { useAtom } from 'jotai';
const [count, setCount] = useAtom(countAtom);
const [doubleCount] = useAtom(doubleCountAtom);`
  },
  'react-query': {
    name: 'TanStack Query (React Query)',
    description: 'Powerful data-fetching and server state management library',
    pros: ['Excellent caching', 'Background updates', 'Optimistic updates', 'Error handling'],
    cons: ['Only for server state', 'Learning curve', 'Not for client-only state'],
    bestFor: ['API data management', 'Server state caching', 'Real-time data', 'Complex data fetching'],
    difficulty: 'Medium',
    performance: 'Excellent',
    learningCurve: 'Medium',
    installation: 'npm install @tanstack/react-query',
    codeExample: `// Query setup
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Component usage
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/api/todos').then(res => res.json())
});`
  },
  'valtio': {
    name: 'Valtio',
    description: 'Proxy-based state management that feels like vanilla JavaScript',
    pros: ['Mutable-like API', 'No boilerplate', 'Automatic optimization', 'Easy to learn'],
    cons: ['Proxy-based (compatibility)', 'Smaller ecosystem', 'Different debugging'],
    bestFor: ['Quick prototyping', 'Simple state updates', 'Developers who like mutable APIs'],
    difficulty: 'Easy',
    performance: 'Good',
    learningCurve: 'Gentle',
    installation: 'npm install valtio',
    codeExample: `// store.js
import { proxy, useSnapshot } from 'valtio';

const state = proxy({ count: 0 });

export const increment = () => { state.count++; };
export const decrement = () => { state.count--; };

// Component usage
const snap = useSnapshot(state);
return <div>{snap.count}</div>;`
  }
};

// Recommendation Engine
const calculateRecommendations = (answers) => {
  const solutions = Object.keys(STATE_MANAGEMENT_SOLUTIONS);
  const scores = {};

  solutions.forEach(solution => {
    scores[solution] = 0;
  });

  // Project Size Scoring
  if (answers.projectSize === 'small') {
    scores['context-api'] += 30;
    scores['zustand'] += 25;
    scores['valtio'] += 20;
    scores['jotai'] += 15;
  } else if (answers.projectSize === 'medium') {
    scores['zustand'] += 30;
    scores['jotai'] += 25;
    scores['redux-toolkit'] += 20;
    scores['react-query'] += 20;
  } else if (answers.projectSize === 'large') {
    scores['redux-toolkit'] += 35;
    scores['zustand'] += 25;
    scores['jotai'] += 20;
  }

  // Team Experience Scoring
  if (answers.teamExperience === 'beginner') {
    scores['context-api'] += 25;
    scores['zustand'] += 20;
    scores['valtio'] += 20;
  } else if (answers.teamExperience === 'intermediate') {
    scores['zustand'] += 25;
    scores['redux-toolkit'] += 20;
    scores['jotai'] += 20;
  } else if (answers.teamExperience === 'expert') {
    scores['redux-toolkit'] += 25;
    scores['jotai'] += 20;
    scores['zustand'] += 15;
  }

  // State Complexity Scoring
  if (answers.stateComplexity === 'simple') {
    scores['context-api'] += 25;
    scores['zustand'] += 20;
    scores['valtio'] += 15;
  } else if (answers.stateComplexity === 'moderate') {
    scores['zustand'] += 25;
    scores['jotai'] += 20;
    scores['redux-toolkit'] += 15;
  } else if (answers.stateComplexity === 'complex') {
    scores['redux-toolkit'] += 30;
    scores['jotai'] += 20;
    scores['zustand'] += 15;
  }

  // Primary Use Case Scoring
  if (answers.primaryUse === 'forms') {
    scores['context-api'] += 15;
    scores['zustand'] += 15;
    scores['jotai'] += 10;
  } else if (answers.primaryUse === 'api-data') {
    scores['react-query'] += 35;
    scores['redux-toolkit'] += 20;
    scores['zustand'] += 15;
  } else if (answers.primaryUse === 'real-time') {
    scores['redux-toolkit'] += 25;
    scores['zustand'] += 20;
    scores['react-query'] += 20;
  } else if (answers.primaryUse === 'shared-state') {
    scores['redux-toolkit'] += 25;
    scores['zustand'] += 20;
    scores['jotai'] += 15;
  }

  // Performance Priority Scoring
  if (answers.performance === 'critical') {
    scores['jotai'] += 20;
    scores['zustand'] += 15;
    scores['redux-toolkit'] += 15;
  } else if (answers.performance === 'important') {
    scores['zustand'] += 15;
    scores['jotai'] += 10;
    scores['redux-toolkit'] += 10;
  }

  // Learning Curve Preference Scoring
  if (answers.learningCurve === 'gentle') {
    scores['context-api'] += 20;
    scores['zustand'] += 15;
    scores['valtio'] += 15;
  } else if (answers.learningCurve === 'willing') {
    scores['redux-toolkit'] += 15;
    scores['jotai'] += 10;
    scores['zustand'] += 10;
  }

  // Convert to sorted array
  const sortedSolutions = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([key, score]) => ({
      ...STATE_MANAGEMENT_SOLUTIONS[key],
      key,
      score: Math.min(100, Math.round((score / 200) * 100))
    }));

  return sortedSolutions;
};

// Questionnaire Component
const Questionnaire = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'projectSize',
      question: 'What is the size and scope of your project?',
      options: [
        { value: 'small', label: 'Small (< 10 components, simple app)', emoji: '🔸' },
        { value: 'medium', label: 'Medium (10-50 components, moderate complexity)', emoji: '🔹' },
        { value: 'large', label: 'Large (50+ components, complex app)', emoji: '🔷' }
      ]
    },
    {
      id: 'teamExperience',
      question: 'What is your team\'s React experience level?',
      options: [
        { value: 'beginner', label: 'Beginner (< 1 year with React)', emoji: '🌱' },
        { value: 'intermediate', label: 'Intermediate (1-3 years with React)', emoji: '🌿' },
        { value: 'expert', label: 'Expert (3+ years with React)', emoji: '🌳' }
      ]
    },
    {
      id: 'stateComplexity',
      question: 'How complex is your state management needs?',
      options: [
        { value: 'simple', label: 'Simple (basic UI state, minimal sharing)', emoji: '📄' },
        { value: 'moderate', label: 'Moderate (some shared state, basic async)', emoji: '📋' },
        { value: 'complex', label: 'Complex (heavy sharing, complex async logic)', emoji: '📊' }
      ]
    },
    {
      id: 'primaryUse',
      question: 'What is your primary state management use case?',
      options: [
        { value: 'forms', label: 'Form state and validation', emoji: '📝' },
        { value: 'api-data', label: 'API data and server state', emoji: '🌐' },
        { value: 'real-time', label: 'Real-time updates and sync', emoji: '⚡' },
        { value: 'shared-state', label: 'Shared UI state across components', emoji: '🔄' }
      ]
    },
    {
      id: 'performance',
      question: 'How important is performance optimization?',
      options: [
        { value: 'not-critical', label: 'Not critical (developer experience first)', emoji: '😌' },
        { value: 'important', label: 'Important (balance performance and DX)', emoji: '⚖️' },
        { value: 'critical', label: 'Critical (performance is top priority)', emoji: '🚀' }
      ]
    },
    {
      id: 'learningCurve',
      question: 'What is your preference for learning curve?',
      options: [
        { value: 'gentle', label: 'Gentle (quick to learn and implement)', emoji: '🎯' },
        { value: 'willing', label: 'Willing to invest (prefer powerful features)', emoji: '💪' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-4">{option.emoji}</span>
                <span className="text-lg font-medium text-gray-800 group-hover:text-blue-600">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <div className="text-sm text-gray-500">
          Press any option to continue
        </div>
      </div>
    </div>
  );
};

// Results Component
const Results = ({ recommendations, onRestart }) => {
  const [selectedSolution, setSelectedSolution] = useState(null);

  if (selectedSolution) {
    const solution = STATE_MANAGEMENT_SOLUTIONS[selectedSolution];
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => setSelectedSolution(null)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Results
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{solution.name}</h2>
          <p className="text-lg text-gray-600 mb-6">{solution.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-3">✅ Pros</h3>
              <ul className="space-y-2">
                {solution.pros.map((pro, index) => (
                  <li key={index} className="text-gray-700">• {pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">⚠️ Cons</h3>
              <ul className="space-y-2">
                {solution.cons.map((con, index) => (
                  <li key={index} className="text-gray-700">• {con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 Best For</h3>
            <div className="flex flex-wrap gap-2">
              {solution.bestFor.map((item, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">💻 Installation</h3>
            <code className="bg-gray-100 p-3 rounded-lg block text-sm">
              {solution.installation}
            </code>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">📝 Code Example</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {solution.codeExample}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Your Recommendations</h2>
        <p className="text-lg text-gray-600">Based on your answers, here are the best state management solutions for your project:</p>
      </div>

      <div className="space-y-6 mb-8">
        {recommendations.map((solution, index) => (
          <div key={solution.key} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </span>
                <h3 className="text-2xl font-bold text-gray-800">{solution.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{solution.score}%</div>
                <div className="text-sm text-gray-500">Match Score</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{solution.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                📚 {solution.difficulty} to Learn
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                ⚡ {solution.performance} Performance
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                📈 {solution.learningCurve} Learning Curve
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Best for: {solution.bestFor.slice(0, 2).join(', ')}
                {solution.bestFor.length > 2 && '...'}
              </div>
              <button
                onClick={() => setSelectedSolution(solution.key)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          🔄 Take Quiz Again
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'questionnaire', 'results'
  const [recommendations, setRecommendations] = useState([]);

  const handleStartQuestionnaire = () => {
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (answers) => {
    const recs = calculateRecommendations(answers);
    setRecommendations(recs);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('welcome');
    setRecommendations([]);
  };

  if (currentStep === 'questionnaire') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <Questionnaire onComplete={handleQuestionnaireComplete} />
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <Results recommendations={recommendations} onRestart={handleRestart} />
      </div>
    );
  }

  // Welcome Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🧠 State Management Advisor
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Confused about which state management solution to choose for your React app? 
            Our intelligent advisor will recommend the perfect solution based on your project's specific needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">Personalized</h3>
              <p className="text-sm text-gray-600">Get recommendations tailored to your specific project requirements</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick</h3>
              <p className="text-sm text-gray-600">Takes less than 2 minutes to complete the assessment</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Expert</h3>
              <p className="text-sm text-gray-600">Based on industry best practices and real-world experience</p>
            </div>
          </div>

          <button
            onClick={handleStartQuestionnaire}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Start Assessment
          </button>
          
          <div className="mt-8 text-sm text-gray-500">
            We'll analyze: Redux Toolkit, Zustand, Context API, Jotai, TanStack Query, and Valtio
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;