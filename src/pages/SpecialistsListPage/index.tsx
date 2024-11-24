import {Button, CardText, Col, Container, Form, Input, Row} from "reactstrap";
import SpecialistCard from "components/SpecialistCard";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updateSpecialistName} from "src/store/slices/specialistsSlice.ts";
import {T_Specialist} from "modules/types.ts";
import {SpecialistMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";

type Props = {
    specialists: T_Specialist[],
    setSpecialists: React.Dispatch<React.SetStateAction<T_Specialist[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistsListPage = ({specialists, setSpecialists, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {specialist_name} = useAppSelector((state) => state.specialists)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSpecialistName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setSpecialists(SpecialistMocks.filter(specialist => specialist.name.toLowerCase().includes(specialist_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchSpecialists()
    }

    const fetchSpecialists = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/specialists/?specialist_name=${specialist_name.toLowerCase()}`)
            const data = await response.json()
            setSpecialists(data.specialists)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchSpecialists()
    }, []);

    function getRandom(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    

    const [sinus, setSinus] = useState(getRandom(0, 10))

    useEffect(() => {
        setSinus(getRandom(0, 10))
    }, [specialist_name]);

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
                                <Button color="primary" className="w-100">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col md="6">
                    <CardText>Синус числа {sinus.toFixed(2)} равен {Math.sin(sinus).toFixed(2)}</CardText>
                </Col>
            </Row>
            <Row>
                {specialists?.map(specialist => (
                    <Col key={specialist.id} sm="12" md="6" lg="4">
                        <SpecialistCard specialist={specialist} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SpecialistsListPage