// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// if (!RAPIDAPI_KEY) {
//   console.warn(
//     "RAPIDAPI_KEY is missing in .env.local → RapidAPI courses will be empty"
//   );
// }

// export async function getUsaComputerScienceCourses() {
//   if (!RAPIDAPI_KEY) return [];

//   try {
//     const response = await fetch(
//       "https://advance-course-finder.p.rapidapi.com/api/search?course_name=Computer+Science&country_id=1&qualification=bachelors",
//       {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": "advance-course-finder.p.rapidapi.com",
//           "x-rapidapi-key": RAPIDAPI_KEY,
//         },
//         next: { revalidate: 3600 }, // cache for 1 hour
//       }
//     );

//     if (!response.ok) {
//       console.warn("RapidAPI responded with:", response.status);
//       return [];
//     }

//     const json = await response.json();

//     const courses = json?.data || json?.results || json || [];

//     console.log(
//       `Successfully loaded ${courses.length} Computer Science programs from USA`
//     );

//     return courses; // ← This is the clean array you want
//   } catch (error: any) {
//     console.error("RapidAPI fetch completely failed:", error.message || error);
//     return []; // never crash the page
//   }
// }
