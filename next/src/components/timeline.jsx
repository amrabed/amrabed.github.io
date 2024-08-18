const Timeline = ({ items }) => (
  <div className="container mx-auto">
    <ul className="list-none">
      {items.map((item) => (
        <li className="mb-5" key={item.id}>
          <div className="">
            <span className="relative left-[-170px] top-20 text-zinc">
              {item.duration}
            </span>
            <div
              className="border-r-4 border-black dark:border-gray-800 absolute h-full top-5"
              style={{ left: "9px" }}
            ></div>
          </div>
          <div className="flex group items-center ">
            <div className="bg-gray-800 dark:bg-gray-600 group-hover:bg-primary z-10 rounded-full border-4 border-black dark:border-gray-800 h-5 w-5">
              <div className="bg-black dark:bg-gray-800 h-1 w-6 items-center ml-4 mt-1"></div>
            </div>
            <div className="flex-auto ml-6 z-10 font-medium">
              <div className="order-1 space-y-2 bg-gray-800 group-hover:bg-primary rounded-lg shadow-only transition-ease lg:w-5/12 px-6 py-4">
                <h3 className="mb-3 font-semibold text-white text-lg">
                  {item.position}
                </h3>
                <p className="pb-4 text-sm text-gray-100">
                  {item.organization.name}
                </p>
                <hr />
                <ul className="list-unstyled">
                  <li className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {item.tasks[0]}
                  </li>
                  <li className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {item.tasks[1]}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Timeline;
