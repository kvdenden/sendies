import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type OnboardingSlideProps = {
  image: string;
  title: string;
  children?: React.ReactNode;
};

function OnboardingSlide({ title, image, children }: OnboardingSlideProps) {
  return (
    <div className="flex flex-col h-full items-center justify-start">
      <Image src={image} width={400} height={400} alt={title} />
      <h1 className="text-3xl font-bold tracking-tighter text-foreground pt-4 pb-6">{title}</h1>
      {children}
    </div>
  );
}

type OnboardingScreenProps = {
  onComplete: Function;
};

const SLIDES = [
  {
    image: "/connect-alt.svg",
    title: "Welcome to Sendies",
    description: "Ready to send cash to your friends, anywhere in the world? It's quick, easy, and fee-free.",
  },
  {
    image: "/deposit-alt.svg",
    title: "Let's Get Rolling",
    description: "Add funds to your account and start sending money worldwide with ease.",
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col h-full p-6 items-center">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {SLIDES.map((slide, i) => (
            <CarouselItem key={i}>
              <OnboardingSlide image={slide.image} title={slide.title}>
                <div className="flex flex-col text-center text-muted-foreground">
                  <p className="text-gray-700 mb-4">{slide.description}</p>
                  {i + 1 === count && (
                    <div className="text-center">
                      <Button onClick={() => onComplete()} className="mt-6 px-6 rounded-full">
                        Get started
                      </Button>
                    </div>
                  )}
                </div>
              </OnboardingSlide>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-6">
        <div className="flex justify-center p-6">
          {Array.from({ length: count }, (_, i) => (
            <Button
              key={i}
              className={`mx-1 h-1.5 w-1.5 rounded-full p-0 ${
                i + 1 === current
                  ? "scale-125 transform bg-gray-500 hover:bg-gray-500"
                  : "bg-gray-300 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-gray-400 text-xs text-center">
          <a href="https://storyset.com" target="_blank" rel="noopener noreferrer">
            Illustrations by Storyset
          </a>
        </p>
      </div>
    </div>
  );
}
