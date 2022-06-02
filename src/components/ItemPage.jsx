import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getData from "~/api";
import Comment from "./Comment";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function Item() {
   const [item, setItem] = useState({ isLoading: false, data: {} });
   const params = useParams();

   useEffect(() => {
      setItem((prev) => ({ ...prev, isLoading: true }));

      getData(`item/${params.id}`).then((response) => {
         setItem({ data: response, isLoading: false });
      });
   }, []);

   if (item.isLoading) {
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
      <>
         <Link
            sx={{ mt: "1rem", display: "block" }}
            underline="hover"
            href={item.data.url}
         >
            <Typography variant="h4">{item.data.title}</Typography>
            <span>{item.data.domain}</span>
         </Link>
         <Box sx={{ my: "1rem" }}>
            <Typography
               dangerouslySetInnerHTML={{ __html: item.data.content }}
            />
            {item.data.points ? (
               <span>
                  {item.data.points} points by{" "}
                  <Link
                     component={RouterLink}
                     to={`/user/${item.data.user}`}
                     underline="hover"
                  >
                     {item.data.user}
                  </Link>{" "}
               </span>
            ) : undefined}
            <span>{item.data.time_ago}</span>
         </Box>
         <Box sx={{ mb: "1rem" }}>
            {item.data.comments
               ? item.data.comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                 })
               : undefined}
         </Box>
      </>
   );
}
