import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Specialist} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {SpecialistMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type SpecialistPageProps = {
    selectedSpecialist: T_Specialist | null,
    setSelectedSpecialist: React.Dispatch<React.SetStateAction<T_Specialist | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistPage = ({selectedSpecialist, setSelectedSpecialist, isMock, setIsMock}: SpecialistPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/specialists/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedSpecialist(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedSpecialist(SpecialistMocks.find(specialist => specialist?.id == parseInt(id)) as T_Specialist)
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
                    <img
                        alt=""
                        src={isMock ? mockImage as string : selectedSpecialist.image}
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

export default SpecialistPage