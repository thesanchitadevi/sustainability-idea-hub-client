"use client";
import { Button } from "@/components/ui/button";

import { IIdea } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

const AddToCartItems = ({
  items,
  onDelete,
}: {
  items: IIdea[];
  onDelete: (id: string) => void;
}) => {
  console.log(items);

  return (
    <div className="mt-10">
      {items?.map((item) => (
        <div
          key={item?.id}
          className="shadow-md hover:shadow-lg  flex justify-between p-4  transition-shadow duration-300"
        >
          <div>
            <div className="  flex flex-row gap-4 items-center ">
              <div className="relative w-28 h-28  ">
                <Image
                  src={item?.images[0].imageUrl}
                  alt={item?.title}
                  fill
                  className="object-contain  "
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <h3 className="text-lg font-semibold ">
                  {item.title.length > 10
                    ? `${item?.title.slice(0, 10)}...`
                    : item?.title}
                </h3>
                <p className="text-green-500 font-bold text-md">200 BDT</p>
              </div>
            </div>
          </div>
          <Button
            className="cursor-pointer mt-9"
            onClick={() => onDelete(item?.id)}
          >
            <X></X>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AddToCartItems;
