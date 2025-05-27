"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { orderedIdeaSelector } from "@/redux/features/cartSlice";
import { IIdea } from "@/types";
import { useUser } from "@/context/userContext";


const CheckoutComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const {user} = useUser();

  const cartItems = useAppSelector(orderedIdeaSelector);

  //   const calculateTotal = () => {
  //     return cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
  //   };

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Order Summary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        {cartItems?.map((item: IIdea, index: number) => (
          <Card key={index}>
            <CardContent className="flex items-center gap-4 p-4">
              <Image
                src={item?.images[0].imageUrl}
                alt={item?.title}
                width={100}
                height={100}
                className="rounded-xl"
              />
              <div>
                <h3 className="text-lg font-semibold">{item?.title}</h3>

                <p className="text-md font-medium mt-1">
                  Subtotal: {200} BDT
                </p>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Payment Method */}
        
      </div>

      {/* User Details */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">User Details</h2>
        <div className="space-y-4">
          <Input
            placeholder="your name"
            className="w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.name.message)}
            </p>
          )}

          <Input
            placeholder="your.email@gmail.com"
            value={user?.email ?? ""}
            disabled
            className="w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.email.message)}
            </p>
          )}

          <Input
            placeholder="your address"
            className="w-full"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.address.message)}
            </p>
          )}
        </div>

        {/* Total Summary */}
        <div className="pt-6 border-t">
          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span>0.00 BDT</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{200 * cartItems?.length} BDT</span>
          </div>
        </div>

        <Button
        disabled={cartItems?.length === 0}
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white text-lg cursor-pointer"
        >
          BUY NOW
        </Button>
      </div>
    </form>
  );
};

export default CheckoutComponent;
