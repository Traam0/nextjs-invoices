export function ListingLoader(): JSX.Element {
  return (
    <div className="select-none box-border h-72 w-[450px] md:w-full flex-grow relative cursor-pointer bg-slate-100">
      <div className="rounded-lg h-full w-full overflow-hidden relative animate-pulse bg-slate-200"></div>
      <div className=" flex items-end h-full w-full absolute bottom-0 z-[1]  ">
        <div className="flex flex-col gap-1 w-full px-6 py-2 pb-10 rounded-md  h-full justify-end ">
          <h3 className="text-white text-lg w-16 h-5 animate-pulse bg-slate-300 rounded-md"></h3>
          <h3 className="flex gap-1 items-center h-5 w-48 animate-pulse bg-slate-300 rounded-md">
            <span className="text-white"></span>
            <span className="text-[#ffffffcc] text-sm"></span>
            <span className="text-white"></span>
          </h3>
        </div>
      </div>
      <div className="bg-slate-300 left-2 sm:left-5 rounded-md p-0.5 absolute z-[2] -bottom-3.5 translate-x-[30%]">
        <div className="bg-slate-200 flex items-center gap-1 py-1 px-2 rounded-md text-white w-24 h-8"></div>
      </div>
      <div className="h-10 w-fit p-0 flex items-center gap-4 bg-slate-200 border-none outline-none rounded-[0.3rem] text-white text-lg absolute bottom-8 right-5 z-[3] cursor-pointer">
        <div className="p-1 box-content rounded-md h-4 w-4 bg-slate-300"></div>
        <div className="p-1 box-content rounded-md h-4 w-4 bg-slate-300"></div>
      </div>
    </div>
  );
}
