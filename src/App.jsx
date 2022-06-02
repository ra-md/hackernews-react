import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "~/components/Header";
import List from "~/components/List";
import ItemPage from "~/components/ItemPage";
import UserPage from "~/components/UserPage";

function App() {
   const paths = ["/", "newest", "show", "ask", "jobs"];

   return (
      <BrowserRouter>
         <Header paths={paths} />
         <Container maxWidth="md">
            <Routes>
               {paths.map((path) => {
                  return <Route key={path} path={path} element={<List />} />;
               })}
               <Route path="item/:id" element={<ItemPage />} />
               <Route path="user/:username" element={<UserPage />} />
               <Route
                  path="*"
                  element={
                     <main style={{ padding: "1rem", textAlign: 'center' }}>
                        <p>There's nothing here!</p>
                     </main>
                  }
               />
            </Routes>
         </Container>
      </BrowserRouter>
   );
}

export default App;
