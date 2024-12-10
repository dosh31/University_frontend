import {Button, CardText, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchSpecialists, updateSpecialistName} from "store/slices/specialistsSlice.ts";
import SpecialistCard from "components/SpecialistCard/SpecialistCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const SpecialistsListPage = () => {

    const dispatch = useAppDispatch()

    const {specialists, specialist_name} = useAppSelector((state) => state.specialists)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_lecture_id, specialists_count} = useAppSelector((state) => state.lectures)

    const hasDraft = draft_lecture_id != null

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

    function getRandom(min, max):number {
        return Math.random() * (max - min) + min;
    }

    const [sinus, setSinus] = useState(getRandom(0, 10))

    useEffect(() => {
        setSinus(getRandom(0, 10))
    }, [specialist_name, specialists_count]);

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
                <Col md="6">
                    <Row>
                        <Col>
                            <CardText>Синус числа {sinus.toFixed(2)} равен {Math.sin(sinus).toFixed(2)}</CardText>
                        </Col>
                        <Col className="d-flex flex-row justify-content-end">
                            {is_authenticated &&
                                <Bin isActive={hasDraft} draft_lecture_id={draft_lecture_id} specialists_count={specialists_count} />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {specialists?.map(specialist => (
                    <Col key={specialist.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <SpecialistCard specialist={specialist} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SpecialistsListPage