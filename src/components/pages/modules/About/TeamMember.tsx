import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export function TeamMember({ name, role, bio, image }: TeamMemberProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 128px)"
        />
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-1">{name}</h3>
      <p className="text-green-600 mb-3">{role}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  );
}
