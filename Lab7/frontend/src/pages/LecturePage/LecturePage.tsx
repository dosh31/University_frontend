import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftLecture,
    fetchLecture,
    removeLecture,
    sendDraftLecture,
    triggerUpdateMM,
    updateLecture
} from "store/slices/lecturesSlice.ts";
import SpecialistCard from "components/SpecialistCard";
import {Button, Col, Form, Row} from "reactstrap";
import {E_LectureStatus, T_Specialist} from "src/utils/types.ts";
import CustomInput from "components/CustomInput";
import CustomDatePicker from "components/CustomDatePicker";

export const LecturePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const lecture = useAppSelector((state) => state.lectures.lecture)

    console.log(lecture)

    const [date, setDate] = useState<string>(lecture?.date)
    const [room, setRoom] = useState<string>(lecture?.room)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/403/")
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchLecture(id))
        return () => dispatch(removeLecture())
    }, []);

    useEffect(() => {
        setDate(lecture?.date)
        setRoom(lecture?.room)
    }, [lecture]);

    const sendLecture = async (e) => {
        e.preventDefault()

        const data = {
            date
        }

        await dispatch(updateLecture(data))
        await dispatch(sendDraftLecture())

        navigate("/lectures")
    }

    const saveLecture = async (e) => {
        e.preventDefault()

        const data = {
            date
        }

        await dispatch(updateLecture(data))
        await dispatch(triggerUpdateMM())
    }

    const deleteLecture = async () => {
        await dispatch(deleteDraftLecture())
        navigate("/specialists")
    }

    if (!lecture) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = lecture.status == E_LectureStatus.Draft
    const isCompleted = lecture.status == E_LectureStatus.Completed

    return (
        <Form onSubmit={sendLecture} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновая лекция" : `Лекция №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomDatePicker label="Дата" placeholder="Введите дату" value={date} setValue={setDate} disabled={!isDraft}/>
                {isCompleted && <CustomInput label="Аудитория" value={room} disabled={true}/>}
            </Row>
            <Row>
                {lecture.specialists.length > 0 ? lecture.specialists.map((specialist:T_Specialist) => (
                    <Col md="4" key={specialist.id} className="d-flex justify-content-center mb-5">
                        <SpecialistCard specialist={specialist} showRemoveBtn={isDraft} showMM={true} editMM={isDraft} value={specialist.comment}/>
                    </Col>
                )) :
                    <h3 className="text-center">Специалисты еще не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveLecture}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteLecture}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};