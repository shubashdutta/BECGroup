"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

/* ================= TYPES ================= */
type Course = {
  name: string;
  description: string;
  salary: string;
  lottie: string;
};

type Sector = {
  sector: string;
  courses: Course[];
};

/* ================= DATA ================= */
const sectors: Sector[] = [
  {
    sector: "Technology",
    courses: [
      {
        name: "Artificial Intelligence",
        description: "Deep learning, neural networks, and intelligent systems.",
        salary: "$100,000 – $170,000 / year",
        lottie: "https://assets8.lottiefiles.com/packages/lf20_xRmNN8.json",
      },
      {
        name: "Data Science",
        description: "Data analytics, machine learning, and prediction models.",
        salary: "$90,000 – $150,000 / year",
        lottie: "https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json",
      },
      {
        name: "Cyber Security",
        description: "Protect systems and networks from cyber threats.",
        salary: "$85,000 – $145,000 / year",
        lottie: "https://assets1.lottiefiles.com/packages/lf20_khzniaya.json",
      },
      {
        name: "Cloud Computing",
        description: "Cloud infrastructure, DevOps, and scalable systems.",
        salary: "$90,000 – $160,000 / year",
        lottie: "https://assets9.lottiefiles.com/packages/lf20_kxsd2ytq.json",
      },
      {
        name: "Software Engineering",
        description: "Enterprise software and system architecture.",
        salary: "$85,000 – $150,000 / year",
        lottie: "https://assets6.lottiefiles.com/packages/lf20_w51pcehl.json",
      },
    ],
  },

  {
    sector: "Business & Management",
    courses: [
      {
        name: "Master of Business Administration (MBA)",
        description: "Leadership, strategy, and business operations.",
        salary: "$70,000 – $120,000 / year",
        lottie: "https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json",
      },
      {
        name: "Project Management",
        description: "Plan, execute, and manage complex projects.",
        salary: "$75,000 – $130,000 / year",
        lottie: "https://assets4.lottiefiles.com/packages/lf20_yg8gcs.json",
      },
      {
        name: "Business Analytics",
        description: "Use data for smarter business decisions.",
        salary: "$70,000 – $120,000 / year",
        lottie: "https://assets9.lottiefiles.com/packages/lf20_9cyyl8i4.json",
      },
      {
        name: "Supply Chain Management",
        description: "Global logistics and operations optimization.",
        salary: "$70,000 – $125,000 / year",
        lottie: "https://assets5.lottiefiles.com/packages/lf20_ysrn2iwp.json",
      },
      {
        name: "International Business",
        description: "Global trade and cross-border management.",
        salary: "$65,000 – $115,000 / year",
        lottie: "https://assets1.lottiefiles.com/packages/lf20_v7gj8q.json",
      },
    ],
  },

  {
    sector: "Health & Science",
    courses: [
      {
        name: "Public Health",
        description: "Community health and healthcare systems.",
        salary: "$55,000 – $95,000 / year",
        lottie: "https://assets10.lottiefiles.com/packages/lf20_dq3j1k.json",
      },
      {
        name: "Biotechnology",
        description: "Medical and biological innovation.",
        salary: "$70,000 – $120,000 / year",
        lottie: "https://assets7.lottiefiles.com/packages/lf20_9wpyhdzo.json",
      },
      {
        name: "Nursing",
        description: "Clinical care and patient management.",
        salary: "$60,000 – $100,000 / year",
        lottie: "https://assets2.lottiefiles.com/packages/lf20_touohxv0.json",
      },
      {
        name: "Mental Health & Counseling",
        description: "Psychological support and therapy.",
        salary: "$55,000 – $90,000 / year",
        lottie: "https://assets8.lottiefiles.com/packages/lf20_kyu7xb1v.json",
      },
      {
        name: "Health Informatics",
        description: "Technology-driven healthcare solutions.",
        salary: "$65,000 – $110,000 / year",
        lottie: "https://assets6.lottiefiles.com/packages/lf20_bhw1ul4g.json",
      },
    ],
  },

  {
    sector: "Social Sciences",
    courses: [
      {
        name: "Psychology",
        description: "Human behavior and mental processes.",
        salary: "$55,000 – $95,000 / year",
        lottie: "https://assets1.lottiefiles.com/packages/lf20_1pxqjqps.json",
      },
      {
        name: "Social Work",
        description: "Community support and social welfare.",
        salary: "$50,000 – $85,000 / year",
        lottie: "https://assets4.lottiefiles.com/packages/lf20_3rwasyjy.json",
      },
      {
        name: "International Relations",
        description: "Global politics and diplomacy.",
        salary: "$60,000 – $110,000 / year",
        lottie: "https://assets1.lottiefiles.com/packages/lf20_v7gj8q.json",
      },
      {
        name: "Public Policy",
        description: "Policy making and governance.",
        salary: "$65,000 – $115,000 / year",
        lottie: "https://assets9.lottiefiles.com/packages/lf20_9cyyl8i4.json",
      },
      {
        name: "Human Rights",
        description: "Advocacy and global justice.",
        salary: "$55,000 – $95,000 / year",
        lottie: "https://assets7.lottiefiles.com/packages/lf20_rpC1Rd.json",
      },
    ],
  },
];

/* ================= PAGE ================= */
export default function PopularCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900">
          World’s Best Courses by Sector
        </h1>
        <p className="text-gray-600 mt-4">
          Discover top programs across industries and build a high-impact
          career.
        </p>
      </div>

      {/* Sectors */}
      {sectors.map((section) => (
        <div key={section.sector} className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {section.sector}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {section.courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="w-28 h-28 mx-auto mb-3">
                  <Player autoplay loop src={course.lottie} />
                </div>

                <h3 className="font-semibold text-gray-900 text-sm">
                  {course.name}
                </h3>

                <p className="text-xs text-gray-600 mt-1">
                  {course.description}
                </p>

                <div className="mt-3 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  <span>Expected Salary</span>: {course.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
