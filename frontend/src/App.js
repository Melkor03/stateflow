import React, { useState, useEffect } from 'react';
import './App.css';

// Mock Data for Intelligent Analysis
const MOCK_CODEBASE_ANALYSIS = {
  project: {
    name: "E-commerce Dashboard",
    size: "Large (150+ components)",
    complexity: "High",
    stateManagement: "Mixed (Context + Local State)",
    performanceScore: 64
  },
  issues: [
    {
      id: 1,
      severity: "critical",
      type: "prop-drilling",
      title: "Deep Prop Drilling Detected",
      description: "User data is being passed through 8 component levels",
      file: "src/components/UserProfile/UserDetails.jsx",
      impact: "High re-render frequency, poor maintainability",
      solution: "Consider Zustand or Context API for user state"
    },
    {
      id: 2,
      severity: "warning",
      type: "unnecessary-rerenders",
      title: "Unnecessary Re-renders",
      description: "ShoppingCart component re-renders on every product update",
      file: "src/components/Cart/ShoppingCart.jsx",
      impact: "Performance degradation, poor UX",
      solution: "Implement React.memo or split state"
    },
    {
      id: 3,
      severity: "info",
      type: "state-bloat",
      title: "State Structure Could Be Optimized",
      description: "Complex nested state in ProductList component",
      file: "src/components/Products/ProductList.jsx",
      impact: "Difficult debugging, potential bugs",
      solution: "Consider normalization with Redux Toolkit"
    }
  ],
  stateFlow: {
    components: [
      { id: 'App', name: 'App', type: 'root', state: ['user', 'theme'], connections: ['Header', 'MainContent'] },
      { id: 'Header', name: 'Header', type: 'presentational', state: [], connections: ['UserMenu', 'Cart'] },
      { id: 'UserMenu', name: 'UserMenu', type: 'connected', state: ['userProfile'], connections: [] },
      { id: 'Cart', name: 'Cart', type: 'connected', state: ['cartItems'], connections: ['CartItem'] },
      { id: 'MainContent', name: 'MainContent', type: 'container', state: ['activeView'], connections: ['ProductList'] },
      { id: 'ProductList', name: 'ProductList', type: 'connected', state: ['products', 'filters'], connections: ['ProductCard'] },
      { id: 'ProductCard', name: 'ProductCard', type: 'presentational', state: [], connections: [] },
      { id: 'CartItem', name: 'CartItem', type: 'presentational', state: [], connections: [] }
    ],
    bottlenecks: ['ProductList', 'Cart'],
    hotPaths: [['App', 'MainContent', 'ProductList'], ['App', 'Header', 'Cart']]
  },
  recommendations: [
    {
      pattern: "Redux Toolkit",
      confidence: 89,
      reasoning: "Large app with complex state interactions",
      benefits: ["Predictable state updates", "Time-travel debugging", "Better performance"],
      effort: "High",
      timeline: "2-3 weeks"
    },
    {
      pattern: "Zustand + React Query",
      confidence: 76,
      reasoning: "Balanced approach for medium complexity",
      benefits: ["Simpler than Redux", "Good performance", "Server state handling"],
      effort: "Medium",
      timeline: "1-2 weeks"
    }
  ],
  performancePredictions: {
    current: { score: 64, issues: 8, rerenders: 45 },
    redux: { score: 85, issues: 2, rerenders: 12, improvement: "+21 points" },
    zustand: { score: 78, issues: 3, rerenders: 18, improvement: "+14 points" }
  }
};

// AI-Powered Recommendations Engine
const generateAIRecommendations = (analysisData) => {
  const { project, issues, performancePredictions } = analysisData;
  
  return {
    immediate: [
      "🚨 Critical: Implement user state management to eliminate prop drilling",
      "⚡ Performance: Memoize ShoppingCart component to reduce re-renders",
      "🔧 Structure: Normalize ProductList state for better maintainability"
    ],
    strategic: [
      "Consider migrating to Redux Toolkit for better state predictability",
      "Implement server state caching with TanStack Query",
      "Add state debugging tools for better developer experience"
    ],
    performance: [
      `Current performance score: ${performancePredictions.current.score}/100`,
      `Potential improvement with Redux: ${performancePredictions.redux.improvement}`,
      `Estimated render optimization: ${performancePredictions.current.rerenders - performancePredictions.redux.rerenders} fewer re-renders`
    ]
  };
};

