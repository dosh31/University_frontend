import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchLectures, T_lecturesFilters, updateFilters} from "store/slices/lecturesSlice.ts";
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {LecturesTable} from "components/LecturesTable/LecturesTable.tsx";
import {useNavigate} from "react-router-dom";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";

export const LecturesPage = () => {

    const dispatch = useAppDispatch()

    const lectures = useAppSelector((state) => state.lectures.lectures)

    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const filters = useAppSelector<T_lecturesFilters>((state) => state.lectures.filters)

    const navigate = useNavigate()

    const [status, setStatus] = useState(filters.status)

    const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start)

    const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end)

    const statusOptions = {
        0: "Любой",
        2: "В работе",
        3: "Завершен",
        4: "Отклонен"
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/403/")
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchLectures())
    }, []);

    const applyFilters = async (e) => {
        e.preventDefault()

        const filters:T_lecturesFilters = {
            status: status,
            date_formation_start: dateFormationStart,
            date_formation_end: dateFormationEnd
        }

        await dispatch(updateFilters(filters))
        await dispatch(fetchLectures())
    }

    return (
        <Container>
            <Form onSubmit={applyFilters}>
                <Row className="mb-4 d-flex align-items-center">
                    <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                        <label>От</label>
                        <Input type="date" value={dateFormationStart} onChange={(e) => setDateFormationStart(e.target.value)} required/>
                    </Col>
                    <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                        <label>До</label>
                        <Input type="date" value={dateFormationEnd} onChange={(e) => setDateFormationEnd(e.target.value)} required/>
                    </Col>
                    <Col md="3">
                        <CustomDropdown label="Статус" selectedItem={status} setSelectedItem={setStatus} options={statusOptions} />
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button color="primary" type="submit">Применить</Button>
                    </Col>
                </Row>
            </Form>
            {lectures.length ? <LecturesTable lectures={lectures}/> : <h3 className="text-center mt-5">Лекции не найдены</h3>}
        </Container>
    )
};