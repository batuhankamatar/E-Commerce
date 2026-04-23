import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Header />
      <PageContent>
        <HomePage />
      </PageContent>
    </div>
  );
}

export default App;
