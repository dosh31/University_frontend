import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Specialist} from "modules/types.ts";
import {
    removeSpecialistFromDraftLecture,
    updateSpecialistValue
} from "store/slices/lecturesSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addSpecialistToLecture, fetchSpecialists} from "store/slices/specialistsSlice.ts";

type Props = {
    specialist: T_Specialist,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const SpecialistCard = ({specialist, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.lectures)

    const [local_comment, setLocal_comment] = useState(specialist.comment)

    const location = useLocation()

    const isLecturePage = location.pathname.includes("lectures")

    const handeAddToDraftLecture = async () => {
        await dispatch(addSpecialistToLecture(specialist.id))
        await dispatch(fetchSpecialists())
    }

    const handleRemoveFromDraftLecture = async () => {
        await dispatch(removeSpecialistFromDraftLecture(specialist.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateSpecialistValue({
            specialist_id: specialist.id,
            comment: local_comment
        }))
    }

    if (isLecturePage) {
        return (
            <Card key={specialist.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={specialist.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {specialist.name}
                            </CardTitle>
                            <CustomInput label="Комментарий" type="text" value={local_comment} setValue={setLocal_comment} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/specialists/${specialist.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftLecture}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={specialist.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={specialist.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {specialist.name}
                </CardTitle>
                <Col className="d-flex justify-content-between">
                    <Link to={`/specialists/${specialist.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftLecture}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default SpecialistCard