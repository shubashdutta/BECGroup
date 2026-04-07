const UniversityCard = ({ item }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Banner */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={item.universityBannerImage}
          alt={item.universityName}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-blue-600">
            {item.universityName}
          </h2>
          <p className="text-gray-500 text-sm">
            📍 {item.location} • {item.country}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          {item.overviewStats?.acceptanceRate && (
            <div className="flex-1 bg-gray-100 p-3 rounded-xl text-center">
              <p className="font-bold text-lg">
                {item.overviewStats.acceptanceRate}
              </p>
              <p className="text-xs text-gray-500">Acceptance Rate</p>
            </div>
          )}

          {item.overviewStats?.totalInternationalStudents && (
            <div className="flex-1 bg-blue-50 p-3 rounded-xl text-center">
              <p className="font-bold text-lg">
                {item.overviewStats.totalInternationalStudents}
              </p>
              <p className="text-xs text-gray-500">Intl Students</p>
            </div>
          )}
        </div>

        {/* Programs */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {item.topCourses?.length || 0} Programs Available
          </p>

          <button className="text-blue-600 font-medium hover:underline">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
