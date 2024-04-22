"use client";

import { GoogleTagManager, sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import { useLDClient } from "launchdarkly-react-client-sdk";
import { useEffect } from "react";

export default function Home({buyPage, uuid}: {buyPage: any; uuid: any}) {
    const client = useLDClient();

  useEffect(() => {
    const ctx = client?.getContext();
    // client?.track("pageview", ctx);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'userId' : ctx!.key,
      'variation': buyPage
    });
    sendGTMEvent({event: 'test'});
  }, []);

  async function handleClick() {
    const ctx = await client?.getContext();
    await client?.track("buy", ctx);
    await client!.flush()
  }

  console.log(buyPage)

  return (
    <div className="grid justify-center mt-8">
      <div className="text-center mb-8">
        <p className="text-3xl text-bold">LD User: {uuid}</p>
      </div>
      {buyPage === 'slate' ? (
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col h-[500px] w-[300px] bg-slate-700 rounded-lg relative ">
            <div className="flex items-center mx-auto text-center h-full">
              <p className="text-4xl">{buyPage}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <button onClick={() => handleClick()} className="button1 px-10 rounded-lg shadow-xl py-2 bg-blue-600">
                Buy
              </button>
            </div>
          </div>
        </div>
      ) : buyPage === 'blue' ? (
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col h-[500px] w-[300px] bg-blue-600 rounded-lg relative ">
            <div className="flex items-center mx-auto text-center h-full">
              <p className="text-4xl">{buyPage}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <button onClick={() => handleClick()} className="button3 px-10 rounded-lg shadow-xl py-2 bg-slate-700">
                Buy
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col h-[500px] w-[300px] bg-orange-700 rounded-lg relative ">
            <div className="flex items-center mx-auto text-center h-full">
              <p className="text-4xl">{buyPage}</p>
            </div>
            <div className="absolute bottom-5 left-0 right-0 flex justify-center">
              <button onClick={() => handleClick()} className="button3 px-10 rounded-lg shadow-xl py-2 bg-purple-700">
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
