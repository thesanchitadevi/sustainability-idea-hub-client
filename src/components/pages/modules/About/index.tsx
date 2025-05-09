import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MissionCard } from "./MissionCard";
import { TeamMember } from "./TeamMember";
import Stats from "../Home/Stats";

export default function About() {
  const teamMembers = [
    {
      name: "Ayesha Rahman",
      role: "Founder & CEO",
      bio: "Social entrepreneur with 10+ years in community development",
      image: "https://i.postimg.cc/MTjJdT2Z/tem1.jpg",
    },
    {
      name: "Farid Ahmed",
      role: "CTO",
      bio: "Tech innovator specializing in platform architecture",
      image: "https://i.postimg.cc/nrbb5Jp4/tem2.jpg",
    },
    {
      name: "Tasnim Khan",
      role: "Community Manager",
      bio: "Connector of people and ideas across Bangladesh",
      image: "https://i.postimg.cc/QMzrQ7zn/tem3.jpg",
    },
  ];

  const missions = [
    {
      icon: "💡",
      title: "Empower Innovators",
      description: "Provide tools to turn ideas into actionable solutions",
    },
    {
      icon: "🌱",
      title: "Foster Growth",
      description: "Create ecosystems where ideas can flourish",
    },
    {
      icon: "🤝",
      title: "Build Community",
      description: "Connect like-minded individuals across Bangladesh",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Our Idea Platform
          </h1>
          <p className="text-xl max-w-4xl mx-auto">
            Connecting Bangladesh&apos;s brightest minds to solve local
            challenges through collaborative innovation
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Image
              src="https://i.postimg.cc/W1XV4CwV/journey.jpg"
              alt="Team brainstorming"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Our Journey
            </h2>
            <p className="text-lg mb-4 text-gray-700">
              Founded in 2022 in Dhaka, our platform emerged from a simple
              observation: Bangladesh brims with untapped potential, but great
              ideas often lack the connections and resources to flourish.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              What began as a university project among engineering students has
              grown into a national movement, with over 50,000 members
              contributing solutions for agriculture, education, urban planning,
              and more.
            </p>
            <Button asChild variant="outline" className="border-green-600">
              <Link
                href="/idea"
                className="text-green-600 hover:text-green-800"
              >
                Explore Ideas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16  max-w-7xl mx-auto">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Our Core Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <MissionCard
                key={index}
                icon={mission.icon}
                title={mission.title}
                description={mission.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16  max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-6 text-center">
        <div className="bg-green-50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Ready to Share Your Idea?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
            Join thousands of innovators shaping Bangladesh&apos;s future
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600">
              <Link
                href="/idea"
                className="text-green-600 hover:text-green-800"
              >
                Browse Ideas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
