import React from 'react';
import { ThesisGenerator } from './components/ThesisGenerator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ThesisGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;