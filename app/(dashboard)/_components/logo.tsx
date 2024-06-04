import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      height={100}
      width={100}
      priority={true}
      alt="logo"
      src="/grimoire-icon-white(small).png"
    />
  );
};
