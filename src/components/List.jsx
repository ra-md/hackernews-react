import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import getData from "~/api";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import transformUrl from "~/util/transformUrl";

export default function Stories() {
   const [stories, setStories] = useState({ isLoading: true, data: [] });
   const { search, pathname } = useLocation();
   const searchParams = new URLSearchParams(search);
   const page = searchParams.get("page");
   const navigate = useNavigate();
   const PAGE_SIZE = 30;
   const start = 1 + (page ? page - 1 : 0) * PAGE_SIZE;

   function fetchMore() {
      if (page) {
         navigate(`?page=${Number(page) + 1}`);
      } else {
         navigate(`?page=2`);
      }
   }

   useEffect(() => {
      setStories((prev) => ({ ...prev, isLoading: true }));

      const path = `${pathname === "/" ? "news" : pathname.replace("/", "")}${
         page ? `/${page}` : ""
      }`;

      getData(path).then((response) => {
         setStories({ data: response, isLoading: false });
      });
   }, [pathname, search]);

   if (stories.isLoading) {
      return (
         <List>
            {Array.from(Array(6)).map((_, index) => {
               return (
                  <ListItem key={index}>
                     <Box sx={{ width: "100%" }}>
                        <Skeleton animation="wave" height={40} />
                        <Skeleton animation="wave" width="50%" height={30} />
                     </Box>
                  </ListItem>
               );
            })}
         </List>
      );
   }

   if (!stories.isLoading && stories.data.length === 0) {
      return (
         <Typography sx={{ textAlign: "center", my: 4 }}>No items</Typography>
      );
   }

   return (
      <>
         <List sx={{ width: "100%" }}>
            {stories.data.map((story, index) => {
               return (
                  <ListItem key={story.id}>
                     <ListItemIcon>{start + index}</ListItemIcon>
                     <ListItemText
                        primary={
                           story.domain ? (
                              <Link
                                 sx={{ display: "block" }}
                                 href={story.url}
                                 underline="hover"
                              >
                                 {story.title} ({story.domain})
                              </Link>
                           ) : (
                              <Link
                                 sx={{ display: "block" }}
                                 component={RouterLink}
                                 to={`/${transformUrl(story.url)}`}
                                 underline="hover"
                              >
                                 {story.title}
                              </Link>
                           )
                        }
                        secondary={
                           <>
                              {story.points ? (
                                 <>
                                    {story.points} points by{" "}
                                    <Link
                                       to={`/user/${story.user}`}
                                       component={RouterLink}
                                       underline="hover"
                                    >
                                       {story.user}
                                    </Link>{" "}
                                 </>
                              ) : undefined}
                              {story.time_ago}{" "}
                              {story.points ? (
                                 <>
                                    |{" "}
                                    <Link
                                       to={`/item/${story.id}`}
                                       component={RouterLink}
                                       underline="hover"
                                    >
                                       {story.comments_count} comments
                                    </Link>
                                 </>
                              ) : undefined}
                           </>
                        }
                     />
                  </ListItem>
               );
            })}
         </List>
         {stories.data.length > 0 ? (
            <Box
               sx={{
                  mb: "1rem",
                  display: "flex",
                  justifyContent: "center",
               }}
            >
               <Button onClick={fetchMore}>More</Button>
            </Box>
         ) : undefined}
      </>
   );
}
