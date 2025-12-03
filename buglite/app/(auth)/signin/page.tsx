const SigninPage = () => {
  return (
    <div className="w-full h-screen relative">
      {/* video container */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full absolute top-0 left-0"
      >
        <source src="/buglite_back1.mp4" type="video/mp4" />
      </video>
      {/* signins form */}
      <div className="w-full h-screen absolute top-0 left-0"></div>
    </div>
  );
};

export default SigninPage;
