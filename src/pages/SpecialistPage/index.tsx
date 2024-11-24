import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Specialist} from "modules/types.ts";
import {SpecialistMocks} from "modules/mocks.ts";

type Props = {
    selectedSpecialist: T_Specialist | null,
    setSelectedSpecialist: React.Dispatch<React.SetStateAction<T_Specialist | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistPage = ({selectedSpecialist, setSelectedSpecialist, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/specialists/${id}`)
            const data = await response.json()
            setSelectedSpecialist(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedSpecialist(SpecialistMocks.find(specialist => specialist?.id == parseInt(id as string)) as T_Specialist)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedSpecialist(null)
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
                    <CardImg src={isMock ? mockImage as string : selectedSpecialist.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedSpecialist.name}</h1>
                    <p className="fs-5">Описание: {selectedSpecialist.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default SpecialistPage