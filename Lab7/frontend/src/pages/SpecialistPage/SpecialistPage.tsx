import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchSpecialist, removeSelectedSpecialist} from "store/slices/specialistsSlice.ts";


export const SpecialistPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const selectedSpecialist = useAppSelector((state) => state.specialists.selectedSpecialist)

    useEffect(() => {
        dispatch(fetchSpecialist(id))
        return () => dispatch(removeSelectedSpecialist())
    }, []);

    if (!selectedSpecialist) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={selectedSpecialist.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedSpecialist.name}</h1>
                    <p className="fs-5">Описание: {selectedSpecialist.description}</p>
                </Col>
            </Row>
        </Container>
    );
};