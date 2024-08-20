"use client";
import React, { useState, useEffect } from "react";
import WatchSessionVideo from "./WatchSessionVideo";
import WatchSession from "./WatchSession";
import WatchFreeCollect from "./WatchFreeCollect";
import WatchLeaderBoard from "./WatchLeaderBoard";
import WatchCollectibleInfo from "./WatchCollectibleInfo";
import WatchSocialLinks from "./WatchSocialLinks";
import WatchComponentSkeletonLoader from "../SkeletonLoader/WatchComponentSkeletonLoader";
import styles from "./WatchSession.module.css"

function WatchComponentMain({props}:{props: {id: string}}){
    
  const [data, setData] = useState<any>();
  const [collection, setCollection] = useState<any>();

  const sessionDetails = {
    title: "",
    description: "",
    image: "",
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions: any = {
          method: "GET",
          redirect: "follow",
        };
        const response = await fetch(
          `/api/get-watch-data/${props.id}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("result::::", result);
        setData(result.data[0]);
        setCollection(result.collection);
        console.log(result.data[0].video_uri.video_uri);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [props.id]);

    return(
        <>
      {data ? (
        <div className=" 1.7xl:ps-14 lg:ps-5 ps-4 xl:ps-10">
          {/* <div className="flex justify-between items-center pt-6 pb-3 1.7xl:pe-10 lg:pe-3 pe-2">
            <div className="font-poppins font-medium text-4xl">
              <span className="text-black">Chora</span>{" "}
              <span className="text-blue-shade-200">Club</span>
            </div>
            <ConnectWalletWithENS />
          </div> */}

          <div className="grid grid-cols-3 gap-y-4 gap-x-4 1.7xl:gap-x-6 pt-6 relative 1.7xl:pr-14 pr-4 lg:pr-5 xl-pr-10">
            {/* Left side */}
            <div className="sticky top-10 z-10 col-span-2 space-y-5 font-poppins pb-10 ">
              <WatchSessionVideo
                data={data}
                collection={collection}
                autoplay={true}
                sessionDetails={sessionDetails}
              />
              <WatchSession
                data={data}
                collection={collection}
                sessionDetails={sessionDetails}
              />

              {/* /Video Recommendation */}
              {/* <WatchVideoRecommendation /> */}
            </div>

            {/* Right side */}
            <div
              className={`col-span-1  pb-8 ${styles.customScrollbar} gap-y-6 flex flex-col`}
            >
              {/* <WatchSessionList /> */}

              {/* Free */}
              <WatchFreeCollect />

              {/* Leader BOARD */}
              <WatchLeaderBoard />

              {/* COLLECTIBLE INFO */}
              <WatchCollectibleInfo />

              {/* SOCIAL LINKS */}
              <WatchSocialLinks data={data} collection={collection} />
            </div>
          </div>
        </div>
      ) : (
        <WatchComponentSkeletonLoader />
      )}
    </>
    )
}
export default WatchComponentMain;