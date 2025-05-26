import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";

export async function CallToAction() {
  const user = await getCurrentUser();
  console.log("Current User:", user);
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join our community today and start contributing your ideas for a
            more sustainable Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user && user.userId ? (
              <Button
                asChild
                size="lg"
                className="bg-white text-green-800 hover:bg-gray-100"
              >
                <Link href="/dashboard/member/create-idea">
                  Submit Your Idea
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="bg-white text-green-800 hover:bg-gray-100"
              >
                <Link href="/login">Sign Up Now</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
