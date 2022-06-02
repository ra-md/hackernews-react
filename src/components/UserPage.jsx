import { useParams } from "react-router-dom";
import getData from "~/api";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function User() {
   const { username } = useParams();
   const [userData, setUserData] = useState({ isLoading: false, data: {} });

   useEffect(() => {
      setUserData((prev) => ({ ...prev, isLoading: true }));

      getData(`user/${username}`).then((response) => {
         setUserData({ data: response, isLoading: false });
      });
   }, [username]);

   if (userData.isLoading) {
      return (
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               width: "100%",
               my: 3,
            }}
         >
            <Box sx={{ width: "100%", ml: 5 }}>
               <Skeleton animation="wave" height={40} />
               <Skeleton animation="wave" width="50%" height={30} />
            </Box>
         </Box>
      );
   }

   return (
      <div>
         <Typography variant="h1">{userData.data.id}</Typography>
         <p>Joined {userData.data.created}</p>
         <p>Karma {userData.data.karma}</p>
         <Link
            underline="hover"
            href={`https://news.ycombinator.com/submitted?id=${userData.data.id}`}
         >
            submissions
         </Link>{" "}
         /{" "}
         <Link
            underline="hover"
            href={`https://news.ycombinator.com/threads?id=${userData.data.id}`}
         >
            comments
         </Link>{" "}
         /{" "}
         <Link
            underline="hover"
            href={`https://news.ycombinator.com/favorites?id=${userData.data.id}`}
         >
            favourites
         </Link>
      </div>
   );
}
