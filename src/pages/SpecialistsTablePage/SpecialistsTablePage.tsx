import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchSpecialists, updateSpecialistName} from "store/slices/specialistsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import SpecialistsTable from "components/SpecialistsTable/SpecialistsTable.tsx";

const SpecialistsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {specialists, specialist_name} = useAppSelector((state) => state.specialists)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSpecialistName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchSpecialists())
    }

    useEffect(() => {
        dispatch(fetchSpecialists())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={specialist_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/specialists/add">
                        <Button color="primary">Новый специалист</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {specialists.length > 0 ? <SpecialistsTable specialists={specialists} fetchSpecialists={fetchSpecialists}/> : <h3 className="text-center mt-5">Специалисты не найдены</h3>}
            </Row>
        </Container>
    );
};

export default SpecialistsTablePage