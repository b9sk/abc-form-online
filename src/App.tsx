import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormList from "./pages/FormList";
import FormAdd from "./pages/FormAdd";
import FormEdit from "./pages/FormEdit";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<FormList />} />
                <Route path="/forms/add" element={<FormAdd />} />
                <Route path="/forms/:id" element={<FormEdit />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;