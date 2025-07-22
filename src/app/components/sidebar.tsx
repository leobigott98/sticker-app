"use client";

import Image from "next/image";
import { Asset } from "../lib/definitions";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.css";

export default function SideBar({ assets }: { assets: Asset[] | null }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // set initial index
  }, [emblaApi]);

  return (
    <div className="w-1/4 h-screen overflow-hidden">
        {assets? assets.length > 10 ? (
            <div className={`${styles.embla}`} ref={emblaRef}>
        <div className={styles.embla__container}>
            {/* <div className="embla__slide embla__slide--dummy"></div> */}
          {assets?.map((asset, index) => {
            return (
              <div
                key={index}
                className={`${styles.embla__slide} ${
                  index === selectedIndex ? styles.embla__slide__active : ""
                }`}
                onClick={()=>{
                    setSelectedIndex(index);
                    emblaApi?.scrollTo(index);
                }}
              >
                <Image
                  src={asset.path}
                  alt={asset.alt}
                  width={180}
                  height={180}
                />
              </div>
            );
          })}
           {/* <div className="embla__slide embla__slide--dummy"></div> */}
        </div>
      </div>
        ) : 
            assets.map((asset, index)=>{
                return(
                    <div key={index} className="m-10">
                        <Image     
                            src={asset.path}
                            alt={asset.alt}
                            width={250}
                            height={250}
                        />
                    </div>
                )
            })
         : <></>}
      
    </div>
  );
}
