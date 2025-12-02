import DotGrid from "@/components/DotGrid";
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
      {/* floatable header */}
      <div className="w-full h-15 absolute flex bg-white">
        <div className="w-full max-w-[1300px] flex justify-between items-center mx-auto">
          {/* the logo holder */}
          <div className="w-[200px] h-full flex justify-center items-center pt-1.5">
            <Image
              src="/buglite.png"
              width={150}
              height={20}
              alt="blog-lite-logo"
            />
          </div>
          {/* the links holder */}
          <div className="w-full h-full flex justify-between items-center md:max-w-[400px]">
            <span className="text-lg font-semibold cursor-pointer">Home</span>
            <span className="text-lg font-semibold cursor-pointer">
              About Us
            </span>
            <span className="text-lg font-semibold cursor-pointer">
              Contact Us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
