"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Homepage_1 = require("./pages/Homepage");
const Recipedetail_1 = require("./pages/Recipedetail");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Homepage_1.Homepage />}/>
        <react_router_dom_1.Route path="/recipes/:recipeId" element={<Recipedetail_1.Recipedetail />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
