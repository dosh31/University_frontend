import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Specialist} from "src/modules/types.ts";
import SpecialistCard from "components/SpecialistCard";
import {SpecialistMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect, useState} from "react";
import * as React from "react";

type SpecialistsListPageProps = {
    specialists: T_Specialist[],
    setSpecialists: React.Dispatch<React.SetStateAction<T_Specialist[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const SpecialistsListPage = ({specialists, setSpecialists, isMock, setIsMock}:SpecialistsListPageProps) => {

    const [query, setQuery] = useState<string>("")

    const fetchData = async () => {
        try {
            // Отправляем GET-запрос на бэкенд, передавая значение query в качестве параметра
            const response = await fetch(`/api/specialists/?specialist_name=${query.toLowerCase()}`,{ signal: AbortSignal.timeout(1000) }) // Устанавливаем тайм-аут для запроса
            const data = await response.json() // Извлекаем данные из ответа в формате JSON
            setSpecialists(data.specialists) // Обновляем список специалистов, полученных из ответа
            setIsMock(false) // Устанавливаем флаг isMock в false чтобы показать что используются реальные данные, а не моки
        } catch {
            createMocks() // Если запрос не удался (например ошибка сети), вызываем функцию createMocks
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setSpecialists(SpecialistMocks.filter(specialist => specialist.name.toLowerCase().includes(query.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {specialists?.map(specialist => (
                    <Col key={specialist.id} xs="4">
                        <SpecialistCard specialist={specialist} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SpecialistsListPage