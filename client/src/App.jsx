import {
  Navbar,
  Footer,
  Services,
  Transactions,
  // Loader,
  Welcome,
  Temp,
} from "./components";
function App() {
  return (
    <>
      <div className=" ">
        <div className="gradient-bg-welcome min-h-screen">
          <Navbar />
          <Welcome />
          {/* <Temp /> */}
        </div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </>
  );
}

export default App;
