import FloatingCartButton from './components/FloatingCartButton';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-800">
        <div className="max-w-4xl mx-auto pt-14">
          <ProductsList />
        </div>
      </div>
      <FloatingCartButton />
    </>
  );
}

export default App;
