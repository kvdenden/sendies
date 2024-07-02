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
      <h1 className="text-3xl font-bold tracking-tighter text-foreground">{title}</h1>
      {children}
    </div>
  );
}

type OnboardingScreenProps = {
  onComplete: Function;
};

const SLIDES = [
  {
    image: "/onboard.svg",
    title: "Welcome to Sendies",
    description: "We're excited to have you. Let's make sending money easy and fun!",
  },
  {
    image: "/onboard.svg",
    title: "Deposit funds",
    description:
      "Securely add money to your account. Choose your preferred method and enter the amount to get started.",
  },
  {
    image: "/onboard.svg",
    title: "Send Money",
    description:
      "Transfer funds to your friends instantly. Just enter their email address, add the amount, and hit send. No fees, no fuss.",
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  console.log("current", current);

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
      <Carousel setApi={setApi}>
        <CarouselContent>
          {SLIDES.map((slide, index) => (
            <CarouselItem key={index}>
              <OnboardingSlide key={index} image={slide.image} title={slide.title}>
                <div className="flex flex-col grow p-6 text-center text-muted-foreground">
                  <p className="text-gray-700 mb-4">{slide.description}</p>
                </div>
              </OnboardingSlide>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {current === count && (
        <Button onClick={() => onComplete()} className="w-full">
          Get started
        </Button>
      )}
      <div className="flex justify-center mt-auto p-6">
        {Array.from({ length: count }, (_, i) => (
          <Button
            key={i}
            className={`mx-1 h-1.5 w-1.5 rounded-full p-0 ${
              i + 1 === current ? "scale-125 transform bg-gray-500 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
