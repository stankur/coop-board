import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Job } from "./data";
import { getJobs, searchJobs } from "./server";

function App() {
  const [internalData, setInternalData] = useState([] as Job[]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const jobs = await getJobs();
      setInternalData(jobs);
    })();
  }, []);

  function handleSearch(query: string) {
    (async () => {
      setLoading(true);

      if (query === "") {
        const jobs = await getJobs();
        setInternalData(jobs);
      } else {
        const jobs = await searchJobs(query);
        setInternalData(jobs);
      }

      setLoading(false);
    })();
  }

  return (
    <div>
      <div className="sticky top-0 flex w-full items-center justify-center bg-black p-4">
        <input
          type="text"
          className="w-1/2 rounded-l-lg p-3 font-sans focus:outline-none"
          placeholder="What job do you want to look for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span
          className="cursor-pointer rounded-r-lg bg-slate-200 p-3 text-black"
          onClick={() => handleSearch(searchQuery)}
        >
          {loading ? "loading..." : "search"}
        </span>
      </div>
      <div className="flex justify-center bg-slate-200 py-2 font-sans">
        showing <span className="px-1 font-bold">{internalData.length}</span>{" "}
        jobs
      </div>
      <div className="divide-y px-20 *:py-10 max-md:px-10">
        {internalData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-center gap-5 font-sans max-md:flex-col"
            >
              <div className="flex w-1/4 flex-col gap-2 max-md:w-full">
                <div className="text-xl font-bold">{item.organization}</div>
                <div>{item.jobTitle}</div>
                <div className="text-slate-500">
                  {item.duration} - {item.location}
                </div>
              </div>
              <div className="w-1/2 max-md:w-full">
                <div
                  style={{
                    paddingBottom: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  {item.description}
                </div>
                <div>{item.requirements}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
