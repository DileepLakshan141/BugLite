import DotGrid from "@/components/DotGrid";
import HeaderComponent from "@/components/header/Header";
import Image from "next/image";

export default function Home() {
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
      <HeaderComponent />
    </div>
  );
}
