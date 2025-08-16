import React from 'react';

function SimpleApp() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-mono">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-bold text-xl">N.R Dhanawada</h1>
            <nav className="flex items-center space-x-8">
              <a href="/" className="text-sm font-semibold text-gray-900">~</a>
              <a href="/work" className="text-sm text-gray-600 hover:text-gray-900">work</a>
              <a href="/lab" className="text-sm text-gray-600 hover:text-gray-900">lab</a>
              <a href="/art" className="text-sm text-gray-600 hover:text-gray-900">art</a>
              <a href="/watch" className="text-sm text-gray-600 hover:text-gray-900">watch</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              N.R Dhanawada
            </h1>
            <div className="text-xl md:text-2xl text-gray-600 space-y-6 leading-relaxed">
              <p>Software engineer who believes in building things that matter.</p>
              <p>Write code. Solve problems. Keep it simple.</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold mb-8">Philosophy</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-4">First Principles</h3>
                <p className="text-gray-600 leading-relaxed">
                  Break complex problems down to their fundamentals. 
                  Build from the ground up with clear reasoning. 
                  Question assumptions, not conclusions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Practical Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Technology should solve real problems for real people. 
                  Complexity for its own sake is waste. 
                  Measure success by the problems you eliminate.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center text-xs text-gray-500">
            <p>Built with React, TypeScript, and Tailwind</p>
            <p className="mt-2">© 2024 N.R Dhanawada</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SimpleApp;