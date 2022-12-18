import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Student from "./pages/Student";
import Classes from "./pages/Classes";
import UpdateStudent from './pages/UpdateStudent';
import EditClasses from "./pages/EditClasses";
import { AnimatePresence } from "framer-motion";
import Fee from "./pages/Fee";
import AllFee from "./pages/AllFee";
import EditFee from "./pages/EditFee";


function App() {
  return (
    <div className="App">
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/student/:id" element={<UpdateStudent />} />
            <Route path="/classes/:id" element={<EditClasses />} />
            <Route path="/fee/:sid" element={<Fee />} />
            <Route path="/allfee" element={<AllFee />} />
            <Route path="/editfee/:feeid/:amount" element={<EditFee />} />

          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </div>
  );
}

export default App;
