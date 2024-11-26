import {Button, CardText, Col, Container, Form, Input, Row} from "reactstrap";
import SpecialistCard from "components/SpecialistCard";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchSpecialists, updateQuery} from "store/slices/specialistsSlice.ts";
import {Bin} from "../../components/Bin/Bin.tsx";

export const SpecialistsListPage = () => {

    const dispatch = useAppDispatch()

    const specialists = useAppSelector((state) => state.specialists.specialists)

    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const {draft_lecture_id, specialists_count} = useAppSelector((state) => state.lectures)

    const hasDraft = draft_lecture_id != null

    const specialist_name = useAppSelector((state) => state.specialists.specialist_name)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuery(e.target.value))
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
    }, [specialist_name]);

    return (
        <Container>
            <Row>
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
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
                        <Col>
                            {isAuthenticated &&
                                <Bin isActive={hasDraft} draft_lecture_id={draft_lecture_id} specialists_count={specialists_count} />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {specialists?.map(specialist => (
                    <Col key={specialist.id} xs="4" className="mb-5 d-flex justify-content-center">
                        <SpecialistCard specialist={specialist} showAddBtn={isAuthenticated} showMM={false} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};