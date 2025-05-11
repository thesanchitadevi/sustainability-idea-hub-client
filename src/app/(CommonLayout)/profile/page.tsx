import { getMe } from "@/service/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, CalendarDays, Shield, Info } from "lucide-react";

const Page = async () => {
  const data = await getMe();
  const user = data?.data;

  // Extended profile info
  const profileInfo = {
    phoneNumber: "+880 1234-567890",
    location: "Dhaka, Bangladesh",
    joinedDate: "January 10, 2023",
    bio: "Active member of the EcoHive — sharing creative ideas and exploring innovative solutions contributed by others.",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-10">
      {user && (
        <Card className="w-full max-w-sm md:max-w-md shadow-xl rounded-2xl border-0">
          <CardHeader className="flex flex-col items-center gap-2">
            <Avatar className="w-24 h-24 border-4 border-red-500">
              <AvatarImage src={user.profile_image} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center text-xl font-bold text-gray-800">
              {user.name}
            </CardTitle>
            <Badge
              className={`px-3 py-1 text-white ${
                user.status === "ACTIVE" ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              {user.status}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span>{user.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              <span>{profileInfo.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{profileInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-red-500" />
              <span>Joined: {profileInfo.joinedDate}</span>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-red-500 mt-1" />
              <span>{profileInfo.bio}</span>
            </div>
           
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
