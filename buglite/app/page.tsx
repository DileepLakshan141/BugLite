"use client";
import DotGrid from "@/components/DotGrid";
import BlurText from "@/components/blur_text/BlurText";
import HeaderComponent from "@/components/header/Header";

export default function Home() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div className="w-full flex flex-col justify-start items-start relative">
      <div className="w-full h-screen  absolute opacity-30">
        <DotGrid
          style={{}}
          dotSize={7}
          gap={15}
          baseColor="#4d4c4c"
          activeColor="#f97316"
          proximity={170}
          shockRadius={300}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="w-full h-screen absolute flex flex-col justify-center items-center">
        <BlurText
          text="Dont Just Find Bugs🐞. Fix Them!🛠️."
          delay={150}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleAnimationComplete}
          className="text-[100px] font-bold text-center w-full justify-center text-black"
        />
        <p className="w-full max-w-[900px] mx-4 text-center mt-4 text-2xl font-semibold italic">
          Finding bugs is only half the battle. The real challenge is
          organizing, prioritizing, and fixing them as a team. Buglite connects
          discovery with resolution, creating a seamless workflow where every
          issue has an owner, every fix has visibility, and every project moves
          forward faster.
        </p>
      </div>
      <HeaderComponent />
    </div>
  );
}
