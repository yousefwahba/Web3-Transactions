// desgin Welcome.jsx with different way
const Temp = () => {
  return (
    <div className="container mx-auto grid md:grid-cols-2 grid-cols-1 p-2 md:p-14 w-full  space-y-4 ">
      {/* hello section  */}
      {/* info section  */}
      <section className="text-white flex justify-center items-center flex-col space-y-4">
        <section className="mb-10 flex flex-col space-y-4 w-[90%]">
          <h1 className="text-6xl font-bold">
            Bug and Sell <br /> Trusted Crapto
          </h1>
          <p className="max-w-[34rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
            qui facilis magnam fugit iste ratione consequuntur nulla illum
            excepturi labore!
          </p>
          <button className="bg-[#2952e3]  hover:bg-[#2546bd] w-36 p-3 rounded-full mt-8">
            Get Started
          </button>
        </section>
        <section className=" w-[90%]  ">
          <div className=" grid grid-cols-3">
            <div className="p-6 border-white text-white rounded-tl-[1rem] border-[1px] text-center">
              Binance
            </div>
            <div className="p-6 border-white text-white  border-[1px] text-center">
              CoinMarketCap
            </div>
            <div className="p-6 border-white text-white rounded-tr-[1rem] border-[1px] text-center">
              Blockchain
            </div>
            <div className="p-6 border-white text-white rounded-bl-[1rem] border-[1px] text-center">
              coninBase
            </div>
            <div className="p-6 border-white text-white  border-[1px] text-center">
              ECNCapital
            </div>
            <div className="p-6 border-white text-white rounded-br-[1rem] border-[1px] text-center">
              Princibal
            </div>
          </div>
        </section>
      </section>
      {/* card section  */}
      <section className="text-white flex spce-y-4 items-center justify-center flex-col ">
        {/* ethereum card with address section  */}
        <div className="bg-green-400 w-[40%] h-[20vh] rounded-md flex justify-between flex-col">
          <div className="p-4">Wallet Address</div>
          <div className="p-4">0x00....0000</div>
        </div>
        {/* form section  */}
        <section className="flex flex-col space-y-4 w-[50%] mt-14">
          <input
            type="text"
            placeholder="Wellet Address"
            className="form-input"
          />
          <input type="text" placeholder="Amount" />
          <input type="text" placeholder="error" />
          <input type="text" placeholder="message" />
          <hr />
          <button>Send Now</button>
        </section>
      </section>
      {/* table section  */}
    </div>
  );
};

export default Temp;
