

import Link from "next/link";
import { Ban } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Ban className="h-16 w-16 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Cancelled</h1>
        <p className="text-gray-600">
          You cancelled the payment process. Feel free to try again when you are ready.
        </p>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
