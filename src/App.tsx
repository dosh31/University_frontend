import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import SpecialistsListPage from "pages/SpecialistsListPage/SpecialistsListPage.tsx";
import SpecialistPage from "pages/SpecialistPage/SpecialistPage.tsx";
import LecturesPage from "pages/LecturesPage/LecturesPage.tsx";
import LecturePage from "pages/LecturePage/LecturePage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/specialists/" element={<SpecialistsListPage />} />
                        <Route path="/specialists/:id/" element={<SpecialistPage />} />
                        <Route path="/lectures/" element={<LecturesPage />} />
                        <Route path="/lectures/:id/" element={<LecturePage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
