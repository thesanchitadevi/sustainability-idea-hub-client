interface MissionCardProps {
  icon: string;
  title: string;
  description: string;
}

export function MissionCard({ icon, title, description }: MissionCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