// State Flow Visualizer Component
const StateFlowVisualizer = ({ stateFlow }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  
  const getComponentColor = (component) => {
    if (stateFlow.bottlenecks.includes(component.id)) return 'bg-red-100 border-red-400';
    if (component.type === 'root') return 'bg-blue-100 border-blue-400';
    if (component.type === 'connected') return 'bg-green-100 border-green-400';
    return 'bg-gray-100 border-gray-400';
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🔄 State Flow Visualization</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stateFlow.components.map(component => (
          <div
            key={component.id}
            onClick={() => setSelectedComponent(component)}
            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${getComponentColor(component)} ${
              selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="font-semibold">{component.name}</div>
            <div className="text-sm text-gray-600">{component.type}</div>
            {component.state.length > 0 && (
              <div className="text-xs text-blue-600 mt-1">
                State: {component.state.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedComponent && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold">{selectedComponent.name} Details</h4>
          <p className="text-sm text-gray-600 mb-2">Type: {selectedComponent.type}</p>
          {selectedComponent.state.length > 0 && (
            <p className="text-sm mb-2">Local State: {selectedComponent.state.join(', ')}</p>
          )}
          {selectedComponent.connections.length > 0 && (
            <p className="text-sm">Connected to: {selectedComponent.connections.join(', ')}</p>
          )}
          {stateFlow.bottlenecks.includes(selectedComponent.id) && (
            <div className="mt-2 text-red-600 text-sm font-medium">
              ⚠️ Performance Bottleneck Detected
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 border border-red-400 rounded"></div>
            Bottleneck
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded"></div>
            Root
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-400 rounded"></div>
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

// Real-time Monitoring Dashboard
const MonitoringDashboard = ({ analysis }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate real-time alerts
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.7 ? 'warning' : 'info',
          message: Math.random() > 0.5 
            ? 'High re-render frequency detected in ProductList'
            : 'State update pattern suggests potential optimization',
          timestamp: new Date().toLocaleTimeString()
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">📊 Real-time Monitoring</h3>
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-4 py-2 rounded-lg font-medium ${
            isMonitoring 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isMonitoring ? '⏹️ Stop' : '▶️ Start'} Monitoring
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{analysis.performancePredictions.current.score}</div>
          <div className="text-sm text-gray-600">Performance Score</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{analysis.issues.length}</div>
          <div className="text-sm text-gray-600">Active Issues</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{analysis.performancePredictions.current.rerenders}</div>
          <div className="text-sm text-gray-600">Re-renders/min</div>
        </div>
      </div>
      
      {isMonitoring && (
        <div>
          <h4 className="font-semibold mb-2">🔔 Live Alerts</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-2 rounded text-sm ${
                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' : 'bg-blue-50 text-blue-800'
              }`}>
                <div className="flex justify-between">
                  <span>{alert.message}</span>
                  <span className="text-xs opacity-75">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Performance Predictions Component
const PerformancePredictions = ({ predictions }) => {
  const [selectedScenario, setSelectedScenario] = useState('current');
  
  const scenarios = {
    current: { name: 'Current State', data: predictions.current, color: 'orange' },
    redux: { name: 'Redux Toolkit', data: predictions.redux, color: 'blue' },
    zustand: { name: 'Zustand', data: predictions.zustand, color: 'green' }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">📈 Performance Impact Predictions</h3>
      
      <div className="flex gap-2 mb-4">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedScenario === key
                ? `bg-${scenario.color}-500 text-white`
                : `bg-${scenario.color}-100 text-${scenario.color}-700 hover:bg-${scenario.color}-200`
            }`}
          >
            {scenario.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {scenarios[selectedScenario].data.score}
          </div>
          <div className="text-sm text-gray-600">Performance Score</div>
          {scenarios[selectedScenario].data.improvement && (
            <div className="text-green-600 text-sm font-medium">
              {scenarios[selectedScenario].data.improvement}
            </div>
          )}
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">
            {scenarios[selectedScenario].data.issues}
          </div>
          <div className="text-sm text-gray-600">State Issues</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-600">
            {scenarios[selectedScenario].data.rerenders}
          </div>
          <div className="text-sm text-gray-600">Re-renders/min</div>
        </div>
      </div>
    </div>
  );
};

// AI Recommendations Component
const AIRecommendations = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState('immediate');
  
  const tabs = {
    immediate: { name: 'Immediate Actions', icon: '🚨' },
    strategic: { name: 'Strategic Improvements', icon: '🎯' },
    performance: { name: 'Performance Insights', icon: '📊' }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🤖 AI-Powered Recommendations</h3>
      
      <div className="flex gap-2 mb-4">
        {Object.entries(tabs).map(([key, tab]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === key
                ? 'bg-purple-500 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-3">
        {recommendations[activeTab].map((rec, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-400">
            <div className="text-sm text-gray-800">{rec}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Issue Detection Component
const IssueDetection = ({ issues }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };
  
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">🔍 Issue Detection</h3>
      
      <div className="space-y-4">
        {issues.map(issue => (
          <div key={issue.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(issue.severity)}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getSeverityIcon(issue.severity)}</span>
                <h4 className="font-semibold text-gray-800">{issue.title}</h4>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                issue.severity === 'critical' ? 'bg-red-200 text-red-800' :
                issue.severity === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {issue.severity.toUpperCase()}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
            <p className="text-gray-500 text-xs mb-2">📁 {issue.file}</p>
            
            <div className="bg-white p-2 rounded text-sm">
              <div className="text-red-600 mb-1">
                <strong>Impact:</strong> {issue.impact}
              </div>
              <div className="text-green-600">
                <strong>Solution:</strong> {issue.solution}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main StateFlow Component
function StateFlow() {
  const [analysis] = useState(MOCK_CODEBASE_ANALYSIS);
  const [aiRecommendations] = useState(() => generateAIRecommendations(MOCK_CODEBASE_ANALYSIS));
  const [activeView, setActiveView] = useState('dashboard');

  const views = {
    dashboard: { name: 'Dashboard', icon: '📊' },
    analysis: { name: 'Code Analysis', icon: '🔍' },
    visualization: { name: 'State Flow', icon: '🔄' },
    monitoring: { name: 'Live Monitoring', icon: '📈' },
    recommendations: { name: 'AI Guidance', icon: '🤖' }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <PerformancePredictions predictions={analysis.performancePredictions} />
              <MonitoringDashboard analysis={analysis} />
            </div>
            <AIRecommendations recommendations={aiRecommendations} />
          </div>
        );
      case 'analysis':
        return <IssueDetection issues={analysis.issues} />;
      case 'visualization':
        return <StateFlowVisualizer stateFlow={analysis.stateFlow} />;
      case 'monitoring':
        return <MonitoringDashboard analysis={analysis} />;
      case 'recommendations':
        return <AIRecommendations recommendations={aiRecommendations} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">StateFlow</h1>
              <p className="text-gray-600">Intelligent State Management Advisor</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Project: {analysis.project.name}</div>
              <div className="text-sm text-gray-600">Size: {analysis.project.size}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {Object.entries(views).map(([key, view]) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`px-4 py-3 font-medium text-sm transition-colors ${
                  activeView === key
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {view.icon} {view.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderView()}
      </div>
    </div>
  );
}

// Landing Page Component
function LandingPage({ onEnterStateFlow }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🧠 StateFlow
          </h1>
          <h2 className="text-2xl text-indigo-600 font-semibold mb-4">
            Intelligent State Management Advisor
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            AI-driven state management analysis, real-time monitoring, and proactive optimization 
            recommendations for React applications.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-semibold text-gray-800 mb-2">Code Analysis</h3>
              <p className="text-sm text-gray-600">Deep analysis of state patterns, anti-patterns, and optimization opportunities</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Real-time Monitoring</h3>
              <p className="text-sm text-gray-600">Live performance tracking with instant alerts and recommendations</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Guidance</h3>
              <p className="text-sm text-gray-600">Intelligent recommendations based on project context and best practices</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-gray-800 mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Visual State Flow Diagrams</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Performance Impact Predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Real-time Issue Detection</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Reactive Debugging Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Best Practice Enforcement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Migration Strategy Planning</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onEnterStateFlow}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Analyze Your Project
          </button>
          
          <div className="mt-8 text-sm text-gray-500">
            Supports React, Vue, Angular • Redux, Zustand, Context API, and more
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('landing');

  if (currentView === 'stateflow') {
    return <StateFlow />;
  }

  return <LandingPage onEnterStateFlow={() => setCurrentView('stateflow')} />;
}

export default App;