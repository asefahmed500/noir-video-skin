import { Footer } from './components/layout/Footer';
import { Splash } from './components/Splash';
import { Hero } from './components/showcase/Hero';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <Splash />

      <div className="app-shell">
        <main className="app-main">
          <Hero />
        </main>

        <Footer />
      </div>
    </>
  );
}
