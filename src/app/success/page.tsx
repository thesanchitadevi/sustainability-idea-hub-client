// app/success/page.tsx or pages/success.tsx

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
