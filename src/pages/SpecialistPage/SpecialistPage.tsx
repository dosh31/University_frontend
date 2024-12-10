import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchSpecialist, removeSelectedSpecialist} from "store/slices/specialistsSlice.ts";

const SpecialistPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {specialist} = useAppSelector((state) => state.specialists)

    useEffect(() => {
        dispatch(fetchSpecialist(id))
        return () => dispatch(removeSelectedSpecialist())
    }, []);

    if (!specialist) {
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
                        src={specialist.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{specialist.name}</h1>
                    <p className="fs-5">Цена: {specialist.price} руб.</p>
                    <p className="fs-5">Описание: {specialist.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecialistPage