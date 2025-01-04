// 'use client';
// // import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";

// // export function getTokenFromUrl() {
// //   if (typeof window !== 'undefined') {
// //     // Client-side logic
// //     const router = useRouter();
// //     const pathSegments = router.asPath.split('/');
// //     return pathSegments[pathSegments.length - 1]; // The token is the last segment
// //   } else {
// //     // Server-side logic, usually called within getServerSideProps or API routes
// //     return null; // Placeholder: return null or handle differently for server-side
// //   }
// // }
// export function extractTokenFromUrl(url) {
//     // Split the URL by '/' and get the last segment
//     const segments = url.split('/');
//     const token = segments.pop() || segments.pop(); // Handle trailing slash case
//   console.log(token, "token");
//     return token;
//   }

// export function ExtractIdAndToken() {
//     const router = useRouter();
//   if (typeof window !== 'undefined') {
//     const pathSegments = router.asPath.split('/');
//     if (pathSegments.length >= 3) {
//       const token = pathSegments.pop(); // Last segment is the token
//       const id = pathSegments.pop();    // Second to last segment is the id
//         console.log(id, "id");
//       return { id, token };
//     }
//   }

//   return null; // If `id` or `token` is missing
// }
// import { useRouter } from 'next/router';

// function extractUrlParams() {
//   const router = useRouter();
//   const { pathname } = router;

//   const urlParts = pathname.split('/');
//   const id = urlParts[urlParts.length - 2];
//   const token = urlParts.length > 2 ? urlParts[urlParts.length - 1] : null;

//   return { id, token  ,router};
// }

// export default extractUrlParams;
// 'use client';

// import { useRouter } from "next/navigation";

// export function SplitUrl() {
//     const router = useRouter();
//     const { pathname } = router;

//     const urlParts = pathname.split('/');
//     const id = urlParts[urlParts.length - 2];
//     const token = urlParts.length > 2 ? urlParts[urlParts.length - 1] : null;

//     return { id, token  ,router};
// }