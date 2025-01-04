import Image from "next/image";

export default function NoResultFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(85vh)]  rounded-lg">
      <Image
        src="/no-product-found.png"
        alt="no-product-found"
        width={400}
        height={400}
        className="flex items-center justify-center col-span-3"
      />
      <p className="text-[#646464] font-medium text-xl mt-5">There is no results right now</p>
    </div>
  );
}
