import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import SpecialistPage from "pages/SpecialistPage";
import SpecialistsListPage from "pages/SpecialistsListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import {useState} from "react";
import {T_Specialist} from "modules/types.ts";

function App() {

    const [specialists, setSpecialists] = useState<T_Specialist[]>([])

    const [selectedSpecialist, setSelectedSpecialist] = useState<T_Specialist | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedSpecialist={selectedSpecialist}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/specialists/" element={<SpecialistsListPage specialists={specialists} setSpecialists={setSpecialists} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/specialists/:id" element={<SpecialistPage selectedSpecialist={selectedSpecialist} setSelectedSpecialist={setSelectedSpecialist} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
