import {Button, Card, CardBody, CardTitle, Col} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {addSpecialistToLecture, fetchSpecialists} from "store/slices/specialistsSlice.ts";
import {T_Specialist} from "utils/types.ts";
import {removeSpecialistFromDraftLecture, updateSpecialistValue} from "store/slices/lecturesSlice.ts";
import CustomInput from "components/CustomInput";
import {useEffect, useState} from "react";

type Props = {
    specialist: T_Specialist,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    showMM?: boolean,
    editMM?: boolean
}

export const SpecialistCard = ({specialist, showAddBtn = false, showRemoveBtn = false, showMM=false, editMM = false}:Props) => {

    const dispatch = useAppDispatch()

    const {save_mm} = useAppSelector(state => state.lectures)

    const [local_comment, setLocal_comment] = useState(specialist.comment)

    const handeAddToDraftLecture = async () => {
        await dispatch(addSpecialistToLecture(specialist.id))
        await dispatch(fetchSpecialists())
    }

    const handleRemoveFromDraftLecture = async () => {
        await dispatch(removeSpecialistFromDraftLecture(specialist.id))
    }

    useEffect(() => {
        dispatch(updateSpecialistValue({
            specialist_id: specialist.id,
            comment: local_comment
        }))
    }, [save_mm]);

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
                {showMM && <CustomInput label="Комментарий" type="text" value={local_comment} setValue={setLocal_comment} disabled={!editMM} />}
                <Col className="d-flex justify-content-between">
                    <Link to={`/specialists/${specialist.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftLecture}>
                            Добавить
                        </Button>
                    }
                    {showRemoveBtn &&
                        <Button color="danger" onClick={handleRemoveFromDraftLecture}>
                            Удалить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};