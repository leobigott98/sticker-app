"use client";

import Image from "next/image";
import { Asset } from "../lib/definitions";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import styles from "./Carousel.module.css";

export default function SideBar({
  assets,
  onSelectAsset,
}: {
  assets: Asset[] | null;
  onSelectAsset: (url: string) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    axis: "y",
    //containScroll: "keepSnaps",
    dragFree: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // set initial index
  }, [emblaApi]);

  return (
    <div className="w-1/6 overflow-hidden">
      {assets ? (
        assets.length > 10 ? (
          <div className={`${styles.embla}`} ref={emblaRef}>
            <div className={styles.embla__container}>
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className={`${styles.embla__slide} ${
                    index === selectedIndex ? styles.embla__slide__active : ""
                  }`}
                  onClick={() => {
                    setSelectedIndex(index);
                    emblaApi?.scrollTo(index);
                    onSelectAsset(asset.path);
                  }}
                >
                  <Image
                    src={asset.path}
                    alt={asset.alt}
                    width={180}
                    height={180}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto">
            {assets.map((asset, index) => (
              <div key={index}
              className="m-5 cursor-pointer"
              onClick={() => onSelectAsset(asset.path)}
              >
                <Image
                  src={asset.path}
                  alt={asset.alt}
                  width={350}
                  height={350}
                  className="rounded-lg object-contain"
                />
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
