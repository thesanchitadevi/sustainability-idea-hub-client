"use client";
import React, { useEffect, useState, PureComponent } from "react";

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { Lightbulb, Clock, Check, X, ThumbsUp } from "lucide-react";
import { getCurrentUser } from "@/service/auth";

import { useRouter } from "next/navigation";
import { IIdea } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllMemberIdeas } from "@/service/adminIdeaControll";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminDashboard = () => {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const user = await getCurrentUser();

        // console.log("user", user);

        if (!user) {
          router.push("/login");
          return;
        }

        const userIdeas = await getAllMemberIdeas();

        const filteredIdeas = userIdeas?.data?.data;

        // console.log("filteredIdeas", filteredIdeas);

        setIdeas(filteredIdeas);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [router]);

  const getChartDAta = () => {
    const statusCount = {
      total: ideas?.length || 0,
      under_review:
        ideas?.filter((idea) => idea?.status === "UNDER_REVIEW").length || 0,
      approved:
        ideas?.filter((idea) => idea?.status === "APPROVED").length || 0,
      rejected: ideas?.filter((idea) => idea?.status === "REJECT").length || 0,
    };

    const data = [
      { name: "Total Ideas", value: statusCount.total },
      { name: "Under Review", value: statusCount.under_review },
      { name: "Approved", value: statusCount.approved },
      { name: "Rejected", value: statusCount.rejected },
    ].filter((item) => item.value > 0);
    return data;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const chartdata = getChartDAta();
  // console.log(chartdata)

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* Total Ideas Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Ideas
              </p>
              <h3 className="text-2xl font-bold mt-1">{ideas?.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Drafts Card */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Drafts
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea.status === "DRAFT").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50">
              <FileEdit className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div> */}

        {/* Under Review Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Under Review
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea?.status === "UNDER_REVIEW").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Approved Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Approved
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea?.status === "APPROVED").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Rejected Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Rejected
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas.filter((idea) => idea?.status === "REJECT").length}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/50">
              <X className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Total Upvotes Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Upvotes
              </p>
              <h3 className="text-2xl font-bold mt-1">
                {ideas?.reduce(
                  (total, idea) => total + (Number(idea.votes) || 0),
                  0
                ) || 0}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <ThumbsUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-white mt-5 dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Idea Status Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartdata}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartdata.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} ideas`, "Count"]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
